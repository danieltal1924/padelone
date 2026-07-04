import { useState, useEffect, useRef, useCallback } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const LANG = {
  he: {
    dir:"rtl", join:"הצטרף",
    nav:{ home:"בית", tournaments:"תחרויות", clubs:"מועדונים", marketplace:"יד 2", brands:"מותגים 🎾", world:"עולם 🌍", rankings:"דירוג 🏅", travel:"נסיעות", news:"חדשות" },
    badge:"הפלטפורמה המובילה לפאדל בישראל",
    h1a:"הכל על", h1b:"פאדל", h1c:"בישראל 🇮🇱",
    sub:"תחרויות, מועדונים, ציוד, נסיעות לחול וחדשות מהעולם — הכל במקום אחד.",
    btn1:"גלה תחרויות", btn2:"מצא מועדון", btn3:"יד-2", btn4:"🌍 תחרויות בחול", btn5:"✈️ נסיעות לחול", btn6:"📰 חדשות", btn7:"מותגים",
    stats:["שחקנים רשומים ב-ILPA","מגרשים בישראל","תחרויות בשנה","מועדונים פעילים"],
    s_tournaments:"תחרויות קרובות 🏆", s_clubs:"מועדוני פאדל 📍", s_marketplace:"ציוד יד 2", s_brands:"מותגי פאדל 🎾", brandsSub:"המותגים המובילים בעולם הפאדל — מחבטים, דגמים ומחירים. רוצים לפרסם את המותג שלכם? דברו איתנו.", brandFeatured:"מקודם", brandVisit:"לאתר המותג", brandAdTitle:"המותג שלכם כאן", brandAdSub:"רוצים להציג את המחבטים והציוד שלכם בפני קהילת הפאדל הישראלית?", brandAdBtn:"פרסמו את המותג",
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
    fl_tournaments:"תחרויות",fl_clubs:"מועדונים",fl_marketplace:"יד-2",fl_brands:"מותגים",fl_travel:"נסיעות לחול",fl_world:"עולם",fl_rankings:"דירוג",fl_news:"חדשות",
    fl_tiktok:"🎵 טיקטוק",fl_instagram:"📸 אינסטגרם",fl_whatsapp:"💬 וואטסאפ",fl_forum:"🌐 פורום",
    fl_about:"אודות",fl_contact:"צור קשר",fl_advertise:"פרסום באתר",fl_terms:"תנאי שימוש",
    fmade:"עשוי עם ❤️ לקהילת הפאדל הישראלית",
    about_title:"אודות Padel One", terms_title:"תנאי שימוש", adv_title:"פרסום ב-Padel One",
  },
  en: {
    dir:"ltr", join:"Join",
    nav:{ home:"Home", tournaments:"Tournaments", clubs:"Clubs", marketplace:"2nd Hand", brands:"Brands 🎾", world:"World 🌍", rankings:"Rankings 🏅", travel:"Travel", news:"News" },
    badge:"Israel's Leading Padel Platform",
    h1a:"Everything about", h1b:"Padel", h1c:"in Israel 🇮🇱",
    sub:"Tournaments, clubs, gear, trips abroad and world news — all in one place.",
    btn1:"Explore Tournaments", btn2:"Find a Club", btn3:"2nd Hand", btn4:"🌍 World Tournaments", btn5:"✈️ Travel Abroad", btn6:"📰 News", btn7:"Brands",
    stats:["Registered Players (ILPA)","Courts in Israel","Tournaments/Year","Active Clubs"],
    s_tournaments:"Upcoming Tournaments 🏆", s_clubs:"Padel Clubs 📍", s_marketplace:"2nd Hand Gear", s_brands:"Padel Brands 🎾", brandsSub:"The world's leading padel brands — rackets, models and prices. Want to feature your brand? Talk to us.", brandFeatured:"Sponsored", brandVisit:"Visit brand", brandAdTitle:"Your brand here", brandAdSub:"Want to showcase your rackets and gear to the Israeli padel community?", brandAdBtn:"Advertise your brand",
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
    fl_tournaments:"Tournaments",fl_clubs:"Clubs",fl_marketplace:"2nd Hand",fl_brands:"Brands",fl_travel:"Travel Abroad",fl_world:"World",fl_rankings:"Rankings",fl_news:"News",
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
        scene.fog = new THREE.FogExp2(0x04080f, 0.02);

        const camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 200);
        camera.position.set(0, 5, 16);
        camera.lookAt(0, 1.2, 0);

        scene.add(new THREE.AmbientLight(0x223355, 1.1));
        [[-6,9,4],[6,9,4],[0,9,-7]].forEach((p) => {
          const s = new THREE.SpotLight(0x88aaff, 2.2, 40, 0.6, 0.5);
          s.position.set(p[0], p[1], p[2]);
          scene.add(s);
        });

        // court line segments [x1,z1,x2,z2]
        const SEG = [
          [-5,-10,5,-10],[5,-10,5,10],[5,10,-5,10],[-5,10,-5,-10],
          [-5,0,5,0],[-5,3,5,3],[-5,-3,5,-3],[0,0,0,3],[0,0,0,-3]
        ];

        // ── hologram court (cyan wireframe) ──
        const holo = new THREE.Group();
        holo.rotation.x = -0.15;
        scene.add(holo);

        const wirePts = [];
        SEG.forEach((s) => wirePts.push(s[0],0,s[1], s[2],0,s[3]));
        const wireGeo = new THREE.BufferGeometry();
        wireGeo.setAttribute("position", new THREE.Float32BufferAttribute(wirePts, 3));
        holo.add(new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({color:0x35e0ff, transparent:true, opacity:0.95})));

        const walls = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(10,3,20)),
          new THREE.LineBasicMaterial({color:0x35e0ff, transparent:true, opacity:0.5})
        );
        walls.position.y = 1.5;
        holo.add(walls);

        const fgrid = new THREE.GridHelper(40, 20, 0x1c6a86, 0x123a52);
        fgrid.material.transparent = true;
        fgrid.material.opacity = 0.32;
        fgrid.position.y = -0.02;
        holo.add(fgrid);

        // ── glowing padel balls (site colors: silver-blue body, subtle gold seam) ──
        const balls = [];
        [[-2.6,-4],[2.4,4.5],[3.2,-6],[-3,7]].forEach((p) => {
          const g = new THREE.Group();
          g.add(new THREE.Mesh(
            new THREE.SphereGeometry(0.24,24,24),
            new THREE.MeshStandardMaterial({color:0xdce8ff,emissive:0x4a9eff,emissiveIntensity:1.2,roughness:0.4})
          ));
          const seam = new THREE.Mesh(
            new THREE.TorusGeometry(0.24,0.014,8,44),
            new THREE.MeshStandardMaterial({color:0xd8cba0,emissive:0xc8a96e,emissiveIntensity:0.22,transparent:true,opacity:0.45})
          );
          seam.rotation.x = Math.PI/2.4;
          g.add(seam);
          g.add(new THREE.PointLight(0x6fb0ff,0.8,5.5));
          g.userData = {base:1.6+Math.random()*0.8, amp:0.5+Math.random()*0.5, ph:Math.random()*6, spin:0.01+Math.random()*0.02};
          g.position.set(p[0], g.userData.base, p[1]);
          holo.add(g);
          balls.push(g);
        });

        let t2 = 0;
        const animate = () => {
          animId = requestAnimationFrame(animate);
          t2 += 0.006;
          holo.rotation.y = t2 * 0.14;
          balls.forEach((m) => {
            const u = m.userData;
            m.position.y = u.base + Math.abs(Math.sin(t2*1.05+u.ph))*u.amp*2;
            m.rotation.x += u.spin*0.6;
            m.rotation.y += u.spin*0.45;
          });
          camera.position.x = Math.sin(t2*0.1)*2;
          camera.position.y = 5 + Math.sin(t2*0.2)*0.4;
          camera.lookAt(0, 1.2, 0);
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
    <div ref={mountRef} className="cyber-bg" style={{
      position:"fixed", inset:0, zIndex:0, opacity:0.5, pointerEvents:"none",
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

// === אייקוני SVG בזהב (מחליפים אימוג'ים) ===
function Icon({ name, color = GOLD, size = 17 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", style: { verticalAlign: "-3px", marginInlineEnd: 7, flexShrink: 0 } };
  switch (name) {
    case "date":   return (<svg {...p}><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9.5h18" /><path d="M8 2.5v4M16 2.5v4" /></svg>);
    case "clock":  return (<svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3.2 1.8" /></svg>);
    case "pin":    return (<svg {...p}><path d="M12 21c4.5-4.2 7-7.3 7-10.5A7 7 0 0 0 5 10.5C5 13.7 7.5 16.8 12 21Z" /><circle cx="12" cy="10.5" r="2.5" /></svg>);
    case "racket": return (<svg {...p}><ellipse cx="11" cy="9" rx="6.3" ry="7" /><path d="M7.1 14.1 4.4 20.6" /><path d="M8.2 6.4 13.8 11.6M13.8 6.4 8.2 11.6" strokeWidth="1.1" opacity="0.55" /></svg>);
    case "trophy": return (<svg {...p}><path d="M8 4h8v4.2a4 4 0 0 1-8 0V4Z" /><path d="M8 5.2H5.4a2.6 2.6 0 0 0 2.6 3.1M16 5.2h2.6a2.6 2.6 0 0 1-2.6 3.1" /><path d="M12 12.3v3M9 20h6M10 20c0-2 .6-3 2-3s2 1 2 3" /></svg>);
    case "medal":  return (<svg {...p}><path d="M9 10.5 6 3.5M15 10.5 18 3.5M9.5 3.5h5" /><circle cx="12" cy="15.5" r="5" /><path d="M12 13.3v4.4M10.4 15.5h3.2" strokeWidth="1.3" /></svg>);
    default: return null;
  }
}

// === תווית דינמית בלבד (הכרטיס תמיד מוצג, בלי הסתרה) ===
const TOURNEY_DATE = "2026-06-30"; // ← תאריך הטורניר המוצג (YYYY-MM-DD)
function tourneyBadge(lang) {
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(TOURNEY_DATE); d.setHours(0,0,0,0);
  const diff = Math.round((d - today) / 86400000);
  if (diff === 0) return lang === "he" ? "🔴 מתקיים היום" : "🔴 Happening today";
  if (diff === 1) return lang === "he" ? "⏰ מחר" : "⏰ Tomorrow";
  return lang === "he" ? "🏆 טורניר קרוב" : "🏆 Upcoming Tournament";
}
const Glass = ({style,children}) => <div style={{background:SURF,border:`1px solid ${BORDER}`,backdropFilter:"blur(16px)",...style}}>{children}</div>;
const SBadge = ({children,style}) => <span style={{display:"inline-block",padding:"3px 12px",borderRadius:50,fontSize:11,fontWeight:700,background:"rgba(180,210,255,0.09)",color:SILVER,border:`1px solid ${BORDER}`,...style}}>{children}</span>;
const BallSVG = ({size=22}) => <svg width={size} height={size} viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="15" fill="none" stroke="#c8d8f0" strokeWidth="1.8"/><path d="M7 10 Q17 17 7 24" fill="none" stroke="#c8d8f0" strokeWidth="1.6" strokeLinecap="round"/><path d="M27 10 Q17 17 27 24" fill="none" stroke="#c8d8f0" strokeWidth="1.6" strokeLinecap="round"/></svg>;

// ─── DATA ──────────────────────────────────────────────────────────────────────
const STATS_VALS = ["750+","150+","בקרוב","35+"];
const TOURNEY_POSTER = "data:image/jpeg;base64,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";

const TOURNAMENTS = [
  {name:"פאדל במכביה ה-22",date:"30.6–14.7.2026",location:"ישראל",level:"בינלאומי",spots:0,icon:"🇮🇱"},
];
const CLUBS = [
  {
    name:"פאדל אינדור בני ציון",
    city:"בני ציון",region:"שרון",
    courts:3,
    indoor:true,
    image:"🏠",
    phoneDirect:"052-900-8785",
    phoneDirectLabel:"ראשי · וואטסאפ בלבד",
    email:"smashpointpadel@gmail.com",
    hours:"א׳–ה׳: 06:00–00:00 | ו׳–ש׳: 06:00–00:00",
    location:"שיזף 161, בני ציון",
    description:"המועדון Indoor היחיד בישראל! 2 מגרשי זוגות + מגרש יחידים ייחודי. בניהול עמית נאור — שחקן ומאמן נבחרת הטניס לשעבר.",
    features:["❄️ ממוזג","Indoor — ללא תלות במזג האוויר","מגרש יחידים ייחודי בישראל","מקלחות מפנקות","השכרת ציוד אוטומטית","חדר כושר","מים קרים","נגישות","תאורת LED","חניה","חנות","מקלחות","בקרת כניסה"],
    verified:true,
    bookingType:"lazuz",
    bookingUrl:"https://lazuz.co.il",
    note:"Indoor בלעדי 🏠",
  },
  {
    name:"Maccabim Padel",
    city:"מודיעין מכבים רעות",region:"מרכז",
    courts:6,
    indoor:false,
    image:"🎾",
    phone:"058-799-9992",
    hours:"א׳–ה׳: 07:00–02:00 | ו׳: 07:00–20:00 | ש׳: 07:00–02:00",
    location:"דרך ישראל פלד 1, מודיעין מכבים רעות",
    description:"מועדון פאדל במודיעין. חנות ציוד ומקרר שתייה במקום. השכרת מחבטים ₪15, מחבטי פרו ₪50. הזמנות דרך Lazuz או דרך המשרד.",
    features:["חנות ציוד","מקרר שתייה","השכרת מחבטים","מחבטי פרו","חניה"],
    instagram:"https://www.instagram.com/maccabim.padel",
    verified:true,
    bookingType:"lazuz",
    bookingUrl:"https://lazuz.co.il",
  },
  {name:"TERO X WILSON Padel Club",city:"תל אביב",region:"מרכז",courts:6,indoor:false,image:"⚡",phone:"+972-54-219-3030",hours:"א׳–ה׳, ש׳: 06:00–01:00 | ו׳: 06:00–20:00",description:"6 מגרשים ברמה אחרת מבית MejorSet – המגרשים הרשמיים של Premier Padel.",features:["קפיטריה","נגישות","LED","חניה","חנות","מקלחות","בקרת כניסה"],verified:true,bookingType:"lazuz",bookingUrl:"https://lazuz.co.il"},
  {name:"כפר המכביה – פאדל ישראל",city:"רמת גן",region:"מרכז",courts:8,indoor:false,image:"🏟️",phone:"073-218-7130",hours:"א׳–ה׳: 06:00–00:00 | ו׳: 06:00–כניסת שבת",features:["חנות ציוד","פינות ישיבה","משקאות"],verified:true,bookingType:"phone"},
  {name:"פאדליר – פארק לאומי רמת גן",city:"רמת גן",region:"מרכז",courts:6,indoor:false,image:"🌳",phone:"+972-52-475-8650",hours:"א׳–ה׳: 07:00–00:00 | ו׳: 07:00–19:00",location:"פארק לאומי, רמת גן",description:"Padeltach Panoramic + משטח Ondo Premier Padel + מצלמות PlaySight.",features:["קפיטריה","נגישות","LED","חניה","חנות","בקרת כניסה","PlaySight","Ondo"],verified:true,bookingType:"lazuz",bookingUrl:"https://lazuz.co.il"},
  {name:"מרכז הטניס – רמת השרון",city:"רמת השרון",region:"שרון",courts:24,indoor:false,image:"🏟️",phone:"054-555-0455",location:"רמת השרון",description:"24 מגרשים, 5 חמר, אצטדיון קנדה 4,000 מושבים. אחד מ-14 מרכזים.",features:["קפיטריה","נגישות","LED","חניה","חנות","מקלחות","שזירה","קיר אימון","חמר"],verified:true,note:"טניס ופאדל",bookingType:"lazuz",bookingUrl:"https://lazuz.co.il"},

  // ⬇️ מועדונים נוספים יתווספו בהמשך
];
const PADEX_RACKETS = [
  {name:"Imperium", img:"data:image/webp;base64,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"},
  {name:"Cygnus T800", img:"data:image/webp;base64,UklGRrZOAABXRUJQVlA4WAoAAAAQAAAA4AAAjwEAQUxQSDUOAAAB8If9n2k78v89X1W1Ts5J27Ztc2y0bdu2OepJ29bYtq1MrJNm0EoHu/B6/nGSk732Xrtq3rwiYgLQjOKcFRHBQq2xtrLvv/LyKxd59ZWjmbi4iaOvvPrKRV88YK01VjBURMQ5J8hEY62xWOR+xx17wnGPD04ZHJw+GNjZLw0ODk4bHHvSccce9zEs0g6V3maMdRi64n6fPHHMmLFjOPwwbG2LhuFGDnvM2DH/PuqTn14KQ8VZIz3KWAcAm+71oV/+ZioXHr33PmrSoexsXWjy3vvEhU/81W+v32tfDK2M6TmmMgA23+rxb8/h0BBCSimxIVNKKYTAhf7y24dstSQAY6SHiBMAa5/9LIfGGGNiI6c4lCT//viWawNw0iPEAdj7s0+T1BSDsuljSIlkenbHpQCxPUAssOylXyXJFNgzUyCZXjl/ADDScGKBZS+dSTIE9tpA8vVvvBew0mQWWPGil0gf2ZM1kPz20oBtLHFY5ZKpZFD2bI3KCWcvh0qayQC7jCeDsqdrJMefBZgmqrDsVWRM7PkpkC+sDts8FhtPYUjMwhQ5dhM40yzG4vSpDMzGwHglYJrEAHeSiRmZlF/YALY5HDa5i63EvAycti6qpujDlrMZmJ0tDq4L1wwWW82mZ4ZGvnojnHSfWNz8OiOzNJG3ouo6cbiXTMzU5HkrKtNd4nAfW8p89bwNkG4Si/vombWBD2zlTPeIw730zNzAKbBdIw730jN7F6Rb4KRLDO6hZwYn3gLXHVXfKHpmceDNcNIFFd7LFjPZ8yaYznPYYtBrLtHzJuc6zWCzV5iYzy2+D1VnWbv+K4zM6BTGrA3TURUeYotZnThxDWs6yOEGBmZ2i3ehr3MqnELP7Pa8AK5TjNtgakz5pYFHwXWIw1cYmOExjVvdSUc4e34MzPLAp9HXCRY7MjHTQ+touPqMXfH3MdsSJy4Jqc3hMgZme+TPlrFSk9iRr0bNN3qeA1eTwY8YmfEpDlortVjslyKzPvKrMHWIXW4BNe8Y046wNVS4NnlmfuC3+2qw2OedpLlHz0tQtc1Vv2Rk9muauYyRNlm8n5EFGHkxXJtc9bMUSkD11eWstMXi/YwswsiL4Npjf14KKU5fwZo2WPlgDCzEyItg22DwM6ZSSHFwBSuLJWalwaSlwMCLYBcPv2FkMWqavqyRxRAsMyNpOdDzQrjFqOzV6lmQSV9eGsMX4HVqSdDrcaiGZbHL3FgWkc87O7yB7zOwKJXz+iHDECyr1LJg8KeiGobDBSGwMBMHB0SGYb7M4lBNW8MswsiOVBZnSz+LvkVUeERDeST+bYSRhYhd7R+ayoOJJ8MtxGAzJhaoT8+jbyFWjk5FEvXny1sZ4vBjxhJh4uYwAIxsPiNpkcQ0SiwAi4MZWSb8PtxCfq+FomnqhsYA1v6BhcLIj8DC4RMhsFT0pzLkkywX/hYWIj9jKpWkY1YzIphYLgzcD06WnaQFoyfB4nh6FmviBAhOLZtxldgJ1HKhT8fAvVQ2PAKYWjSBt8lxrciCVc60NzCUzdTq0uLBjWXD9M6HPMs28GaWjl5ePLyyfK4un/NLR/mP0iniVD7/LVrLp4DnlE7g1eVzRflcmYrnChbPdU8xFk30p56noWSU03ArC2eqe9/bqWxmWUymFkzk10w1o2i8HgzzC6aS4RnAYerLRXX6moIzWTCJYyGy+etJC+avIoLRTMUSeDCcmPFFsx+cw/EaSiXqX5aw4rAfy4V/hYWYlf+lqVT0BLGAxd8YS4V7YohcooWS9B9rGgEsdmOhRP4IDoAxG09JWiRJrxILAA7fYSwTbgIzxMiHUyoR1ekbiiwEW7FIPJ9HH4aKXfbXGgtE08fELgQV7mIoEHJ1mIUZ2YAFGvmb5awsAuvEAvHpNlRYZOWepS8NJTeELMrhtBBKI/FvI2UYgiWVWhgtXoM+DNP1P8NQFqpzt4YZToXTgy8MTgBkOIIl5lOLwvNiU2FYxn2VsSQ0vrkr7LDQhxPUl0TiZCyuYPmZmgrC8wLjFgOCH2osBw1v7y12cSo5jK1ySBwDg8UVWW960mKIvFzsYsHgl0zFEBbshjZY87EQSiHqn5xFG637C2Mp8Ha0B5/TQtA0bTVj2rMtCyHoV+HQTrHL/SnGIkj8pNi2wGJ/phKI/FllpT3i+n/DVACBt6NCmyt8LoUC4Lw1Rdol2IgF6PV+qdA2s/R4TdkXeARc2+BwFEPuJf4TBjUaN54p84IeKK4OJ0cvCHmX+BcI6jVvqmZdi6eKq8eY5xhyTuO7W8PUhC3mBc24yIdhUbPFM4z5pnHOJrY+u/WsqNkW9T5Y1G7xJ435xt2lE+QsZluK/17JSn1il54YU6ZFHguLDrQ4nTHPYhyzpJNOELfMpJjyjMfCoSMdTmfMsaQTR1rpDLFLDjJlWOBxcOhQhzMY8itx0giDjjUjpzNlV+BxUnVOJWfQ51biJCfSOSIjplMzy+sJUqGDK5ypPq8SJ1p0+IhBTVnl9US4znI4iz6nUho/YKSzxCw1JWlGBZ4Iiw63OJshn1Ict5SVThO77JSYsinyRFh0vMXZDLkU47ilrXSe2OWmaMolngiLLrQ4Q2MeJf3Hkla6AX14QUMWqa4Lg640sjU1h4I+aSp0qZMvacigFDeG6RaLrTXmT9Cn4NC1Dl9hyJ4UN4HpHitbz0yaOVHvhUEXO5xMnzdJx8JKN8H2T44pa7weIw5d7XAqfc5Ejh+w0l1il/w2U75onPMxGHS5xWbzgmZL5EOo0PUVnmPMFQ3c2JruE7viv2PMlMQjYdGADscw5Unkv/qsNIHYgX+llCU+HgSHRjRYk6oZ4jkKFRrSySUa8yPpP1ezpilEMJ4pO1rxk3BoTGPWma+aGZH/hEGDGtwSfV5oGLehaRQ4/IMpKwI/AItGNXb7l7xmRNDbKoeGdXg/Qz4E/hQWjVuNuI8xFzS8vr01zWOw/LvUTGjxClRoYGt2nxs1CxIftBUa2WJPhhwI8UEYaSY4vEDf+yJfgxE0tFi8SN/rEufsZQwaWwxepO9tie/sBYMGFysv0veyxDl7oUKjizEv0veuxLl7o0LDi7Vfou9ViQv2QoXGN8Z8lb43Jc7fCxV6oBh8hb4XJc7bExV6ojH4CoP2nMC5e8KhR4rBV6jaYyLf3gcOPVPEfmwOU0/xfGwNWPRSg/fM1dA7dAEfAyx6a4V9Wwy9QsnHYQ16rcMOT9H3hsi3j4EIeq8FnmRLe0Dkm9vDCnqxtXiS1MaLfGVH9KFHi+Da2YwN5zlqKRj0botd3mBoMvUcBVj08j7s8hZDcyk5Ck7Q2yvs/Hempop84wuwgl5vgHvomyny9U1hBb3fWtxD30SRr22KClkoFvfSN0/ka1vAIRPF4V76pol8bSs4ZKM43EvfLJGvbwWHjBSLexmaJHHmlnDISnG4n7E5Upy1JRwyUyp8l74pNHAbOGSnNTu+y9QQng/AIUMtdp1DbYTIB2GRpQ67z/LaACE+CCd5gj4cxQXdFzgaTpCpUo18nqHblO/sYwyyVWCeY+wu9e/sBYuMNbJGUO2qyPejD1nrzEdT1C6K/LKrkLkWn2DonsCfwEruoMIPGbtFU9wTDtkrtvo5Y3eoDx+FRQY77NVqdUfgt+CQxQ6XstUNSX8wUEkeiVv+d4ydp620LSwyWbDc9JQ6LvBUOGSzw6n02mEp/mZpK/kEh3OYOky5AQwyWtzI0TF1VEhnWoesNlif2kmeD8Mhs525krFzUhqzljO5JYKpTB3T4sFwyG5jNnhXtUMCR8Ehy/8aU2domLiOMVlm3TimjvD8BByy3GCnt6J2QOQXXYVMd7ibsT6Nr60Bk2vGrv9W0Noi3weLbLf4BGNdMf1yRIWMr/r/xFhT4gdhc87iI2+neoL+pnKSc+jDI/S1RH4IFllvzcELYh0x/chYZH6Fu+jbpzp3JEzuOXMIY/sif18ZZL/g90zt0jDvw3D512fOZqtdiYMoQWM2m5G0bX/ukwIQYApTmzyPhc0/Kzt9Iya2WTnjQlcA/T9hZNuVHIDknrOfjaEGfa2/AKrHWAdnjcg/O+L5WtLc98HmXh/OYasGfXMtmMwTM/JHjO2jTxehyjw481n69ilnLwXJPMEKc6nto+c1qHLPLPlHphriggPgck+WHl1LaB2df1iJ1Bpa/Bz6sm/Zv8caNE3eQkzmQWBnUdvmeTIq5N9APReZEuivQeNbe8AWTeJEFGBdU03xTEEZzCiegfmFA+ueZiybCsfTl8655XNS6ThzB0PRCAZa1KKBdU8zFo2gfza1bIz7BmPZyIgxTGWD/reppTOrdIz7EmPZyIjRTEWDSi6mLxpB/wxq6cwun1nlM6N4BuYWDqwZxVA2FU6kL51zy+f40rH2YcaiEQzMoxZO/4zymfX/qZlZPm8XDpzcyFA2FU6hL51TS8fJdQxFI8Z9ibFsZMQEprJB/1vU0plVcBrf2h22aBKnoAD/R5QUz2SUjr68AqRo6HkuqtI5o3zO/D8ERpYPZhaOwQ5zUtlUuJWehXNVPWcVwTX1nFY+l0oJXFeHckY/JP8urmd2AdgRX2KsY1b+CVYitZaBAlhhbj0zbQnMr0XfXBOmaOh5ParSubp8rimA5eq6LvscrtXAWi7Nvgr30dcR+HDlsu+uepS6IiT3vlDX3BWyzzxY1/zcM1gnstYiWJe1rVg+S2ffejUxpMvhMm+NujzvR5V5O1DruivzKjzLUNcXs+/p8nmyvi9k35frIltrw+Scw9Up1qOctqpIzhmsxqCqbUs6L4xCH3Je3JI/J8kQ2xGDkuTeYrIOBtudNGbwDbZ7yuB9RwlyXwBrN77ys9TFSrdcebRxQA8AAFZQOCBaQAAAMNYAnQEq4QCQAT5tLpJGJCKhoSya+zCADYljbuFykQNenX0yz5M/Xf370mrS/nv7N5wOu/sXy0fIf179Ce5v/Qeo3+5eoBzhf+l6APNb/2X7O+439yPYA/lf/Z9Yz/iexb+8PsGfz//a///15vZ7/tv/g/cj21c1T/mv4zfrd8n/BP8V+P/nD5Gva37z+1/70f5r5Cf+Dw7dKf8/0V/lf3s/Zf4n9zPjv/N/838p/OX5g/7XqEfk39G/1H5h8Eduf+29Aj3O+uf8D/Lf5j9i/Ss/4fzD93PsZ/0PcB/mf9r/6X+I9wv994Yf4//cftl+QH2Cfzj+7/9X/I/lj9Mf9//7f9X/tP3O9yX5//oP/P/p/gI/l39a/4/+B/K755vZH+6H/n9zv9fP95+dSKYe3qjATkDMhhItf8XsiBl/7fb5TgfNrng2nEgY45sbcDJ916rWsNP9YTkvJmAAXl6tLs20aDFvrtQ+Oqc+H9UJpa4/5qQvz7qzEYjbq6uYjUg9kdinaC+24ZZa0+SP1MF5EaXFxHyvlpyTGFzx2BiKyo/UmA7JxprKHZAkwQLdv5YWfb4MCqEbLZZPGRyHfG5NttElY91zFILOCyGcs+fM8IttyVluQ3iSUQmJi1ezIm5+f93fEo+oKGylp6EvLOfV2MZ2WGvawNVl/N/ybyS4fRoINf7e99Vg0eP7nNfudcKeVg1QWUNn80RV9XuCQ6QnE3CxITb+kdadAJFIw8547aJmCQ7jOmPhmLnSfJ5jKLmeV+lIuidgBDpVmn516nuxz2P99c0xrFj8u6wFrJqg2SZErap+0KkIju4BT7WzskU+/QU+GL9fUJdNi+J6Bk0xda5bV+WeKWzRpMyK1QpcEUb63H56vHC+84A2MlzEkDQacT0KRmXhXVzRW6P+GwVkPMF/JmHE/uKzBq/uiOE85zq2M2QhRCJ/7jqHOIlq9aIKN8FU2AnU2bhUlLjhccgtpaOAbRuZ4EqRBcqfsk4KMecmnDFmkHvoBLdQMkHYB76xmfUNUSqKVkkM1TBuFI1RRCB26sm/uEcdAidQ3P6+uvCioSXrCOjGv0BjAI9pGxi5mVj6s9PF6/9tdldFjWlNo+DVKxUnvSQk9ox0AxVaBEi0vgXP3R8OgiK1qFuOgm5EUKXw4MUjNDGXFPCy8a6Vvki1luYiT6CDCj/nIR70xIl8SDBUiYIVKbDghGyVVSobAeXJ6xufE/y/i7nyd9b9eA3wzxSEeuk1ADNshMOHJNjpCGmLAFlqlxsh311Io2XFI3+WWxcew1p51N37qyyZR5LEm9yUapay2JSfOxGrvdE1y4paFxAIGXNFdnAT3rvCpDniVwPuqI0J9VLGZAqGmEfE4LI5s/rws4qsAeqrZV/UO1/8miCz+QscT4XosBr079K4AHUOUxN9QM3osRO0mLLrhp6uDjZ37D1sBuvWOexfOba04b68C/hA4F4V4VqIKIPWMtlP3lcO12isZQoONaRZfwl801hIBmBrewU+pZgUYJSHvupVIE9W4sghUd3AZvNSVd68A8nXw37Ra/a5AMDI6OLr1g+B2R734Wz2sdptWpPBLeSSEjJ/PrmOmDJCmAmZzDTwBR1VPLZPYnX1Syxk+cTj+9CRtWOm5UUz093H9vfbBavajAmUEYPRpBIGY+5hRHOtIWM3x/NsGOiGpu5uJRWhkb1mWg/WiLMnHFXqzcm2L3kBuFTmCt+5qIE2zmwvnTfrdt/KXOdMG3/EPK62YxiYrw/uWeKULXqxoYV8egqBRdiU0fw4yEoaes97BJkaEfB0YMT+AQqVT7/7e0hKp3DEwiAnB+mab/roLAAPwp3xlbmHuSN6gTMsDTgbh88Dl9oUbf87OrJr/+5wtcdBnv8g84/ksRyGVul0rV5us4nKi+eTZGlNYwm+wr6D/6Nbp79fOTGH2h1rs2XVq41zom2TsN5b61KDJWYT45jaMo+LanfGfD2Tw98RTWKzODeIPa6HKDi2+CuotBoB8DAsP2yjRveL+Q+IpqvWHYhuCqJdy4KXB6lKtSQ7q1aZO5sq3NYwm5+fW3WT+hfst2BKVLSzraroO0wklnGJD4iR5beVZZHCRL6J2TjckgMYkPiKYPOMMRw6220fjKAk76QimsYTsNmqMq7CTO69Vo6MhMBmumQwnYbSWcW/DtypxpC6HVkMbLBHwxleNUAFAxiQ+Ipqspg/gjD8TXd5G0S3zP9YgL7DaSzjEg1ttT52FFi/N8UtFRRFb4crGRu07kJZxiQ+IkyISzcNBtOVLwbz4dJD5ve7ZVrwAP7/kwSOSIk4fwPbOe/Vjjve2cgV3UGi44f8Le3QqjafQHnZlK+IovGLaO2AD6sK5WC44fI9UvJbx0gax6MPHMs2qM++8S7y/mnro9jf5zxaoseoUhi+xhfrvqaDmMeNOboOYTv5bmCXopMLVwav5FQeAxXHoBPlDy4RADF05ltBw03RwxuMvDPI7Fxzt1sjnn1pk/EJE72jSHbZxAiqNiQ2EAzne/0uCIr4gs6Fn50UuLygGzqjnqs7/B2jjTWerSIy4y60MmnsgchUkZU/u4OK/f4ZlOI2ps1EARfBIYPK1fSZjhrSWAKScd8STbRpuoyDeacw3mqdE3DibdwDy9iyCO5r16gKW1BOfQ5NnOuytuygbUGk/68YjTUzdJt+1cWEKSnQ+w1zYog4K/3TXYHjkMiab6zkIgo4J34N9iiMKRIlhfj0fe3W3KeE7e/c2YXNyWzPBgyq9PRQwHehBn5Up6ZmPXnyTcBMRzwbi44l2aHhiN/W2SPsCwqWfbS61dymbOGMdPAiVvScKBZY/BUZfwqIZQY7pEdSS6qriR/B4eaf/iMuy7jLzDWX0dVwr5P4DOtvA3wYL2UxqkiAPClIbi8po6P6jGkBbMvlcJGUKlIfw6T7rMv7xBh26EZOgbyhBFNumMEVtfzjM/dw4519S51bKdpdtR9hxYHtpkdpTni8FlNGiOrF5rZnml+nh9LsV7rU8SCGcgtmXzQXl6rHV9/jP2DiJD794tZG0v7KawsTy/vmsMBJpc6Cwj/5LuZVrHLuP//8LbLoSBHr12mO/aYarqUm6Uj90WzydudPjfcki2BTmF4nV0W7qpBv7L0f9FxklxJL3H7flqPeujM8/RHa8ZsfgTrbXe1W+pkPESJs4ErVNlGaMw647IhVdmDcMb86Voy6CxGzThC5QC1MgEFKA9hZAjUbG9i/FzudPU//GBhYQOTmmVoSsNwgkZlr8uwDmcZncDWOhsmjhbOVrcpU2JEpcVuqyKvKClVAWRRJoy8a/6x8QAYtv1WpmwOTdN/tMccytLIaxydlI/wd3+VVCMU/GnIZFUeBJmKW946EUqneolZWm6OhazTkfFwUJdi4eU3CJQkRKTUG1IuJxtZAaryy5Qy5GoBAtmD89g0u9YXCdYOzeHqNxHa1RfMNaktsSYpxD/tSdWvtGWlT4M+8mrQhmQASmOJ6984CczFXS2aW+Z5mrk+A60N4PQIo/uwFCmY1q6Q1epeGjZVf0PmCuUjv+k7dSg5WFf1XVgPRbaQZv1gdH7KNf2Ldki2NzlypeC61mIcIhgIWF1zhKaQgkDVi536aNQU8P9Ms99rsgo2TSeDUU6kb8wu+qACpIkIliWmjhM6Ajs/dEEIbTrM3W212BAkwvUL9cwuF6lwTMDK0JLJQTR3V+L658GqR+K5qv7sPohRSeo1OXwSvfVcn1SzMNLm7+bhDsxMYR7ZIzyh6l1HwLjryY/mU1+dn13sxHnuLt0UqJhk4eONaQwdSkc1usvcuTfI1jjTS6PchUU2hxxi0JzYPcogHcMwRu1WXS/U8klRylVVNReehd5id9M8HG3RAXq6fhLLSyLdlOY4G2rXhnTTzH9lf1lLYaDvDpKFGhawHSw4Sluy0KEJRkBwz4pdzK3mH76VqkcMYAJdrqTWIEu1kLy2rypTdNlu96ZIm/A3Szp/2woylsFJPisLS3zESNN21XR5dwz+xR9eiOVTqDlt8LRS2Pty0pQjfhqXIKvooZcVZIBGJP94J0t9gfAdr+/3bu6a1EwOCw3WGdCXQ/alJ5UYdu9G2kO3Pvh8th0h4FwZ+OoYzwyyZ8LhL84Xjk0WXluQjLlYX1WRLmGE5rdBWnHWgpdtl50MOfkZpcc5X1OmHvY2BFpTAaVkI+YqLBGlgR2dfTN+Q3erM3+1TVY0GDgLo8m2fWkUUVdVdHKyhj0ND0PP8p3m8wHlI6Pz9v+YO1+M+CjLC6zWNsd+uytwvCC4kMx3V1sUN2ZNPMzOHvpGuNLthZZY+XUEOrcgVtoE2zkucs9IJHuallmHBan+GnWg5i5HVxFO5D0XQvuheoufGK2I2du1dm6EJM6OrhN0GQNnunuKJTsCut/r3Ljomv7ZKkJpxnlTmEG2XeC2lBVrt+UIgFOci5ebDIZDA9MFGQZDeN6CuhGCScBFgNEKdjzWLmFr2wYnrYR3gfPiL/QK4AoNAqdcwwqjOIPUh1wbB8+fGitJYDLT66vkXd3Lw4n5f/wv7SZCzBTA5SVymkdA6g6dMRROmQLpV1Y0/2PlHjx0okSZovXC+N1nBCIPBZA6FpyLuf4+jq5Y2GtngfU0v/LMMuXqjyha6p6B4bjyXaAz5Jea4ve+OVcaXtDSUJo33B4Etoer4kEHxHWRIS9HlOSm6l3fQ1+YpgGQF0mvJZltWsmVuOtdpnnYZmGjNsyDP5jXOzmYp5Zj6UUYU6CrM1ywGhlAxfV7JV6e+TVQW2Z5KaiyFhbH7OMQx+YXnwuhjOYl4McNg8mT5Jh4P6sehH81+ZU/HnWDanm0qjUFpGE2xjUCOFettaMNP+mYCsgDe9avVwYkssJesP/pzkUqC5WNAeoVYDE0Ms4h235eJGHbz9Nf0bQv0QwSBGRS5cJ8Q3Jsz0tmzKD47CWI9ljhZfolOemk3oeY7H5dNvNSQVhDkfr2k554tG8lMy3XUGtq5uv6PgOhFqxBh7px6gcR1yEJXC2prfsWcKF0M9oLcs8QE0AlgAxeIQj3qIro6zxv+xlmEwWr6LOml0hiIgdgNnjB++TNhF8xHbvR3OT7yu4Xmk+FshF3oaSPZ39znNFbw3d0azQ+ToQEh9B/5E9fXbd8NXqyxalPLWway3POiZJfwixQi7oXiylIeKxLonZlQCBPVYyEOkwbW0PIgELUP8Foi2M9ad/gIdsY+TnTY+lKcKNmoV3jbNfQpafdQdPR86egIp7bCY7AidgIsqIXrYMXmMVZa+21xN7GJQFziiKpNldN9TKdKzJJYgCYMa+Tr4nNPbJIZdk5L4YbycMH9BDh4g820NKUtXHC49PRKtyLhb0omhIzactMrKRux9/NkwUTEQIu0Ez3HWaSkqUQ4gg9Myp9gLTk3b2d2NokORrSa7cb1G1ac1GG5xBeDp1D+f+n4QwFklf010yx5xX7m9OvLtexYBGzFOOY3eVbRzGBqN+CoPlf9vwGS3bXeJe58afECP7RJNMBrRIYNfY2V+nRY/Wf27n4WujzGRx46Ahs5eRsJPQYmb9ISwXgaafyM00NFU9kBt/93Ses7bN8+7bczd0dpAUrpI/gtVss3gVX9D2PnvaFQdh/KRHrt8zgSTgFyT/2EEV31J5ePYNIbhTxZXrtjS26QnfRspMIoYo58GK5I1rPBlrZ6Ovr1Da2js7uzLg65H5g1rbyIougfX/fznvoKEo/WT7Dgw9WDRCxTyzxd+FxUaLKIjr4MZmfOOXboP8R+a4LsWwUPvwpusIxsvieHCQEE08UuHwJZsZr3zDtjJkpyDeLqxexgAjlMo3Kla1rEJR9kqQ9VWdkBVrA+b0fvovXMDeVfitTGzOE9Unm7qj+igSqdIBonrKspur+hxLI2ydvncokM8DoVbpdWGd7OV2nqKPQNmZ1bm6N5f6TJsc/lD98uzVDNWtENh2/S7p1H8GtCvcqxnFCbxWPt//TS8SF0igN7K2coPEXS3HIbVMBeRPPIkXgLeO2sWMn8a/UKnKu/3r0ykMkCwojI7MIq91IW3Yl0tvHJi2BqmvDqvGmbVWePtzH4ikU2+jJvk5/84Lfaf1mZa0P0p/y45RL8z3SB+twC3DFTAL3EpG2okQU47bWeCpThiW2rE8ToAnyNJc0Neypy2YgIjOKcBkpBQKYeepgXZSKcmwTK/hzv6j85pBDi1RJQsOgPsymBQZgdRgVmos/V/7CHDOPDvrtuAOShIN9EiGkVmimdPWoALVHqeHy6klB52Mcz5B43OCz8u2eLM2Y2SyYJxY//y7lNbYPVfd+dXdYMNvTqeS9KDnQQRWC5JOwEs7djEw5izjmr7hVFfPbC9kFZm4y4rK/hqsVzLxLpJSMdlEH7FkUjbJUQCL3B957uiFt1nKZrdRlca21gtJ+/zBwLJNrS0GyYKWGPMb6isrtwg9hFZNgAtKfUrpKQmmyb5r1pvOO6Ck0kEJuLKov5DJnBMnOHwwUiEdxz+orix30cK8Ll/TQ3mqQlRu/2g8nWvm9HjMkPVRwE1dDjFLlUkNopOl+/Rl349Cc+GH8LUv+3+t0F95gFifL0iWnWYresiqGnVKQ68fgtmVr843ID0xIGFVQr7XhO701EP3hPkRwxSn98EfP7KgLXfP8Rf3djKGwCTgKw3cGFy/U7rjw7a8DYB44QqPVmUwmj7GUOPSbnL+rsSenz7gMANMfx1v+o2FI75kwstEjYPNTL1RsMCVnl4yWuM3g3GiWokXC6/Jf53pw9vAqgsoxEH2EVEwMK6BU9irbSDYSLD+jplZT46MgocBZ0mhBKxzzGoYuNNuCzh1+/3nd8jM41knlMhcmNRNp5t47r/nlyR9/LDJDqcZB+805zKSOnR2relapU6zZDFbiWnWm+eiNGrEePxUyAKVTcmus5EBlcRqhytM/uJYTfgEqUN88Rbs0tvzebLsN9WpXQep8zuRWG4vIJakXuFykK8w7dSiHNRRTvfseW65omWkfrc+reIsilRuRSZPana7H5WhJvy0Ibeqkztjys1U2VamJtLaJfsIMYmYZjJxItUHUrT6QeAnvjy5R6FqaSbrW8f563IxPt1PzB9n2m6o1D75ZZXNgoTx6frKZXU9ZGO9aX4K5ea0R3n8gwn460mfr4oQx3xrQkiSdrwgATV8Jl4zQOMJRkiKazSAi6G+MsQA1ih3+ckqKryZqb2k757jdAuXc7HGAVTbXWNE1O1O9/uMdrssMYHYnXv7V5QytwZcRrRtG1cjXkkz5HlcJX+syNUBDcugpdAeV+K0y+P74hl2SQlUBoJt1mVHL+I0TTDyvuK1Z6XIeGerNaa8bRi+JQw/Txvn0j2nfXF7XOgEpgC1bzfCGQYa3G/beUoMhnFjlE9JJc0CltTMlQA724RHD7NjQ11Oh+paVkKNH/9D5H4slhiqXuAugFYOacdqO91NLtwmezQriizTatxDKjXg5FEeKyLhwM9yrJJEVWNA5qpAJlw+kh7ql3O1H91PpACPOziVuzp+tyI6ICfjexXuVeTM0xnEptj4/mOQbrmR++/We/sGICtYgq18Sgnag8CJaaMNQtXL3lvR1c6exwSk+QW4jCk1pn61veKJWc4gdIVBEInWEZpjYlCShhWkDv9Pp7XK7cbZ/2vqdZUd2xxhrGarjFx8483YBFLQKPNi0sQq439pIn8gdyqaB/VUmSJX4I5l7PgUw0QgUMZEuvlMAKe95ZhlrT4HDlQCwF8vn9GEoPe+qX4Yfo3hwLvRPFq9zq4df1vnSwZXIy5f3Rm9psCRi1/9muHI5qXEAs3V/paCiTLq9//HBj3BFgvSMEcAKYJHf9HCjUDsLHrzlSpI8XI1sV+yn9/xZz77lGmVf1K/IB99hCowFCVQqKiTPkMdaxz5/6G/8QGFkdf6soznoS0ArjrVLdstDOqUsNJcq4x2q3Os8FsQQnpODa7tjAPJhb5Mw0WSi2s9hKsZ4m+lNAkqwhsk+ZNrdLGrS2GEbBMAJwEziyPLcCB58v+bH3Bj3Bky5FM/mABNP5rSRcWtX0JM4Bpw6rD0IynbjzEGr6tmKHwxvCAnVD9snj/IS37WcG4u1LabBeREcG9KxbdAoLUhftN4QpEWM6Ub1pjVtzh+d3QWsXGCKmEMKsw7sJxIGtPiPZo2EQB7pwE0Nu7SDqY95ykI6J2U6Wwz+L8PVv+g2uhpAWOMPRIwVK/ZCpjYsIpxwEf0hpKFUqc71Zk/9+UNOvfhWOFlkuZunjV4dDSs2raYPkc/V9QZX/DSPjj2RuAIAEsOaAuXtsoOY933LztczVWEMahSmPiLKpRq5Zf7Da7leJ2bo+Rr9q4H8D5E0wcD7z89VhOBo/x1jNx2gV2e/gTXUFwGf4gFUn3qsMvbmrfzN2xMJLZcTrq7WZF8yfLXjBvFMeoDl3P9gIkYhQv/24SFLOuoJOlMnPjdGmuIMObRsdv/M5TBZGrX6JO99JgxoH2BFP/QoEvVe2u8TgmjrrTjM4KiLF8mDPlYDhzckD12PIUWFR771R0zkksGgnsYtHtgmUZ5e7jqCAM51j1W50jz7sJ5KdsZg8gGJTRYoC955Z/b+Q6Ma9J6TpsXWWXukFoLLG9vXEugMl8bPVc7P4fcmlMpYyO8wMhIrY6GJAyNnh6L+q00lrS9UHeQN1/2CAv+qwDqi9e5rXlG9CQ/3NF1lrrKaKRqME3lZpA0RhU6gJuWgbF6xxVSYJ1DLd28NnyGbmUhUMUjuuvwDzViUBTQnzIS2hjO54Y4juzvzCS+xo9u/wq7v9zKmZVbAEpyk56VvsH4AHEqrE53P1eaeHo2IOEFkgfqb8UdC+sbz1kJBWG48SfxD/EUwucnSmfsyv/RT3ObbsUFO6JHysx1JUCnVSC53ajeIswYzANIlxfKjH1SGJKQU6vf2R7fdJiXLwoqGZzU102Maqw2ECdv35e2R3lL9Zb2cTkqYsXBSCaw/kcWpf0wYKl4X+UFM5srj+m6tSUMln7tXdkUJVbm71Y+RUulZaJW+UuH52148AyUfQzVkY1eGIq+5Wat9V5jRjrxNhI1zW6TRmyA3fA0w8ZbZJ1+3ao2L/alQ2SGhQJx7MR+mfjdO2LLjxSZ9uamiiHM+jmZRolVS0664IuPmGvtb22eexSnXtB9ke1oi3KIFvpJc/01aC5YmZ+fXDsx4CTDn/QUH13PzS0kz79g/nw5I50+71MFndQl8AHw076+HTNM+HXxBI9USYwVWDxFQNn87PB7gQIfzDpj2qvpeGCskIdkYPj/NtBE+rI8PnpyCzH+Hjj91GIIKkt1ZgeN00NqDC2b1Fo2VzCRwfvO3fQ7MIE/8IIFk6nzHwAAG7SfkDdJiCd5QhF17nIHY414EJGVJfQJDTm5RgSbbQd7Slt4rv+bm6wBn0pO4rQnHJyIGOmgeHcev10+mCHVPz3TqEpArHk5T0pLTySPMfknTeFYt9AQDg1ukcsczqkXij75GLYWgBUrhKMH2d3ZOtFdTvvs/n2EzYZqNxzvCe2x7by7OzKgZGSE7V3lByl3w821zaV0VZMJ993LRwMCzJa8iK1nkFkYquYeCHXdq4t1BSVmu4r4gF3vAjI5W9RD9bZsO9LmyH2grTwnG8V7cJQ88dSCN0xIeTRDyMmJ0erP+tb48cL0qad81/zNfyLX1cnRo4zzl+02wscKmiKySh7Qf360M91nuZHU6iD79dprG1g8f3vUqJKGjMDJGuJcEDYi9+hGB8g10nB9IRmJBUJjJrodRGrVSOqcq+yl+0FMRc9GU5pokk4/ipkzSGmheWo2effud3/d+5z0XjpMIXadzES/qA4m7M9rT3BSdicweMIHUA331Z0c2zd5bMi2w51//gEunIRc6q0zXfMXb/0hHh7kkYvzJaU/unJgpWsDyCdfLcUTO27kWEYZHsoDww3dCsUk0bKE6CjFR7CI2CvJUfogEW3d/UVy+5eR739ls/VTGg8u25gJ5UXX2GB7bsZb8DfC6GeHplGLrUWrrAua0XhCdPlbXGckOdSbYD3SLaVMQWDwy9EoX67zrkimG+/bQSvLtNLj/yABDQxEhOZjEk6RedivznWJBBJ0c/H+GvcA/RNFrCsUS4ZHg75wxez6tw1FtyglFwcVqtaBWPHRboXPNXnniwY9zjTppYhvcDdZoHjUKPehENMzhR14P3V4hIHLkZGwKC3g1C/4q2zeaILgy9TNtWQdevZ3r1goDtexg+FkAfqz+LmnPj+unoOpn2bc/w8JMli9PZra4nM/jfTvVgIJGMkZs+3fea+o8JOPo8GRrzYco8kGEyYfpIh5vBTxJf6QkgT5RuG1/pPA+mA2awe8+aRGYBqRcyPqdB3M2NJ0QO1GAVwr2xzMwdTdQvxW8sHuXMoRBz4FBkT1oQyXmKkB8T/Uu3ojOwzJXMhoyReiTx5MQI/+ZNmAa9xr+zb0widEXOo0YeEGS37UStw3aiUTKT97Vr5RqaygGGfUaVUylkvX2gJInfCYWAaXYuOmCvM2ksX07wWD2NU5RgzDFiQoX6QZ11gjMkoYW+c4ejwoMTEx/Z0b/vlEcMNdKzaucD1M+SensG3uDqY3tYWOiaSMJddnXpToeJujyAFMWgIK/dlnpgVoqnkKeraO0dLr6fCWNOzPtBSZtXgIbaUMvuuusPfpIWBG0QB/6t2RhcMwPKKGdTFcP3bl7R7wbelwdCUVZfktlUHOAhGyuMNIAeBZWkQWqXXf7TaCtLEDnoesnUdr0nJPMUZknPSzvkvuXuhi/P9scWm1venCowrBKz+Z+P2pg5P8Pqy9P7O94EercwSrO1qujNUjIfkSEaoENbG0KJ8f6mJghaDzBLiARtp+HdMFYXHKKWuqtWutFIesaqr5pgj7qBzjyWyTreIvfEpx5sNx/XinZhd51erbCmf5lJCyw5UeIH9Uy1SWTCHZE5USQthhgLhwMzZ3+BoeiEgOkRxhRteewBU9GLQ20a/qMN4S41FTxnngpnPx1iMOz9IA+XeclZ4b9K7giSwJRhdw6/ASshCZxwJMPRvahv7KovxgdiGo87HusQ89vZJZq/9ZiPY1YP+twIvKg4Vv6anlIcYbO20U+gEpo3hkcRmnukm60Dm9oIzEKxcWL354WV3e6UBvqO43t2kKEuAyE8o3l+rv8SCvlDCIGCvdmKRpieFbDZxwF9K5WIq/rhklri+hozRvs1MRNO+HhI8FSI2cKdGjT6oS+N5f+y6PoK/XoYN8pnQdzigA3iHubiho2h0yPctkJUDUP8Cl1DoWtZKD0T8LQBCpl7NijxJHQODChzScOJZyhlzfu6ZY4Z+VQ7IHZ5WPm/bjPyT+/JPSGnD3MGl4KoVrenG8+lleEeUxN5exytnkBGX8U1NX7QFg9KvpJXi10AeAJEl+4eqs0S8YMCJKAgpopTD05Osqsljj+u1NE25IgNbsxZ2R9PDA8t+vVtn5wWfQ3n9v9ILvgNf05UmlQRH+SBArdxN7DzsAhYV1+3BuiKIZaCxU3orZ0GXwilI1hHZAS+hKqCAMQ4bEsbge55uVGU4gfYau2pIPXcZkEkKq6Hfl8sRLhz1+69hGuTaX8/w9Au7tAsOpdcdx5I+W18++pDx131kdRGJ+bY/uUpGqkbf4+etN7t6XeEvZiuRx/+aOpHkzZo3cL4nF/cici9yuORsjVHc96emWZlWjUbm9cgGYJy9BwvrcNJYYqUzbrcf0f4V/ykib/yfg4XBPliK9ZsScqkY/+HiDs56fZKgRbU7ldz6gHVESPPG461Ad88P2f2p52MKjd1NOFVRvVQyTeb/MOW4bMOJsMQ9QQcUv0zZ9APcoeqbvDY4dwNxn46DcRyifYh3D6taIKDDCFIKHAuV4d2gglp14F9axvtKo5LcW5JVWtkdyirtzRAp4VHIX8QxZrZH7AOtqPyXe3DUiPGBEZt4WtivreUSUWpcfdDKFzO2OtSDf8ErLfgDX0dvgu/tFhbPjpVWxWD7EG0U0tFVtw777wwoh2EPCXSFNCrFhhnkaKjom7CdFaWSWPn8Z0BcQTftYBxbrMvdNFSU6Qe9TY+ehhoN3Jkd3skG34ziTBLK8XWy9NgCHXljYTckXI3tkmmFx0Tejkqx0LhBo6MzgeX/oiNfemFfQk+JLuOHDF4ViwuvLj66GP2haHwxWz/vKy0ghj5110tGg4io0CV7p03SLgRsIWrPauYbqqsRtB+88EJgVsEnNLTvG3riInQWTnXADeSuoy3yn/fq/Jd5qE9KfkPv/PgOWzsBD//SxZeCBOkCpYTkoenCVHKJ5FkyJFUjzDGFgNsWSjbVG64M6wAdgc7vj927R7gHtq2pt3nwZpwS6DFLfat1odBkFwsrqaXsrIrQ8stkd9bmMr66lEvdL8MFRYU6hSj9KdwwD6bwRb8YQOBBwlqbBYSC4dcsJqepzzWqWlG13nZFmSrkP5TzYZvnm26X+Id5SkYNWWgfOyN1HCO/UJO39ebbSt1Ir5qXISo1jj3bkpt0DOClXI3NRtj1EhA7g6t4agzLooLEZcvfKg3vhrW6RmiPdAJx/04xA3D9qCdSrWM69D6eoQ5FBXp+dSyeZhJ4VqYe4KQLn7L9MxXDNJmgYnuqidt4P6WGFyv95CkmYRrjz6PVRR+dwOTNBtM5KgtwzlUoDIa/eb5CVBs6uS9iStTnpnQ1N1WNeff/91AaH4jmWZJQqkh7g8FXNg3OTJV04wk7qN3FZ9lIWI+Rk+uRuehpF/Ponv21D8oOaQC6AfVr4HVnYfLqx7+rX0revz68JMizfvkbXmfoGPtO5X3VHKJui6KQUzX9wsLPMgWSOeOkOfKeVV9tN5Rv+9KP5dUleR71WeijjCGsfRjg89J7Nrc0AtoS+9jJZKNsGpVKE2QJT43Ss5FkfXU0GMbhgod8LNfK9Kad60nQKtid7WL1eRloYphfCAq7WPDrntX9fQLRLUSjBfghvna677XtVmKkTVtaOTbVX4+wlSWaHdmtEs6ncfNv+QxyahZboLfWFkeEDJa/Y1RlP/a/BpEPIJ8uctMvmtZvPPN9TNE2y1lgIc2uaJxslO5g+SaHmpvV+FXEifAmsWqPppegBOdyrsdkJK+P1QcOvKEMylWhtSwAfubCJlITzeiG947Fb15XUGo/Q3iD/ofR/zKFGawDuiP8lpUynyd8ti3tWfhmDkvVtnr/JSRMAcqG6fGF0mBuIxbhgvxR77OCTjzizp/JaqcC7pDGY5AcOAzAPip2XFMGzJhuEEizJEdpgA3Vd3WqWuxXsfhDj3OFwx++JM6cuAUNgM/fx+1W+SFvfiun9CXXTdF7nHmHV+Ih0hmzSsdrWsvcBUeduup8vgtrtVnLo3qOaNRn/Vv5boNixe41OI32SUBwWqvdWvW0DuQIYTKVST7YhwaY6+bFnqUy9vecrztAvRtXZrtCm23DyLYGs7utMkI37PhLr2WNTDvUQ13us6n++kUINJRlo8TCQpjv/NBgOsnQZbBNc2bVquzBjpexANKgcA4QUg1eXAXhgj15WXtiSn7JvvXrZ676nC76i0yPse9L43JpSAHKP/BNygIRvLEgGYBw7kzvGX8XqynJuTqaQQMAluUyP15gSllmplMiZZgIvROftcajc0KLkqkfDouTFsJESNN8xo4oin2/j5MP+Mowm+oueKKd/e0XyKBnc7j+HzACxEih1fVo325aMZ/tHwfp0kKGXnHIJ6X6fAQdmgGDM24qQW4BYhPmb9iUzijb6AzIizeW1EZ25/7ZL5wuC46e+DQf2olRfWQg5J/5MZWTCPzTMgmOi0OCavqam0kfWt89E+2qj7eIhowKXlO3izy0SV7luk/OtORLQA3CKMwznjw4J2HLcEf5uCMVBxnH71Jm0UTGpNnHRSvhcD+4VteyJuKpPlW7bWu/VJLTzM2uY5x034T7ZmpflhhJH5cEw+z5a/keHXyzZ/9EjbaGn3bSxZ8onhiaZURZQsKhwJ43UpVEeuA9Yod4dr/Sqqwhuz1UOuYGBawq5s1qa2pn0M9O68g3E8KszK7xcYJsqiC6oslR+CA/EC1osy+SccRfjQPkmUtAvPsJ3KOaYNlnfi7WRwJOP/ZFJ0U3qycmZ3AtWbqRY/tjP8diaOBDXf0LOQm0czjEErlWl+RCvT+5kcvgwbMbAmop3LZf2RmVaVen9hmut9oiz94y3Ygib7E0lNfPokff3lZRpTjBHqqGcuLnhMdCHftF4uc36idQHy7HKRQ7xKh9x/+T5+cVnvqOZXFBvgCFW/9vJQ7RV0tHm5E0mBdCdE9hVmEhl97lZYsT25WgjZKpVdt/ViJBf6la+CqFv/U6guIMDXWvoRRRkhAWUHADqRSGffNRy/vDw7n0SZBj9k/RvaV6+vdrFqXiYUK9skRTfbzJcrOFO6yGGtG0vG1uZAuqZcip/uDGqUo1NOSo6LX0aXzZfUw4lDbzOgpsJmdK2QuqUasebCuMKHY8vBHt97lMvM0D0QnYx8sSlEcKunl4wUDMMS9plY2nRLD6TwyFsCRabszoSaubrH/BKdO7rtcRPoAFeS62rPYJ2L1Sp9mYitLZruqP/A1F1zK9BZuYs4EcD5s1vxMvitWL/QQBAmpyh81dNvsXAIpuARi7SsaRo5LFhyMrIN7HMH8DHl+oHsd4BxxJY9SPzs/gJuF4Qv60NgWhuYnSwqgp0jtfIUOehf/x6HhVXeGSRyi3anVJewd71OVx45JyOD9EGt+dggJVhLKwto6Hv36jMMA85f6dete3JapJTw8pG4RXRMolnvvzpP5HRySaVPVcNk96GkoFNEFBsDrvgY8ifeZBSf/6EI4afAW08BZgNc6B3ti4sJq3wrlCM4at2Wk2bA6hWjJvJZEm95uGDDbQg1B+NL7I5/0G4BL6Ei/FFE2WFGcavUmpPapVej47xb+Aip0KI2/PeG9zlhYZVorJKIqc4dRuKMlGuaHtBnY1iNYFgUWQNwPNvuXIjntOQm//7q6A6N3YWN/OImxVuj2dTksEsGQ7uOzLpGirYXdonsHnBlNaZb8creeDa178aTHdHMtgEMhYwZzbjvIgJoKtvPDIVLTfpR//aQiwccRWfJfKalk62FfBwSP16jxDfftWvmjninVm1PZNZxvW/+tdl25+G98mgGLzgpf+YKPnfp03Vamymy3u8Afjp8nmf4FTXwRQCQSxpeNxnY/BMwWgTRP/i63GyHZ7xAnNdQR1wSG/8GeGhha02b5XFpAWcTjMmmwQRCPDSkD9oEn+631dXSQ4Mh+lFYCsNNKl/Z+sG1HxrocdvA0NE+TZ1IFUvgx3+W7jSlzQ6MLodFm2H0m7OhLWEYOplYGO4m+XkozVykOSawTnd4j9cZBcT4iy+AU4Hc8GCrFuqqaXo2se+XHzMSK7ecSWLjbW4cZYDMdz7jEhJCxnFbb0QMgEnecjgLATasc2voht0GGDvT+3MfpAWEOt2+c/nRHDZw/xkg7iuR/Io96BY3V2RKOD37uFjcgxoXNLvUUJUsTAZUgkbxlSzaYx6scX8gq0CkdN6JGyO7+oSFjsr5D60F/oZvaNc825ScJ2JmwFG9KcDPyJI64726VxiYscbQ22R+UBt6QfP6267ySyjO/kNXV2FgYdQzWOWrYqXzWxB5PMRRNrHa+BIr8rRFHUII/2Da2p4u+JukVp1LapMY9aw55TovcfEdVCswlN3m4DeKU7N172UGk4KY9k2X5LmT+Zs8jzQQAG7yPz01RySPJV/EDKps3m8GhQkKgR6JwBTuPVEJdtv9sgVYb8Xim1Y0M/aYRWZFsikUWcuMJ1Og94OOIhXeHbyipzr7WYhsrDK8eIr7UqsmFs2nAX64b6XLWg1jJewY/dqUBSUkDH74e7QWf7PaM+kIbsW7dESgW2awi/E8c9/M+RGM81YfgvP6KwPAxQfKgFFj6NkPg5aNTyihiI+HhOoXgrQjzTKFKiv5gMYycq62fKXZwVAzMLVUFSJJ3bTAJ+PW1Tlg7HSlv6CEL9oA1crTDLy5UxSFd578hUVP8xyXRSV4GepVTZRoLoCpV81jqOxljLHqHDKkq0RfoBjKwj6nRyDMRsU4d8W4ei1u8dEW7SnqXHJNSJ6m0+XpS7OzlyOLB5Xo5xPUK3KarnEGXBDE3UI9NOMFQ16CrCzIihdi/P2lGjEtDN0NkGxMN1VqNNOptZywLeAe/WvsfgtzkhwOOovOMuAsyp+LYv3h2JYyobfQTvQPhx+KR7VQwyd7Pwjqr6Kkj2Cff4PhKBa6Xfet1G1pUpth48rAF7GnwJ0h6g0VuF+KFTDtPSlxxlT2T3vdEhhz+uDysZ7XEl8gmnW2qeWirdzrG8+3aHIjl3+IyqbqoI+/eljfBG97dfnYpVhwJeD9O6dxFyc4egrcHSg52LvsBT70R7+qu4D4K24YhUqEOn8jeBtfIpDy/UpqB6Fc8LceXLxdwS2rfvm+RKtXYyDSWZJhVgWYL7WdXkC/iksK5Sn0EIeugQT+ry4CEwLtKvkxtWVUrjFgmjCpX1gpOILBD2Bjf+rcCi7I+oRpXPv/0IoBK++GwZC8oJp21i8e0bDP+xG0VE52rOVyPoxWJdCe5DMttbOeys4iISgvWFJ/iRwVDm5wrZjsWgbGRqfrz5iH2zJenOQ1mEITahpMjFK0aghzREpPwsTCVKGBJYRrpAaOYhyQITiwdhhitVrt3FgOnJ2aspWnQcLAoUV76bZsGwdVx/MuzdYLdvmJwCEQTye+ZAgPSZI4LjGUey9mGF964ygt7QW5/gNjN2cFI+UJ7oFS1nrTqrvCiCGXDftZ5K8gRZyyLayIFzuyaKCwP6P10jlZAgYdM+2ErNvOeTGzu6QIaKCCjlfcGU7MyLFrNt4Xw5WlGSoo2t49Bb+EB7kGw6kSq2DXESTz9gErgKAij/i8GE+STrAs1jMCnuIeht4xX1V62hMh6M2CKWx8wynuNSF1kl7xLUtSPtJbtz7pSVxZNelmaj77hA7vax9N7/qFHhNSBA0WumLFv3rRdV36VX14XmAwDEYWcgalnNuTvDcB05wq3AnuBpjYsO/jEPn5/hv0WFOJpbqKTIdufFPHvhaiydTOSuAE9KAqyHJqkQz/oCQ872ylpY/YITpmUFxdpFu/uWuSehmr0W26N74hGyCpKJmVnZwQKTysGTO6f7t/m19I2fki1hK4+PZ7GK4O46dhlSplUrxsGmiy+66btNt6W4UbNaINIabnIgwQtWw8Z9qsFSsEEiuxLmItL+W1nBDVWZAiWqDoXVG73AZeqrgKAFxdWR9j4085lXwAD2JA/n7aJu+aRcIU57xIaGu0khiN5nTxTdQ65zFseD3LfwM+PX8SwlEmcO5oGpbkgaEzSG5NLmXDQaaRlfF9Rv22xG7d0Uzx3MtBKJ0VxRLTwwQFm0RDfj8kqojI8+6lWRBw3zcv/AnBQtjy4e/FYLWGzsdOTu8r+Jk43SzEMVwz07H6N9skAUaeaSVjQWAvvmEvubuUIPibX9aMGN1NrAAy/7O8oAVKI+osX3+sNZGHnip54X6F2cYMX0IgrFJxo+5+fy+F9JmQmeBueHikJRNzzf1VMyW+C3KiKfbG2//CHjENhStrH+KzyxRDSM51doPL46IAAbH7BEKNCRyxOK+qDwx9nCGHgbNGB2qqu+FyyYdmhAi/jv1yNzfN9E81eAyx4JhIfX1o34f4y9JccnNRP+PFe+rBvefwFFXUv/yB7oxJR6F6W82WfoRnaejERpbKVZV5Ytlxf3hs5OfwwVQZ6+naJYGNxmtfa31OAxqNiDsDtYYCPTaKtuUcOnDhIKLzfrqT1Ozosj0pqm5TXHXw3tdCZ9zrw+ppK44Hlw1qfeof9n6VANwIKZ4VGLx5Ao89//YBBTH0gLyGDM6j7B+eots7uJynuRYEqPf0hFrvm9yw38Rs6706HIzoGn4A946zydPR1fQL5EGJJm5gfu61Y9T3Qzt/Cn54PnlVVuiGlz3qb6otYHuxR8lHhE82bMp7IabZq9mxvxGE6bDtDDMyQ8bHUbHpTzCKJWH7qyCd3aDS2b1gXhAizZO9zynI1usqQd2z1AF1drs6P/3v9ocA0QYJ+3FPPzz/wBQ6X/fQTLuv72KeX3XWIWSc3vidtTPI+2t/lLFrfrvPu8D8QVdMPuv8ZVRLuv2t2cqCDZbDCC2hJf1svrNtBclBzQ+qBeIdc6c6LqMfDlM69PtnXLY02Bf4SgsnAZGi6OxUc4+QX4XBj0ZFzRMG9v3+cAmynxOBVOzoqjH9NXG4Y61q+OB+YVg1E7WKR2K4H91EAgEO0538msvfuSb7NY6e5tlaKfLlYuf/d8//6g7/+n0v/+nQhhCK+dgO1pjmGhONR0RmvL/+okFSvdH4z9bQibwij+tjczQnrPAHitage+W6hLmmkODNP8KQ9hPjkTC7/ACW5L9u6qKPg3JEqc1SGoPwKytjvqYq4811su8EZtj+Us78W7fzzT5Ek80l9/PXRB3nntuDzRhpXj6lAJYi019W0AqQTMhEHQ1mRFIoGwHlWL5iiv4bYO9k4tPMyI8w9/5xI8O7mtQFZwynOzNKcGNFFzMhlsDD9VOUzzOahLLfS5sK5UbsTEM6UFmZ1Psr+Lz4PwVpr3QnS7kCez4Ov80AIHFojrF+VrW1As1A1cHZ8FvZK2DfGYiq9OSEUNg1zBGDfo05j99xIKm2ddMhm7o0YU447vVN9eGL7u9l6KxVeYR/t0HOLclXj/kVaiFhGh4Y1DsIYUlZnSu74t05DPIZCRL2vIY7iXRCR4we7Vmxep/JQSRHz1wFwsIaMZehAG4lLhYZa9OyEjJysdp7KuB2R0IiKWZnUN+ZmpG80t1K9uJIKjGttGMnTPEQOxkze/LC7NtJ4KA3TwsGF46Rro56XeARCm4EZ8lpJ3PWw1D3LJck8le+TU/WC81Z+JqIvfG3ayWaQpmBS7xIkHPX55o3DjiDheQOw9+LvXgf6BCReDevZ1Z0TRrSnuuU6wTO4qXP1Z+wA8fMZf7caHRFP8ui6xSMi1UALoRirMBWc/nJW8Lxa7uaZgRhaYhT8SAOup+K/wZDIDLyK0Jko4PDGyugz1/zlyjgVUqeD8s8j7isNSYR4nrsQNsSiJ8SqwToP6BVEiQTSZUB9SRAWfnKGoBzGL242WVyrFSVXM+IxY43fe93/4XEY8ce3MZpIvUf+efKX+iVTrD7RVAgjorJ9X2EKAkX7sczbRQsvJXC6eH6E/pJcjChvOe6/HWF0JN/U3OdxTdDZ059zlwosncuiBEYs4zIHSsXhjezJx2IsVHo2O0AScKXThVHEpnjg2ZJ2q2IyvTH5GEn++VD/HNi0EqjZ1Ra4vE1dmxLITJqPmhTTJ6xLeah5ZtzhG7QCYEhs2pj3ZyYvsRRFJtlbo5EV3t8/rkHmSpIerr/m1Y1BMMkALfdACd4yZfLUqZMUM6SsGF5owV5IhHrAHe8CILXGXoNXlxcuCmWZAZ/ArGcfOINEOk12CGSE7BlDfX1zDV7B1b2IppEhRtZSISZfestSqgrdZ/VMrsYFGzIibGODeAPumYlILahfH1nhNbw2zL0l/viEW0eJZaUFa57LG4vIbvvS/P6I2Zw0cupYeLcMmknzprb+AdDfYF+55pHiShEl8qrLpGLTvvyndlwX8Smv9ICgxZB/G3XwuXUUwAWA9XXPAbNA5qJbgDabc2aFfl6QYZHwgAPK5NEGTEdAYw1T/n2BMVAs9qxit6lAaSU2Q2a/PF+It8DYs6Iw3FvOr21Xe7afAx+mp/DXO+B5aAEnlaQHwwKptQl+g+SuA5adOmUskGLQYl3Mdcl02xHO3wXA2PGknBMfy/eyXJUd77GVC/OED30k+z7Ijnooh0dur01XImVr7ytNQDXXlNH+CMBBfVr8QQEitq9Zktjw8tMjN/vr1XflvgjWm6yaJoJRw7B0DF6KMyOZkORJifNRSod7SMeATsJyBGy/HUWlEq6YfuRMmbMEuDLKBEsIRnhqxioEKRHf2R7xrprdqS2Ud4PfCB/+flVmAbeD6ZCxP3jYr2qdQGp/oo6HJq9p6zw50lHs21hAuOOHJz5OMIL12DcdlXKgEMsKrIP5GgFZcaJ6VAJwKuO8kllRtvJg/BlX7MgyXLKAl46W75srTsUdvBHZ13tu7OhvDX8U0r1crk0BVAVIWxAKMvI6W46KHwyA2AqAcYV483thZEhpHW8LmSidYC+if4+y/tOgaWUayRty3ZD4gZpm+PNva5g8+dvILQ9GFjGkXIS/+b/h963+P0ZrvChWWyG+W5qq0Nowo/vYT7517UayhpENHXQz4Nt1HUT6DF7s1j4XZcdYFuQAJMNN1LaOl499iiseWaSOMahR0InJvSLI1WB5wqYyR0z8XptTuO89mUDFAg25iOWp8Od2U3hZiweAPyNxzm40QFjFS9mYvQoFwJTViQ1T7KuuA1ajos7SXxMx7FPJMScVfdybjFMtsrP3WcxOFigTfDzJjCCYaRCrYfgQ5QQlNFDWENh4samTIEwzxhUCuCljkTDa+RoazEgIFqeivPPRYLlXHugOUkK+YbfYNz5fzGF6X3Nj+IpZ976/YFkLLmH39dqPm+/o2ljB7OlBQuzcHq4xnQwU0lblXh7X3r+ohpw3w1rjfC+sl+yVr8RRA2hkruoC0KQH7bTSVxu76PxMepyXQlUlTSliym/9OZxVBK3va1jsM72q2ctWOhEuuQZElRabUuGiTrcO8n/C5gFj3fnuCIhCtsDeTcwVZDOUmxuOKtvt/p4xBljnxkGb0nJj/0QD30c9b6hg+cXYmIN9aQgGik7px4cl++zWWBZAEvDJb711FCwyLVOL5c7zPR2S1nFiNvtATgR9EJMJJgD/8b/GLRa5lBCs7lEcXCN2dXO9pk2X1hmnPLjSX/K1dIfTI6VB4E+tX0VBL1lXW5cTuDKh5dpJAf/8vA0lhq75U6FuUZ9cDXorQCfAYRT0sth2if9GMm1TzKm2g6RLK2LHxi4iBX3CKuw5eNfN2qCjkapKmeK9Vf5pkQUORWb5gnpWBIfCBp7895jK2B8MCHEJOIkf8VsniX8xrOVQoG/qqtcggbusB70d+R8grXoZ7DEAf4nZ7t7e/RdQP5Fa5cK78lNmsA/Cbdqa9m4rQvMKj/8lfVa5Fcbyf+1dPxQH3PMnIpaJxxXB7ZQMQE+LhEoH1MCaDfNEo01b5MhfisCO08Ia6amCLI6gqLStGnb27sPBhqiYz/CBjkm6V0dBty1vAVIwjhh7/NfMP6YXghydP6AqyRrF0yfmJafQbRHxMpwHlGIFwo98iVubFqiA0Zky2qrYRV0eU8jLeMrwHP1XwAmvvK4rk9daACWhFchNkkiprLs76C+dx2IHjC2T4HM8/bWIIe50Fkq7aRW6HnYlDkvyNvSu1MwKMFwc3xkw829OeuaUeo0TCBirvFL//iyAeiUKfnyBUezp/DJqfM0mtLSS7LxMOcVZb8ecP9nNb1MBhXnRj89hDxPp2ktLhNvAjQ7wqNSm1WbE3Hvhe+KB0Y0whItbtgqAQHUd/37KX+UzK0Xmpx+rLtSUEnoZwg0aTabxDiP0x1Gxz8xV+nbj/HFvn8qojoAE8HMBZVr70aZ7aITEZk3TdsFpCflVemt1EmwpQ6+phm3sMJuUaEVA69XhoWgYkL/eIEuqHmRn+vCFu5FK2roH1aK8VZ0L/+CW5kU+mzfj0PhPaF5fUUPOW1YwG69kqm9Sq/mtHJURrM6RPcS92tBmzw2PnrF4MEXG/taEkGl9oO1NRPp2u6nndi7nXhPlbdBwrL4vrgBoEEYy6DQfGeshV8iXpBGEUEzMbMWfp09Gbdvhwfv/GDyXFi+WdsQcHYB5VPKxbaVKGobws6c8Qc9t0QrpHYenWlCmVDmoTYEEftvT7rUe9sQdtbzEX/nW49bw0/5zQBt5GDDEVkKtpoYJvWc/0bOGwlKBlppUPi2rMFZFQgQKgAAAAA=="},
  {name:"Orion Zero", img:"data:image/webp;base64,UklGRv5RAABXRUJQVlA4WAoAAAAQAAAA4AAAjwEAQUxQSDgOAAAB8IZtmyK57f/dT1X1iiFmZoZwDB+ZmZkZw8zMzAyyDAEzbVDhmMQKyg7HKDAzbddTz/1Cq9X0THfVh15ExASgLUUkVE4Eo0/cfrsXf23md2ZeNPPyxGbT5TMvmvmdmV978XbbT8ToIq4KIoKMFBcCVvmKA/d77fDw8O2W2O/Jbh8eHn7tfge+AqusgpMcEO8DAEyYOO3cV9605M8cq47emI7Osf55yU2vPHfaRKwcvJdOE+8AYPxmb/ry8oce4ag6auIgJh2Voz780K2ffvNm4wHAeekmcQEA1trjk9cuMa4co6bENkxJY+TKtuTaT+6xFgAEJx0jPgDAhFcvvI8razQztquZ1sqV71v46gkAELx0h/cApm3x3gUrSKrGxPZOUZXkigXv3WIaAO87wXsAE/e5ZGkkqZrY/kmVZFx6yT4TAXjXchIEqI6c9U+SjMnYlZYiSf5z1pEBCF7ay3kAh33pTpIpmrFbzWIiefeXNwHgpZ2cA9Z+729IqiZ2c1Iln5h1+FpAcO3jHLDbNUtJi4ldniLJpe9fB3CuXZwHZlxvpCo732Iil394BuClPZwDZgyTpsY8NCU5PAMI0hIC7HI9SWVGWiR5wzqAawPn8V/XGk2Zm5q4/ANrIAyeB2aSpsxRJZfvC+cGyzvs9DuaMlOt5rOfBrwMjnjgfY8yMmMTueiFgAyKAMfPJ5VZa5HPfmg8/GB4jHstmYy5q+Qf10UYBI9pv2JUZrAp7z0HTvpuCActpTKTE3k+xPWZx/7PMTKbk3L2EHw/icNXnjdlTkf+cjJ8/4jHJTRjXivvPRChX8TjEo4Yczvyuf3h+0M8LmPNDFc+tzl8P4jDJayZ5cpfjRPXB14uZs1MV/5iSFxjQ/gMR5jtNWdXkIYqvOW5Ecs31vzFlEoa8djvaRpzfoRfwlATDls9y8Sst7o+A6F3Eib/ksrMT3x0DUjPKnyFkdmf+Kf1nPQoYP96xPKPkZdjqDfipv6ZyhIc4YkIPQn4NCOLMKW7N/CuB052Z2QhRn4FVQ8CZpuWgsWndoNbLYf9mFiMykUTg6yGuPFLrSBY80MIqxHwBkYWZEoPTBc3JnFT7rJUEoz8EMKYAl5HZVGaPbCWyBjETbvPUlkw8gMIY6jkAkYWZrJH1hS3Ko+fmJYGIz8oYRUer9DE4jRbJpDRAj7BWB7UkYPEj+aq200LJPLXGM3LK2plgVp6eGNxKwV8krFEqDwXHoC4iUuYiiTaNQgAHF5KY5Em/m2iE6DCR60uEypfgwB4uZ6xUOr0VVdBsNYztEIx3uUgFS5MkaWq8UCECq9muUS+EZXIHKZiSbxNRHB70dwOwUufTFYslp58KXAAleWqPAA43orGjof8mEXDHwuuLZxrsc4/aQVj/Oc6O7F0d94+FU7aeisrHHv5PmZFo/zWJdTCueg7xTNzZvHMKp+vXlQ4iXO+Xjgkf8JUOInla+Xzf4NT+RTwrUyl81Vq6cwqHptZPCwd47LSUX6jfC76dvHM/H7xfOc8psK5dDNj0SZ+bMdUNrStd2Tp7LDFE7Sy2R43UouGO2C4aJS/GYfZhXMD8I3CGQb2KpxfAgcWzruBgwtnBmTavy2VzCEQ/IklE/eCyD8KJvF2JwEfoRbMEkiFCxmLJfLtCAGnqBbMa1AJxj9IKxWtj0QQTHq6WIwPBgh8+Cm1WJ6cDEGFj7EulMQl42SlTxdLzY+hAhx2MBbLV0fbjKWaeCA8AD/+19Qyoa0PByBgmLFIIn9cBQDweDW1UH6IVexSKvbp0eAm/plaIsoZ8KPhT0WS7J4NRUbx+BBjgSgXwGHUgBNSiUS+XcJogimP0spD41FYlfhFTMVhvH8IMhqG8AmOFMh9Y/E4SpOVRs0vS4VVOqxtLI7I1yCsCn78L6mFYRxZD24MAd+0WBiRPw4BY/TYi6k07PMYk5OtHzIri8Td4McCh/nUojC7b1NxY/LyOcaiUM6Bw9iw6/NqJRH5QQljE+AfTAVh6Ymd4ceGSj7FuiASlwKyGgFnWyyIyO+5gNUUvOApWjkoj8JqIfjrLRaD8eGpkNXyOIVaDNG+5wJWW2T9FWaloDwCfvXgcQu1EMyWrSXSgyAfYiwE5Q/g0UPB5IfNyiCmoyT0Ag43MBaB2f2TIT2p5HQtg2jfg0dPBWs8SysCHovQGwR/qWkBJP5xyKHHHi+hFUC0D6HqlbjJd1jKP+POcL2Cx5eo2Zfs5vEOPRfZ6Amz3FOeCN87eHyBMfPMHlxXpIEgF7DOvMifwqFBkfUeMcs7TbuKbwIB72fMumiz4dGow+bM+8Q9mkIYms2YcYlLpztpyGN31YyLfAMCmnaYTc02s6WTRRrz2C2lbFNeCY/mPWZbzLU0soP0QyWvZq5FXoWAPhQ3bbmlPDPuJL4fEPAmapZp+gEC+lLclHssZRn3gu8PBLyZMcOUP5vipU9EJt5nKbssjWwHj34NeBNjdkVejYC+FTd1uaXMspR2Ft8/CHgzNbMir0ZAH4tMvTelvEr1C+H7CQFvYcyqyKvh0dfiJ9xsmlGWbCe4/oLH7lml+k049LubeC9TNplxqkjfedkro5SfGvLof49fUjMp8f6JIgOxh8ZM0nQOPAYx4BOMWaS6aD3vBsLJWo8ly6HIGfAYzICPM2aQ8nJ4DKof+gNT9pg9uYZzA+Pw0qfUckf5XngMbsC3GTNHuRAOA+zCRn/TlDWWntlKBgoVPsaRrIn8FgIGWsJ6d1IzxjRuIW6w4HFkzJnICxAw6AGXUbNF7aeVl4ETP265plyJ3B4eg+9xANXyRPkVeLShx3eoWZLsrgnetYJza9xpKUciZ8CjHQMOYZ0hkZ9FQEuKx23U7FD+ZbpzbQFxa/9TU2ZYrA9CQHsGnMGYGZHfQIUWlTD+l9SsUPvXpCBtAo9tHo+WEaZpbzi0a4U3cCQjlN+AR9uG8BtqNqR071CQ1nHYcWmyXFDuIR7t63EI60yI/AI82rjCt1lnQUp/mS7SSs6t+29LGWCx3hgO7RxwfIoZkPg6BLR1hR8wdl7ib4OX1pIw5Vamjktp2QQRtLfHyx5L1nE8DB5tPoSvWd1pysvg0epe9qF1Grm+c+0mbsrdTB2mdsu4gJYPmMm6wyLfjNZz8mJV66zE5ZOdtB08jmHsKovPHg2P9ve4irGjan4YFTpQKr+Y2knKxRMq6QJ47PpwtA6y9PCucOjGgFNZd1DNUxHQlUG+Qu0c5R3OS2eIVP9JqWNSWrGNOHSnl13ZNTUvgEeXeryddafU/CQqdGvA1znSIcrFU7x0jAtr/Z7aGWr/WAMOXeuw5lKmjrDEo1ChewNOHKk7IsbT4NHFFd7PuhMif4KATpZq4k+pHaD173eqXDfBYZ3naB3A/RHQ1R77jtTWdspZvkJ3e3yVseWUt0HQ4VJhFmOrJd412XUanJv0AFOLJX10Z3h0u5Mdl2pqr8g3I6DrA45mbK3IDyGg+yt8mHVL1bwMFXIw4IeMraTp3g2CywLnN7rDUguZ8lQE5KHDuk9rap+a5yMgFwNexbp1In+GgHz0+C21ZZS/mxwkI8RP+h21VYxxUzjkpMP4B5laxOqnDoNHXnoc/kxt7fE834YKuVnh4xxpjcgrhyrJDlRDV1JbQnkdRJCfIricsRWSPryROOSok7CCqQUschd45Kl3uzwcrQV4BjxyNeBwxoGL/DwC8rWSzzIOmHIBAjJWBHdQByrpXZt7lzNwfou7mAbIap6MgLx12OwxTYOjfAsCcjfgtaxtUGq+CQH5G/BW1gNS8yYEySAELKAOhHLhC4Igh52fvtBq6zurbcF0OOSxx0tIpj4z8vEpcMhlj6PmP8fUV4nPzT8aHvns4Lb/IbWPEu/cHnDIae+w4X2a+ial+7aAeGT2EM5i3Tc1z8IQ8rvCRxj7JPIGVMhw8ZMXW+qLZIvX8pJj8JhhtfWBRZsBjzwPOJvaB8qzEZDpEuQn1MaUf5EguQZx4c6kDZk+vYd45LvH3mxKuRc8ct7jm4yNRH4TFbJeKtxEbSBx2QTv8g5OdnooWc8sPbSjOOR+wJcYexb5JQTkvpNDH0jWM9MH3is+9wKuYGTvI7+HkHseR1pqQO09+RdwKWMDkdeXwDupjVxaAtcyNqCcP8lJ9r2D2kDkVRKQfd9nbCDxwXXFZd8lDd25pkjeiaz5b0sNGB9dHy7vnKz9NJvhxrkHjxOXJeudxg8Ej9z3uInaM+V8CLLf+bmN3OZcAWBOI3PwPyO3lc/88vlF6QScxlg6J5fPKf//x9zyual0Is9FKJ3jSkc5DFcCpzWysAyObeS2EvD4QCNzSsBhEbV0FpaOxw9KJ+BYxtI5rXxO+X+w5pbPLaUT+UaEslH+Fq505pXBqY3MKYNjS8fjcmrZOCwsn0Wl4/F+xrIJOLZ8TiufU/5P0Gnlc3TpeHyTWjYOvy+fW8tnzv8TdVv5LC4dj++XjsMN5bOwfG5rZK4UwZxGbkLhmC3dRFzRMHEGfP7J3EZslxLAzY1w1/xzsuWDZkXjMYOJhbOLNbNbCezOZl5SAi9qRPlphPx7FbWByOvyL+AGxkYuLYHvN6L89Xgv2Xd5I0ZuApd9VzRUb1QA32sobpx7TtZ5gKmZ9bMPG5PWhMVt8m/DuhHW/DCq3NsoNvXx3KvwDkY28978+wTrRpS/C04y72MNGZ8ch9x7b0OJf6sk68T5X1Mbujm4vMPQY7RGjI9UyLxxyxtbMSH3pCnGdApCzjls+Ig1xXPzLuB8RjZ1Ru6d1Qevzb0zG1MugMu7V/bBH/LOY5e6biimeXkHj2Eqk6r1IqkaE0+Azzu37e9SYoMpXSkiWQcBdtz+TbO+fQfT6iTO+/ass7ffAe0PVlA4IKBDAAAQ3gCdASrhAJABPm0ukkakIqGhLPZbYIANiWNu7op0J8ADMUnxCr/Tf2H9pva4tj+G/C/Ojnd7Gf5f97/Mb5m+kD7t/cD/U39cut55g/2J/cv3Yf+N6n/7F+PH+O+QD+Yf53//+0J/sfYV/db2AP3H9Nf9xPg5/t//Q/eD2s///7AH//2Gb+0+iXwW+//3j9nf3a9efxb55+3f2n/Kf5v+6f+7/bfG5mH9L/lf+t/kfVL+Q/cL8x/dP3R/xHuX/n/uR9H/jV/Y/cx8gv41/MP87/af3M/wnxd/Lf6//F923tv+c/3/+m9gj2Y+k/7L+9fvj/mPRb/qf8L+Nnwr+jf3//W/cf9gH8r/p/+1/xX5LfO3+f/73i7fiv9d/x/cD/nP9s/7f99/1H7dfSv/P/+b/L/7H9z/az+df43/0f5n/ZfIN/M/7B/0P8R/p/2z+eD2Q/up/2vdX/Yn/h/ncjiZTNqTbzt6dp+mS3mCX1TwhKJSsxfYk9K2LDIv1wcaRxF2iML70jNKwLaKld5O94h4YpjQijHNnOmJUQKCbWQEWRY0UxPw0Mz7Qs3JtadiWxdQQFN5ogo4pDWL1DLkOF//XtLMdSs+8WPUCEY82Oxz7lodI0zNGwun5feJtEz7AwlDkwu7mOkp09BGlyYLbUl/Wv6TUCQEeXFML2X7VtdeDKwF5A/oMFI+X+LRRQr5uKVB8X3Jq0T2FfM2VqxPWryKDn9C4IVumnxj+Ja939MsomDoe3B5iKnc7qDucmgotxifA4LofaMmlw8T26R7XPFA9veqR3n/U64ZL1JulLLRpdvGcTLMvZSqA6pUwHYaMPQSipNr6yJqgCF8NQnSGVy7O8lSRzjq899dHSpPW92nwk0WvZ3euWPncWEGxWFrzQ1F/Pw8a8PffmuE1zpG7L092ssLpo9sn0DZl+l1o+zKsmji9HbjGQbUhBNmlHENuIk9etzvsmfKam2mWb/jBH4p7UPmlbqPlDRPVJrBUtwWxkb0GjQgzIlmS0KjtE0nzo5Ca2ppFkabdRi6Mg3jOyLwMK4QJgBxwAifPqnxGZS9D4yg/0kaQ4HMC74VWxI/ClkgLscRfh7Up/pZ1w0/WFciFWczjE6Aaqs0WWIA/Jav9baPDcfBuokgJrkuvOFtGCO26Kq+MurQXam2RzRPfHdXbUW0Vc9qEPACv59eUZeyx91RQsoF9w2H+zD39ar7wOn1QpQ0F0XC9Z46rebnDZQL78aMTDN3GH9VwawRq2989sVgALrtUemm9nL7UrQ0pKBFmQNiHixJBwwxAJuoWo8eGwGGVb8qj3kvswasck8sxuJqaPPyjh46P97yU8DUG4/t9/cTmcLNIlvW8hx+peg2dtX+WBm1u+T/6uzrn8kk8vfWNCm0AH2gAM+wtj0zXtuAq+8SC+0fhE9HtM5sHTOmHe4FWff/byMW35/Y9psmrmx14aZMiheH8CDQWr5Xq5yfs0seqO9b/dD9fOcj8HD5DDl1F3PpZsp4YwR2+G/UQxgFHhKvMD8SnMu+rZoBH4U2V9pau/trB0Fevf0t1kNyYZ49lmEzxlBNfQmKKm2pho57kWJ3aSxmr2iary/hk77VH3QN5XSxdbruauLETG4lG2UR7+3UgzxbXkTjbTeHsk2xiX3LgPoBh1U9uM/Lb/YXyvxeGgqpXl0ubgrGsVSHN1OegkcU6t5/zCPAgy1/SWRi+UfNNKlgrQ/7L0kd3VvFob5Fay+mJv8M7QL94zi/fLfjycnp4aBr1XrEvOavh1pxiQOx4TuO2yfP4XW7uEnpZD0DHav1/gUTk3xdtJfL27lC4RYWRdjf7lohWKrePmvDs5XeeTITlUOSBZZ4RNipZnuLEqQ8g10WX3HsBq3+wRBCNCy9DFDPMR2rsd4cAeRZdno4Y0v4yqexRcZhhXbnf5xpH4BsE66bFw/yAPsnlLK5bgl9Fs/7tqHBdzgqlgGLFyuF2sVKRFcdbeExJB/1m3fvKiWf9Vs+Xr/a22nSClEH2xY/ZzCfxZHuKR2d3MDUgBjkz2OhCFulKcwN4rBLgEZn1F2DrzRqOY7EcCi8zg8bhVzZxdZ8Naq+ywaV3i/zAJYyC5U/llyzy+gOQkURC8OFnsHwZSJYpcO/J28fXZ7ldnRz0ITfvoxcqeYHkkeqsD52K1OiPLgENDHORf+oEA4MJuf+hcqwzcGhvlxHYJIaDCY+I6V5FcrDfi3/XOGhwTPlnpkLFz0+ef/j9FUEz5Z6Zbr5OybdBDnBpCblsgHkkeqsM3AdUi083aB6Zbr9HsSR257dKNO3KhfUqYVaf0e26/R7Ekeoa4eUXdOyTpgt1V3L3YkNjXLU0Ez5Z6Zazsq/kmvrFcvOpXt5wEjq9o0A2am4MUAA/vd2Fj8L2RI8GdXIqb1x+nxGN1NMEP5Gzi4D6mhZu9BUgTwR9fvd4dJ9UF2giNiMeJGcmDoU+ZstR+NvLBI96kaIU7MpDTT9uonJRqEHa6ersYrZP2f4ZfbJsyBDhgI4ooeHV2diydGlJZMoR3UzqoL9fy6lHcsuy93NXfLk8MXDYkzf4zQMH29Ef8bEyVNreuXBn1XPeS1VCXbyc11MCD32F+cQ8XnuIGoo35wxs1eFdZDf8ag9ZFLoPdin7VXuImYHiDOBSjOV8Nbh04bPtflDq4nMULnP3ycFvYo7uT2Qa008vcBb/WGeBVSxCCZes55E8Y0FK/hd/+8TtYmWWwtn6eI5Wnt6Na02Z7lP4w+rhBA1rhFxPM1xWiorrNKuqsLiE5/wtaAj6Wz1Y6MANNd5OZkaWLnALKgN/cYYFNDf283svf509b+DT4dU4jKAf56sROHJl7AaTSjWUIvhicNtwGZi5k12SLBZ4N8iZev4Hsq6+i321BKnXppHfown6oEjxXrc3ymW6PhPPSHyTVRXRzGFlm5YXIGOLlo2r/jNZ1Rq94b8EAz+t92P5bkq/mVecDKyk3XMSE8dAKTue71SpuU1clunaPwXARaxAEjBs2J2PznD8Me84rdu/4t+IPUgwW3BD1IP244cjmxoky8A8tWNT+JanqoFrrMXvH2qLRGIz715tkQHws6jO9ZD26gSllF1Z9Edc5ISOBmuqaaKdr8uRsWiRnmzxXSxjbx7rvRZZgl9VppZKK5qhLlPTRcsa6OLnYFYtEEB23t4drVt+9wsUIQY9hpjJpqzYMVJCsipp0+GqhQoK5kDxn1FR2IC58jqnUUip2/cWsyFyEJb5UwmKEOXoaEPiewN+8vauQgnmaNGdwuRISPnZVX6SLEJzVimONeZ0ANwYaKs0IS3fC0kH2XWJcCC6kk5Oz9F3kYy/dxTKu7/8wGlzJv8qEwcIUdskR0RrFljOVsaHCOXMFPVHPhRPJCtzn8jsWC7h9HnB85dMqRXGk9PgiqlQiAI6g5Lu9IJj6maoR9jtCcvw/vleMOXDLL8iQBtr/UImLcMDAC4Z626HDptG3bDvwjjgBElPM/bU6EYQZwi10xEYJbWOjCB6ynFlM7CTLOBvEQWPYOfyz6228sTP8GHVp7TH6nZyse1mvQh63wFlaA2RdAo2UQRKD0Sa0+oyudLz1Mt8PwhEdxYwCrffaUQP2tps7nlr/AJEk1M3X7byhONztrmU7Nn9aDRndNlqcy3vgRE4xdG72iv3xq4X2TEMaVYNSF8NBJ5E2fmQ33YEyalPAMHNuJbxkCcygyYbv8ph/o7BCyN4mqRrd0A1kNvP0nxDDBMw2GA+1j/O42EapjguPNbrCVljiAkUQ9mNCu7jY5hGYbXKMKH7ahRPWWSdmHToauMh2XZwJ3a9ciEQPTWz77l8ABj4so0N023Xdva8Fv7MBuqhX9ikLgNaEYm2RMGs5yQbRy7wKzTu4ls86jwtcYqW0ReFyYsyQ0OKyI5v3EvR5J4w+XFHMpV6EEWW3ehFSNRQkSlnAz+XzAmICHJhLMQ8JT3L3woAqpO+NeZMLMeV+NWH6dQcPiDYkb/P789ubTb2lYs+QWfMrCTMkrH8X8bHoPtv6E+fgWzxuGNADOgRl0ZFPLFH0AJ7Kt2EuU6kI9W0JgWWZC2S53DU1Z+PssrAOyVSXmqOgNFAqh+DDh4d7AW9NRjhCFgttD+7PwnQqkYHWI0bV9vQOteBj2u31V/pfAZCcMwexP97feujgielO848jU3/HjoreqI0bJ48/tedO1mK1fMS6CGd6F9JEcomWA9VFseDZRvlSKiWuMTfH3d9PaTs2EdJgTG0hsoN0THKZSZ0tj1fFN2S3a2pDocvlgFSR2yFR1gEIXDmJ9jJIcOAb6bH1rN7JyyNnrflzOlmxbBIbpeV1uHbqFULQRdSzaltMjCMimGaTEqlPaaM9PdV1bSwJ2dkxRCZx4D7HYNJQPBjoMbmjz7Ktc2Rft0S4HFnCrwRMusF1xtctPf/+U59yv57sCzyVqTDB4yzAuo8tLNOts2+y4216wLQJhZuSIHvS7VakuaAqxeWXo/DHBl0s6cNM4d7GqmmaKjc74fQvnUYT8zXUTIAfn8rODDYUNwg29JAOBtr6YeSIdFO+nqj17fUc8UYdsZpsFk+/HMIqzJqZx8C/1Fstf1Hz1qe2Rq5nUftw3mzRd3ls3Cym5IQ/3J//hWP9Cq2bz+UNIpYhJYCBVZxor2l8XRpX4BqQFSTaRcQGtzEBy3Vi+qzjY4PtZjCTO6IOK6Ia7vOB6WaeO1i3FOZR9kdWDGO21QEDRUHY6J0OoBmlVbKCuZfxZVrugfp0UZd5WuNsdRHrUcav4eex0GKnPJ7ZM4MYoombif6x74TL2L0J8ZBR/uBX3drmgCeYKpywNFzOTUPWZWdu2qnqRnWrPyjeGAXJufxcaRqXPONkOgYRg7Mmr/CSAhqRcnMhz9qdQWZlanP/rdW3+pWXxpUrjx+XAVB7SmRSCUGfbsZWF99sBxrdorJJ1LNLPG3Xe4K74FYjBaJ9InHxdoGK5oXCrzQSKrR3WRhvVWeDtRtR6iSbHhauiZwEwmKjsSls6cS1tcnz2JG8tyDOr5EFDqmvvYuCqjkbqN+8Ri3Jham2ljifMoVPsVGk61WOLEifnUHW+VkdXu2HPojOBLQrivs3SKVUuL//sgrsKnXjlcCGt0eCljGKxROQfExT5/F5Icx+GdfQE1C8VQZAs6fF1O27rCIFOfP4XmApbL0UqWtJGfAFBh6Ejv95htyV6R9WjXV+dbsQK3/IjuEdFwQ7SdiEWPv8tZ41SykwxcbBZJUy1UWkyWhAH3oPNDbuBqa9EvEmy+4+k0h2EfoKsNue4Z9iHtHPnrnAwufVRLXILRMtCeqJx89vGKnIxZb5QsRBrh6XJBj1LcJNPT4NHTJ8hFs43GFDl3kv+8FkgmI58Uds61rfSRsfPn7Qp6BnLTr1eKAtnnAwK4CqT840FNm8J+cupDGwZQA+SqGbmhd0Mz/PknqveyyBbItjjE3UI+oZnQ3y54UK9+ocyld5yY5n8rfdagyEI3nJZn8aj9QSzIKuXNqh/4Y78HYSegLp+5e2ZIhxDI8nlN6GBaGDOEOOeiW8ZTGiGSG1e1I27Z0/FRNxvUq7mA4EidBXHLEVBFaRjizjaAna8tIfaMXPaQVwaJitttoeDJVHi7/H+Z8JdfWB0FlxwtG4OP9Rt8BBLnvFtjD9h0B9yunVRzp+MZCeF3wOwM/wHCXnX6eBEe1m2akJMca+uzlotuP+ef7CvfFfpVkotdj22mTsjQDIjfB7zwZ0AnO1KyJqBtHtn38l7wlg556hleKcIvigdZzg6ImQ87TV9riP7iU4aJU8P6voVljW6CD67ZUzkgLAmXO0Sr2uCrjKL5CvH3zrH+zQZLScMclI1mftOdvx/cvxXMy0iAvqKQdjpH6wSMbKwKdEEDv1uIv+uU+6/a1o7XJTp/b2oqKMb7ctmX9fySTfsBMXURqp0CvmjmW0bp1LLPU5eFtSVZMZP/Kddlet7L30Rn7K2geFuxQnHeha3T5VIlTw6aRDvyJKHZ26snot47KwALNDRSTEk6g57i/4xfRJCFXlKR+jBV4iyap4WsCorMIxbqK722rx4uwpzPuwDCBbj1z8pXgJUHZ4we+1BsgIY5nUbMpxqRq2fyVLGXVSgBYwz7KH6H49TV/s5EKtgvK61B/HZ9eXNtlJki2+4U939FdKEahjxFZ0eVHsMmAJMbqEDdVbR3f7LXxDR3IkqeDDLzGN1pWw90yedTq3wj/hI1xmhb3TULyiaqChH3W4DoH9T8jR7I1FiB2L0M9B8dWJ7a7ZqYUzV3pQXzBGLD/WZawzFlGJ2ZIyfhoLL3bFFNx+sBl9mR61PKk0QeMQJsrLVYFIG/j4Md5hZSPUGa2iXkeVbcwkyklCPRDYjh8P+RqC6QHQOAvwqE0/JSqMNc2UwERomRMpZqc3G+oaAPJQCLLqEuCm+3+X6g+7anO7J3M6PMJlhS52g0HxQj6tZ60nN+ix/AymVz+ANZqG9aNODk8/fJyQUci/loiabv91JrX5tMcFAjnP9c+eF5GpHVLqhUciy5F1bjTSqF/3CtBnKLa/vUSVicE+5sv99r1J/V3Jphx8T7Rb0f6XbGBskIhQdx4OhBXUv9hnzgHNg9ATTYs+3pc8o69H4/MQAcDs4fP3H55s4o5WUUra6I6vKHmeggJrjUOPh2ag3qzne8F48adzT0jMdCfZ8v3Qx8WwK0rcG59eBEnWB59326XbSqmZ8idyv8XMPflUdEwt0v+Aqj+4kB6GQRnE41I8yctKDm9F5hNx7tHELuOaGVb8zlluHhBXigYtSPprewtzDG6vz7nYNrMHX8eXIUT5gxRvwIVNuAAjjwD4KlP1ESn+qmaOSf+P5Fw8o87aWQkPq8hgs6oBrcZ8WV5IzOTD/jxH2dhXbc1SRPiNsR9NprBCjHpIzqEbVVQA2vzDPo2PkTfjCthUMytlpFX7V0d97OLIaY9gYEynyL7SMHSKTdEnrm5A9J28zJwsyRP4dd8trGd6DwRhTo/uKRRmDVZ7rASX8Ba6gmi1dV5T6zWoxYPYQcrSes66rXNXG/C3OkTl+7VXUnUq4p3hcHjYVg0d8wOuxKyK0yqAI2QR+7mziH5Z3avA30m/T1d9aBruizscLO63rSehPyj383R//p4BclO2wcmSa7V7rhUM2KWZNRgWBWZ/CH5PneCnPgtjjxdLYe3/kfzjCVIuBFmk05Vm7iVqf/RfkXMFmLV8Da7llLOpH9uXxFlBP6zNGdOcLEQYqdH8LSh/zf1hTMccLll7viTq4oQtYhgmh/Ruq0lKbO1VR8KkGqziiwczup/Lp6xQA/QXEXGdvSlHfyfhnth/j083jPwJUHU21fnUOyDkuBbk9XmrBaby7V7a0zzVlT0zqSr51qTtmbGNBtVO5iAWiFWOk7kq/bIF+fE49DOiwt+GX0Kv1gZ3tqd2lJ/H1inoSwI+omuW5sZWAdXsfFGylc1DHi4rHTVDMzVJ2oMRuExCyiCD3KlUAnBTgmlPbkL7iKlkSZz8mRjkr9qXFVhfSskn+ABZsF+v8dKuY9WEap4JA76RmLpFI/xREk8BPUT5Qo1RVw+bdtj35RY/9GL7g9ZmeGtFmJgEbuUKafpj8Vl0b0/3HntSJSPNU1ecSTrk0kj/R2mIpQgimW2OXit+XHyZKXsEZ3Zj5+8nxD6r47XG0HNZ2EzuJv6msUmQpoN+wbLMzh7yGu59ELGQR6smx3oKAp3cQ+g5lCvt4PP3kI3F5a2fMELPRw5izCzMF+zLFvAYuza53sbfCEfRzKQMXBqvAkaNfpLu2ui0H1bN4xdUEEYca94KWjMAY0Vn7HjzIrNaVRefr+xu8l6o2CSCeZkLKp3A2ZNKArlBwjPPe6kGQ5HVLle/l1bB1VTBAmJXM1OVz3wshwgYY92yhB2QH3TAcnOU6blcLAtBIQcTDNk9hD7gv07/27g6mk4R8GcjbOR2X/9NQxpKFOL+0huWxAJ6ADjIc5EmysRvSSPhXtNqZS1qjFq+KNiKKw7um4bfbabgk0ZaBdrbyEwC8tt3YSTO7c7Qvx8HA2AeB/5yI1RZKhHHSAVv2Ps0RB7H8A2ozTv/7rf0mLvw3s8PYv+H0OZ27OffDDlEr4YW5/J0pJo0MeoUOMCmgDI71vlYPSnopduZ4h3q4FGyOiWK5XtgOkbTN9aT4zMh2j2y/EyywMyiPMpKu/xh6BRy8kjCe8ZLiCpsJxzsXMUUzwOAxCFHmZ8AYQ9a8/seVX/Q4hzL9oh8fTkRamDkgcIW7uwGyKv3rfkIXl+lGIax0aK033UXm2kG/DX7AULWTLIIcbrwvEa8qDgxeEhTFcw9UYV2emNU+QfhylUxPqh7bYYJFKXaoD9oElLQZCtYZWTt5NXV8LMYhJ8/si3jAInajjMiKWS5t0sEACa6tS1fclIf7gHkjXVfcDAlquAEj0eVR7tKi+HEWvClZmUgDDn/Rqt6lRYcq+je0PygxlKrCW03KfCcWZnw/vrW7F0WQ1ABzmE+xheA7qCdEwd4/isOFr0FLg0/zrqVlLk1tzZE8lvvqqnvxyVew/urmUjN38rrszSViPfKkUZRVFkhcjlzpTbB5ppdI0CIDFWQQnp1WEHDea4k1uPB+juq0ZD+sf1M9JEtU/TUpQe3U/fL5So4+G89KwH5J+CW/EdyTxUqqcLiD2rNysDac/g73DHHrV+EgCeY/DJXI3/BK9PpT4OWpHxQCrHlwh6+eU6ym3ra45Zdch2C0Y8h8Bfoy7sS3H626CtGyIVn5xRRrTGgud8RlVammYL3Ts6braHqHQLtWn1fe2vnztZFVrs/SQ+kApzBJp54S6JHeaJsOuvWVSEzA/kCtEZXdi15Fji19a0ndVzHja77H9+JaJVTa9q/dPItxrSIpMcQ16sgKyX1pfKqlpoBVbEtCc60gEuVP7CP+ZJRuYMxNt8mgcH/nt2541AYOgTM9wCpM5JQmaUpPP8vmdTMJr8wRgqHec1c/EuRiW7VF8LWxzj47Auo+WG6dTaXSXHwj/+8b+tHbHJB/01z6pmVNuBN5q2BcbeN1/9f5PzMxQoReuwL9nxj3BQQnXN3v/sajxBXiFYnJgNEm6riOf1r93Ych3PZt5sSDezhEW76kCWGT3twQ1RBzN5mdqeR8lbZN6IzEhRRdL0oN7vGc8ux7wSNGwqRVqw/oOe4wsmK5V9POpulexKK7KVFhhNexq0USiHrzMZZG50ulJ6ITdtLIOw2bt/EmZCw5nETnzBk0OLItWqnoOMrGm94G+T3naf7rXNA1B2llE5dU08MNziHP0fNK5ztwX04ItUHgv2m9iE8zDAjth5/ks6g8E2wBj2EnDmB7EZAVzI9QTemDPJRMt+BNzUiTEs55rcuLxJ+Ve/ANlxRd4inOaxgb39l2NMiYuYNq9+r4hTzxBmF/P6WHW1BqIHIOLI5soxSgHZDc5K2CYLBCUSL/GoeQxT84idWTkWCBfFjeMdeesGj1ItK/KIVXRfNnaPhQzqLfT4rL/AR2tliB5FCoCQDSHH37BX3SxY8RCu/DFlE59eeUexwOIcayveskNQIoitocEY3Nzr8s8R9C3xnqFotU/gvSU3PftHWndmUq5NjF5lncnGw4wi7qV4q9ey/6sWmQBjJdM/f5cfVtLZq9g6rX2qGZEkTvy16ECQ2b0RQhUrBglZie5uCGR0zj3Alo7huTi6yDxREMPiCw+5+S34hn92ymOBZXKcc4UGoer2w4gTowmPhj3PicjgitGDn8nZ8JO8mm0lb/g02PY1BXsWX7kAJiPTLBwvUHF3kU61O+V2d+MMlmtg5wLUWU66q1KJ01faktywYYQLWTVzEBh2GYu1LQd+7XpcZyEMs7ON2u+jO7KnIW6nCXTlJLbOLl0UyGjoD/84zj2pQ+zt/grUcoDg0yhT0CQc7qDPsAKeVU16jv59ALGEKu37praw/O7PaFgxIG9Rnbogcm2L8ULzCUPwAMhzN2NmUssFQTIy8QxtTnRAcVsHxA/0CUiVBgMINj9CuQMbayHSUrJ++ArkREebKuRzUyxXQZqvRvVQF7WgLJrghBmic97dxv/SK0c3XMzl3pzt317JlyS3sBNOzlCg5uTX4dgG243bknC3yEtwnT21C/TNLykFX983lvJFMRYsY+HGzOdW+6bXpJL0IS99oJbZGffrr/aWXLd4pek+S7S0jmvxzreHlcZjNrEf7MmVSH5CLIjpdFHkRkO0e1xLQEyvUlGgPVwcCV1/MFY6A5UgPqx6XIh7Eza+SAfKnNKq4E4Z7Xmc39+1UtTdWGilTSgf8GgxVpDqe/N/GQRGccNdMXbhuCLAjQoHNH/ZtJypB1H3mYTMHFkJaUSCl/qDeVE24Brjf3ZwEmxoGJFOrBfgiQ4EYBHB0xtqYfjiKqtYuwb+zjEAb9MuOxBS2xn9XPf8PB6IdGdohYqdHucoaI1AFELsb5glTWqvPEsNfnM4PcEkWGNuwDngDWZ6tKJccHPEhPAHZtIErKSA4/Mg+tTni75fW7UvJR7GPqes53bLRc6OaWWfpHrGPV+BCjNl8IoEdcQUc+DKz1LrjybsMZ1LLL07kBL7odcIM45/YKOCfFYOkqWoZXgcVRntQewFate6l5SvPm30YURgTFCEUqvvHhjXxZAmq4NuTa2DNa+hZVrOkHP1jWJ6S34bNsR20b5gZjeGbzETrb2N/T+uz53SDBQQGs9CRGwv/62Gdx4oA+6U7iQf8vW4sOpOvi4HvfRZWYPHZdMWToDdp+zHVRkbCCPQYjisGOp2/eNKIpE9FVnao18L/dzG0YEk8jI9bfi+yKygGIHhRDPmekwPzP7VNlKmIZ0MZFx0nrr+koHj/BieOGpYvQXqykNIp4eT9mzMN6diKS1PANsiE5z7BdSCYQJMnk1Ql3sq3Vs1/DxERQLi1bKNeZU2Kvg0Mo5ZtSfQL/zJNc8MEMPVt86WDrpPfHkub+4zvEqk92ZzybCjpqkKxawVa26T/+Tgt9q7w39FnqCIa1ZXRS+NJQZIe4D/rhG9+QTVCZI4OgnyFT6JZvVkFBenmLIvMm/Y/RgLCx6HKFKp0yN+6is7OOk3I1L/qs7yDJq5Q88MIySs6pNb9bZtBmFgKaJEdIRH9EdKSfXqzCE6IitjONKWolM+uYnkzTIm8SEfK7eln7vw8xP2P7mDjMas0Gg7GcvqXJcKU8Df3Fw13UDVd9lrdFZQp8OiJuhcFfAohBPvy95k5ahnaFc/vSgOsJoq6wy2XQ7UXvXdTA5YQBF+DqdvsigGUI4PjKLVQwswDCWBouahoiK5lej5XUvsiZJZTx9hnH6R6mMef9yA1MXQjoEIpW10BKsPFWkPihDpNY8Eex/iaERaRldzzt1LE7WTGbfDtRoEAIkS/BBT89/PAWrcZbdTDn9f4yO6wARKGNUfGoBMRknngZ6P5Sivm3RBgPUCi0u/ibVcB/6/id1FXoTQJzaLtXY6OAi/TYhBT4JwNsv1N91piuhPxO+Oo5VoybUaLKoSPo2VWC/NSFHXgnET9CSk0HdCPDAqFfHk5dZcrJ9NE+Cdc+qHcLnGXY9FlQzsvgc5GpiBiidDqvatcRk8aZNuNEWHEIW5OofudPzt+4c6/FvJ0LCjU8vv5+eEjg7oWf9zktbFC4br+a8WSa0r6wO4wKnILOltGiXD2Y4gXxp4+eLMFwGQ90+OAM3sZHkZdBIVTPUs8Up1xRyIVJ9/BggBoQF9kdY6nF6fJRPuH124NcSHtvWZX1YHL6Rk0d2rodKgjupDXAV+BOEVfY2Mf3DzkPrqvh/FUxYVRRkBkrUevRSJ/2z2KAG/IepkSyTBSu1taZwVxj7mN14qoGlhcUOy/SRSTtXlEUVIzc5d3Wwo7Hi7vCc2ng9S04cTOpjtWeNaygzSQv0wGILPEvUPOZ62KWVKbnUgRPF16dOKctgTgYYTmoPUibEGe8IyVNxWX1j53xxaJuR5CCmr+nrOY6NigCIY9dQfXEonV82K5Rfx0zR1mclLo0fp3o6ajCRCisp0CvDKyFhWD8XnTv17j5cP83WOMcfAL641N9zNwC4xdUuSe+cLw81z6W4WDQl/qq9Va+2GKd0TiP15zwPiQlX3ptkiW/Qqf94Ud7NcDos8ZSGAKS0+6UuYJtuN3fJCcUbMHlbu7vCnbvJbLPCjWlexk3QuFoNaxd2NzYwNvInVZR76v8wKNwmZW+12J8EW6Y5geAMlQUpfgANUcdRfBC0zHZV5v/Y1nynDFR9RD0A1LvP0eX0E2yO44I/Ul+AFawou1sSvfwD9XKQxj/38siw5MbefEX+GDN4ClTcrWyI5nuf8C9Uj2Q/jzFjGFkD8dWHG/TTPcqt+wEcfzGNCYp7cDwhk5gJihQ9goE759smwPGJeYcWMnwB4//LnWv2xNAj6iy9xlCvUCW8Fhrl+lYbQIiDopzvRwYStwkYLc3rP+aONBT+cXYsvJFUUNDk8bZPoztjtIuvE/JVYp1tLMg2ISEOlJ+yuMlmz+0m7GBWjjvvaLRffjjHiTJWo5tRvOu2iy73CgJ2VzcOCyrf6VbEKKz3aQCzAviBFp1nO20Swa1av81Cv3QyUP/A3P8UXl9sTZVnlHQhGfSdjL5V42k6aw13bMxQrRMJtIwiMJ3G7dVTMslwT5NNH88OlCzXy8gzuydtYN3T2G/ITKvgmejiSKBmPFm9LYktitqp1cEFwq8kymp5NiR/uIO8Hmrkf2r2qBFyw5OLEutN7ew9LWt667MGuwIWymZRzOzeuhYtivIOX7xt93eUIKNGH4CCBxAOlFvpVDYsSH7GcgjSRKKpzRJV9eYXsOG+VBO7K2mVf6gBufmS54ZWLFV7qPsJtxqVn4npRS/y2byEMxmKpUiv0YVWnLB+OO9bFPnknrrBMYu/rMIhWhWCCkarYLz05ZXW6tSpgoSmUQ5iCrawKxGrKbLZluXuQTJ4wUQZugOBI56OcGIDd2FbmNdgqcEmx9XOhktRpMpqHszJs42vIEe0zNDN4z2mQtSmb2r0BOu/eYmW37T5d+mFVrFs6Kk/aHpkkd6cBUtkdUFR1iRsLIRNbS5nSAtSciOP2x6IlOsDAu5tRgwJOAVGr46lurfc1+nBvwpWdCIB54UVcT220ZRrIrfC6HnEjHp6KH6bel/KH94Ct/x1tijk9qU8cWBXh5StlGj9h2MWOLIX3z6jDNZ2TAvKYka+sq0kVYpzj2Bi5Baa6Itiuj1TsWAwoyXjmKt3VlVnKeRYwqMcJHzPwE6j8zYfuHe6WlLm/5O+tFXxHia+/Th0+EpNL8Ra4pWD0dysD7EsAT3qsfI9CXAW+Cpt3AEOTPBM+YNSrn2kM6LgBy5/iI1f5o/dqfAuQFE3pMILSF3L//4BB0jfby3EJSymoIFeaOADazC0eKWi2kUU4nNV83HwSlmJGhZcxTU5lkRyaDaK7UjgYRSbGFEVStIlLhbi24uF5AHH0YlPnIkKyTVZEvGMT8vSmeIz47iS5lTDZCYrT1UMIfY7oB5JOSiFSkx7iJW6DAyX4zbxUyR8Vmc5waAAo24b3bgRt72gmLVFhWUImV9sHgWvzZ82X2en+BlIW5UXoJ2ZtT+Q3XrAzOqFdDYARslyKiGZDtNCX1BBJBUjEe0dBLGF53AvS21jN5wMDNPlvAcGDC+pojsS2OOc524YRB3zGaKVe0rnIfHb9P/Mn0Q2yOFxoBmAC++ZHK2FMa8WfFHvJjV+hU0jtWnCC6goUeHA/DNRxZDECnQ3DOC7J0GllzTXh6ngapq/JFf/0U4Nxr0NeX4ZAwOTJ5GJHmvYt8reRjXTfHqewpZ4ee8GX02XpDDUX4ABQP8sh/l5jC+AEAfAdnZ3JinCIINdVx4FqAX4y+asr7M7BMpQLfSh7svf9hYlV1Imlpa1jewSm5dX1gjml1sjvFy2IpPa3adwNVoowP0S3J201uS6P5DH7kW5B/IgFoJJaiQEZOxIpdqVneLIHeqvq640qQW04wLn9YUmt/QlYrYp/x3/BCnPgHsHnBiM5Uwpxq4uZ4WwWRr2nhRq5XwY0mry6k+ymN8zmPdC4Yw6EB2ueGcuTnw44VR2jx3/rVeqAgQkWB9rXO2WaGzXif+ztaICd5ZMxO02ZVpM+PtqDDZn04MPG709NfhaSklCiV331be/vd5cSVyAmRwWHfm9UTrn4bVunG+dWsmHFuYk5j75uYZ+/K4yPct7JdbZmenWVCt3Y1f8nRtpBgqJpNl2AKUrKU5noRjveCbcHNt/AyJvPCthoMVKGj00sB8LAyqUGLZ7bSS14Gow81uQt64QhUUEt/Mk1XNzBnsww40YrYXLNLAaOhAzhGIpCuOTEpgg+THcqVwDAloejXu/tltKErKXepTfgFf1fG7Hi25a9wy3RIdLc3utPWny/guHpUlpHCOpLR3z5LS1l7/GWSygnRfEB5fgcUpAP0cbUVFlBWj98CS3r3M8Ezx9hgUXoOi5uNEjiZGPVqrS99dGPzgpzOdHahdzZWzI/oNIQLSVQeymTNz7dLM/b7eaDr3KzXJEKP6Z8+e+IMOIvHndQQ7rJPg7AZf0ChtKFIeMJIbbA5OIR94xvrFYNsDknmJhUS/E0JdD/N4FKDK8ORtcWJ4tou0gw4j1cYnaNjbMOE9NJN5eL3xYUSF81y/eBbCwnAJM6k/8qHOeVV/OMl8iObpitE7u6e5zpRadayl+qYp5eFQU5RwttKfBPvEaThjOVivknzcZ1BPivP9UJvv4vCHgrTRWoaCg4SQVqZN1UoBIzl4nEC/VPNnsQoWBHgRDomRerny8KQOvZ62zHGyzYidWqNn+zkZfaixsUxI2hPcoTpFvaxKUC3CazHtnTW5CMvzqenvA52MUKBh0kJMS/ELTVIi3hPPFyFTQdhemiXDOzVv0rvHrtGWau6UOH7rX59kg/bDqvNsu7fImjNUzpDLHmPq6l+RMtjUEvG3zTR26EHKSTEA4MVUY6Wg3OmQ3I5/rMj7zsZ7o1yFqLTQ5cGf3g6zvnBFHL2DW/yaCjYfoKq9MAJknY+WvI3WRuiZLW8RhkkEud2XQAvhz3C2+poKGxI1XKLMPJmBClYt9JXo8Ua6nVAxhIjxVsEL0rubegT1Hqu1+/hnytj4v2wrCmUj4yjseJhcjMYemyYVj959ZZRdcbQLjv3vJYvpm56+5fkZk7cTSR6emgYl1tRAVETr9r+cLq1lGpBJ4Ids3nxjuMtTrVd6sKarTDowmXBecCKUtNq1hZZCzvJDwe+lK9VWur/ry1nSrJwRCFLhBJNUOJu3VjU9GzXZUXT9vrns607RNlwisV2Eaz4lFAoqKUmRhvYiwEsbLV+4hFkQctLJinp2GaAYXRhpYDZepJUunp/cAvGENL3UGSvweXNOxL9hbi6Pkq+sszKkkS1YZhpIv8ihscvOivWHGLnTd8XL0yrQ+pXQLTHwGOZ1ZyV8S2LrNUyKG47pH9RoLbxQ+8Za44lZaYKQ71+R1P+zz//M8Gb0CcDMaixm6BCyL9/GXtT5qPKKWstIN1JB3ufr27RaZ3r/j9f79MVA2do+LBiRL6qiEJd+EvWh4kgD1NtO+FX8cFm8IVxWpmaG5WMviWs+mfcyfdwh1F0fjW/SMbwKhaNWdlvx7vPUpJjsX1d+6+85+U/rO3jzfytHJLR8IlJcgpZiWv8U9Z/Pd+Va8pdT1HHaxW4dsSJysKFdlwI67WjpTvLJ5Ov4HLGNDpIWn+nrRsrzNpxw7CMg/UgxTnBbC8ijmjjHY96bzpqfvqcj3VVnW/CzZs/KDsmZ7f1rCwWnblk6CrU1O3KfxQ1UZTHcKYCXevJuLxjW3fFF688fEq7+YuZjPxfEj0l3KBg7wdCmt3YmChEUlsbh7QmYzCYvFg9HvM7aM+TsBma8w7U69x8NZaIcsAUmioveVe7NidI1p/zmXBOL9x9PP9IHgBA6UCWgvlsz5b8e03x/RzFKuHxbQYull36A14P0xAmshjKNvd/tVGuMX3ToC63bYgse1p8zwNhrtCuzmgZXbRU/pQYsM2f6K86ri8JhhDlsyFWatf0aud3dUu7M/V68SSKIbnd0jMf7UYd7L6j6l+CgPDksgpKP/ASQIyrqTOoVQadspm0ZbbEq19zMPW1g5D+euGrlHu9MeyQhoG4Rq730xxN+qT/sgH/NsDYSqd2h+jFmVSU0WO6QVlCglI1NJb5eZkx2ijLGrLvqdaroiVRlnN+SeUfgE/LYVZYKpu30xNXef3wwXF+Wv2VG/41vlHIfLo/DDRac8eu/rfUg1GlEYhQzSESm2PFvgKbdbI0U7i779ddu6/1kMKV+V6uA17lPjKb9P0NAxAFVeGfcog8gNdHEHHjXodFxxBIJGPKk+fKSkYDkCqtQZwKC008V71iiSjx5HvJx3PGVqajykVvW8sJ7QSUTegmSENtrc0DykhOR/j3PlP+/5xA+1U0hWi3Rd3SihnK7dfAidRTaDw5OMUOEVneEv/DROlB97GSF8Y8feC3fvxCpgQNBeY4SnV0vrJXd2CXuBDHpqkdnOdbE3mfkWL5eqMlDxcemK9ZVDpG0RyIhbt5KHfx4o2FHVIsWMf6/Kh9iI8JE9cn2QkX/9oXyt3YSsitcjfTK7HFVlOXo9846eTAqZemIPq8HSTRyZYJzU1Wm9ZVOtcibbhAxrkTTWJVCAteG7LpW8q5eBAevgm41M1Rl3Uxyb51pjObsu/XSFXxKI3IIn5xDFiescIeE921sWKYKzk0ynrKfjWhajNH1srfm6VCqVS1auKEaaaV7NXT54/HBoJ/YaBZApwDN5GEFZiilDliKZx7waAYsY08ZA+jwBjA5RwVEw86oJr8+4Ewh1Bgn684TlavrZ3zAsXkB33xbSREV1UJVG4zD2EejQMSZAbYfPRL8OYHRF1vRXsRVZqqu3sM/Fz2Ftgwmc2awkGAnFXQKh9fNcVYFW2wUFo5umRzZGXVGqwWzEGr9StfSm3zDXcZZPxnV/Cd1iFSVzgatDvTSuWKUV1v/LyLAIi640XmaXvCPC3zqQBMjHr81G08xlOO4bVkGyW+amIEs22CpiOMdgKeyJNmVw3L56JWtBuWhbT7GUrRLxm5CqoTwS5wzm46HWQqi97gCLAeb1HGkj72O05OjNcpUbg/+F9M4cV0I9xxHnIVa4CDDbvXUUOP3RROufnq3Xvw/9fXWigKXLFPpJkDOyYF3fmLt19NCbK/dbVMz6j0940RTFt0wHIb2B3o7dc74cBig0j9vliWED97BpiP/03ZuDMhv3bq+c33NnO/vxLqghDBRW9XsltvVXH/A87QGMIixGQEgFOhzHq8dvof1RP/s9ShNZZmzW9zgddKfAGESVFYezxP+rNR01kgUv+OaaMicbtLDrUCK5nE6vpB+1NOG0NzTAye0iMGgJXxcA8gUUT/BGtVpROD3EJfqmaORB5Nf1S+NjEpJXozvmiK7dg3SD3t74zA8oyOQxKApshxPFwRLXVNJiuNBeXEHa3rzIzH48XgZNBy9ddIfd5EmGiHm1me+268HUUbCoVJ/oZeIyGvWnLgPlbWmzPZeuzEj6/5g2GnyoMhnW5nHrqM15jhGmp7qId1pckgRwqv3+gQ2cECYihqWrwcq0dJcaMVw7ggj3OZ20kxa6axpXBo9KQKmTcerFU2YGUj6gm6vzn7NGOyU0OOJI7HuJc8YxcStw5Cz6OCzeUQR8uX3ojtUqhzcpk96dvUkN1hWsYsPChibLAn54MVYvUgLyBsSiSfHmjeTlZz/ViE4qUhga/v98PvQYgbz54YpLKH8+HVIBehmLo77DXfhnxZU3iRJhjbguYo7yibomNA+la/UA8YHlI0BvpXwvds7b7W63ydOS9TiOvUIyUPSki8p4wGXtzH7BU5gKJw89b+j4wjz7qE+RE4NjiC5M9UZTnCRnBHDb38LKOAqMfsYbMsLApvP7MWMm8jIYhXyI0XOK1KaXUp5kNPwSW6j3ijRM/r8nhBqJQUrpmNMMKgIZ3AePiKnoJrJWk3EMZCfwgGn6KwgZ1XIhawKp11ogxshrKKeIph0JXDXXrZMzRfgLUkP716iZp/2tHVtTEm8PvBdO6uynQe7/E2kdnRblpokqGzujeiNG70FImM6nwCKo0bP3v30ABYUedYC8sjtB2PXx73MC2ASDsIlldyvQp3MCdWUXP2OVXTZ/srQ3RUXNICu3Q6YGOttbvr/06Ub8qiLlkruZcKEMePOzx+Jevei7VAUhnuAPaZ+5KsxwcJuD1TGdrk+7XDWxxkCNtw4+2M5pzosxQsOO0TPbntcIUr5zyNAgwyY2GMZhKAxiWSW80puUgF3mN6B/asqPl4cTtbFGEXMpSRb34j/SlaeTEbfxGfzgRGBR1AojzFzPs4weXedP2syTeLGB+E8xleVFLh/mdb+TlSoBLSzU1wnLEGOXw5Kh2EAF7xi8uDaug5XQ10npMmI7HWWb43rMPH4i4BeoQa7eTYM/TprW8419T78lJGziDRQ5HwnVeeS+tuJZzijh5LXcg9QD9tIF9IT359VQITwJvCeLX2f3QisOsrRYLVg2ZGhxiFErttRzkIS6r8tGmWszgl9b+RFwXBqnKcL5JfpMQFMP3x21o2e6b2U33it+ucsdxefXWpnLfbu6kctw72sSRirHJu+R6eXfON/WITyWXD9cwC9gNrOEwjBWX8QMaMlkgFeL6T8oDzXYeDxidVG2TE2i8w3DgJPika28q5uBQLmvCLGe1/gLP1bEA5bdh7OOjsXoO9Eyc/eZhZ68Kc15SkwMgz6jn14VqB0dSzLl68BMtneb1a3XYl/KAi4XJFTQqs2a74rzwJhW1Ij/v5Zt2WtJjmo3OR+fFuex1mjgFZ9FnrYsRuX7iuSqQ3SxTTFYfxb401QdUFpkQYY982miJa0kPxYdr/dPyQlNfGzKAlmIow9Bxpl39sIwYnQK6FgOz7IvEsRdr+wgrOk5G1hZktqVyFtFyIYUzlUSqCT95M6qSvjYxLWSW72r1c7H7JB8cWGh9pX3PBI7RFFu2bNfARQAV0YmuxX+nanhFuMGfiBbALgzOY2QG55uK2uJYJ9bd0BH9wuO8FO+LYSSUYx3TKXiEP6TZSJAvacf2H44n/YBgwhaxWQfYqFKE3OGtHPwgHoSpGyao1Jy2uPYrXYTT9kG+96beGq1vqF/xC6Dzo3D93RDSPXZqECVKU4MsC6+oNnAApIL0H1AilMyppO55kj+ckBCJvghpINb0ZppRihnHJF6KGpnHT7xGvAKgM+1A0Pgj+9cWjQC5BvEJjEyaq10gotHur3t7+DW3aJykESOhro82XXtG/866/N2aJCxPb9eVY6AxAAhfzAIwyH3FoUakBlFPRBB88AY/+9ZZDCd9wk0ONemPJB7/VoD1xuMBHhek1iG26Se7XzDyNmA5QsGja96vIcwXSy9Kx6np0ch82jqMdSWwtAk8m7zvaQgmVdlKKB5nQ9I5hGlEYbmNk0r5IVafjWzAl/H8eEyYrYVN9Q+adFkmK+R8sXBwXBCnti57ujzzHMmG1PYlEQlxqoQ/nnZKsMzsCeQRkWWRRXIBjdt8T309+qQBYcf5/3WmBt3FSUTgifbb5CBbtu7eKI7fLFXPg7IwYLjmka36mJMkFfsNK/SrWV13WV9gKXR8N4Yfc+3Q9i/1wQyuavHlSztb4ITOnpg9+XkEoPrasbehFD3JzPrAimcVspiNqVJD+iQ0XosoSXGmwr953gWJP+Fy8XnML68VuKf+z9cp9NTK3/hT9aOC4Wkz8F6i4V30Kqv6MUTDeqwUGof8H/gCRSfOI/ESWAAulJI2AKBYjlHbmjvTTdCqVzHzI5mZ2s++Rf4SqYwCKFCkmogMAKgwm24kP7qrC/lhmlIN8TgqyftQzTUD8gXyf/0sE3OaooulFcBVX0RliMmB1tt0tIoY+agA067hzQ7sMaPoyDWvdMALv3kzCJDAfu6hpz4vWdR0t/7WCdyTjT9lcXGKkk9+tOzGdRTS/YnQBwTfkkabBDueifmQzAJt56rqe9VO5iaAOjwqIgF4b95kdh9mnb5DrGo/6xACX/ZFEaY+lKpWs+dzBZy1lL0ABz6aOBPtdDQDWzUljMtsQvLodQanYcciVR4c4FCmjlxiMCm/x67lkU8a1vhbXljryWGzh7dy5GNVtZFMQH/IYZxkkDkioNNG4yVHQFvjTdF24z28PlwlLs8tjTaLrU3eLBSIOeW5/t2QFEq8KqYRcujSdE1uUWnoQMiAOlXvnikqN0DT054BplZQRhqjQoWoC0xt1VDZZKui/IPXK7pB07eKy01jCi7ihso6wwztURSLi3xIj+O6XDQskCT9ZLmk1dy4vB8wvkik4MR9xxpTH8smolXhdmrXSjLrHqZuispz4qLNa/qxSPM2yEgdppU5tmKLt4IdIm4QURluDKSfqZShADwOLb5z+joisX/awUTca48XkcJjr43ium24J7ywxr4a/nl7SK/rJD7wujBIgq+8/OH7/aCFsHzfHGd3AYMxql3y/xFGl4jUjJApPI15nPVsv1OFUT2v3iGEzOu/a5DZ9DaGNWDMtS2xNDlyG+xc2VRCh2lIKGWigYGJiw3JwlWbxiTpxt3t+m6PTMfWQO3IK9gaqRPUh4uR1Nrtd72hodqpvxajug6lSyn4JLSQ6O/+0QDNWiiPkkKBRZ4rPZtNgksBxBHKY0RPJHIhixxxo2QdFXbhtGBjdHiIZZzKn3+nSWuKEENA38Vr4BSdZf6zuBP6msuvc+Q/0MQkHbj/+zKzwUM8+4XvxhQz5O9mBGnTArjCfvbAFa6nr5pOLgcDnxFCsCXSEk/bvUUb8BfCqRJkhzd6RX9BrzYzbZKI3pOucC5bbySwL+NfYTd0H9CB8cFX/PXRQHnCux5SD1L8SyVzQprzJk6OYeaY+jRoisOl7llmfkmVCSMP6NA0cKFBT8n0+Xhm5nYhc6NsO/tKlPdeqjS6lcGR/IrhOd6E5Qh2O3PvzRd7NetNSZG3UlDAqRh9xgtJ3l/XvR/ruIRVIlfaTAzTNolLap5psRGoUvrgbeFS6Qc0jv1Xs/+ZECtg1eBCEzNZ+1oGHRWmiq0WFUzV4XCxvqA+42N58+Dtd5Iks/3zsw7SlM7/cXqoXMKNnsTVskx/h5L3yLsIiOgOpRxts9kJdCJ0EvTh3y55ArvNie42gWD60G9qpefdi71S14thVqY/Iva0q2gTESiRzvo13esWasCf63iOwJfMSJhTKrandVQTOSpXWdmc4TAxpzI9+s2irnEbfgqEZqc5tppXp3Wt5Ndi6ffp/taDoPp3gftNiJOnjj5wbxJcef89/x/q0niHRcbvn4lQr8z2pYqB7mqX1xWjWKY6nh0Gci5Spd/sBsZqyxdO0ybXQ0pG6EBeEnbQAPyJkURvORB4XD2RSBWsdcIO5eX7+cnwqpmHZBkBDsEHtBukcFlbKEWpsb+Oa4uN0+oLacHPLYe4tXvJv6v+xQPtk7rVb4SypARBhnEViCZVdfbMxRRwZzF3dDKafHPff/ZlcvZqJ0QQK1NxdTTxtqV+4mKsQH6GCV6fCloq/qlWb0qP+L14klSfklX4fyd+DHGlOqGa6E+pfjclfQddyvZmWANByRH+8EHKxEv6qKrq07blY9MzdijwkMs69zKgvpu8M3cznmlNqC05SheGeyo/FewZOJRgf+BqkKaGeGZJw0aDdYgSQlWb9j3tqVVVHrVCklppUfD0oKBQgybx3h3/Fka/BYqteM/fzXeB9phVshxzzZazitzvLaDDfYDgRH1b8OsudRbvNjDdddYg7j0KexulX67U/XePWTzb7YX4bIPjfb6L86f8hitFVvqjq3F7u5x8Kdy2VZQABGBYYjd9g/9vaigzC3BFzeEfIkdi9EhgyI4SrFLumtTXTys931uRLGrLxgAtr+ZT3GmrCUFrjWDsiTUCRLM+Ukx3SSJMsNhLxsXouv3GusxLK14tnKKoUADkLuFb5PwDPTMWhD7Bx5ElxRXkrx9/Dxi/CNCwRdGZDTyk8dSMWutSHPi2W/BFPGsAcexJKRA7UY9YWOL+7Ygc7KeqsIyUyTK1q2Qwp0pBf1xgQCFR+5aEpKvQ0ArIqdLIsGpQTkDC74gAR0ZIo56EvDaEFbET6lJqs+y5/egbAkysoJVOcqhB3kU0iVwT++hzaGWMOkb8ByZm6m8T3AW/fc44Ok/WNZGerq6eZH6+zYC3YfxpYC0aMPKWJgk3oUdL2t6jvsO/puP17FR8mx+aLLNCOqFJBA5WCdtoL9aL/oTeELCtMAANfQR86zFYh7d/2t0JMkZXkfXG0Oom3AXeRSPqa8yX2KiL/gJHOt3DpTYI5ZVFOT6omVZGi+lHfxJvxST/FINdkcj0RHiqJj2AAfx3zqZiddkbu9yvP1EWzvs2LYgqbVslESvSNisiW+q6pZLN7fYj7+WCOcxOWZedr8RNgbuWShceijGuDQjblgc6FA+IzwAFyHOiXFGXbpI5Ie0L3AYq5QOF8AOWwjFOJOUPTVeCL9447yFI+SFi+zguEEUG/Pnfkuhz9dC9T/zepvngt1+Z/QFAgA6pZVs2TJ0nDAKOjhuh5lj9simsfBd6PpZK1mAsRCktUnDXSZIx9A+dtPAJqcAWMeP9M6eHn7soMraDEWbgBHSFnecgOhfyNZFDNHpZoh9MtX4NeLkhvLxH4c2AwvFB1sHStm4L65xr1EUMpBNmGgtczlzA+HPNy3gfmM6aoSL0abSnLcyt/9JW/IriXgokt+jnja4RDLG1nL8zZbz/gdCR8X+v/lHUoIOSPeT8ReuaxJZdBv7EzAfkiPWOxeWQpRN9W2d4V3adkz5x14jPaYpFgmDP3+o/QXdOiyzZjxbASufFSWhjsU3BgDtNBnGfu5r+YiqEXAt8li5t1A/L7oGA3dTcmG9EIyveywW7iQq4cAHtjASh8Q+1SGblcLXByCb4Sne+ULswAqR3oAVnIMM87tsmo32fGEvci8OmPJx9iz89aMDt8iKNb6srbnvBnUjjU0zpcw9sFzxBQ/wBznsT9jBe0uj4h+mP+lNayS5+YyDRkHW7jfdN9exzDrlCABhjeyy/p5Mb3eueA/YAAAAAA=="},
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
    phone:"054-515-7773",
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
// ─── דירוג FIP (עדכון ידני) ──────────────────────────────────────────────────
// לעדכון: היכנס ל-https://www.padelfip.com/fip-rankings , והעתק את 10 הראשונים
// בכל קטגוריה. עדכן name / country / points / change. הדירוג הרשמי אישי (לא זוגי),
// כך שלכל שחקן נקודות משלו. עדכון רשמי שבועי (24ש' אחרי טורניר).
// change: "▲" עלה  "▼" ירד  "—" ללא שינוי
const RANKINGS = {
  men:[
    {rank:1,name:"Arturo Coello",country:"🇪🇸",partner:"Agustín Tapia",partnerCountry:"🇦🇷",points:"21,551",change:"—"},
    {rank:2,name:"Agustín Tapia",country:"🇦🇷",partner:"Arturo Coello",partnerCountry:"🇪🇸",points:"21,551",change:"—"},
    {rank:3,name:"Alejandro Galán",country:"🇪🇸",partner:"Federico Chingotto",partnerCountry:"🇦🇷",points:"17,626",change:"—"},
    {rank:4,name:"Federico Chingotto",country:"🇦🇷",partner:"Alejandro Galán",partnerCountry:"🇪🇸",points:"17,626",change:"—"},
    {rank:5,name:"Juan Lebrón",country:"🇪🇸",partner:"Leo Augsburger",partnerCountry:"🇦🇷",points:"7,440",change:"—"},
    {rank:6,name:"Franco Stupaczuk",country:"🇦🇷",partner:"Mike Yanguas",partnerCountry:"🇪🇸",points:"7,290",change:"—"},
    {rank:7,name:"Mike Yanguas",country:"🇪🇸",partner:"Franco Stupaczuk",partnerCountry:"🇦🇷",points:"6,909",change:"—"},
    {rank:8,name:"Leo Augsburger",country:"🇦🇷",partner:"Juan Lebrón",partnerCountry:"🇪🇸",points:"6,164",change:"▲"},
    {rank:9,name:"Jorge Nieto",country:"🇪🇸",partner:"Paquito Navarro",partnerCountry:"🇪🇸",points:"5,869",change:"▲"},
    {rank:10,name:"Paquito Navarro",country:"🇪🇸",partner:"Jorge Nieto",partnerCountry:"🇪🇸",points:"5,824",change:"▼"},
  ],
  women:[
    {rank:1,name:"Gemma Triay",country:"🇪🇸",partner:"Delfina Brea",partnerCountry:"🇦🇷",points:"17,757",change:"▼"},
    {rank:2,name:"Delfina Brea",country:"🇦🇷",partner:"Gemma Triay",partnerCountry:"🇪🇸",points:"17,757",change:"▼"},
    {rank:3,name:"Bea González",country:"🇪🇸",partner:"Paula Josemaría",partnerCountry:"🇪🇸",points:"14,690",change:"—"},
    {rank:4,name:"Paula Josemaría",country:"🇪🇸",partner:"Bea González",partnerCountry:"🇪🇸",points:"14,690",change:"—"},
    {rank:5,name:"Ariana Sánchez",country:"🇪🇸",partner:"Andrea Ustero",partnerCountry:"🇪🇸",points:"13,050",change:"▲"},
    {rank:6,name:"Andrea Ustero",country:"🇪🇸",partner:"Ariana Sánchez",partnerCountry:"🇪🇸",points:"13,050",change:"▲"},
    {rank:7,name:"Claudia Fernández",country:"🇪🇸",partner:"Sofía Araújo",partnerCountry:"🇵🇹",points:"11,900",change:"▲"},
    {rank:8,name:"Sofía Araújo",country:"🇵🇹",partner:"Claudia Fernández",partnerCountry:"🇪🇸",points:"11,900",change:"▲"},
    {rank:9,name:"Tamara Icardo",country:"🇪🇸",partner:"Claudia Jensen",partnerCountry:"🇩🇰",points:"6,300",change:"—"},
    {rank:10,name:"Claudia Jensen",country:"🇩🇰",partner:"Tamara Icardo",partnerCountry:"🇪🇸",points:"6,300",change:"—"},
  ],
};
const ISRAEL_NEWS = [
  {title:"ONE: הענף העולה — הפאדל תופס תאוצה אצל הנשים בישראל",time:"יוני 2026",category:"ישראל",hot:true,url:"https://www.one.co.il/Article/526611.html"},
  {title:"כלכליסט: מינגלינג בין החבטות — 150 מגרשים, 35 מועדונים בישראל",time:"אוגוסט 2025",category:"ישראל",hot:false,url:"https://www.calcalist.co.il/style/article/r1sqjfecll"},
  {title:"מאקו: מגרשי הפאדל כובשים את ערי ישראל — רעננה, רמת גן, אילת ועוד",time:"דצמבר 2025",category:"ישראל",hot:false,url:"https://www.mako.co.il/living-architecture/local/Article-1c0734d09362b91026.htm"},
];
const WORLD_NEWS = [
  {title:"🏆 ויאדוליד P2: קואלו/טאפיה עם התואר השלישי ברציפות — ניצחו את גלאן/צ׳ינגוטו 6-4, 6-2 בגמר",time:"29 יוני 2026",category:"טורניר",hot:true,url:"https://premierpadel.com/en/news"},
  {title:"בea גונסאלס וחוסמריה עם התואר השישי העונה — ניצחון 6-4, 6-2 על סנצ׳ס/אוסטרו בוויאדוליד",time:"29 יוני 2026",category:"טורניר",hot:true,url:"https://premierpadel.com/en/news"},
  {title:"קואלו וטאפיה מרחיבים את היתרון בראש דירוג ה-RACE לקראת בורדו",time:"יולי 2026",category:"עולם",hot:false,url:"https://www.padelfip.com/ranking-male/"},
  {title:"הטורניר הבא: בורדו — Premier Padel ממשיך את עונת 2026",time:"יולי 2026",category:"עולם",hot:false,url:"https://premierpadel.com/en/calendar"},
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
          {club.phoneDirect && <a href={"https://wa.me/972"+club.phoneDirect.replace(/[^0-9]/g,"").replace(/^0/,"")} target="_blank" rel="noopener noreferrer" style={{color:"#25d366",fontSize:13,textDecoration:"none",display:"block",marginBottom:6}}>💬 {club.phoneDirect}{club.phoneDirectLabel?" — "+club.phoneDirectLabel:""}</a>}
          {club.email && <a href={"mailto:"+club.email} style={{color:DIM,fontSize:13,textDecoration:"none",display:"block",marginBottom:6}}>✉️ {club.email}</a>}

        </div>

        {/* Booking button */}
        {club.instagram && (
          <a href={club.instagram} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none",marginBottom:10}}>
            <button style={{width:"100%",padding:"12px 0",fontSize:14,background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",color:"#fff",border:"none",borderRadius:3,fontWeight:700,cursor:"pointer",fontFamily:"Heebo,sans-serif"}}>📸 עקבו באינסטגרם</button>
          </a>
        )}
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
      // פידים ישירים ממקורות פאדל רשמיים — בלי rss2json (שדורש מפתח API)
      const feeds = [
        "https://www.padelfip.com/feed/",
        "https://padel-magazine.co.uk/feed/",
        "https://www.padelnuestro.com/blog/feed/",
      ];
      const fetchFeed = async (u) => {
        const res = await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(u));
        const xml = await res.text();
        const doc = new DOMParser().parseFromString(xml, "text/xml");
        return { items: Array.from(doc.querySelectorAll("item")).slice(0,4).map(it => ({
          title: (it.querySelector("title")||{}).textContent || "",
          link: (it.querySelector("link")||{}).textContent || "",
          pubDate: (it.querySelector("pubDate")||{}).textContent || "",
        })) };
      };

      // סינון איכות: רק כתבות שפאדל בכותרת שלהן, בלי אתרי חדשות מקומיים לא רלוונטיים
      const isRealPadelNews = (a) => {
        const title = (a.title||"").toLowerCase();
        const url = (a.url||a.link||"").toLowerCase();
        const blockedSites = ["chroniclelive","planning-applications","dailymail","the-sun.","liverpoolecho","manchestereveningnews","renfrewshire","dailyrecord","expressandstar","kentonline","yorkshirepost","lancs.live","walesonline","edinburghlive","glasgowlive","cheshire-live","stokesentinel","nottinghampost","leicestermercury","hulldailymail","bristolpost","plymouthherald","cornwalllive","devonlive","essexlive","hertfordshiremercury","cambridge-news","mylondon","getsurrey","hampshirelive","sussexlive"];
        if(blockedSites.some(b=>url.includes(b))) return false;
        // חסימת ידיעות תכנון/מועצות מקומיות — לא רלוונטי לקהל ישראלי
        const localJunk = ["council","planning application","planning permission","plans to create","plans for","green light","approved by","unveils plan","proposal","residents","objection","neighbour","car park","leisure centre"];
        if(localJunk.some(w=>title.includes(w))) return false;
        return title.includes("padel") || title.includes("פאדל");
      };
      // מושך במקביל: ה-API שלנו + פידים ישירים ממקורות פאדל איכותיים
      let cleanApi = [];
      try {
        const apiRes = await fetch("/api/news"); const apiData = await apiRes.json();
        cleanApi = (apiData.articles||[]).filter(isRealPadelNews);
      } catch(e){}
      const results = await Promise.allSettled(feeds.map(fetchFeed));
      
      const articles = [];
      results.forEach(r => {
        if(r.status==="fulfilled" && r.value.items) {
          r.value.items.forEach(item => {
            if(item.title && item.link && isRealPadelNews({title:item.title,url:item.link})) {
              // Calculate time ago
              const pub = new Date(item.pubDate || Date.now());
              const diff = Date.now() - pub.getTime();
              const hours = Math.floor(diff/3600000);
              const days = Math.floor(hours/24);
              if(days > 30) return; // כתבות ישנות לא נכנסות
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

      // מאחד: כתבות RSS ממקורות רשמיים + תוצאות ה-API, מסיר כפילויות לפי כותרת
      const seen = new Set();
      const combined = [...articles, ...cleanApi].filter(a => {
        const k = (a.title||"").slice(0,60);
        if(seen.has(k)) return false; seen.add(k); return true;
      });
      if(combined.length > 0) {
        combined.sort((a,b) => (b.hot?1:0) - (a.hot?1:0));
        setWorldNews(combined.slice(0,6));
        setLastUpdated(new Date().toLocaleTimeString("he-IL"));
      } else {
        // Fallback: use GNews API with padel keyword
        const gnews = await fetch("https://gnews.io/api/v4/search?q=padel&lang=en&max=6&apikey=demo");
        if(gnews.ok) {
          const gdata = await gnews.json();
          if(gdata.articles && gdata.articles.length > 0) {
            const mapped = gdata.articles.filter(isRealPadelNews).map(a => ({
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

  // משיכת חדשות טריות אוטומטית בטעינת הדף (פעם אחת)
  useEffect(() => { fetchWorldNews(); }, []);

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
                    <a href={"https://wa.me/972"+item.phone.replace(/[^0-9]/g,"").replace(/^0/,"")} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none"}}>
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

function PadexShowcase({lang}) {
  const isEn = lang==="en";
  const [idx,setIdx] = useState(0);
  const sx = useRef(0);
  const n = PADEX_RACKETS.length;
  const go = (d) => setIdx((i)=>(i+d+n)%n);
  const cur = PADEX_RACKETS[idx];
  const arrow = {position:"absolute",top:"42%",transform:"translateY(-50%)",zIndex:2,width:40,height:40,borderRadius:"50%",border:"1px solid rgba(200,169,110,0.5)",background:"rgba(8,18,36,0.75)",color:"#e8c88a",fontSize:22,lineHeight:1,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"sans-serif"};
  return (
    <div style={{marginBottom:44}}>
      <Glass style={{borderRadius:6,padding:"26px 24px",position:"relative",overflow:"hidden",border:"1px solid rgba(200,169,110,0.5)",boxShadow:"0 0 40px rgba(200,169,110,0.12)"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#c8a96e,#e8c88a)"}} />
        <div style={{position:"absolute",top:14,insetInlineEnd:16,background:"linear-gradient(135deg,#c8a96e,#e8c88a)",color:"#04080f",fontSize:10,fontWeight:800,padding:"4px 12px",borderRadius:20,letterSpacing:1}}>★ {isEn?"Sponsored":"מקודם"}</div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
          <span style={{fontSize:30}}>🎾</span>
          <h3 style={{fontWeight:900,fontSize:26,color:SILVER,letterSpacing:1}}>Padex</h3>
        </div>
        <p style={{color:GOLD,fontSize:15,fontWeight:500,marginBottom:18}}>{isEn?"The highest quality rackets at the most worthwhile price":"מחבטים באיכות הכי גבוהה שיש במחיר הכי משתלם שיש"}</p>
        <div style={{position:"relative",maxWidth:430,margin:"0 auto"}}
          onTouchStart={e=>{sx.current=e.touches[0].clientX;}}
          onTouchEnd={e=>{const dx=e.changedTouches[0].clientX-sx.current; if(dx>40)go(-1); else if(dx<-40)go(1);}}>
          <button onClick={()=>go(-1)} style={{...arrow,insetInlineStart:0}} aria-label="prev">‹</button>
          <button onClick={()=>go(1)} style={{...arrow,insetInlineEnd:0}} aria-label="next">›</button>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:290}}>
            <img src={cur.img} alt={cur.name} style={{maxWidth:"72%",maxHeight:278,objectFit:"contain",filter:"drop-shadow(0 12px 30px rgba(0,0,0,0.55))"}} />
          </div>
          <div style={{textAlign:"center",color:SILVER,fontWeight:800,fontSize:17,marginTop:2}}>{cur.name}</div>
          <div style={{display:"flex",justifyContent:"center",gap:9,marginTop:12}}>
            {PADEX_RACKETS.map((r,i)=>(
              <button key={i} onClick={()=>setIdx(i)} aria-label={r.name} style={{width:10,height:10,borderRadius:"50%",border:"none",cursor:"pointer",padding:0,transition:"all .2s",background:i===idx?"#e8c88a":"rgba(200,216,240,0.25)"}} />
            ))}
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:22}}>
          <a href="https://padex.com.co" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button style={{background:"linear-gradient(135deg,#c8a96e,#e8c88a)",color:"#04080f",border:"none",padding:"12px 42px",borderRadius:3,fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1}}>{isEn?"Visit Padex ↗":"לאתר Padex ↗"}</button>
          </a>
        </div>
      </Glass>
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
          <a href="https://wa.me/972545157773" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button style={{background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",border:"none",padding:"12px 28px",borderRadius:3,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1}}>
              {isEn?"💬 Contact for Advertising":"💬 צור קשר לפרסום"}
            </button>
          </a>
        </div>
      )
    },
    accessibility:{
      title: isEn?"Accessibility Statement":"הצהרת נגישות",
      body:(
        <div style={{lineHeight:1.9,fontWeight:300,fontSize:14,color:"#7a96b8"}}>
          <p style={{marginBottom:14,color:SILVER,fontSize:15,fontWeight:500}}>{isEn?"Padel One is committed to making its website accessible to all, including people with disabilities.":"Padel One מחויב להנגיש את האתר לכלל הציבור, לרבות אנשים עם מוגבלות."}</p>
          <p style={{marginBottom:10}}>{isEn?"We strive to comply with the Israeli accessibility standard (IS 5568, based on WCAG 2.0 level AA).":"אנו פועלים בהתאם לתקן הישראלי 5568 (מבוסס על הנחיות WCAG 2.0 ברמה AA)."}</p>
          <p style={{marginBottom:8,color:SILVER}}>{isEn?"The site includes an accessibility menu (the ♿ button, bottom-left) offering:":"באתר תפריט נגישות (כפתור ♿ בפינה השמאלית-תחתונה) המאפשר:"}</p>
          <div style={{marginBottom:14}}>
            <p style={{marginBottom:6}}>• {isEn?"Increase / decrease text size":"הגדלה והקטנה של גודל הטקסט"}</p>
            <p style={{marginBottom:6}}>• {isEn?"High-contrast mode":"מצב ניגודיות גבוהה"}</p>
            <p style={{marginBottom:6}}>• {isEn?"Readable font":"גופן קריא"}</p>
            <p style={{marginBottom:6}}>• {isEn?"Link highlighting":"הדגשת קישורים"}</p>
            <p style={{marginBottom:6}}>• {isEn?"Large cursor":"סמן עכבר גדול"}</p>
            <p style={{marginBottom:6}}>• {isEn?"Stop animations (incl. the 3D background)":"עצירת אנימציות (כולל הרקע התלת-ממדי)"}</p>
          </div>
          <p style={{marginBottom:10}}>{isEn?"Despite our efforts, some areas may not yet be fully accessible. We are continuously working to improve.":"למרות מאמצינו, ייתכן שחלקים מסוימים באתר טרם הונגשו במלואם. אנו פועלים לשיפור מתמיד."}</p>
          <p style={{marginBottom:6,color:SILVER}}>{isEn?"Found an accessibility issue? Contact our accessibility coordinator:":"נתקלתם בבעיית נגישות? צרו קשר עם רכז הנגישות:"}</p>
          <p style={{marginBottom:14}}>✉️ <a href="mailto:onepadel24@gmail.com" style={{color:"#8fb0e0"}}>onepadel24@gmail.com</a></p>
          <p style={{fontSize:12,color:"#5a7a98"}}>{isEn?"Statement last updated: June 2026":"הצהרת הנגישות עודכנה לאחרונה: יוני 2026"}</p>
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
const NAV_IDS = ["home","tournaments","clubs","brands","marketplace","world","rankings","travel","news"];

// ─── ACCESSIBILITY MENU ─────────────────────────────────────────────────────
function AccessibilityMenu(){
  const [open,setOpen]=useState(false);
  const [font,setFont]=useState(0);
  const [f,setF]=useState({contrast:false,readable:false,links:false,bigcursor:false,stopmotion:false});

  useEffect(()=>{
    try{
      const s=JSON.parse(localStorage.getItem("a11y")||"null");
      if(s){ setFont(s.font||0); if(s.f) setF(p=>({...p,...s.f})); }
    }catch(e){}
  },[]);

  useEffect(()=>{
    document.documentElement.style.zoom = font===0 ? "" : String(1+font*0.1);
    const h=document.documentElement;
    h.classList.toggle("a11y-contrast",f.contrast);
    h.classList.toggle("a11y-readable",f.readable);
    h.classList.toggle("a11y-links",f.links);
    h.classList.toggle("a11y-bigcursor",f.bigcursor);
    h.classList.toggle("a11y-stopmotion",f.stopmotion);
    try{ localStorage.setItem("a11y",JSON.stringify({font,f})); }catch(e){}
  },[font,f]);

  const tog=(k)=>setF(p=>({...p,[k]:!p[k]}));
  const reset=()=>{ setFont(0); setF({contrast:false,readable:false,links:false,bigcursor:false,stopmotion:false}); };

  const item=(label,active,onClick)=>(
    <button onClick={onClick} style={{
      display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",
      padding:"11px 13px",margin:"5px 0",borderRadius:10,cursor:"pointer",
      border:"1px solid "+(active?"#c8a96e":"rgba(120,160,220,0.25)"),
      background:active?"rgba(200,169,110,0.16)":"rgba(8,18,36,0.6)",
      color:"#e6eefc",fontSize:15,fontFamily:"inherit",textAlign:"right",
    }}>
      <span aria-hidden="true" style={{color:active?"#c8a96e":"#8fb0e0",fontWeight:700}}>{active?"●":"○"}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <style>{`
        html.a11y-contrast body, html.a11y-contrast body *{background-color:#000 !important;color:#fff !important;border-color:#fff !important;}
        html.a11y-contrast a, html.a11y-contrast a *{color:#ffea00 !important;}
        html.a11y-contrast .cyber-bg{display:none !important;}
        html.a11y-readable *{font-family:Arial,"Helvetica Neue",sans-serif !important;letter-spacing:.4px !important;line-height:1.7 !important;}
        html.a11y-links a{text-decoration:underline !important;outline:2px solid #c8a96e !important;outline-offset:2px;}
        html.a11y-bigcursor, html.a11y-bigcursor *{cursor:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='42' height='42' viewBox='0 0 24 24'><path fill='black' stroke='white' stroke-width='1.5' d='M4 2l16 9-7 1 4 8-3 1-4-8-6 5z'/></svg>") 4 2, auto !important;}
        html.a11y-stopmotion *{animation:none !important;transition:none !important;scroll-behavior:auto !important;}
        html.a11y-stopmotion .cyber-bg{display:none !important;}
        .a11y-fab:focus-visible, .a11y-panel button:focus-visible{outline:3px solid #c8a96e !important;outline-offset:2px;}
      `}</style>

      <button className="a11y-fab" aria-label="פתיחת תפריט נגישות" aria-expanded={open}
        onClick={()=>setOpen(o=>!o)}
        style={{position:"fixed",bottom:18,left:18,zIndex:9999,width:54,height:54,borderRadius:"50%",
          cursor:"pointer",border:"2px solid #c8d8f0",background:"#0a1830",color:"#c8d8f0",
          fontSize:26,lineHeight:1,boxShadow:"0 6px 20px rgba(0,0,0,0.5)",
          display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span aria-hidden="true">♿</span>
      </button>

      {open && (
        <div className="a11y-panel" role="dialog" aria-label="אפשרויות נגישות" dir="rtl"
          style={{position:"fixed",bottom:82,left:18,zIndex:9999,width:270,maxWidth:"86vw",
            background:"rgba(6,14,28,0.97)",border:"1px solid rgba(120,160,220,0.3)",borderRadius:16,
            padding:16,boxShadow:"0 16px 50px rgba(0,0,0,0.6)",fontFamily:"inherit"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <button onClick={()=>setOpen(false)} aria-label="סגירת התפריט" style={{background:"none",border:"none",color:"#8fb0e0",fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
            <strong style={{color:"#c8d8f0",fontSize:16}}>תפריט נגישות</strong>
          </div>

          <div style={{display:"flex",gap:8,margin:"6px 0 10px"}}>
            <button onClick={()=>setFont(v=>Math.max(v-1,-2))} aria-label="הקטנת טקסט" style={{flex:1,padding:"9px",borderRadius:10,border:"1px solid rgba(120,160,220,0.25)",background:"rgba(8,18,36,0.6)",color:"#e6eefc",fontSize:18,cursor:"pointer"}}>א−</button>
            <button onClick={()=>setFont(v=>Math.min(v+1,5))} aria-label="הגדלת טקסט" style={{flex:1,padding:"9px",borderRadius:10,border:"1px solid rgba(120,160,220,0.25)",background:"rgba(8,18,36,0.6)",color:"#e6eefc",fontSize:18,cursor:"pointer"}}>א+</button>
          </div>

          {item("ניגודיות גבוהה",f.contrast,()=>tog("contrast"))}
          {item("גופן קריא",f.readable,()=>tog("readable"))}
          {item("הדגשת קישורים",f.links,()=>tog("links"))}
          {item("סמן עכבר גדול",f.bigcursor,()=>tog("bigcursor"))}
          {item("עצירת אנימציות",f.stopmotion,()=>tog("stopmotion"))}

          <button onClick={reset} style={{width:"100%",marginTop:8,padding:"10px",borderRadius:10,border:"1px solid rgba(200,80,80,0.4)",background:"rgba(60,20,20,0.4)",color:"#ffd0d0",fontSize:14,cursor:"pointer"}}>איפוס הגדרות</button>

          <p style={{margin:"11px 2px 0",fontSize:11,color:"#6a84a0",lineHeight:1.5}}>נתקלתם בבעיית נגישות? כתבו לנו: onepadel24@gmail.com</p>
        </div>
      )}
    </>
  );
}

// ─── 3D CLUB MAP ────────────────────────────────────────────────────────────
function ClubMap3D({ clubs, onSelect, lang }){
  const isEn = lang==="en";
  const COORD = {
    "תל אביב":[32.083,34.781], "רמת גן":[32.070,34.824], "חולון":[32.015,34.773],
    "רמת השרון":[32.146,34.840], "בני ציון":[32.226,34.876],
  };
  const minLat=31.96, maxLat=32.30, minLng=34.72, maxLng=34.93;
  const seen={};
  const pins = clubs.map((c,i) => {
    const base = COORD[c.city] || [32.08,34.80];
    const n = (seen[c.city] = (seen[c.city]||0)+1) - 1;   // 0 for first in city
    const lat = base[0] + (n? (n%2? 0.013 : -0.013)*Math.ceil(n/2) : 0);
    const lng = base[1] + (n? (n%2? 0.018 : -0.018)*Math.ceil(n/2) : 0);
    const x = 8 + (lng-minLng)/(maxLng-minLng)*84;
    const y = 12 + (maxLat-lat)/(maxLat-minLat)*74;
    return { c, x, y, i };
  });
  return (
    <div style={{marginBottom:42}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
        <span style={{color:"#8fb0e0",fontSize:13}}>🗺️ {isEn?"Interactive 3D map — tap a pin to view & book a court":"מפה תלת-ממדית — לחצו על סימון לצפייה והזמנת מגרש"}</span>
        <span style={{color:"#4a6a88",fontSize:12}}>{clubs.length} {isEn?"clubs · Greater Tel Aviv":"מועדונים · גוש דן"}</span>
      </div>
      <div style={{perspective:"1100px",height:320,borderRadius:16,overflow:"hidden",position:"relative",
        border:"1px solid rgba(53,224,255,0.22)",background:"#050f22",
        boxShadow:"0 24px 60px rgba(0,0,0,0.45), inset 0 0 70px rgba(53,224,255,0.06)"}}>
        <div style={{position:"absolute",left:"-12%",right:"-12%",top:"-10%",bottom:"-34%",transformStyle:"preserve-3d",
          transform:"rotateX(52deg)",transformOrigin:"center 68%",
          background:"repeating-linear-gradient(0deg,transparent,transparent 30px,rgba(53,224,255,0.10) 30px,rgba(53,224,255,0.10) 31px), repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(53,224,255,0.10) 30px,rgba(53,224,255,0.10) 31px)"}}>
          {/* coastline hint (west) */}
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:"13%",background:"linear-gradient(90deg,rgba(24,70,130,0.5),transparent)",borderRight:"1px dashed rgba(120,180,255,0.25)"}}/>
          {pins.map(({c,x,y,i}) => (
            <button key={i} onClick={()=>onSelect(c)} title={c.name} aria-label={c.name}
              style={{position:"absolute",left:x+"%",top:y+"%",zIndex:Math.round(y),
                transform:"translate(-50%,-100%) rotateX(-52deg)",transformOrigin:"bottom center",
                background:"none",border:"none",cursor:"pointer",padding:0}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{background:"rgba(8,20,40,0.94)",border:"1px solid rgba(53,224,255,0.55)",borderRadius:10,
                  padding:"4px 9px",whiteSpace:"nowrap",boxShadow:"0 6px 16px rgba(0,0,0,0.55)",backdropFilter:"blur(2px)"}}>
                  <span style={{fontSize:14,marginInlineEnd:5}}>{c.image}</span>
                  <span style={{color:"#dce8ff",fontSize:11,fontWeight:700}}>{c.city}</span>
                </div>
                <div style={{width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"7px solid rgba(53,224,255,0.8)"}}/>
                <div style={{width:9,height:9,borderRadius:"50%",background:"#35e0ff",boxShadow:"0 0 14px #35e0ff",marginTop:-1}}/>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PadelIsrael() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [regionF, setRegionF] = useState("הכל");
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
      <AccessibilityMenu />
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
              {[{label:t.btn1,icon:"🏆",id:"tournaments",silver:true},{label:t.btn2,icon:"📍",id:"clubs"},{label:t.btn3,icon:"ball",id:"marketplace"},{label:t.btn7,icon:"🎾",id:"brands"},{label:t.btn4,icon:"🌍",id:"world"},{label:t.btn5,icon:"✈️",id:"travel"},{label:t.btn6,icon:"📰",id:"news"}].map((b,i) => (
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
        <div style={{display:"flex",justifyContent:"center",marginTop:20}}>
          <div style={{flex:"1 1 320px",maxWidth:620,background:"linear-gradient(160deg,rgba(0,56,184,0.10),rgba(200,169,110,0.05))",border:"1px solid rgba(200,169,110,0.3)",borderRadius:14,padding:"32px 28px",textAlign:"center"}}>
            <div style={{fontSize:44,marginBottom:8}}>🇮🇱</div>
            <div style={{display:"inline-block",background:"linear-gradient(135deg,#c8a96e,#e8c88a)",color:"#04080f",fontSize:11,fontWeight:800,padding:"4px 14px",borderRadius:20,letterSpacing:1,marginBottom:14}}>{tourneyBadge(lang)}</div>
            <h3 style={{fontWeight:900,fontSize:30,color:"#ffffff",marginBottom:6}}>{lang==="he"?"פאדל במכביה ה-22":"Padel at the 22nd Maccabiah"}</h3>
            <p style={{color:GOLD,fontSize:16,fontWeight:600,marginBottom:22}}>{lang==="he"?"האולימפיאדה היהודית · נבחרות מכל העולם 🌍":"The Jewish Olympics · National teams worldwide 🌍"}</p>
            <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:22,textAlign:lang==="he"?"right":"left",maxWidth:420,marginInline:"auto"}}>
              <span style={{color:"#c8d8f0",fontSize:15}}><Icon name="date"/>{lang==="he"?"30 ביוני – 14 ביולי 2026":"June 30 – July 14, 2026"}</span>
              <span style={{color:"#c8d8f0",fontSize:15}}><Icon name="pin"/>{lang==="he"?"ישראל · מעל 8,000 ספורטאים מ-55 מדינות":"Israel · 8,000+ athletes from 55 countries"}</span>
              <span style={{color:"#c8d8f0",fontSize:15}}><Icon name="racket"/>{lang==="he"?"קטגוריות: Open · מאסטרס 35+ · מאסטרס 50+":"Categories: Open · Master 35+ · Master 50+"}</span>
              <span style={{color:"#c8d8f0",fontSize:15}}><Icon name="trophy"/>{lang==="he"?"כניסה חופשית לצפייה בתחרויות":"Free entry to watch the competitions"}</span>
            </div>
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(200,169,110,0.3)",borderRadius:8,padding:"16px 18px",marginBottom:24,textAlign:lang==="he"?"right":"left"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{color:GOLD,fontSize:13,fontWeight:800,letterSpacing:1}}>🎾 {lang==="he"?"מצב הטורניר — שלב הבתים":"Tournament status — group stage"}</div>
                <div style={{color:DIM,fontSize:11,fontWeight:300}}>{lang==="he"?"עודכן: 4.7":"Updated: Jul 4"}</div>
              </div>
              {[
                {c:lang==="he"?"נשים Open":"Women Open", t:lang==="he"?<>‏<b style={{color:SILVER}}>פושקרבסקי/לויטין</b> ו<b style={{color:SILVER}}>אברמוביץ׳/מורבצ׳יק</b> בלי הפסד · מפגש צמרת: ראשון 20:30</>:<><b style={{color:SILVER}}>Pushkarevsky/Levitin</b> & <b style={{color:SILVER}}>Abramowicz/Muravchik</b> unbeaten · top clash Sun 20:30</>},
                {c:lang==="he"?"גברים Open":"Men Open", t:lang==="he"?<>‏<b style={{color:SILVER}}>גלושקו/סימון</b>, <b style={{color:SILVER}}>האסקי/בואניש</b> ו<b style={{color:SILVER}}>כהן/כהן</b> שולטים בבתים</>:<><b style={{color:SILVER}}>Glushko/Simon</b>, <b style={{color:SILVER}}>Haski/Bouanish</b> & <b style={{color:SILVER}}>Cohen/Cohen</b> lead their groups</>},
                {c:lang==="he"?"מאסטרס 35+":"Masters 35+", t:lang==="he"?<>‏<b style={{color:SILVER}}>פרידאב/אביטבול</b> ו<b style={{color:SILVER}}>אצ׳אר/אלפיה</b> מובילים ללא הפסד</>:<><b style={{color:SILVER}}>Fridaev/Abitbol</b> & <b style={{color:SILVER}}>Achar/Alfille</b> unbeaten</>},
                {c:lang==="he"?"מאסטרס 50+":"Masters 50+", t:lang==="he"?<>‏<b style={{color:SILVER}}>בקמן/אטבול</b> ו<b style={{color:SILVER}}>צין/מור</b> בראש הבתים</>:<><b style={{color:SILVER}}>Bacman/Etbul</b> & <b style={{color:SILVER}}>Zinn/Mor</b> top their groups</>},
              ].map((r,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:i<3?"1px solid rgba(255,255,255,0.05)":"none",fontSize:13,lineHeight:1.5}}>
                  <span style={{color:"#e8c88a",fontWeight:800,whiteSpace:"nowrap",minWidth:84}}>{r.c}</span>
                  <span style={{color:"#c8d8f0",fontWeight:300}}>{r.t}</span>
                </div>
              ))}
            </div>
            <a href="https://www.maccabiah.com/sport/sports/padel" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
              <button style={{background:"linear-gradient(135deg,#c8a96e,#e8c88a)",color:"#04080f",border:"none",padding:"14px 44px",borderRadius:3,fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1,width:"100%"}}>🇮🇱 {lang==="he"?"כל התוצאות המלאות — באתר המכביה":"Full results — Maccabiah site"}</button>
            </a>
            <a href="https://www.instagram.com/onepadeil" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"block",marginTop:10}}>
              <button style={{background:"transparent",color:SILVER,border:"1px solid rgba(200,169,110,0.4)",padding:"12px 0",borderRadius:3,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1,width:"100%"}}>📸 {lang==="he"?"הסיקור המלא בעברית — באינסטגרם שלנו":"Full Hebrew coverage — on our Instagram"}</button>
            </a>
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:40,paddingTop:24,borderTop:`1px solid ${BORDER}`}}>
          <p style={{color:DIM,fontSize:13,marginBottom:14,fontWeight:300}}>{lang==="he"?"רוצה לפרסם תחרות משלך?":"Want to publish your own tournament?"}</p>
          <a href="https://wa.me/972545157773" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><button style={{background:"rgba(180,210,255,0.07)",color:SILVER,border:`1px solid ${BORDER}`,padding:"10px 26px",borderRadius:3,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1}}>💬 {lang==="he"?"פרסם תחרות":"Publish Tournament"}</button></a>
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
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24,justifyContent:"center"}}>
            {["הכל","שרון","מרכז","ירושלים","דרום","צפון"].map(r=>(
              <button key={r} onClick={()=>setRegionF(r)} style={{
                background:regionF===r?"linear-gradient(135deg,#c8a96e,#e8c88a)":"transparent",
                color:regionF===r?"#04080f":"#8fa3c0",
                border:regionF===r?"none":"1px solid rgba(200,169,110,0.3)",
                padding:"8px 22px",borderRadius:20,fontWeight:regionF===r?800:400,fontSize:13,
                cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:0.5
              }}>{r}</button>
            ))}
          </div>
          <ClubMap3D clubs={CLUBS} onSelect={setSelectedClub} lang={lang} />
          <div className="g3">
            {CLUBS.filter(c=>(regionF==="הכל"||c.region===regionF)&&(!search||c.name.includes(search)||c.city.includes(search))).map((c,i) => (
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
            href="https://wa.me/972545157773"
            target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <button style={{background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",border:"none",padding:"12px 28px",borderRadius:3,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Heebo,sans-serif",letterSpacing:1,whiteSpace:"nowrap"}}>
              💬 {lang==="en"?"Contact Us":"צור קשר בוואטסאפ"}
            </button>
          </a>
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" style={{padding:"100px 32px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <span className="stag">BRANDS</span>
        <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:900,display:"flex",alignItems:"center",gap:14}}>{t.s_brands}</h2>
        <div className="sline"/>
        <p style={{color:DIM,fontSize:15,marginBottom:32,fontWeight:300}}>{t.brandsSub}</p>
        <div style={{textAlign:"center",marginTop:48}}>
          <Glass style={{display:"inline-block",borderRadius:3,padding:"28px 48px",border:"1px solid rgba(200,169,110,0.4)"}}>
            <div style={{fontSize:32,marginBottom:10}}>🎾</div>
            <h3 style={{fontWeight:700,fontSize:18,marginBottom:8}}>{t.brandAdTitle}</h3>
            <p style={{color:DIM,fontSize:13,marginBottom:20,fontWeight:300,maxWidth:380}}>{t.brandAdSub}</p>
            <a href="https://wa.me/972545157773?text=שלום%2C%20אני%20מעוניין%20לפרסם%20מותג%20באתר%20Padel%20One%20🎾" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><button className="btn-silver" style={{padding:"11px 36px",letterSpacing:2}}>{t.brandAdBtn}</button></a>
          </Glass>
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
            <a href="https://wa.me/972545157773?text=שלום%2C%20אני%20רוצה%20לפרסם%20מודעה%20ביד-2%20של%20Padel%20One%20🎾" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><button className="btn-silver" style={{padding:"11px 36px",letterSpacing:2}}>{t.sellBtn}</button></a>
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
            <a href="https://wa.me/972545157773" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
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
        <p style={{color:DIM,fontSize:14,marginBottom:28,fontWeight:300}}>עדכון: 15 יוני 2026 (אחרי ולנסיה P1) · מקור: FIP / Premier Padel</p>
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
              {[["tournaments","home"],["clubs","clubs"],["brands","brands"],["marketplace","marketplace"],["travel","travel"],["world","world"],["rankings","rankings"],["news","news"]].map(([key,id],j) => (
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
              {[{label:t.fl_about,action:()=>setModal("about")},{label:"✉️ onepadel24@gmail.com",action:()=>{window.location.href="mailto:onepadel24@gmail.com"}},{label:t.fl_advertise,action:()=>setModal("advertise")},{label:t.fl_terms,action:()=>window.open("/takanon.html","_blank","noopener")},{label:lang==="en"?"♿ Accessibility":"♿ הצהרת נגישות",action:()=>setModal("accessibility")}].map((l,j) => (
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
