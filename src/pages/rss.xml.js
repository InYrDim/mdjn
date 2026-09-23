import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.lang === 'en')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Muh. Dimas Januardi Nur — Blog',
    description: "Notes on what I'm building, what's breaking, and what I'm learning along the way.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id.split('/').pop()}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
