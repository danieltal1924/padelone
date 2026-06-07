export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const r = await fetch('https://gnews.io/api/v4/search?q=padel&lang=en&max=6&apikey=28182fe75d9e7b8a6e7f9c177ba7acb3');
    const d = await r.json();
    if(d.articles?.length > 0) {
      const articles = d.articles.map(a => {
        const h = Math.floor((Date.now()-new Date(a.publishedAt).getTime())/3600000);
        return {title:a.title, time:h<24?`לפני ${h} שעות`:`לפני ${Math.floor(h/24)} ימים`, category:'פאדל', hot:h<12, url:a.url};
      });
      return res.status(200).json({articles});
    }
    // Hardcoded fallback
    res.status(200).json({articles:[
      {title:"Italy Major Rome — Semi Finals Today",time:"עכשיו",category:"פאדל",hot:true,url:"https://www.padelfip.com"},
      {title:"Premier Padel 2026 Schedule Update",time:"לפני שעה",category:"פאדל",hot:true,url:"https://www.padelfip.com"},
      {title:"Galan & Chingotto lead rankings",time:"לפני 2 שעות",category:"פאדל",hot:false,url:"https://www.padelfip.com"},
    ]});
  } catch(e){ 
    res.status(200).json({articles:[
      {title:"Italy Major Rome — Semi Finals",time:"היום",category:"פאדל",hot:true,url:"https://www.padelfip.com"}
    ]}); 
  }
}
