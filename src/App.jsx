import { useState, useEffect, useRef, useCallback } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const LANG = {
  he: {
    dir:"rtl", join:"הצטרף",
    nav:{ home:"בית", tournaments:"תחרויות", clubs:"מועדונים", marketplace:"יד 2", world:"עולם 🌍", rankings:"דירוג 🏅", travel:"נסיעות", news:"חדשות" },
    badge:"הפלטפורמה המובילה לפאדל בישראל",
    h1a:"הכל על", h1b:"פאדל", h1c:"בישראל 🇮🇱",
    sub:"תחרויות, מועדונים, ציוד, נסיעות לחול וחדשות מהעולם — הכל במקום אחד.",
    btn1:"גלה תחרויות", btn2:"מצא מועדון", btn3:"יד-2", btn4:"🌍 תחרויות בחול", btn5:"✈️ נסיעות לחול", btn6:"📰 חדשות",
    stats:["שחקנים רשומים ב-ILPA","מגרשים בישראל","תחרויות בשנה","מועדונים פעילים"],
    s_tournaments:"תחרויות קרובות 🏆", s_clubs:"מועדוני פאדל 📍", s_marketplace:"ציוד יד 2",
    s_world:"תחרויות עולמיות 🌍", s_rankings:"דירוג עולמי 🏅", s_travel:"טיולי פאדל לחול ✈️", s_news:"חדשות פאדל 📰",
    searchClub:"חיפוש מועדון או עיר...", allTournaments:"כל התחרויות",
    register:"הרשמה", waitlist:"המתנה", full:"מלא", spots:"מקומות",
    bookLazuz:"🗓 הזמן מגרש — Lazuz", bookWA:"💬 הזמן ב-WhatsApp", details:"פרטים והזמנה",
    verified:"✓ מאומת", premium:"★ PREMIUM", courts:"מגרשים", indoor:"מקורה", outdoor:"חוץ",
    moreFeatures:"עוד", perPerson:"לאדם",
    t_israel:"🇮🇱 ישראל", t_world:"🌍 עולם", t_men:"👨 גברים", t_women:"👩 נשים",
    rankCols:["#","שחקן","שותף","נקודות","שינוי"], rankNote:"* עדכון ידני שבועי · הדירוג הרשמי מתעדכן ב-FIP", rankBtn:"דירוג מלא ← FIP", rankPlayers:"שחקנים",
    worldSub:"לוח תחרויות Premier Padel ועוד — כולל שידורים",
    travelSub:"חבילות פאדל מאורגנות לחול — מדריד, דובאי, ברצלונה ועוד.", travelContact:"מפרסמים ומארגני טיולים מוזמנים ליצור קשר.", travelBtn:"💬 צור קשר לפרסום", comingSoon:"בקרוב",
    mktSub:"קנה ומכור ציוד פאדל ישירות עם שחקנים אחרים", noItems:"אין פריטים בקטגוריה זו", itemsCount:"פריטים",
    sellTitle:"רוצה למכור ציוד?", sellSub:"פרסם בחינם — יגיע לכל קהילת הפאדל", sellBtn:"פרסם מודעה חינם",
    bannerTitle:"יד 2 — קנה ומכור ציוד פאדל", bannerSub:"מחבטים · נעליים · ביגוד · ציוד — ישירות בין שחקנים", bannerBtn:"לדף היד-2 ←", bannerFree:"חינם",
    readMore:"קרא עוד ←", updatedAt:"עודכן:", addArticle:"יש לך כתבה ישראלית חדשה? שלח לנו ונוסיף 📩",
    refresh:"⚡ רענן", loading:["🔍 מחפש חדשות פאדל...","🌐 סורק אתרי ספורט...","📰 בוחר את הכי חם...","✨ מכין את התוצאות..."],
    joinTitle:"הצטרף לקהילת Padel One", joinSub:"הירשם בחינם וקבל עדכונים על תחרויות, מבצעים וטיולים לחול", joinBtn:"הצטרף עכשיו", emailPH:"כתובת מייל שלך",
    fnav:"ניווט", fcomm:"קהילה", fcomp:"חברה", ftagline:"הבית הדיגיטלי של קהילת הפאדל הישראלית", fcopy:"© 2026 Padel One | padelone.co.il",
    fl_tournaments:"תחרויות",fl_clubs:"מועדונים",fl_marketplace:"יד-2",fl_travel:"נסיעות לחול",fl_world:"עולם",fl_rankings:"דירוג",fl_news:"חדשות",
    fl_tiktok:"🎵 טיקטוק",fl_instagram:"📸 אינסטגרם",fl_whatsapp:"💬 וואטסאפ",fl_forum:"🌐 פורום",
    fl_about:"אודות",fl_contact:"צור קשר",fl_advertise:"פרסום באתר",fl_terms:"תנאי שימוש",
    fmade:"עשוי עם ❤️ לקהילת הפאדל הישראלית",
    about_title:"אודות Padel One", terms_title:"תנאי שימוש", adv_title:"פרסום ב-Padel One",
  },
  en: {
    dir:"ltr", join:"Join",
    nav:{ home:"Home", tournaments:"Tournaments", clubs:"Clubs", marketplace:"2nd Hand", world:"World 🌍", rankings:"Rankings 🏅", travel:"Travel", news:"News" },
    badge:"Israel's Leading Padel Platform",
    h1a:"Everything about", h1b:"Padel", h1c:"in Israel 🇮🇱",
    sub:"Tournaments, clubs, gear, trips abroad and world news — all in one place.",
    btn1:"Explore Tournaments", btn2:"Find a Club", btn3:"2nd Hand", btn4:"🌍 World Tournaments", btn5:"✈️ Travel Abroad", btn6:"📰 News",
    stats:["Registered Players (ILPA)","Courts in Israel","Tournaments/Year","Active Clubs"],
    s_tournaments:"Upcoming Tournaments 🏆", s_clubs:"Padel Clubs 📍", s_marketplace:"2nd Hand Gear",
    s_world:"World Tournaments 🌍", s_rankings:"World Rankings 🏅", s_travel:"Padel Travel ✈️", s_news:"Padel News 📰",
    searchClub:"Search club or city...", allTournaments:"All Tournaments",
    register:"Register", waitlist:"Waitlist", full:"Full", spots:"spots",
    bookLazuz:"🗓 Book — Lazuz", bookWA:"💬 Book on WhatsApp", details:"Details & Book",
    verified:"✓ Verified", premium:"★ PREMIUM", courts:"courts", indoor:"Indoor", outdoor:"Outdoor",
    moreFeatures:"more", perPerson:"per person",
    t_israel:"🇮🇱 Israel", t_world:"🌍 World", t_men:"👨 Men", t_women:"👩 Women",
    rankCols:["#","Player","Partner","Points","Change"], rankNote:"* Updated weekly · Official rankings at FIP.com", rankBtn:"Full Rankings ← FIP", rankPlayers:"Player",
    worldSub:"Premier Padel tournament calendar & more — including broadcasts",
    travelSub:"Organized padel trips abroad — Madrid, Dubai, Barcelona and more.", travelContact:"Organizers and travel companies are welcome to contact us.", travelBtn:"💬 Contact for Advertising", comingSoon:"Coming Soon",
    mktSub:"Buy and sell padel gear directly with other players", noItems:"No items in this category", itemsCount:"items",
    sellTitle:"Want to sell gear?", sellSub:"Post for free — reach the entire padel community", sellBtn:"Post Free Ad",
    bannerTitle:"2nd Hand — Buy & Sell Padel Gear", bannerSub:"Rackets · Shoes · Clothing · Gear — between players", bannerBtn:"Go to 2nd Hand →", bannerFree:"Free",
    readMore:"Read more →", updatedAt:"Updated:", addArticle:"Have a new Israeli padel article? Send it to us 📩",
    refresh:"⚡ Refresh", loading:["🔍 Searching padel news...","🌐 Scanning sports sites...","📰 Picking the hottest...","✨ Preparing results..."],
    joinTitle:"Join the Padel One Community", joinSub:"Sign up free and get updates on tournaments, deals and trips abroad", joinBtn:"Join Now", emailPH:"Your email address",
    fnav:"Navigation", fcomm:"Community", fcomp:"Company", ftagline:"The digital home of Israeli padel", fcopy:"© 2026 Padel One | padelone.co.il",
    fl_tournaments:"Tournaments",fl_clubs:"Clubs",fl_marketplace:"2nd Hand",fl_travel:"Travel Abroad",fl_world:"World",fl_rankings:"Rankings",fl_news:"News",
    fl_tiktok:"🎵 TikTok",fl_instagram:"📸 Instagram",fl_whatsapp:"💬 WhatsApp",fl_forum:"🌐 Forum",
    fl_about:"About",fl_contact:"Contact Us",fl_advertise:"Advertise",fl_terms:"Terms of Use",
    fmade:"Made with ❤️ for the padel community",
    about_title:"About Padel One", terms_title:"Terms of Use", adv_title:"Advertise on Padel One",
  }
};

// ─── 3D COURT (Three.js via CDN) ─────────────────────────────────────────────
function PadelCourtCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const THREE = window.THREE;
      if (!THREE) return;

      let renderer, animId;
      try {
        const w = window.innerWidth, h = window.innerHeight;
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, w/h, 0.1, 100);
        camera.position.set(0, 8, 14);
        camera.lookAt(0, 0, 0);

        scene.add(new THREE.AmbientLight(0x0a1628, 1));

        const spots = [[-5.5,9,-9],[5.5,9,-9],[-5.5,9,9],[5.5,9,9]].map(([x,y,z]) => {
          const s = new THREE.SpotLight(0xdde8ff, 2.5, 28, Math.PI/5, 0.4);
          s.position.set(x, y, z);
          scene.add(s);
          return s;
        });

        const rim = new THREE.PointLight(0x2244aa, 1.2, 18);
        rim.position.set(0, 1, 0);
        scene.add(rim);

        const court = new THREE.Group();
        scene.add(court);

        const mesh = (geo, mat, x=0, y=0, z=0) => {
          const m = new THREE.Mesh(geo, mat);
          m.position.set(x, y, z);
          court.add(m);
          return m;
        };

        mesh(new THREE.BoxGeometry(10,0.12,20), new THREE.MeshStandardMaterial({color:0x060f20,roughness:0.4}));

        const lm = new THREE.MeshStandardMaterial({color:0xe0ecff,emissive:0x8899cc,emissiveIntensity:0.5});
        mesh(new THREE.BoxGeometry(0.07,0.13,20),lm,-4.9,0,0);
        mesh(new THREE.BoxGeometry(0.07,0.13,20),lm,4.9,0,0);
        mesh(new THREE.BoxGeometry(10,0.13,0.07),lm,0,0,-9.9);
        mesh(new THREE.BoxGeometry(10,0.13,0.07),lm,0,0,9.9);
        mesh(new THREE.BoxGeometry(0.07,0.13,10),lm);
        mesh(new THREE.BoxGeometry(10,0.13,0.07),lm,0,0,-3.3);
        mesh(new THREE.BoxGeometry(10,0.13,0.07),lm,0,0,3.3);

        mesh(new THREE.BoxGeometry(10,0.85,0.05),
          new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:0.3,wireframe:true}),
          0,0.47,0);

        const gm = new THREE.MeshStandardMaterial({color:0x0a1e3a,transparent:true,opacity:0.13});
        mesh(new THREE.BoxGeometry(10,3,0.08),gm,0,1.5,-9.85);
        mesh(new THREE.BoxGeometry(10,3,0.08),gm,0,1.5,9.85);
        mesh(new THREE.BoxGeometry(0.08,3,20),gm,-4.85,1.5,0);
        mesh(new THREE.BoxGeometry(0.08,3,20),gm,4.85,1.5,0);

        const sm = new THREE.MeshStandardMaterial({color:0xbbd0f0,emissive:0x6688bb,emissiveIntensity:1.8});
        mesh(new THREE.BoxGeometry(0.04,0.04,20),sm,-4.88,3,0);
        mesh(new THREE.BoxGeometry(0.04,0.04,20),sm,4.88,3,0);
        mesh(new THREE.BoxGeometry(10,0.04,0.04),sm,0,3,-9.88);
        mesh(new THREE.BoxGeometry(10,0.04,0.04),sm,0,3,9.88);

        const pm = new THREE.MeshStandardMaterial({color:0x1a2a3a,metalness:0.85});
        const fm = new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xddeeff,emissiveIntensity:2});
        [[-5.5,9,-9],[5.5,9,-9],[-5.5,9,9],[5.5,9,9]].forEach(([x,,z]) => {
          mesh(new THREE.CylinderGeometry(0.05,0.07,7,6),pm,x,3.5,z);
          mesh(new THREE.BoxGeometry(0.5,0.09,0.18),fm,x,7.15,z);
        });

        const ball = mesh(
          new THREE.SphereGeometry(0.19,16,16),
          new THREE.MeshStandardMaterial({color:0xd0e0f8,metalness:0.6,roughness:0.2,emissive:0x3355aa,emissiveIntensity:0.4}),
          1.5, 2.5, -2
        );
        ball.add(new THREE.PointLight(0x5577cc,1.2,5));

        const pArr = new Float32Array(60*3);
        for(let i=0;i<60;i++){
          pArr[i*3]=(Math.random()-.5)*22;
          pArr[i*3+1]=Math.random()*10;
          pArr[i*3+2]=(Math.random()-.5)*26;
        }
        const pg = new THREE.BufferGeometry();
        pg.setAttribute("position", new THREE.BufferAttribute(pArr,3));
        const pts = new THREE.Points(pg, new THREE.PointsMaterial({color:0x7799bb,size:0.055,transparent:true,opacity:0.4}));
        scene.add(pts);

        court.rotation.x = -0.18;
        let t2 = 0;

        const animate = () => {
          animId = requestAnimationFrame(animate);
          t2 += 0.006;
          court.rotation.y = Math.sin(t2*0.28)*0.24;
          ball.position.y = 2+Math.sin(t2*2)*0.55;
          ball.position.x = Math.cos(t2*1.1)*2.2;
          ball.rotation.x += 0.018;
          spots.forEach((s,i) => { s.intensity = 2.3+Math.sin(t2*1.1+i*.7)*.3; });
          pts.rotation.y += 0.0005;
          renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
          const nw=window.innerWidth, nh=window.innerHeight;
          camera.aspect=nw/nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw,nh);
        };
        window.addEventListener("resize", onResize);

        mount._cleanup = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("resize", onResize);
          try { if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); renderer.dispose(); } catch(e){}
        };

      } catch(e) { console.error("3D error:", e); }
    };

    return () => {
      if(mount._cleanup) mount._cleanup();
      if(script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div ref={mountRef} style={{
      position:"fixed", inset:0, zIndex:0, opacity:0.35, pointerEvents:"none",
      background:"radial-gradient(ellipse 80% 60% at 50% 30%, rgba(10,20,50,0.95) 0%, #04080f 70%)",
    }}/>
  );
}


// ─── 3D CARD ──────────────────────────────────────────────────────────────────
function Card3D({children,style}) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el=ref.current; if(!el) return;
    const r=el.getBoundingClientRect();
    const rx=((e.clientY-r.top-r.height/2)/(r.height/2))*-7;
    const ry=((e.clientX-r.left-r.width/2)/(r.width/2))*7;
    el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
    el.style.boxShadow="0 24px 60px rgba(20,50,110,0.35)";
  },[]);
  const onLeave = useCallback(() => {
    if(ref.current){ref.current.style.transform="perspective(900px) rotateX(0) rotateY(0) scale(1)";ref.current.style.boxShadow="";}
  },[]);
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{transition:"transform .18s ease,box-shadow .18s ease",transformStyle:"preserve-3d",...style}}>{children}</div>;
}

// ─── SHARED UI ─────────────────────────────────────────────────────────────────
const BG="#04080f", SURF="rgba(8,18,36,0.82)", BORDER="rgba(120,160,220,0.13)", SILVER="#c8d8f0", DIM="#6a84a0", GOLD="#c8a96e";
const Glass = ({style,children}) => <div style={{background:SURF,border:`1px solid ${BORDER}`,backdropFilter:"blur(16px)",...style}}>{children}</div>;
const SBadge = ({children,style}) => <span style={{display:"inline-block",padding:"3px 12px",borderRadius:50,fontSize:11,fontWeight:700,background:"rgba(180,210,255,0.09)",color:SILVER,border:`1px solid ${BORDER}`,...style}}>{children}</span>;
const BallSVG = ({size=22}) => <svg width={size} height={size} viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="15" fill="none" stroke="#c8d8f0" strokeWidth="1.8"/><path d="M7 10 Q17 17 7 24" fill="none" stroke="#c8d8f0" strokeWidth="1.6" strokeLinecap="round"/><path d="M27 10 Q17 17 27 24" fill="none" stroke="#c8d8f0" strokeWidth="1.6" strokeLinecap="round"/></svg>;

// ─── DATA ──────────────────────────────────────────────────────────────────────
const STATS_VALS = ["750+","150+","בקרוב","35+"];
const TOURNAMENTS = [
  {name:"אליפות ישראל 2026",date:"15–18 יולי",location:"תל אביב",level:"פרו",spots:8,icon:"🏆"},
  {name:"גביע הקיץ – רעננה",date:"28 יוני",location:"רעננה",level:"Amateur",spots:24,icon:"🥇"},
  {name:"טורניר מעורב ירושלים",date:"5 יולי",location:"ירושלים",level:"מעורב",spots:16,icon:"⚡"},
  {name:"ליגת הצפון – חיפה",date:"20 יולי",location:"חיפה",level:"ליגה",spots:0,icon:"🎾"},
  {name:"Beach Padel – הרצליה",date:"1 אוגוסט",location:"הרצליה",level:"Beach",spots:12,icon:"🏖️"},
  {name:"U18 – גמר ארצי",date:"10 אוגוסט",location:"נתניה",level:"נוער",spots:4,icon:"⭐"},
];
const CLUBS = [
  {name:"כפר המכביה – פאדל ישראל",city:"רמת גן",courts:8,indoor:false,image:"🏟️",phone:"073-218-7130",hours:"א׳–ה׳: 06:00–00:00 | ו׳: 06:00–כניסת שבת",features:["חנות ציוד","פינות ישיבה","משקאות"],verified:true,bookingType:"phone"},
  {name:"פאדל טיים קלאב",city:"תל אביב",courts:4,indoor:false,image:"🏊",phone:"077-961-2092",phoneDirect:"053-948-5784",hours:"א׳–ה׳: 06:00–00:00 | ו׳: 06:00–20:00",location:"קאנטרי דקל, תל אביב",description:"4 מגרשים יוקרתיים. כניסה חופשית לבריכה, ג׳קוזי ומקלחות.",features:["בריכה חופשית","ג׳קוזי","חנות ADIDAS","מחבטים ₪30","כדורים"],verified:true,bookingType:"lazuz",bookingUrl:"https://lazuz.co.il"},
  {name:"TERO X WILSON Padel Club",city:"תל אביב",courts:6,indoor:false,image:"⚡",phone:"+972-54-219-3030",hours:"א׳–ה׳: 06:00–00:00 | ו׳: 06:00–21:00",description:"6 מגרשים ברמה אחרת מבית מחור סט – המובילה את הפרמייר ליג.",features:["קפיטריה","נגישות","LED","חניה","חנות","מקלחות","בקרת כניסה"],verified:true,bookingType:"lazuz",bookingUrl:"https://lazuz.co.il"},
  {name:"פאדליר – פארק לאומי רמת גן",city:"רמת גן",courts:6,indoor:false,image:"🌳",phone:"+972-52-475-8650",hours:"א׳–ה׳: 07:00–00:00 | ו׳: 07:00–19:00",location:"פארק לאומי, רמת גן",description:"Padeltach Panoramic + משטח Ondo Premier Padel + מצלמות PlaySight.",features:["קפיטריה","נגישות","LED","חניה","חנות","בקרת כניסה","PlaySight","Ondo"],verified:true,bookingType:"lazuz",bookingUrl:"https://lazuz.co.il"},
  {name:"פאדל טיים קלאב חולון",city:"חולון",courts:8,indoor:false,image:"🏊",phone:"077-961-2092",phoneDirect:"053-948-5727",hours:"א׳–ה׳: 07:00–00:00 | ו׳: 07:00–18:00",location:"קאנטרי קלאב חולון",description:"8 מגרשים, בריכה, סאונה, ג׳קוזי. מחבטים חינם!",features:["בריכה","סאונה","ג׳קוזי","ADIDAS","מחבטים חינם 🎁","קפיטריה","חניה","בקרת כניסה"],verified:true,bookingType:"lazuz",bookingUrl:"https://lazuz.co.il"},
  {name:"מרכז הטניס – רמת השרון",city:"רמת השרון",courts:24,indoor:false,image:"🏟️",phone:"054-555-0455",location:"רמת השרון",description:"24 מגרשים, 5 חמר, אצטדיון קנדה 4,000 מושבים. אחד מ-14 מרכזים.",features:["קפיטריה","נגישות","LED","חניה","חנות","מקלחות","שזירה","קיר אימון","חמר"],verified:true,note:"טניס ופאדל",bookingType:"lazuz",bookingUrl:"https://lazuz.co.il"},
  {
    name:"פאדל אינדור בני ציון",
    city:"בני ציון",
    courts:3,
    indoor:true,
    image:"🏠",
    phone:"054-420-6666",
    phoneDirect:"052-900-8785",
    email:"smashpointpadel@gmail.com",
    hours:"א׳–ה׳: 06:00–00:00 | ו׳–ש׳: 06:00–00:00",
    location:"שיזף 161, בני ציון",
    description:"המועדון Indoor היחיד בישראל! 2 מגרשי זוגות + מגרש יחידים ייחודי. בניהול עמית נאור — שחקן ומאמן נבחרת הטניס לשעבר.",
    features:["Indoor — ללא תלות במזג האוויר","מגרש יחידים ייחודי בישראל","מקלחות מפנקות","השכרת ציוד אוטומטית","חדר כושר","מים קרים","נגישות","תאורת LED","חניה","חנות","מקלחות","בקרת כניסה"],
    verified:true,
    bookingType:"lazuz",
    bookingUrl:"https://lazuz.co.il",
    note:"Indoor בלעדי 🏠",
  },
  // ⬇️ מועדונים נוספים יתווספו בהמשך
];
const MARKETPLACE = [
  {
    id:1,
    title:"Bullpadel Hack Control 03 CTR",
    brand:"Bullpadel",
    price:650,
    condition:"משומש",
    area:"מרכז",
    category:"מחבט",
    seller:"בעל האתר",
    phone:"",
    desc:"מחבט Bullpadel Hack 03 CTR Professional. Tricarbon/Multieva, 365-375g. ללא שברים, קצת שריטות — מצב טוב. שימוש של חצי שנה.",
    specs:"Control 90/100 | Low Balance | Round | 38mm",
    images:["data:image/jpeg;base64,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","data:image/jpeg;base64,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","data:image/jpeg;base64,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"],
    real:true,
  },
  // ⬇️ פריטים נוספים יתווספו בהמשך
];
const CATEGORIES_HE = ["הכל","מחבט","נעליים","תיק","ביגוד"];
const CONDITIONS_HE = ["הכל","חדש","כמו חדש","משומש"];
const WORLD_TOURNAMENTS = [
  {name:"Riyadh Season P1",series:"Premier Padel",location:"ריאד, סעודיה 🇸🇦",dates:"9–14 פברואר",status:"done",prize:"P1",url:"https://www.redbull.tv/en/events",players:"קואלו / טאפיה ניצחו"},
  {name:"Gijón P2",series:"Premier Padel",location:"חיחון, ספרד 🇪🇸",dates:"2–8 מרץ",status:"done",prize:"P2",url:"https://www.redbull.tv/en/events",players:"גלאן / צ׳ינגוטו ניצחו"},
  {name:"Cancún P2",series:"Premier Padel",location:"קנקון, מקסיקו 🇲🇽",dates:"16–22 מרץ",status:"done",prize:"P2",url:"https://www.redbull.tv/en/events",players:"טאפיה / קואלו ניצחו"},
  {name:"Miami P1",series:"Premier Padel",location:"מיאמי, ארה״ב 🇺🇸",dates:"23–29 מרץ",status:"done",prize:"P1",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"NewGiza P2",series:"Premier Padel",location:"גיזה, מצרים 🇪🇬",dates:"13–18 אפריל",status:"done",prize:"P2",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Brussels P2",series:"Premier Padel",location:"בריסל, בלגיה 🇧🇪",dates:"20–26 אפריל",status:"done",prize:"P2",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Asunción P2",series:"Premier Padel",location:"אסונסיון, פרגוואי 🇵🇾",dates:"4–10 מאי",status:"done",prize:"P2",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Buenos Aires P1",series:"Premier Padel",location:"בואנוס איירס 🇦🇷",dates:"11–17 מאי",status:"done",prize:"P1",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Italy Major — Rome 🏆",series:"Premier Padel",location:"רומא, איטליה 🇮🇹",dates:"1–7 יוני",status:"live",prize:"Major",url:"https://www.redbull.tv/en/events",players:"גמר ב-7/6 בשעה 18:30"},
  {name:"Valencia P1",series:"Premier Padel",location:"ולנסיה, ספרד 🇪🇸",dates:"8–14 יוני",status:"upcoming",prize:"P1",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Valladolid P2",series:"Premier Padel",location:"ויאדוליד, ספרד 🇪🇸",dates:"22–28 יוני",status:"upcoming",prize:"P2",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Bordeaux P2",series:"Premier Padel",location:"בורדו, צרפת 🇫🇷",dates:"29 יוני–5 יולי",status:"upcoming",prize:"P2",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Málaga P1",series:"Premier Padel",location:"מלאגה, ספרד 🇪🇸",dates:"13–19 יולי",status:"upcoming",prize:"P1",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Pretoria P2",series:"Premier Padel",location:"פרטוריה, דרום אפריקה 🇿🇦",dates:"27 יולי–2 אוג׳",status:"upcoming",prize:"P2",url:"https://www.redbull.tv/en/events",players:"הופעת בכורה באפריקה"},
  {name:"London P1",series:"Premier Padel",location:"לונדון, אנגליה 🇬🇧",dates:"3–9 אוגוסט",status:"upcoming",prize:"P1",url:"https://www.redbull.tv/en/events",players:"הופעת בכורה בלונדון"},
  {name:"Madrid P1",series:"Premier Padel",location:"מדריד, ספרד 🇪🇸",dates:"31 אוג׳–6 ספט׳",status:"upcoming",prize:"P1",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Paris Major — Roland Garros",series:"Premier Padel",location:"פריז, צרפת 🇫🇷",dates:"7–13 ספטמבר",status:"upcoming",prize:"Major",url:"https://www.redbull.tv/en/events",players:"Top 32 — רולאן גארוס"},
  {name:"Rotterdam P2",series:"Premier Padel",location:"רוטרדם, הולנד 🇳🇱",dates:"28 ספט׳–4 אוקט׳",status:"upcoming",prize:"P2",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Germany P2",series:"Premier Padel",location:"דיסלדורף, גרמניה 🇩🇪",dates:"5–11 אוקטובר",status:"upcoming",prize:"P2",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Milano P1",series:"Premier Padel",location:"מילאנו, איטליה 🇮🇹",dates:"12–18 אוקטובר",status:"upcoming",prize:"P1",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Kuwait City Major",series:"Premier Padel",location:"כווית סיטי 🇰🇼",dates:"26–31 אוקטובר",status:"upcoming",prize:"Major",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Dubai P1",series:"Premier Padel",location:"דובאי 🇦🇪",dates:"נובמבר",status:"upcoming",prize:"P1",url:"https://www.redbull.tv/en/events",players:"בכירי הסיבוב"},
  {name:"Mexico Major — Acapulco",series:"Premier Padel",location:"אקפולקו, מקסיקו 🇲🇽",dates:"23–29 נובמבר",status:"upcoming",prize:"Major",url:"https://www.redbull.tv/en/events",players:"Top 32"},
  {name:"Barcelona Finals 🏆",series:"Premier Padel",location:"ברצלונה, ספרד 🇪🇸",dates:"7–13 דצמבר",status:"upcoming",prize:"Finals",url:"https://www.redbull.tv/en/events",players:"Top 16 בעולם בלבד"},
];
const RANKINGS = {
  men:[
    {rank:1,name:"Arturo Coello",country:"🇪🇸",partner:"Agustín Tapia",partnerCountry:"🇦🇷",points:"20,397",change:"—"},
    {rank:2,name:"Agustín Tapia",country:"🇦🇷",partner:"Arturo Coello",partnerCountry:"🇪🇸",points:"20,397",change:"—"},
    {rank:3,name:"Alejandro Galán",country:"🇦🇷",partner:"Federico Chingotto",partnerCountry:"🇦🇷",points:"17,320",change:"▲"},
    {rank:4,name:"Federico Chingotto",country:"🇦🇷",partner:"Alejandro Galán",partnerCountry:"🇦🇷",points:"17,320",change:"▲"},
    {rank:5,name:"Juan Lebrón",country:"🇪🇸",partner:"Leo Augsburger",partnerCountry:"🇦🇷",points:"12,840",change:"▼"},
    {rank:6,name:"Leo Augsburger",country:"🇦🇷",partner:"Juan Lebrón",partnerCountry:"🇪🇸",points:"12,840",change:"▼"},
    {rank:7,name:"Franco Stupaczuk",country:"🇦🇷",partner:"Mike Yanguas",partnerCountry:"🇪🇸",points:"11,200",change:"▲"},
    {rank:8,name:"Paquito Navarro",country:"🇪🇸",partner:"Fran Guerrero",partnerCountry:"🇪🇸",points:"9,850",change:"—"},
    {rank:9,name:"Javi Leal",country:"🇪🇸",partner:"Pablo Cardona",partnerCountry:"🇪🇸",points:"8,640",change:"▲"},
    {rank:10,name:"Momo González",country:"🇦🇷",partner:"Martín Di Nenno",partnerCountry:"🇦🇷",points:"7,920",change:"▼"},
  ],
  women:[
    {rank:1,name:"Gemma Triay",country:"🇪🇸",partner:"Delfina Brea",partnerCountry:"🇦🇷",points:"18,009",change:"—"},
    {rank:2,name:"Delfina Brea",country:"🇦🇷",partner:"Gemma Triay",partnerCountry:"🇪🇸",points:"18,009",change:"—"},
    {rank:3,name:"Ariana Sánchez",country:"🇪🇸",partner:"Andrea Ustero",partnerCountry:"🇪🇸",points:"13,970",change:"▲"},
    {rank:4,name:"Paula Josemaría",country:"🇪🇸",partner:"Bea González",partnerCountry:"🇪🇸",points:"13,880",change:"▲"},
    {rank:5,name:"Beatriz González",country:"🇪🇸",partner:"Paula Josemaría",partnerCountry:"🇪🇸",points:"13,350",change:"▲"},
    {rank:6,name:"Claudia Fernández",country:"🇪🇸",partner:"Sofia Araújo",partnerCountry:"🇵🇹",points:"12,530",change:"—"},
    {rank:7,name:"Andrea Ustero",country:"🇪🇸",partner:"Ariana Sánchez",partnerCountry:"🇪🇸",points:"7,355",change:"▲"},
    {rank:8,name:"Tamara Icardo",country:"🇪🇸",partner:"Claudia Jensen",partnerCountry:"🇩🇰",points:"6,210",change:"—"},
    {rank:9,name:"Marta Ortega",country:"🇪🇸",partner:"Martina Calvo",partnerCountry:"🇪🇸",points:"5,760",change:"▼"},
    {rank:10,name:"Alejandra Salazar",country:"🇪🇸",partner:"Ale Alonso",partnerCountry:"🇪🇸",points:"5,110",change:"▼"},
  ],
};
const ISRAEL_NEWS = [
  {title:"כלכליסט: מינגלינג בין החבטות — 150 מגרשים, 35 מועדונים בישראל",time:"אוגוסט 2025",category:"ישראל",hot:true,url:"https://www.calcalist.co.il/style/article/r1sqjfecll"},
  {title:"מאקו: מגרשי הפאדל כובשים את ערי ישראל — רעננה, רמת גן, אילת ועוד",time:"דצמבר 2025",category:"ישראל",hot:false,url:"https://www.mako.co.il/living-architecture/local/Article-1c0734d09362b91026.htm"},
];
const WORLD_NEWS = [
  {title:"🔴 LIVE: BNL Italy Major Rome — שמינית גמר היום, גמר ב-7 יוני 18:30",time:"עכשיו",category:"טורניר",hot:true,url:"https://www.redbull.tv/en/events"},
  {title:"פרידה מרגשת: למפרטי שיחק משחקו האחרון בבואנוס איירס מול 13,000 אוהדים",time:"מאי 2026",category:"עולם",hot:false,url:"https://www.padelfip.com/2026/05/day4-top-four-pairs-in-the-semi-finals-emotional-farewell-for-lamperti/"},
  {title:"גלאן וצ׳ינגוטו: 29 ניצחונות מתוך 32 ב-2026 — המועדפים ברומא",time:"מאי 2026",category:"עולם",hot:false,url:"https://www.redbull.tv/en/events"},
  {title:"נדאל משחק פאדל — אימון עם מאמנו לשעבר קרלוס מויה",time:"2025",category:"עולם",hot:false,url:"https://www.sportskeeda.com/tennis/news-rafael-nadal-post-retirement-life-spaniard-turns-padel-joins-ex-coach-carlos-moya-fun-session-academy"},
  {title:"עדכון לוח 2026: קטאר בוטל, קובייט הוקפץ ל-Major, פרטוריה ל-P1",time:"מאי 2026",category:"עולם",hot:false,url:"https://www.padelfip.com/events/italy-major-2026/"},
  {title:"Star Point — שיטת הניקוד החדשה של Premier Padel 2026",time:"דצמבר 2025",category:"עולם",hot:false,url:"https://www.padelnuestro.com/int/blog/premier-padel-2026-calendar"},
];

// ─── RANKINGS COMPONENT ───────────────────────────────────────────────────────
function RankingsSection({t}) {
  const [tab, setTab] = useState("men");
  const players = RANKINGS[tab];
  return (
    <div>
      <div style={{display:"flex",gap:0,marginBottom:24,border:`1px solid ${BORDER}`,borderRadius:3,overflow:"hidden",maxWidth:280}}>
        {[{id:"men",label:t.t_men},{id:"women",label:t.t_women}].map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{flex:1,padding:"10px 0",border:"none",cursor:"pointer",fontFamily:"Heebo,sans-serif",fontWeight:700,fontSize:13,background:tab===tb.id?"linear-gradient(135deg,#c8d8f0,#8aa0c0)":"transparent",color:tab===tb.id?"#04080f":DIM,transition:"all .2s"}}>{tb.label}</button>
        ))}
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",minWidth:500}}>
          <thead>
            <tr style={{borderBottom:`1px solid ${BORDER}`}}>
              {t.rankCols.map((h,i) => <th key={i} style={{padding:"10px 14px",textAlign:"right",color:"rgba(180,210,255,0.4)",fontSize:11,fontWeight:600,letterSpacing:1.5}}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {players.map((p,i) => (
              <tr key={i} style={{borderBottom:`1px solid rgba(120,160,220,0.06)`,transition:"background .15s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(180,210,255,0.04)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <td style={{padding:"14px",textAlign:"center",width:44}}>
                  <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",background:p.rank===1?"linear-gradient(135deg,#c8a96e,#e8c88a)":p.rank===2?"linear-gradient(135deg,#c8d8f0,#8aa0c0)":p.rank===3?"linear-gradient(135deg,#c8956e,#d8a87e)":"rgba(180,210,255,0.07)",fontWeight:800,fontSize:12,color:p.rank<=3?"#04080f":"rgba(180,210,255,0.4)"}}>
                    {p.rank}
                  </div>
                </td>
                <td style={{padding:"14px"}}><div style={{fontWeight:700,fontSize:14}}>{p.country} {p.name}</div></td>
                <td style={{padding:"14px"}}><div style={{color:"rgba(180,210,255,0.45)",fontSize:12}}>{p.partnerCountry} {p.partner}</div></td>
                <td style={{padding:"14px"}}><div style={{fontWeight:700,fontSize:14,color:p.rank<=2?GOLD:"rgba(200,216,240,0.8)"}}>{p.points}</div></td>
                <td style={{padding:"14px",textAlign:"center"}}><span style={{fontSize:14,color:p.change==="▲"?"#4caf50":p.change==="▼"?"#ef5350":"rgba(180,210,255,0.3)"}}>{p.change}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{marginTop:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <p style={{color:"rgba(180,210,255,0.25)",fontSize:11}}>{t.rankNote}</p>
        <a href="https://www.padelfip.com/ranking/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <button className="btn-silver" style={{padding:"9px 22px",fontSize:12,letterSpacing:1.5}}>{t.rankBtn}</button>
        </a>
      </div>
    </div>
  );
}


// ─── CLUB MODAL ───────────────────────────────────────────────────────────────
function ClubModal({ club, onClose }) {
  if (!club) return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:0}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(4,8,15,0.85)",backdropFilter:"blur(8px)"}}/>
      <div style={{position:"relative",background:"rgba(8,18,36,0.98)",border:`1px solid ${BORDER}`,borderRadius:"12px 12px 0 0",padding:"28px 24px 40px",maxWidth:560,width:"100%",maxHeight:"85vh",overflowY:"auto",zIndex:1}} onClick={e=>e.stopPropagation()}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#c8d8f0,#4a6a90,transparent)"}}/>
        {/* Handle bar */}
        <div style={{width:40,height:4,background:"rgba(180,210,255,0.2)",borderRadius:2,margin:"0 auto 20px"}}/>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:40}}>{club.image}</span>
            <div>
              <h2 style={{fontWeight:800,fontSize:18,color:SILVER,marginBottom:4}}>{club.name}</h2>
              <p style={{color:DIM,fontSize:13}}>📍 {club.city} · {club.courts} מגרשים · {club.indoor?"🏠 מקורה":"☀️ חוץ"}</p>
            </div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:DIM,fontSize:22,cursor:"pointer",padding:"0 4px"}}>✕</button>
        </div>

        {/* Location & Hours */}
        {club.location && <p style={{color:DIM,fontSize:13,marginBottom:6}}>🗺️ {club.location}</p>}
        {club.hours && <p style={{color:"#5a7a98",fontSize:13,marginBottom:12}}>🕐 {club.hours}</p>}

        {/* Description */}
        {club.description && (
          <div style={{background:"rgba(180,210,255,0.04)",border:`1px solid ${BORDER}`,borderRadius:3,padding:"12px 16px",marginBottom:16}}>
            <p style={{color:"#94b0cc",fontSize:14,lineHeight:1.7}}>{club.description}</p>
          </div>
        )}

        {/* All Features */}
        <div style={{marginBottom:20}}>
          <h4 style={{fontSize:11,color:DIM,letterSpacing:2,marginBottom:10}}>מה כולל המועדון</h4>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {club.features.map((f,i) => (
              <span key={i} style={{background:"rgba(100,140,200,0.07)",color:"#6a8ab0",fontSize:12,padding:"5px 12px",borderRadius:3,border:`1px solid ${BORDER}`}}>{f}</span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{marginBottom:20}}>
          {club.phone && <a href={"tel:"+club.phone} style={{color:SILVER,fontSize:14,textDecoration:"none",display:"block",marginBottom:6}}>📞 {club.phone}</a>}
          {club.phoneDirect && <a href={"tel:"+club.phoneDirect} style={{color:DIM,fontSize:13,textDecoration:"none",display:"block",marginBottom:6}}>📱 {club.phoneDirect}</a>}
          {club.email && <a href={"mailto:"+club.email} style={{color:DIM,fontSize:13,textDecoration:"none",display:"block",marginBottom:6}}>✉️ {club.email}</a>}
        </div>

        {/* Booking button */}
        {club.bookingType==="lazuz" ? (
          <a href={club.bookingUrl} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none"}}>
            <button className="btn-silver" style={{width:"100%",padding:"12px 0",fontSize:14,letterSpacing:1.5}}>🗓 הזמן מגרש — Lazuz</button>
          </a>
        ) : club.bookingType==="whatsapp" ? (
          <a href={"https://wa.me/972"+club.bookingUrl} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none"}}>
            <button style={{width:"100%",padding:"12px 0",fontSize:14,background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",border:"none",borderRadius:3,fontWeight:700,cursor:"pointer",fontFamily:"Heebo,sans-serif"}}>💬 הזמן ב-WhatsApp</button>
          </a>
        ) : (
          <div style={{display:"flex",gap:10}}>
            {club.phone && <a href={"tel:"+club.phone} style={{flex:1,textDecoration:"none"}}><button className="btn-silver" style={{width:"100%",padding:"12px 0",fontSize:13}}>📞 התקשר</button></a>}
            {club.phoneDirect && <a href={"https://wa.me/972"+club.phoneDirect.replace(/[-]/g,"")} target="_blank" rel="noopener noreferrer" style={{flex:1,textDecoration:"none"}}><button style={{width:"100%",padding:"12px 0",fontSize:13,background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",border:"none",borderRadius:3,fontWeight:700,cursor:"pointer",fontFamily:"Heebo,sans-serif"}}>💬 WhatsApp</button></a>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LIVE NEWS ─────────────────────────────────────────────────────────────────
function LiveNewsSection({t}) {
  const [tab, setTab] = useState("israel");
  const [worldNews, setWorldNews] = useState(WORLD_NEWS);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWorldNews = async () => {
    setLoading(true);
    const msgs = t.loading;
    let mi = 0; setLoadingMsg(msgs[0]);
    const iv = setInterval(() => { mi=(mi+1)%msgs.length; setLoadingMsg(msgs[mi]); }, 1800);
    try {
      // RSS feeds from padel sites via rss2json API (free, no CORS issues)
      const feeds = [
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.padelfip.com%2Ffeed%2F&count=3",
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.padelmagazine.fr%2Ffeed%2F&count=3",
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.padelnuestro.com%2Fblog%2Ffeed%2F&count=3",
      ];

      const apiRes = await fetch("/api/news"); const apiData = await apiRes.json(); if(apiData.articles?.length>0){setWorldNews(apiData.articles);setLastUpdated(new Date().toLocaleTimeString("he-IL"));} const results = [];
      
      const articles = [];
      results.forEach(r => {
        if(r.status==="fulfilled" && r.value.items) {
          r.value.items.forEach(item => {
            if(item.title && item.link) {
              // Calculate time ago
              const pub = new Date(item.pubDate || Date.now());
              const diff = Date.now() - pub.getTime();
              const hours = Math.floor(diff/3600000);
              const days = Math.floor(hours/24);
              const timeStr = days > 0 ? `לפני ${days} ימים` : hours > 0 ? `לפני ${hours} שעות` : "לפני זמן קצר";
              
              articles.push({
                title: item.title,
                time: timeStr,
                category: "עולם",
                hot: hours < 24,
                url: item.link,
              });
            }
          });
        }
      });

      if(articles.length > 0) {
        // Sort by recency (hot first)
        articles.sort((a,b) => b.hot - a.hot);
        setWorldNews(articles.slice(0,6));
        setLastUpdated(new Date().toLocaleTimeString("he-IL"));
      } else {
        // Fallback: use GNews API with padel keyword
        const gnews = await fetch("https://gnews.io/api/v4/search?q=padel&lang=en&max=6&apikey=demo");
        if(gnews.ok) {
          const gdata = await gnews.json();
          if(gdata.articles && gdata.articles.length > 0) {
            const mapped = gdata.articles.map(a => ({
              title: a.title,
              time: "לאחרונה",
              category: "עולם",
              hot: false,
              url: a.url,
            }));
            setWorldNews(mapped);
            setLastUpdated(new Date().toLocaleTimeString("he-IL"));
          }
        }
      }
    } catch(e){ console.error("Fetch error:", e); }
    clearInterval(iv); setLoadingMsg(""); setLoading(false);
  };

  const activeNews = tab==="israel" ? ISRAEL_NEWS : worldNews;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28,flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",gap:0,border:`1px solid ${BORDER}`,borderRadius:3,overflow:"hidden"}}>
          {[{id:"israel",label:t.t_israel},{id:"world",label:t.t_world}].map(tb => (
            <button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"9px 22px",border:"none",cursor:"pointer",fontFamily:"Heebo,sans-serif",fontWeight:700,fontSize:13,background:tab===tb.id?"linear-gradient(135deg,#c8d8f0,#8aa0c0)":"transparent",color:tab===tb.id?"#04080f":DIM,transition:"all .2s",letterSpacing:.5}}>{tb.label}</button>
          ))}
        </div>
        {tab==="world" && (
          <button onClick={fetchWorldNews} disabled={loading} style={{background:loading?"rgba(180,210,255,0.05)":"linear-gradient(135deg,#c8d8f0,#8aa0c0)",color:loading?DIM:"#04080f",border:loading?`1px solid ${BORDER}`:"none",padding:"9px 20px",borderRadius:3,fontWeight:700,fontSize:12,cursor:loading?"not-allowed":"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1,display:"flex",alignItems:"center",gap:6,transition:"all .2s"}}>
            <span style={{display:"inline-block",width:12,height:12,border:"2px solid rgba(4,8,15,0.3)",borderTopColor:loading?DIM:"#04080f",borderRadius:"50%",animation:loading?"spin 0.8s linear infinite":"none"}} />
            {loading ? loadingMsg : t.refresh}
          </button>
        )}
        {tab==="world" && lastUpdated && <span style={{color:DIM,fontSize:11}}>{t.updatedAt} {lastUpdated}</span>}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {activeNews[0] && (
          <Card3D style={{gridColumn:"1 / -1"}}>
            <a href={activeNews[0].url||"#"} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",color:"inherit"}}>
              <Glass style={{borderRadius:3,padding:32,cursor:"pointer",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,#c8d8f0,#4a6a90,transparent)"}} />
                <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
                  {activeNews[0].hot && <SBadge style={{color:"#ef4444",borderColor:"rgba(239,68,68,0.3)",background:"rgba(239,68,68,0.07)"}}>🔥 HOT</SBadge>}
                  <SBadge>{activeNews[0].category}</SBadge>
                  {tab==="world"&&lastUpdated&&<SBadge style={{color:"#4caf50",borderColor:"rgba(76,175,80,0.3)",background:"rgba(76,175,80,0.07)"}}>● LIVE</SBadge>}
                </div>
                <h3 style={{fontWeight:800,fontSize:20,marginBottom:12,lineHeight:1.4}}>{activeNews[0].title}</h3>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <p style={{color:DIM,fontSize:13}}>⏱ {activeNews[0].time}</p>
                  <span style={{color:SILVER,fontSize:12}}>{t.readMore}</span>
                </div>
              </Glass>
            </a>
          </Card3D>
        )}
        {activeNews.slice(1).map((n,i) => (
          <Card3D key={i}>
            <a href={n.url||"#"} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",color:"inherit"}}>
              <Glass style={{borderRadius:3,padding:20,cursor:"pointer",height:"100%"}}>
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  {n.hot&&<SBadge style={{color:"#ef4444",borderColor:"rgba(239,68,68,.3)",background:"rgba(239,68,68,.07)",fontSize:10}}>🔥</SBadge>}
                  <SBadge style={{fontSize:10}}>{n.category}</SBadge>
                </div>
                <h3 style={{fontWeight:600,fontSize:14,marginBottom:8,lineHeight:1.5}}>{n.title}</h3>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <p style={{color:DIM,fontSize:12}}>⏱ {n.time}</p>
                  <span style={{color:SILVER,fontSize:11}}>{t.readMore}</span>
                </div>
              </Glass>
            </a>
          </Card3D>
        ))}
        {tab==="israel" && (
          <Card3D style={{gridColumn:"1 / -1"}}>
            <Glass style={{borderRadius:3,padding:20,textAlign:"center",border:`1px dashed ${BORDER}`}}>
              <p style={{color:DIM,fontSize:13,fontWeight:300}}>{t.addArticle}</p>
            </Glass>
          </Card3D>
        )}
      </div>
    </div>
  );
}


// ─── IMAGE GALLERY ────────────────────────────────────────────────────────────
function ImageGallery({ images }) {
  const [current, setCurrent] = useState(0);
  return (
    <div style={{width:"100%",position:"relative",borderRadius:3,overflow:"hidden",border:`1px solid ${BORDER}`}}>
      {/* Portrait frame - fixed height */}
      <div style={{width:"100%",height:280,position:"relative",background:"rgba(4,8,15,0.5)"}}>
        <img
          src={images[current]}
          alt="מוצר"
          style={{
            width:"100%",height:"100%",
            objectFit:"contain",
            objectPosition:"center",
            display:"block",
          }}
        />
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button onClick={()=>setCurrent((current-1+images.length)%images.length)}
              style={{position:"absolute",top:"50%",left:8,transform:"translateY(-50%)",background:"rgba(4,8,15,0.75)",border:`1px solid ${BORDER}`,color:"#c8d8f0",borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2}}>‹</button>
            <button onClick={()=>setCurrent((current+1)%images.length)}
              style={{position:"absolute",top:"50%",right:8,transform:"translateY(-50%)",background:"rgba(4,8,15,0.75)",border:`1px solid ${BORDER}`,color:"#c8d8f0",borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2}}>›</button>
          </>
        )}
        {/* Image counter */}
        {images.length > 1 && (
          <div style={{position:"absolute",bottom:8,right:8,background:"rgba(4,8,15,0.75)",color:"#c8d8f0",fontSize:11,padding:"2px 8px",borderRadius:50,border:`1px solid ${BORDER}`}}>
            {current+1}/{images.length}
          </div>
        )}
      </div>
      {/* Dots */}
      {images.length > 1 && (
        <div style={{display:"flex",justifyContent:"center",gap:6,padding:"8px 0",background:"rgba(4,8,15,0.5)"}}>
          {images.map((_,i) => (
            <button key={i} onClick={()=>setCurrent(i)} style={{
              width:7,height:7,borderRadius:"50%",border:"none",cursor:"pointer",padding:0,
              background:i===current?"#c8d8f0":"rgba(180,210,255,0.25)",transition:"background .2s"
            }}/>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MARKETPLACE ───────────────────────────────────────────────────────────────
function MarketplaceSection({t}) {
  const [activeCat, setActiveCat] = useState("הכל");
  const [activeCond, setActiveCond] = useState("הכל");
  const filtered = MARKETPLACE.filter(item => (activeCat==="הכל"||item.category===activeCat) && (activeCond==="הכל"||item.condition===activeCond));
  return (
    <div>
      <div style={{marginBottom:32}}>
        {/* קטגוריה */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:10}}>
          <span style={{color:DIM,fontSize:11,letterSpacing:1,minWidth:50}}>סוג:</span>
          {CATEGORIES_HE.map((cat,i) => (
            <button key={i} onClick={()=>setActiveCat(cat)} style={{padding:"6px 16px",fontSize:12,cursor:"pointer",fontFamily:"Heebo,sans-serif",fontWeight:600,borderRadius:3,background:activeCat===cat?"linear-gradient(135deg,#c8d8f0,#8aa0c0)":"transparent",color:activeCat===cat?"#04080f":SILVER,border:activeCat===cat?"none":`1px solid ${BORDER}`,transition:"all .2s"}}>{cat}</button>
          ))}
        </div>
        {/* מצב */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{color:DIM,fontSize:11,letterSpacing:1,minWidth:50}}>מצב:</span>
          {CONDITIONS_HE.map((cond,i) => (
            <button key={i} onClick={()=>setActiveCond(cond)} style={{padding:"6px 16px",fontSize:12,cursor:"pointer",fontFamily:"Heebo,sans-serif",fontWeight:600,borderRadius:3,background:activeCond===cond?"rgba(180,210,255,0.15)":"transparent",color:activeCond===cond?SILVER:DIM,border:activeCond===cond?`1px solid ${BORDER}`:"1px solid transparent",transition:"all .2s"}}>{cond}</button>
          ))}
          <span style={{color:DIM,fontSize:12,marginRight:"auto"}}>{filtered.length} {t.itemsCount}</span>
        </div>
      </div>
      {filtered.length===0 ? (
        <div style={{textAlign:"center",padding:"60px 0",color:DIM}}><p style={{fontSize:16}}>{t.noItems}</p></div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16,alignItems:"start"}}>
          {filtered.map(item => (
            <Card3D key={item.id}>
              <Glass style={{borderRadius:3,padding:0,cursor:"pointer",display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:item.condition==="חדש"?"linear-gradient(90deg,#c8a96e,#e8c88a)":item.condition==="כמו חדש"?"linear-gradient(90deg,#c8d8f0,#8aa0c0)":"linear-gradient(90deg,#4a6a90,transparent)"}} />
                <div style={{display:"flex",justifyContent:"center",marginBottom:12,marginTop:6}}>
                  {item.images && item.images.length > 0 ? (
                    <ImageGallery images={item.images} />
                  ) : (
                    <BallSVG size={44}/>
                  )}
                </div>
                <div style={{padding:"16px 16px 0"}}>
                <SBadge style={{alignSelf:"flex-start",marginBottom:8,fontSize:10,color:item.condition==="חדש"?GOLD:item.condition==="כמו חדש"?SILVER:DIM,background:item.condition==="חדש"?"rgba(200,169,110,0.12)":"rgba(180,210,255,0.07)"}}>{item.condition}</SBadge>
                <h3 style={{fontWeight:700,fontSize:14,marginBottom:4,lineHeight:1.3}}>{item.title}</h3>
                <p style={{color:DIM,fontSize:11,marginBottom:8}}>📍 {item.area} · {item.category}</p>
                <p style={{color:"#4a6a88",fontSize:11,marginBottom:12,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{item.desc}</p>
                </div>
                <div style={{padding:"0 16px 16px",marginTop:"auto"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <span style={{color:SILVER,fontWeight:900,fontSize:22}}>₪{item.price}</span>
                    <span style={{color:DIM,fontSize:11}}>👤 {item.seller}</span>
                  </div>
                  {item.phone ? (
                    <a href={"https://wa.me/972"+item.phone.replace(/^0/,"")} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none"}}>
                      <button style={{width:"100%",padding:"9px 0",fontSize:12,background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",border:"none",borderRadius:3,fontWeight:700,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1}}>💬 WhatsApp</button>
                    </a>
                  ) : (
                    <button style={{width:"100%",padding:"9px 0",fontSize:12,background:"rgba(180,210,255,0.07)",color:DIM,border:`1px solid ${BORDER}`,borderRadius:3,fontWeight:600,cursor:"default",fontFamily:"Heebo,sans-serif"}}>📞 צור קשר בקרוב</button>
                  )}
                </div>
              </Glass>
            </Card3D>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({type,onClose,lang}) {
  if(!type) return null;
  const isEn = lang==="en";
  const CONTENT = {
    about:{
      title: isEn?"About Padel One":"אודות Padel One",
      body:(
        <div style={{lineHeight:1.9,fontWeight:300}}>
          <p style={{fontSize:17,color:SILVER,marginBottom:24,fontWeight:500}}>
            {isEn?'"Padel is not a trend — it\'s a real sport with a big future in Israel."':'"הפאדל הוא לא טרנד — זה ענף ספורט אמיתי, רציני, עם עתיד גדול בישראל."'}
          </p>
          <p style={{marginBottom:16}}>{isEn?"Padel One was born from a genuine love of padel and one simple goal: ":"Padel One נולד מתוך אהבה אמיתית לפאדל וממטרה אחת פשוטה: "}<strong style={{color:SILVER}}>{isEn?"to make padel accessible to all Israelis.":"להנגיש את הפאדל לכל הישראלים."}</strong></p>
          <p style={{marginBottom:16}}>{isEn?"Israel is waking up to padel — 150+ courts, dozens of clubs, thousands of players. But information was scattered. There was no single place to find everything.":"ישראל מתעוררת לפאדל — 150+ מגרשים, עשרות מועדונים, אלפי שחקנים. אבל המידע היה מפוזר."}</p>
          <p style={{color:"#6a8ab0",fontSize:14}}>{isEn?"Padel One is the digital home of the Israeli padel community. Built for players, clubs, coaches and everyone who loves padel. 🎾":"הבית הדיגיטלי של קהילת הפאדל הישראלית. בנוי בשביל השחקנים, המועדונים, המאמנים וכל מי שאוהב פאדל. 🎾"}</p>
        </div>
      )
    },
    terms:{
      title: isEn?"Terms of Use":"תנאי שימוש",
      body:(
        <div style={{lineHeight:1.9,fontWeight:300,fontSize:14,color:"#6a8ab0"}}>
          {isEn?<>
            <p style={{marginBottom:12}}>By using Padel One you agree to the following:</p>
            <p style={{marginBottom:8}}>• Information is provided as a community service and may change without notice.</p>
            <p style={{marginBottom:8}}>• Padel One is not responsible for the accuracy of club, tournament or equipment listings.</p>
            <p style={{marginBottom:8}}>• 2nd hand listings are the responsibility of the sellers. Padel One is not a party to transactions.</p>
            <p style={{marginBottom:8}}>• Content may not be copied without explicit permission.</p>
          </>:<>
            <p style={{marginBottom:12}}>השימוש באתר Padel One מהווה הסכמה לתנאים הבאים:</p>
            <p style={{marginBottom:8}}>• המידע מסופק כשירות לקהילה ועשוי להשתנות ללא הודעה מוקדמת.</p>
            <p style={{marginBottom:8}}>• Padel One אינו אחראי לנכונות פרטי המועדונים, התחרויות או הציוד.</p>
            <p style={{marginBottom:8}}>• מודעות יד-2 הן באחריות המפרסמים בלבד.</p>
            <p style={{marginBottom:8}}>• אין להעתיק תוכן ללא אישור מפורש.</p>
          </>}
          <p style={{marginTop:16,fontSize:12}}>© 2026 Padel One | padelone.co.il</p>
        </div>
      )
    },
    advertise:{
      title: isEn?"Advertise on Padel One":"פרסום ב-Padel One",
      body:(
        <div style={{lineHeight:1.9,fontWeight:300}}>
          <p style={{marginBottom:20,color:SILVER,fontSize:16,fontWeight:500}}>{isEn?"Reach thousands of Israeli padel players 🎾":"הגיעו לאלפי שחקני פאדל בישראל 🎾"}</p>
          <div style={{display:"grid",gap:12,marginBottom:24}}>
            {[
              {title:isEn?"Premium Club":"מועדון פרמיום",desc:isEn?"Top listing + gold badge + extended info":"הופעה בולטת ראשונה + תג זהב + פרטים מורחבים"},
              {title:isEn?"Sponsored Tournament":"תחרות ממומנת",desc:isEn?"Your tournament in the calendar with sponsored tag":"פרסום תחרות בלוח עם תג ממומן"},
              {title:isEn?"Travel Package":"נסיעה לחול",desc:isEn?"Padel package on the travel page":"חבילת פאדל בדף הנסיעות"},
              {title:isEn?"Community Banner":"באנר קהילתי",desc:isEn?"Homepage banner for events & products":"באנר בדף הבית לאירועים ומוצרים"},
            ].map((p,i) => (
              <div key={i} style={{background:"rgba(180,210,255,0.04)",border:`1px solid ${BORDER}`,borderRadius:3,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{p.title}</div><div style={{color:"#6a8ab0",fontSize:12}}>{p.desc}</div></div>
                <div style={{color:GOLD,fontWeight:700,fontSize:13,marginRight:16,whiteSpace:"nowrap"}}>{isEn?"Soon":"בקרוב"}</div>
              </div>
            ))}
          </div>
          <p style={{color:"#6a8ab0",fontSize:13,marginBottom:20}}>{isEn?"For details — contact us on WhatsApp.":"לפרטים — צרו קשר בוואטסאפ."}</p>
          <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button style={{background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",border:"none",padding:"12px 28px",borderRadius:3,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1}}>
              {isEn?"💬 Contact for Advertising":"💬 צור קשר לפרסום"}
            </button>
          </a>
        </div>
      )
    }
  };
  const c = CONTENT[type]; if(!c) return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(4,8,15,0.85)",backdropFilter:"blur(8px)"}} />
      <div style={{position:"relative",background:"rgba(8,18,36,0.98)",border:`1px solid rgba(120,160,220,0.2)`,borderRadius:4,padding:36,maxWidth:560,width:"100%",maxHeight:"85vh",overflowY:"auto",zIndex:1}} onClick={e=>e.stopPropagation()}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#c8d8f0,#4a6a90,transparent)"}} />
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
          <h2 style={{fontWeight:800,fontSize:22,color:SILVER}}>{c.title}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",color:DIM,fontSize:22,cursor:"pointer",lineHeight:1,padding:"0 4px"}}>✕</button>
        </div>
        {c.body}
      </div>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
const NAV_IDS = ["home","tournaments","clubs","marketplace","world","rankings","travel","news"];

export default function PadelIsrael() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedClub, setSelectedClub] = useState(null);
  const [lang, setLang] = useState("he");
  const t = LANG[lang];

  const scrollTo = (id) => { setActive(id); setMenuOpen(false); document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#04080f}::-webkit-scrollbar-thumb{background:#4a6a90;border-radius:3px}
    .nl{cursor:pointer;padding:8px 18px;font-weight:500;font-size:14px;transition:all .25s;color:#6a84a0;letter-spacing:.5px}
    .nl:hover{color:#c8d8f0}.nl.on{color:#c8d8f0;border-bottom:2px solid #c8d8f0}
    .btn-silver{background:linear-gradient(135deg,#c8d8f0,#8aa0c0,#dde8f8);color:#04080f;border:none;padding:11px 28px;border-radius:3px;font-weight:700;font-size:13px;cursor:pointer;transition:all .22s;font-family:Heebo,sans-serif;letter-spacing:1.5px}
    .btn-silver:hover{opacity:.85;box-shadow:0 8px 28px rgba(180,210,255,.22);transform:translateY(-1px)}
    .btn-silver:disabled{opacity:.35;cursor:default;transform:none}
    .btn-ghost{background:transparent;color:#c8d8f0;border:1px solid rgba(180,210,255,.3);padding:9px 24px;border-radius:3px;font-weight:500;font-size:13px;cursor:pointer;transition:all .22s;font-family:Heebo,sans-serif;letter-spacing:.5px}
    .btn-ghost:hover{background:rgba(180,210,255,.07);border-color:#c8d8f0}
    .btn-ghost-w{background:transparent;color:#c8d8f0;border:1px solid rgba(180,210,255,.25);padding:9px 0;border-radius:3px;font-weight:500;font-size:13px;cursor:pointer;transition:all .22s;font-family:Heebo,sans-serif;width:100%}
    .btn-ghost-w:hover{background:rgba(180,210,255,.07)}
    .stag{display:inline-block;background:rgba(180,210,255,.07);color:#c8d8f0;font-size:10px;font-weight:700;padding:4px 16px;border-radius:2px;letter-spacing:3.5px;margin-bottom:14px;border:1px solid rgba(180,210,255,.18)}
    .sline{width:44px;height:2px;background:linear-gradient(90deg,#c8d8f0,#4a6a90,transparent);margin:12px 0 28px}
    .pulse{animation:pulse 2.5s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}
    @keyframes sglow{0%,100%{text-shadow:0 0 18px rgba(200,216,240,.55),0 0 35px rgba(180,200,240,.25)}50%{text-shadow:0 0 28px rgba(200,216,240,.95),0 0 65px rgba(180,205,245,.5)}}
    .sglow{animation:sglow 4s ease-in-out infinite}
    .inp{background:rgba(8,18,36,.85);border:1px solid rgba(120,160,220,.2);color:#e8edf8;padding:11px 20px;border-radius:3px;font-size:14px;outline:none;font-family:Heebo,sans-serif;width:100%;max-width:400px;transition:border .2s}
    .inp:focus{border-color:rgba(200,216,240,.45)}.inp::placeholder{color:#2e4a68}
    .g2{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
    .g3{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px}
    @media(max-width:768px){.hm{display:none!important}}
  `;

  return (
    <div dir={t.dir} style={{fontFamily:"Heebo,sans-serif",background:BG,color:"#e8edf8",minHeight:"100vh",overflowX:"hidden",position:"relative"}}>
      <style>{css}</style>
      <PadelCourtCanvas />
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",background:"radial-gradient(ellipse 120% 80% at 50% 40%,transparent 15%,rgba(4,8,15,.78) 100%)"}} />
      <Modal type={modal} onClose={()=>setModal(null)} lang={lang} />
      <ClubModal club={selectedClub} onClose={()=>setSelectedClub(null)} />

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:64,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 32px",background:"rgba(4,8,15,.9)",backdropFilter:"blur(24px)",borderBottom:`1px solid ${BORDER}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>scrollTo("home")}>
          <BallSVG size={34}/>
          <div>
            <div style={{fontWeight:900,fontSize:17,color:SILVER,letterSpacing:2.5,lineHeight:1}}>PADEL·ONE</div>
            <div style={{fontSize:8,color:DIM,letterSpacing:3,marginTop:2}}>padelone.co.il</div>
          </div>
        </div>
        <div className="hm" style={{display:"flex",gap:4}}>
          {NAV_IDS.map(id => (
            <span key={id} className={`nl${active===id?" on":""}`} onClick={()=>scrollTo(id)} style={{position:"relative",display:"inline-flex",alignItems:"center",gap:5}}>
              {t.nav[id]||id}
              {id==="marketplace" && <span style={{background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:50}}>{lang==="he"?"חדש":"New"}</span>}
            </span>
          ))}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{display:"flex",border:`1px solid ${BORDER}`,borderRadius:3,overflow:"hidden"}}>
            {["he","en"].map(l => (
              <button key={l} onClick={()=>setLang(l)} style={{padding:"6px 12px",border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"Heebo,sans-serif",letterSpacing:1,background:lang===l?"linear-gradient(135deg,#c8d8f0,#8aa0c0)":"transparent",color:lang===l?"#04080f":DIM,transition:"all .2s"}}>{l==="he"?"עב":"EN"}</button>
            ))}
          </div>
          <button className="btn-silver hm" style={{padding:"8px 22px",fontSize:11,letterSpacing:2}}>{t.join}</button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{position:"fixed",top:64,left:0,right:0,zIndex:99,background:"rgba(4,8,15,.98)",padding:20,borderBottom:`1px solid ${BORDER}`}}>
          {NAV_IDS.map(id => <div key={id} onClick={()=>scrollTo(id)} style={{padding:"13px 0",borderBottom:`1px solid ${BORDER}`,color:active===id?SILVER:DIM,fontWeight:600,cursor:"pointer",fontSize:15}}>{t.nav[id]||id}</div>)}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",paddingTop:80,position:"relative",zIndex:1,overflow:"hidden",textAlign:"center"}}>
        <div style={{position:"absolute",top:"15%",right:"5%",width:500,height:500,background:"radial-gradient(circle,rgba(20,50,110,0.16) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}} />
        <div style={{maxWidth:1200,margin:"0 auto",padding:"60px 32px",width:"100%"}}>
          <div style={{maxWidth:660,margin:"0 auto",textAlign:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(180,210,255,0.06)",border:`1px solid ${BORDER}`,borderRadius:2,padding:"7px 18px",marginBottom:28}}>
              <span className="pulse" style={{width:6,height:6,background:SILVER,borderRadius:"50%",display:"inline-block"}} />
              <span style={{color:SILVER,fontSize:11,fontWeight:600,letterSpacing:2}}>PADEL·ONE — {t.badge}</span>
            </div>
            <h1 style={{fontWeight:900,fontSize:"clamp(44px,8vw,80px)",lineHeight:1.04,marginBottom:6,color:"#ffffff"}}>{t.h1a}</h1>
            <h1 className="sglow" style={{fontWeight:900,fontSize:"clamp(44px,8vw,80px)",color:SILVER,letterSpacing:-1,marginBottom:6}}>{t.h1b}</h1>
            <h1 style={{fontWeight:900,fontSize:"clamp(44px,8vw,80px)",lineHeight:1.04,marginBottom:32,color:"#ffffff"}}>{t.h1c}</h1>
            <p style={{color:DIM,fontSize:17,lineHeight:1.8,marginBottom:40,fontWeight:300}}>{t.sub}</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24,justifyContent:"center"}}>
              <button className="btn-silver" onClick={()=>scrollTo("tournaments")}>{t.btn1}</button>
              <button className="btn-ghost" onClick={()=>scrollTo("clubs")}>{t.btn2}</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,maxWidth:480,margin:"0 auto"}}>
              {[{label:t.btn1,icon:"🏆",id:"tournaments",silver:true},{label:t.btn2,icon:"📍",id:"clubs"},{label:t.btn3,icon:"ball",id:"marketplace"},{label:t.btn4,icon:"🌍",id:"world"},{label:t.btn5,icon:"✈️",id:"travel"},{label:t.btn6,icon:"📰",id:"news"}].map((b,i) => (
                <button key={i} onClick={()=>scrollTo(b.id)} style={{background:b.silver?"linear-gradient(135deg,rgba(200,216,240,0.12),rgba(140,160,200,0.08))":"rgba(180,210,255,0.04)",border:b.silver?"1px solid rgba(200,216,240,0.35)":`1px solid ${BORDER}`,color:SILVER,padding:"14px 10px",borderRadius:3,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"Heebo,sans-serif",transition:"all .2s",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(180,210,255,0.1)";e.currentTarget.style.borderColor="rgba(200,216,240,0.4)";e.currentTarget.style.transform="translateY(-2px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background=b.silver?"linear-gradient(135deg,rgba(200,216,240,0.12),rgba(140,160,200,0.08))":"rgba(180,210,255,0.04)";e.currentTarget.style.borderColor=b.silver?"rgba(200,216,240,0.35)":BORDER;e.currentTarget.style.transform="translateY(0)"}}>
                  {b.icon==="ball"?<BallSVG size={20}/>:<span style={{fontSize:20}}>{b.icon}</span>}
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:0,marginTop:80,border:`1px solid ${BORDER}`,borderRadius:3,overflow:"hidden"}}>
            {STATS_VALS.map((v,i) => (
              <Card3D key={i}>
                <Glass style={{padding:"24px 18px",textAlign:"center",borderRight:i<3?`1px solid ${BORDER}`:"none"}}>
                  <div style={{fontSize:24,marginBottom:10}}>{["👤","🏟️","🏆","📍"][i]}</div>
                  <div style={{fontWeight:900,fontSize:24,color:SILVER}}>{v}</div>
                  <div style={{color:DIM,fontSize:11,marginTop:5,letterSpacing:.5}}>{t.stats[i]}</div>
                </Glass>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* TOURNAMENTS */}
      <section id="tournaments" style={{padding:"100px 32px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <span className="stag">TOURNAMENTS</span>
        <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:900,color:"#ffffff"}}>{t.s_tournaments}</h2>
        <div className="sline"/>
        <div style={{textAlign:"center",padding:"80px 24px"}}>
          <div style={{fontSize:64,marginBottom:24}}>🏆</div>
          <h3 style={{fontWeight:800,fontSize:28,marginBottom:12,color:SILVER}}>{t.comingSoon}</h3>
          <p style={{color:DIM,fontSize:16,maxWidth:480,margin:"0 auto 24px",lineHeight:1.7,fontWeight:300}}>
            {lang==="he" ? "תחרויות פאדל ישראליות — בקרוב! רוצה לפרסם תחרות? צור קשר." : "Israeli padel tournaments — coming soon! Want to publish a tournament? Contact us."}
          </p>
          <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button style={{background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",border:"none",padding:"12px 28px",borderRadius:3,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1}}>
              {lang==="he" ? "💬 פרסם תחרות" : "💬 Publish Tournament"}
            </button>
          </a>
        </div>
      </section>

      {/* CLUBS */}  {/* CLUBS */}
      <section id="clubs" style={{padding:"100px 0",background:"rgba(4,8,15,0.72)",borderTop:`1px solid ${BORDER}`,position:"relative",zIndex:1}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 32px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:44,flexWrap:"wrap",gap:20}}>
            <div>
              <span className="stag">CLUBS</span>
              <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:900,color:"#ffffff"}}>{t.s_clubs}</h2>
              <div className="sline"/>
            </div>
            <input className="inp" placeholder={t.searchClub} value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div className="g3">
            {CLUBS.filter(c=>!search||c.name.includes(search)||c.city.includes(search)).map((c,i) => (
              <Card3D key={i}>
                <Glass style={{borderRadius:3,padding:20,height:"100%",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <span style={{fontSize:36}}>{c.image}</span>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                      {c.verified&&<SBadge>{t.verified}</SBadge>}
                      {c.note&&<SBadge style={{color:"#88aade"}}>{c.note}</SBadge>}
                      <span style={{color:DIM,fontSize:12}}>{c.indoor?t.indoor:t.outdoor}</span>
                    </div>
                  </div>
                  <h3 style={{fontWeight:700,fontSize:15,marginBottom:4}}>{c.name}</h3>
                  <p style={{color:DIM,fontSize:12,marginBottom:5}}>📍 {c.city} · {c.courts} {t.courts}</p>
                  {c.location&&<p style={{color:DIM,fontSize:11,marginBottom:5}}>🗺️ {c.location}</p>}
                  {c.hours&&<p style={{color:"#4a6a88",fontSize:11,marginBottom:8}}>🕐 {c.hours}</p>}
                  {c.description&&<p style={{color:"#5a7a98",fontSize:11,marginBottom:11,lineHeight:1.6,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{c.description}</p>}
                  {c.phone&&<a href={"tel:"+c.phone} style={{color:SILVER,fontSize:12,textDecoration:"none",display:"block",marginBottom:3}}>📞 {c.phone}</a>}
                  {c.phoneDirect&&<a href={"tel:"+c.phoneDirect} style={{color:DIM,fontSize:11,textDecoration:"none",display:"block",marginBottom:10}}>📱 {c.phoneDirect}</a>}
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
                    {c.features.slice(0,4).map((f,j) => <span key={j} style={{background:"rgba(100,140,200,0.07)",color:"#5a7aaa",fontSize:10,padding:"3px 8px",borderRadius:2,border:`1px solid ${BORDER}`}}>{f}</span>)}
                    {c.features.length>4&&(
                      <span onClick={()=>setSelectedClub(c)} style={{color:SILVER,fontSize:10,padding:"3px 10px",borderRadius:2,border:`1px solid rgba(200,216,240,0.3)`,cursor:"pointer",background:"rgba(180,210,255,0.07)",fontWeight:600}}>
                        +{c.features.length-4} {t.moreFeatures} ›
                      </span>
                    )}
                  </div>
                  <div style={{marginTop:"auto"}}>
                    {c.bookingType==="lazuz"?(
                      <a href={c.bookingUrl} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none"}}>
                        <button className="btn-silver" style={{width:"100%",padding:"9px 0",fontSize:12,letterSpacing:1.5}}>{t.bookLazuz}</button>
                      </a>
                    ):c.bookingType==="whatsapp"?(
                      <a href={"https://wa.me/972"+c.bookingUrl} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none"}}>
                        <button style={{width:"100%",padding:"9px 0",fontSize:12,background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",border:"none",borderRadius:3,fontWeight:700,cursor:"pointer",fontFamily:"Heebo,sans-serif"}}>{t.bookWA}</button>
                      </a>
                    ):(
                      <button className="btn-ghost-w" onClick={()=>setSelectedClub(c)}>{t.details}</button>
                    )}
                  </div>
                </Glass>
              </Card3D>
            ))}
          </div>
        </div>

        {/* כפתור פרסום מועדון */}
        <div style={{marginTop:48,padding:"32px 24px",background:"rgba(180,210,255,0.03)",border:`1px solid ${BORDER}`,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20}}>
          <div>
            <h3 style={{fontWeight:700,fontSize:18,marginBottom:6,color:SILVER}}>🏟️ {lang==="en" ? "Want to list your club?" : "רוצה לפרסם את המועדון שלך?"}</h3>
            <p style={{color:DIM,fontSize:13,fontWeight:300,maxWidth:400}}>
              {lang==="en"
                ? "Basic listing is free. Premium placement available — contact us for details."
                : "רישום בסיסי חינמי. אפשרות לפרסום פרמיום בתשלום — צור קשר לפרטים."}
            </p>
            <div style={{display:"flex",gap:16,marginTop:10,flexWrap:"wrap"}}>
              <span style={{color:"#4caf50",fontSize:12}}>✓ {lang==="en"?"Free basic listing":"רישום בסיסי חינם"}</span>
              <span style={{color:GOLD,fontSize:12}}>★ {lang==="en"?"Premium — paid":"פרמיום — בתשלום"}</span>
            </div>
          </div>
          <a
            href="https://wa.me/972500000000"
            target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button style={{background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",border:"none",padding:"12px 28px",borderRadius:3,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1,whiteSpace:"nowrap"}}>
              💬 {lang==="en"?"Contact Us":"צור קשר בוואטסאפ"}
            </button>
          </a>
        </div>
      </section>

      {/* MARKETPLACE */}
      <section id="marketplace" style={{padding:"100px 32px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <span className="stag">MARKETPLACE</span>
        <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:900,display:"flex",alignItems:"center",gap:14}}>
          {t.s_marketplace} <BallSVG size={38}/>
        </h2>
        <div className="sline"/>
        <p style={{color:DIM,fontSize:15,marginBottom:32,fontWeight:300}}>{t.mktSub}</p>
        <MarketplaceSection t={t}/>
        <div style={{textAlign:"center",marginTop:48}}>
          <Glass style={{display:"inline-block",borderRadius:3,padding:"28px 48px",border:`1px solid ${BORDER}`}}>
            <div style={{marginBottom:12,display:"flex",justifyContent:"center"}}><BallSVG size={36}/></div>
            <h3 style={{fontWeight:700,fontSize:18,marginBottom:8}}>{t.sellTitle}</h3>
            <p style={{color:DIM,fontSize:13,marginBottom:20,fontWeight:300}}>{t.sellSub}</p>
            <button className="btn-silver" style={{padding:"11px 36px",letterSpacing:2}}>{t.sellBtn}</button>
          </Glass>
        </div>
      </section>

      {/* TRAVEL */}
      <section id="travel" style={{padding:"100px 0",background:"rgba(4,8,15,0.72)",borderTop:`1px solid ${BORDER}`,position:"relative",zIndex:1}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 32px"}}>
          <span className="stag">TRAVEL</span>
          <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:900,color:"#ffffff"}}>{t.s_travel}</h2>
          <div className="sline"/>
          <div style={{textAlign:"center",padding:"80px 24px"}}>
            <div style={{fontSize:64,marginBottom:24}}>✈️</div>
            <h3 style={{fontWeight:800,fontSize:28,marginBottom:12,color:SILVER}}>{t.comingSoon}</h3>
            <p style={{color:DIM,fontSize:16,maxWidth:480,margin:"0 auto 16px",lineHeight:1.7,fontWeight:300}}>{t.travelSub}</p>
            <p style={{color:DIM,fontSize:14,maxWidth:480,margin:"0 auto 32px",fontWeight:300}}>{t.travelContact}</p>
            <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
              <button style={{background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",border:"none",padding:"12px 28px",borderRadius:3,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1}}>{t.travelBtn}</button>
            </a>
          </div>
        </div>
      </section>

      {/* WORLD */}
      <section id="world" style={{padding:"100px 32px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <span className="stag">WORLD</span>
        <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:900,color:"#ffffff"}}>{t.s_world}</h2>
        <div className="sline"/>
        <p style={{color:DIM,fontSize:15,marginBottom:36,fontWeight:300}}>{t.worldSub}</p>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {WORLD_TOURNAMENTS.map((tr,i) => (
            <Card3D key={i}>
              <Glass style={{borderRadius:3,padding:"20px 24px",cursor:"pointer",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:tr.prize==="Major"?"linear-gradient(90deg,#c8a96e,#e8c88a,transparent)":tr.prize==="Finals"?"linear-gradient(90deg,#c8a0ff,#9060cc,transparent)":"linear-gradient(90deg,#c8d8f0,#8aa0c0,transparent)"}} />
                <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
                  <div style={{flexShrink:0}}>
                    {tr.status==="live"?(<span style={{display:"flex",alignItems:"center",gap:5,background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",color:"#ef4444",fontSize:11,fontWeight:800,padding:"4px 10px",borderRadius:2,letterSpacing:1}}><span className="pulse" style={{width:6,height:6,background:"#ef4444",borderRadius:"50%",display:"inline-block"}}/>LIVE</span>)
                    :tr.status==="done"?(<span style={{background:"rgba(100,140,100,0.1)",border:"1px solid rgba(100,180,100,0.2)",color:"#6ab06a",fontSize:10,fontWeight:600,padding:"4px 10px",borderRadius:2,letterSpacing:1}}>✓ הסתיים</span>)
                    :(<span style={{background:"rgba(180,210,255,0.07)",border:`1px solid ${BORDER}`,color:DIM,fontSize:10,fontWeight:600,padding:"4px 10px",borderRadius:2,letterSpacing:1}}>UPCOMING</span>)}
                  </div>
                  <div style={{flex:1,minWidth:180}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <h3 style={{fontWeight:700,fontSize:16}}>{tr.name}</h3>
                      <SBadge style={{fontSize:9,color:tr.prize==="Major"?GOLD:tr.prize==="Finals"?"#c8a0ff":SILVER,background:tr.prize==="Major"?"rgba(200,169,110,0.1)":"rgba(180,210,255,0.07)",borderColor:tr.prize==="Major"?"rgba(200,169,110,0.25)":BORDER}}>{tr.prize}</SBadge>
                    </div>
                    <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                      <span style={{color:DIM,fontSize:12}}>📍 {tr.location}</span>
                      <span style={{color:DIM,fontSize:12}}>📅 {tr.dates}</span>
                    </div>
                  </div>
                  <div className="hm" style={{flex:1,minWidth:160}}>
                    <div style={{color:DIM,fontSize:11,marginBottom:2}}>{t.rankPlayers}</div>
                    <div style={{color:SILVER,fontSize:12,fontWeight:500}}>{tr.players}</div>
                  </div>
                  <div style={{display:"flex",gap:8,flexShrink:0,overflowX:"scroll",WebkitOverflowScrolling:"touch",flexWrap:"nowrap",paddingBottom:2,maxWidth:"100%"}}>
                    <a href={tr.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",flexShrink:0}}>
                      <button style={{background:"rgba(255,50,50,0.12)",border:"1px solid rgba(255,50,50,0.35)",color:"#ff4444",padding:"7px 14px",borderRadius:3,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:.5,whiteSpace:"nowrap",flexShrink:0,display:"flex",alignItems:"center",gap:5}}>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><rect width="14" height="10" rx="2" fill="#ff4444"/><polygon points="5.5,2.5 5.5,7.5 10,5" fill="white"/></svg>
                        Red Bull TV
                      </button>
                    </a>
                    <a href="https://www.youtube.com/@PremierPadelOfficial" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",flexShrink:0}}>
                      <button style={{background:"rgba(255,0,0,0.1)",border:"1px solid rgba(255,0,0,0.3)",color:"#ff4444",padding:"7px 14px",borderRadius:3,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:.5,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4}}>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><rect width="14" height="10" rx="2" fill="#ff0000"/><polygon points="5.5,2.5 5.5,7.5 10,5" fill="white"/></svg>
                        YouTube
                      </button>
                    </a>
                  </div>
                </div>
              </Glass>
            </Card3D>
          ))}
        </div>
      </section>

      {/* RANKINGS */}
      <section id="rankings" style={{padding:"100px 32px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <span className="stag">RANKINGS</span>
        <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:900,color:"#ffffff"}}>{t.s_rankings}</h2>
        <div className="sline"/>
        <p style={{color:DIM,fontSize:14,marginBottom:28,fontWeight:300}}>עדכון: 1 יוני 2026 · מקור: FIP Official Rankings</p>
        <RankingsSection t={t}/>
      </section>

      {/* NEWS */}
      <section id="news" style={{padding:"100px 32px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <span className="stag">NEWS</span>
        <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:900,color:"#ffffff"}}>{t.s_news}</h2>
        <div className="sline"/>
        <LiveNewsSection t={t}/>
      </section>

      {/* FOOTER */}
      <footer style={{background:"rgba(2,5,10,0.96)",borderTop:`1px solid ${BORDER}`,padding:"50px 32px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:44,marginBottom:50}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <BallSVG size={30}/>
                <div>
                  <div style={{fontWeight:900,fontSize:16,color:SILVER,letterSpacing:2.5}}>PADEL·ONE</div>
                  <div style={{fontSize:8,color:DIM,letterSpacing:2.5}}>padelone.co.il</div>
                </div>
              </div>
              <p style={{color:DIM,fontSize:13,lineHeight:1.8,fontWeight:300}}>{t.ftagline}</p>
            </div>
            <div>
              <h4 style={{fontWeight:700,marginBottom:16,color:SILVER,fontSize:11,letterSpacing:2.5}}>{t.fnav}</h4>
              {[["tournaments","home"],["clubs","clubs"],["marketplace","marketplace"],["travel","travel"],["world","world"],["rankings","rankings"],["news","news"]].map(([key,id],j) => (
                <div key={j} onClick={()=>scrollTo(id)} style={{color:DIM,fontSize:13,marginBottom:11,cursor:"pointer",transition:"color .2s",fontWeight:300}}
                  onMouseEnter={e=>e.currentTarget.style.color=SILVER}
                  onMouseLeave={e=>e.currentTarget.style.color=DIM}>{t["fl_"+key]}</div>
              ))}
            </div>
            <div>
              <h4 style={{fontWeight:700,marginBottom:16,color:SILVER,fontSize:11,letterSpacing:2.5}}>{t.fcomm}</h4>
              {[{label:t.fl_tiktok,href:"https://www.tiktok.com/@onepadelil",blank:true},{label:t.fl_instagram,href:"https://www.instagram.com/onepadeil",blank:true},{label:"✉️ מייל",href:"mailto:onepadel24@gmail.com",blank:false},{label:t.fl_forum,href:"#",blank:true}].map((l,j) => (
                <a key={j} href={l.href} target={l.blank?"_blank":"_self"} rel="noopener noreferrer" style={{color:DIM,fontSize:13,marginBottom:11,cursor:"pointer",transition:"color .2s",fontWeight:300,display:"block",textDecoration:"none"}}
                  onMouseEnter={e=>e.currentTarget.style.color=SILVER}
                  onMouseLeave={e=>e.currentTarget.style.color=DIM}>{l.label}</a>
              ))}
            </div>
            <div>
              <h4 style={{fontWeight:700,marginBottom:16,color:SILVER,fontSize:11,letterSpacing:2.5}}>{t.fcomp}</h4>
              {[{label:t.fl_about,action:()=>setModal("about")},{label:"✉️ onepadel24@gmail.com",action:()=>{window.location.href="mailto:onepadel24@gmail.com"}},{label:t.fl_advertise,action:()=>setModal("advertise")},{label:t.fl_terms,action:()=>setModal("terms")}].map((l,j) => (
                <div key={j} onClick={l.action} style={{color:DIM,fontSize:13,marginBottom:11,cursor:"pointer",transition:"color .2s",fontWeight:300}}
                  onMouseEnter={e=>e.currentTarget.style.color=SILVER}
                  onMouseLeave={e=>e.currentTarget.style.color=DIM}>{l.label}</div>
              ))}
            </div>
          </div>
          <div style={{borderTop:`1px solid ${BORDER}`,paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <span style={{color:"#1e3050",fontSize:12}}>{t.fcopy}</span>
            <span style={{color:"#1e3050",fontSize:12}}>{t.fmade}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
