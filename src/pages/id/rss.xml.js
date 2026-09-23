import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.lang === 'id')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Muh. Dimas Januardi Nur — Blog',
    description: 'Catatan tentang apa yang sedang saya bangun, apa yang rusak, dan apa yang saya pelajari di sepanjang jalan.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/id/blog/${post.id.split('/').pop()}/`,
    })),
    customData: '<language>id-id</language>',
  });
}
