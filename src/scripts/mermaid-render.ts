// Client-side mermaid renderer for markdown content. Loaded (bundled) by
// src/components/Mermaid.astro.
//
// How it works:
// - Markdown fences ```mermaid come out of Astro's markdown pipeline Shiki-
//   highlighted like any other language: <pre class="astro-code"
//   data-language="mermaid"><code>…</code></pre>. `data-language` is how we
//   find them; a keyword sanity check on the source guards against false
//   positives.
// - We swap each fence for a <pre class="mermaid" data-mermaid-source="…">
//   element that Mermaid can render into, keeping the original source in a
//   data attribute so we can re-render on theme change.
// - The mermaid ESM bundle is imported lazily, only when a page actually
//   contains at least one mermaid block.
// - astro:page-load fires after every view-transition navigation, so callers
//   just re-run `renderMermaid` on that event with the fresh DOM.
// - Theme changes (light/dark toggle) re-render diagrams so colors follow the
//   site's dark-mode tokens.

type RenderContext = {
  contentSelector: string;
};

let mermaidApi: typeof import('mermaid').default | null = null;
let currentTheme: 'default' | 'dark' | null = null;

function readSource(pre: HTMLPreElement): string | null {
  const code = pre.querySelector('code');
  if (!code) return null;
  const raw = code.textContent ?? '';
  // Guard against false positives: the fence must actually look like mermaid.
  // (Mermaid diagrams start with a diagram-type keyword.)
  return /^\s*(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|quadrantChart|gitGraph|sankey|block-beta|architecture|xychart|radar|packet)\b/i.test(
    raw,
  )
    ? raw
    : null;
}

async function loadMermaid(theme: 'default' | 'dark') {
  if (!mermaidApi || currentTheme !== theme) {
    const mod = await import('mermaid');
    mermaidApi = mod.default;
    currentTheme = theme;
    mermaidApi.initialize({
      startOnLoad: false,
      // Render inside an isolated sandbox document: the page's Tailwind
      // preflight (display:table wrappers, marginless <p>, .prose code sizing)
      // otherwise corrupts mermaid's label measurement and inflates the whole
      // layout ~8x. 'sandbox' renders in an iframe with a clean document.
      securityLevel: 'sandbox',
      // Neutral, design-system-adjacent palettes that work on both themes.
      theme: theme === 'dark' ? 'dark' : 'neutral',
      themeVariables:
        theme === 'dark'
          ? {
              // Mermaid's built-in "dark" theme assumes a near-black canvas;
              // our dark surface is #131316, so nudge the key colors.
              background: '#131316',
              primaryColor: '#1e1e24',
              primaryTextColor: '#ececee',
              primaryBorderColor: '#3f3f46',
              lineColor: '#94949c',
              fontFamily: 'Geist Variable, ui-sans-serif, system-ui, sans-serif',
            }
          : {
              primaryColor: '#eef2ff',
              primaryTextColor: '#18181b',
              primaryBorderColor: '#94a3b8',
              lineColor: '#52525b',
              fontFamily: 'Geist Variable, ui-sans-serif, system-ui, sans-serif',
            },
    });
  }
  return mermaidApi;
}

async function renderOne(pre: HTMLPreElement, source: string) {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const mermaid = await loadMermaid(isDark ? 'dark' : 'default');
  try {
    const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).slice(2)}`, source);
    if (svg.trimStart().startsWith('<iframe')) {
      renderSandboxed(pre, svg);
    } else {
      renderInline(pre, svg);
    }
    pre.classList.add('mermaid-rendered');
  } catch (error) {
    // Leave the raw source visible instead of swallowing the failure.
    console.error('[mermaid] render failed', error);
    pre.classList.add('mermaid-error');
  }
}

// Inline-SVG output (securityLevel without 'sandbox'): drop the fixed height,
// make width fluid, cap at natural width. The viewBox keeps the aspect ratio
// at every size.
function renderInline(pre: HTMLPreElement, svg: string) {
  const holder = document.createElement('div');
  holder.innerHTML = svg;
  const svgEl = holder.querySelector('svg');
  if (!svgEl) {
    pre.innerHTML = svg;
    return;
  }
  const viewBox = svgEl.getAttribute('viewBox');
  const naturalWidth = viewBox?.trim().split(/\s+/)[2];
  svgEl.removeAttribute('height');
  svgEl.setAttribute('width', '100%');
  svgEl.style.height = 'auto';
  if (naturalWidth && Number(naturalWidth) > 0) {
    svgEl.style.maxWidth = `${Math.ceil(Number(naturalWidth))}px`;
  }
  pre.replaceChildren(svgEl);
}

// Sandboxed output (securityLevel:'sandbox'): mermaid returns an <iframe> whose
// data: URL document holds the diagram. The iframe ships with a fixed pixel
// height measured at its natural width — on a narrower container the width
// shrinks but the height doesn't, leaving dead space below the diagram. Convert
// it to fluid sizing: width:100%, height driven by the SVG's aspect ratio,
// capped at the diagram's natural width so small diagrams keep their size.
function renderSandboxed(pre: HTMLPreElement, html: string) {
  const holder = document.createElement('div');
  holder.innerHTML = html;
  const iframe = holder.querySelector('iframe');
  if (!iframe) {
    pre.innerHTML = html;
    return;
  }
  const fallbackHeight = Number(iframe.style.height.replace('px', '')) || 0;
  iframe.removeAttribute('style');
  iframe.style.display = 'block';
  iframe.style.width = '100%';
  iframe.style.border = '0';
  iframe.style.margin = '0 auto';
  const { width: naturalWidth, height: naturalHeight } = readSandboxedViewBox(html);
  if (naturalWidth > 0 && naturalHeight > 0) {
    iframe.style.aspectRatio = `${naturalWidth} / ${naturalHeight}`;
    iframe.style.maxWidth = `${Math.ceil(naturalWidth)}px`;
  } else if (fallbackHeight > 0) {
    // Couldn't read the viewBox; at least keep mermaid's measured height.
    iframe.style.height = `${Math.ceil(fallbackHeight)}px`;
  }
  pre.replaceChildren(iframe);
}

// Decode the sandboxed iframe's data: URL document and read the inner SVG's
// viewBox, which carries the diagram's natural width and height.
function readSandboxedViewBox(html: string): { width: number; height: number } {
  const b64 = html.match(/src="data:text\/html;charset=UTF-8;base64,([^"]+)"/)?.[1];
  if (!b64) return { width: 0, height: 0 };
  try {
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const doc = new DOMParser().parseFromString(new TextDecoder().decode(bytes), 'text/html');
    const [, , w = 0, h = 0] = (doc.querySelector('svg')?.getAttribute('viewBox') ?? '')
      .trim()
      .split(/\s+/)
      .map(Number);
    return { width: w, height: h };
  } catch {
    return { width: 0, height: 0 };
  }
}

/** Render every mermaid fence inside `contentSelector`, and keep re-rendering on theme change. */
export async function renderMermaid({ contentSelector }: RenderContext) {
  const container = document.querySelector(contentSelector);
  if (!container) return;

  const blocks = Array.from(
    container.querySelectorAll<HTMLPreElement>('pre[data-language="mermaid"]'),
  );
  if (blocks.length === 0) return;

  await Promise.all(
    blocks.map(async (pre) => {
      const source = pre.dataset.mermaidSource ?? readSource(pre);
      if (!source) return;
      pre.dataset.mermaidSource = source;
      await renderOne(pre, source);
    }),
  );

  // Re-render on theme toggle so diagram colors follow light/dark.
  if (!(window as any).__mermaidThemeBound) {
    (window as any).__mermaidThemeBound = true;
    let lastTheme = document.documentElement.dataset.theme;
    new MutationObserver(() => {
      const theme = document.documentElement.dataset.theme;
      if (theme && theme !== lastTheme) {
        lastTheme = theme;
        document.querySelectorAll<HTMLPreElement>('pre[data-mermaid-source]').forEach((pre) => {
          const source = pre.dataset.mermaidSource;
          if (source) renderOne(pre, source);
        });
      }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }
}

/** Entry point called from Mermaid.astro on astro:page-load. */
export function startObserving(context: RenderContext) {
  void renderMermaid(context);
}
