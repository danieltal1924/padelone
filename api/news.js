export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const r = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.bbci.co.uk%2Fsport%2Frss.xml&count=6');
    const d = await r.json();
    if(d.items && d.items.length > 0) {
      const articles = d.items.map(item => {
        const h = Math.floor((Date.now()-new Date(item.pubDate).getTime())/3600000);
        return {title:item.title, time:h<24?`לפני ${h} שעות`:`לפני ${Math.floor(h/24)} ימים`, category:'ספורט', hot:h<6, url:item.link};
      });
      return res.status(200).json({articles});
    }
    res.status(200).json({articles:[{title:"BBC Sport",time:"עכשיו",category:"ספורט",hot:true,url:"https://bbc.com/sport"}]});
  } catch(e){ 
    res.status(200).json({articles:[{title:"שגיאה: "+e.message,time:"עכשיו",category:"שגיאה",hot:false,url:"#"}]}); 
  }
}
