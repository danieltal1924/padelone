export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const feeds = [
      'https://feeds.feedburner.com/TennisworldUSA',
      'https://www.skysports.com/rss/12040',
      'https://www.theguardian.com/sport/tennis/rss',
    ];
    let articles = [];
    for(const feed of feeds) {
      if(articles.length >= 6) break;
      try {
        const r = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}&count=6`);
        const d = await r.json();
        if(d.status==='ok' && d.items?.length > 0) {
          d.items.forEach(item => {
            const h = Math.floor((Date.now()-new Date(item.pubDate).getTime())/3600000);
            articles.push({
              title: item.title,
              time: h < 24 ? `לפני ${h} שעות` : `לפני ${Math.floor(h/24)} ימים`,
              category: 'ספורט',
              hot: h < 12,
              url: item.link
            });
          });
        }
      } catch(e){}
    }
    res.status(200).json({articles: articles.slice(0,6)});
  } catch(e){ 
    res.status(500).json({articles:[], error:e.message}); 
  }
}
