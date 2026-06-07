export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const feeds = ['https://www.padelfip.com/feed/','https://www.padelnuestro.com/blog/feed/'];
    const articles = [];
    for (const feedUrl of feeds) {
      try {
        const r = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=3`);
        const d = await r.json();
        if (d.items) d.items.forEach(item => {
          const h = Math.floor((Date.now()-new Date(item.pubDate).getTime())/3600000);
          articles.push({title:item.title,time:h<24?`לפני ${h} שעות`:`לפני ${Math.floor(h/24)} ימים`,category:'עולם',hot:h<24,url:item.link});
        });
      } catch(e){}
    }
    articles.sort((a,b)=>b.hot-a.hot);
    res.status(200).json({articles:articles.slice(0,6)});
  } catch(e){ res.status(500).json({error:e.message}); }
}
