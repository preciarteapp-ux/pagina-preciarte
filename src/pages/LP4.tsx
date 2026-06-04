import { useState, useEffect } from "react";
import useAnalytics from "@/hooks/useAnalytics";
import { buildCheckoutUrl } from "@/lib/checkout";

const CHECKOUT_URL_BASE = "https://pay.hotmart.com/X105144057Q?off=moc4qfni";

const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg-dark:#0c0b09;
  --bg-dark2:#111009;
  --bg-light:#f5f0e8;
  --bg-light2:#ede8df;
  --white:#ffffff;
  --brand:#d44f1e;
  --brand2:#f07340;
  --brand3:#ff9a6c;
  --text-dark:#0c0b09;
  --text-light:#f5f0e8;
  --text-muted:rgba(245,240,232,0.5);
  --text-muted-dark:rgba(12,11,9,0.5);
  --border-dark:rgba(255,255,255,0.08);
  --border-light:rgba(12,11,9,0.1);
  --glow:rgba(212,79,30,0.25);
}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg-dark);color:var(--text-light);font-size:16px;line-height:1.6;overflow-x:hidden}

nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  height:64px;padding:0 48px;
  display:flex;align-items:center;justify-content:space-between;
  background:rgba(12,11,9,0.8);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border-dark);
}
.nav-logo{font-size:20px;font-weight:800;color:var(--white);letter-spacing:-0.5px}
.nav-logo span{color:var(--brand2)}
.nav-links{display:flex;gap:32px}
.nav-links a{font-size:14px;color:var(--text-muted);text-decoration:none;font-weight:500;transition:color .2s}
.nav-links a:hover{color:var(--white)}
.nav-btn{
  background:var(--white);color:var(--bg-dark);
  border:none;border-radius:100px;
  padding:10px 22px;font-size:14px;font-weight:700;
  cursor:pointer;text-decoration:none;
  font-family:'Plus Jakarta Sans',sans-serif;
  transition:all .2s;
}
.nav-btn:hover{background:var(--bg-light);transform:scale(1.02)}

.hero{
  min-height:100vh;
  padding:120px 80px 80px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:60px;
  align-items:center;
  position:relative;
  overflow:hidden;
  background:var(--bg-dark);
}
.hero::before{
  content:'';position:absolute;
  width:700px;height:700px;border-radius:50%;
  background:radial-gradient(circle,rgba(212,79,30,0.18) 0%,transparent 70%);
  top:-100px;left:-200px;pointer-events:none;
}
.hero::after{
  content:'';position:absolute;
  width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(212,79,30,0.1) 0%,transparent 70%);
  bottom:0;right:0;pointer-events:none;
}
.hero-pill{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(212,79,30,0.15);border:1px solid rgba(212,79,30,0.3);
  border-radius:100px;padding:6px 16px;
  font-size:13px;font-weight:600;color:var(--brand3);margin-bottom:28px;
}
.hero-pill-dot{
  width:7px;height:7px;border-radius:50%;background:var(--brand2);
  animation:blink 2s ease infinite;
}
@keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
.hero h1{
  font-size:clamp(38px,4.5vw,62px);font-weight:800;line-height:1.05;
  color:var(--white);letter-spacing:-2px;margin-bottom:0;
}
.hero h1 .accent{
  background:linear-gradient(135deg,var(--brand2),var(--brand3));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.hero-sub{
  margin:20px 0 36px;font-size:17px;color:var(--text-muted);
  line-height:1.65;max-width:480px;
  border-left:2px solid var(--brand);padding-left:18px;
}
.hero-sub strong{color:var(--brand3);font-weight:600}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:52px}
.btn-main{
  background:var(--white);color:var(--bg-dark);border:none;border-radius:100px;
  padding:15px 28px;font-size:15px;font-weight:700;cursor:pointer;text-decoration:none;
  font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s;
  display:inline-flex;align-items:center;gap:8px;
}
.btn-main:hover{background:var(--bg-light);transform:translateY(-1px)}
.btn-outline{
  background:transparent;color:var(--text-muted);
  border:1px solid var(--border-dark);border-radius:100px;
  padding:15px 28px;font-size:15px;font-weight:500;cursor:pointer;text-decoration:none;
  font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s;
  display:inline-flex;align-items:center;gap:8px;
}
.btn-outline:hover{border-color:rgba(255,255,255,.25);color:var(--white)}
.hero-trust{display:flex;gap:6px;flex-wrap:wrap}
.trust-pill{
  background:rgba(255,255,255,.05);border:1px solid var(--border-dark);
  border-radius:100px;padding:6px 14px;font-size:12px;color:var(--text-muted);font-weight:500;
  display:flex;align-items:center;gap:6px;
}
.trust-pill::before{content:'●';color:var(--brand2);font-size:8px}

.hero-visual{position:relative;display:flex;justify-content:center;align-items:center}
.iphone{
  width:260px;background:#1a1916;border-radius:40px;
  border:1px solid rgba(255,255,255,.12);padding:14px;
  box-shadow:0 0 0 1px rgba(255,255,255,.05),0 50px 100px rgba(0,0,0,.7),0 0 80px rgba(212,79,30,.15);
  position:relative;z-index:2;
}
.iphone-notch{
  width:90px;height:28px;background:#0c0b09;border-radius:0 0 16px 16px;
  margin:0 auto 10px;display:flex;align-items:center;justify-content:center;gap:6px;
}
.iphone-camera{width:8px;height:8px;border-radius:50%;background:#222}
.iphone-sensor{width:16px;height:5px;border-radius:3px;background:#222}
.iphone-screen{background:#0e0d0b;border-radius:28px;overflow:hidden;border:1px solid rgba(255,255,255,.06)}
.screen-top{
  padding:12px 14px 10px;border-bottom:1px solid rgba(255,255,255,.06);
  display:flex;align-items:center;gap:8px;
}
.sa{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--brand),var(--brand2));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff}
.sn{font-size:12px;font-weight:700;color:#fff;flex:1}
.sonline{font-size:10px;color:var(--brand2)}
.chat{padding:12px;display:flex;flex-direction:column;gap:8px}
.mb{padding:9px 11px;border-radius:12px;font-size:11px;line-height:1.5;max-width:88%}
.mb.them{background:rgba(255,255,255,.08);color:rgba(255,255,255,.8);border-radius:12px 12px 12px 3px;align-self:flex-start}
.mb.me{background:var(--brand);color:#fff;border-radius:12px 12px 3px 12px;align-self:flex-end;text-align:right}
.mb-calc{
  background:rgba(212,79,30,.15);border:1px solid rgba(212,79,30,.3);
  border-radius:12px;padding:10px 12px;font-size:11px;line-height:1.6;
  color:rgba(255,255,255,.75);align-self:flex-start;max-width:95%;
}
.mb-calc .total{color:var(--brand3);font-weight:700;margin-top:4px}
.mt{font-size:9px;opacity:.4;margin-top:2px;display:block}
.screen-chips{display:flex;gap:6px;padding:0 12px 12px;flex-wrap:wrap}
.schip{
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:100px;padding:4px 10px;font-size:10px;color:rgba(255,255,255,.5);
}
.schip.on{background:rgba(212,79,30,.2);border-color:rgba(212,79,30,.4);color:var(--brand3)}

.fc{
  position:absolute;background:#1a1916;border:1px solid rgba(255,255,255,.1);
  border-radius:16px;padding:14px 18px;
  box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 30px rgba(212,79,30,.1);z-index:3;
}
.fc1{top:-30px;right:-80px}
.fc2{bottom:40px;left:-90px}
.fc-label{font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;font-weight:600}
.fc-val{font-size:24px;font-weight:800;color:var(--white);letter-spacing:-1px;line-height:1}
.fc-sub{font-size:11px;color:rgba(255,255,255,.4);margin-top:3px}
.fc-badge{
  display:inline-block;margin-top:8px;
  background:rgba(26,107,58,.25);border:1px solid rgba(74,222,128,.2);
  color:#4ade80;font-size:11px;font-weight:700;border-radius:100px;padding:3px 10px;
}

.ticker{
  background:#161410;border-top:1px solid var(--border-dark);
  border-bottom:1px solid var(--border-dark);padding:16px 0;overflow:hidden;position:relative;
}
.ticker-track{display:flex;gap:0;animation:tick 30s linear infinite;width:max-content}
@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.ticker-item{display:flex;align-items:center;gap:8px;padding:0 40px;border-right:1px solid var(--border-dark);white-space:nowrap}
.ticker-num{font-size:15px;font-weight:800;color:var(--brand2)}
.ticker-text{font-size:13px;color:var(--text-muted);font-weight:500}
.ticker-sep{color:var(--brand);opacity:.4;font-size:18px}

.dband{background:var(--brand);padding:20px 48px;text-align:center}
.dband p{font-size:clamp(15px,1.8vw,19px);font-weight:700;color:#fff;letter-spacing:-.3px}

.fsec{padding:100px 80px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.fsec.light{background:var(--bg-light);color:var(--text-dark)}
.fsec.dark{background:var(--bg-dark2);color:var(--text-light)}
.fsec.rev{direction:rtl}
.fsec.rev>*{direction:ltr}

.fpill{display:inline-flex;align-items:center;gap:8px;border-radius:100px;padding:5px 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:20px}
.fpill.orange{background:rgba(212,79,30,.15);color:var(--brand2);border:1px solid rgba(212,79,30,.25)}
.fsec.light .fpill.orange{background:rgba(212,79,30,.12);color:var(--brand)}
.fh{font-size:clamp(26px,3vw,40px);font-weight:800;line-height:1.1;letter-spacing:-1px;margin-bottom:16px}
.fsec.dark .fh{color:var(--white)}
.fsec.light .fh{color:var(--text-dark)}
.fp{font-size:16px;line-height:1.7;margin-bottom:28px;max-width:440px}
.fsec.dark .fp{color:var(--text-muted)}
.fsec.light .fp{color:var(--text-muted-dark)}
.fchips{display:flex;flex-direction:column;gap:10px}
.fchip{display:flex;align-items:flex-start;gap:10px;font-size:14px;font-weight:500}
.fsec.dark .fchip{color:rgba(255,255,255,.75)}
.fsec.light .fchip{color:rgba(12,11,9,.7)}
.fchip-dot{width:20px;height:20px;min-width:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;margin-top:2px}
.fsec.dark .fchip-dot{background:rgba(212,79,30,.2);color:var(--brand2)}
.fsec.light .fchip-dot{background:rgba(212,79,30,.15);color:var(--brand)}

.pwin{border-radius:20px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,.3)}
.fsec.dark .pwin{background:#1a1916;border:1px solid rgba(255,255,255,.08);box-shadow:0 32px 80px rgba(0,0,0,.6),0 0 60px rgba(212,79,30,.08)}
.fsec.light .pwin{background:#fff;border:1px solid rgba(12,11,9,.1);box-shadow:0 32px 80px rgba(12,11,9,.12)}
.pwin-bar{padding:12px 16px;display:flex;align-items:center;gap:8px}
.fsec.dark .pwin-bar{border-bottom:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.03)}
.fsec.light .pwin-bar{border-bottom:1px solid rgba(12,11,9,.06);background:rgba(12,11,9,.02)}
.pwin-dots{display:flex;gap:5px}
.pwin-dot{width:9px;height:9px;border-radius:50%}
.fsec.dark .pwin-dot{background:rgba(255,255,255,.1)}
.fsec.light .pwin-dot{background:rgba(12,11,9,.1)}
.pwin-label{flex:1;text-align:center;font-size:12px;font-weight:600}
.fsec.dark .pwin-label{color:rgba(255,255,255,.35)}
.fsec.light .pwin-label{color:rgba(12,11,9,.35)}
.pwin-body{padding:22px}

.how{background:var(--bg-dark);padding:100px 80px;text-align:center}
.how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;margin-top:60px}
.how-card{text-align:center}
.how-n{
  width:52px;height:52px;border-radius:50%;
  background:linear-gradient(135deg,var(--brand),var(--brand2));
  color:#fff;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center;
  margin:0 auto 18px;box-shadow:0 8px 24px rgba(212,79,30,.35);
}
.how-t{font-size:16px;font-weight:800;color:var(--white);margin-bottom:8px;letter-spacing:-.3px}
.how-d{font-size:14px;color:var(--text-muted);line-height:1.6}

.proof{background:var(--bg-dark2);padding:100px 80px}
.proof-nums{
  display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-bottom:64px;
  border:1px solid var(--border-dark);border-radius:20px;overflow:hidden;background:rgba(255,255,255,.02);
}
.pn{padding:32px 24px;text-align:center;border-right:1px solid var(--border-dark)}
.pn:last-child{border-right:none}
.pn-v{
  font-size:40px;font-weight:800;letter-spacing:-1.5px;
  background:linear-gradient(135deg,var(--brand2),var(--brand3));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  display:block;line-height:1;margin-bottom:6px;
}
.pn-l{font-size:13px;color:var(--text-muted);line-height:1.4}
.tcards{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.tcard{background:rgba(255,255,255,.04);border:1px solid var(--border-dark);border-radius:20px;padding:28px 26px}
.tstars{color:var(--brand2);font-size:14px;letter-spacing:2px;margin-bottom:14px}
.ttext{font-size:16px;color:rgba(255,255,255,.8);line-height:1.65;margin-bottom:22px;font-style:italic;font-weight:400}
.ttext::before{content:'“';color:var(--brand2);font-size:24px;line-height:0;vertical-align:-5px;margin-right:4px;font-style:normal}
.tauthor{display:flex;align-items:center;gap:12px}
.tav{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--brand),var(--brand2));display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#fff}
.tname{font-size:14px;font-weight:700;color:var(--white)}
.tni{font-size:12px;color:var(--text-muted)}

.pricing{background:var(--bg-light);padding:100px 80px;text-align:center}
.pricing-wrap{display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-top:48px}
.pc{background:var(--white);border:1px solid var(--border-light);border-radius:24px;padding:36px 30px;width:300px;text-align:center;position:relative}
.pc.feat{background:var(--bg-dark);border:1.5px solid rgba(212,79,30,.4);box-shadow:0 0 60px rgba(212,79,30,.15)}
.pc-badge{
  position:absolute;top:-14px;left:50%;transform:translateX(-50%);
  background:linear-gradient(135deg,var(--brand),var(--brand2));
  color:#fff;font-size:12px;font-weight:800;padding:5px 18px;border-radius:100px;white-space:nowrap;
}
.pc-name{font-size:13px;font-weight:700;color:var(--text-muted-dark);margin-bottom:14px}
.pc.feat .pc-name{color:var(--text-muted)}
.pc-price{font-size:56px;font-weight:800;letter-spacing:-2px;color:var(--text-dark);line-height:1}
.pc.feat .pc-price{background:linear-gradient(135deg,var(--brand2),var(--brand3));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.pc-price sup{font-size:24px;vertical-align:super;letter-spacing:0}
.pc-per{font-size:13px;color:var(--text-muted-dark);margin-top:5px;margin-bottom:6px}
.pc.feat .pc-per{color:var(--text-muted)}
.pc-save{font-size:13px;color:#16a34a;font-weight:700;margin-bottom:24px}
.pc-features{list-style:none;text-align:left;margin-bottom:24px;display:flex;flex-direction:column;gap:10px}
.pc-features li{font-size:14px;color:var(--text-dark);display:flex;align-items:flex-start;gap:9px;font-weight:500}
.pc.feat .pc-features li{color:rgba(255,255,255,.8)}
.pc-features li::before{content:'✓';color:#16a34a;font-weight:800;flex-shrink:0;margin-top:1px}
.pc-btn{
  display:block;width:100%;background:linear-gradient(135deg,var(--brand),var(--brand2));
  color:#fff;border:none;border-radius:100px;padding:15px;font-size:15px;font-weight:800;
  cursor:pointer;text-decoration:none;font-family:'Plus Jakarta Sans',sans-serif;
  transition:all .2s;box-shadow:0 8px 24px rgba(212,79,30,.3);
}
.pc-btn:hover{transform:translateY(-1px);box-shadow:0 12px 32px rgba(212,79,30,.4)}
.pc-btn.ghost{background:transparent;color:var(--text-dark);border:1.5px solid var(--border-light);box-shadow:none}
.pc-btn.ghost:hover{background:var(--bg-light2);transform:none}
.pc-post{margin-top:20px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);text-align:left}
.pc-pl{font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px}
.pc-buls{list-style:none;display:flex;flex-direction:column;gap:8px}
.pc-buls li{font-size:12px;color:rgba(255,255,255,.55);display:flex;gap:7px;align-items:flex-start;font-weight:500}
.pc-buls li span{color:var(--brand2);font-weight:800;flex-shrink:0}

.faq{background:var(--bg-dark);padding:100px 80px}
.faq-list{max-width:680px;margin:48px auto 0;display:flex;flex-direction:column;gap:3px}
.faq-it{background:rgba(255,255,255,.04);border:1px solid var(--border-dark);border-radius:14px;overflow:hidden;transition:background .2s}
.faq-it.open{background:rgba(255,255,255,.06)}
.faq-btn{
  width:100%;background:none;border:none;display:flex;justify-content:space-between;align-items:center;
  padding:20px 24px;cursor:pointer;font-size:15px;font-weight:700;color:rgba(255,255,255,.85);
  text-align:left;gap:16px;font-family:'Plus Jakarta Sans',sans-serif;
}
.faq-ic{
  width:24px;height:24px;min-width:24px;border-radius:50%;background:rgba(255,255,255,.08);
  color:rgba(255,255,255,.5);font-size:16px;display:flex;align-items:center;justify-content:center;
  transition:all .25s;font-weight:700;
}
.faq-it.open .faq-ic{background:var(--brand);color:#fff;transform:rotate(45deg)}
.faq-body{
  padding:0 24px;max-height:0;overflow:hidden;
  font-size:14px;color:var(--text-muted);line-height:1.75;font-weight:400;
  transition:max-height .3s ease,padding .3s ease;
}
.faq-it.open .faq-body{max-height:200px;padding:0 24px 20px}

.final{background:var(--bg-dark2);padding:100px 80px;text-align:center}
.final-box{max-width:600px;margin:0 auto}
.final-quote{
  font-size:clamp(16px,1.8vw,19px);font-style:italic;font-weight:400;
  color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:48px;
  padding:30px 36px;border:1px solid var(--border-dark);border-radius:20px;
  background:rgba(255,255,255,.03);position:relative;text-align:left;
}
.final-quote::before{
  content:'“';font-size:60px;line-height:1;color:var(--brand);opacity:.35;
  position:absolute;top:12px;left:20px;font-style:normal;font-weight:800;
}
.final-h{font-size:clamp(28px,4vw,46px);font-weight:800;color:var(--white);line-height:1.1;letter-spacing:-1.5px;margin-bottom:14px}
.final-sub{font-size:16px;color:var(--text-muted);margin-bottom:10px;line-height:1.65}
.final-sc{font-size:13px;color:rgba(255,255,255,.3);font-style:italic;margin-bottom:36px}
.final-btn{
  display:inline-flex;align-items:center;gap:10px;
  background:var(--white);color:var(--bg-dark);border-radius:100px;padding:17px 40px;
  font-size:16px;font-weight:800;text-decoration:none;font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s;
}
.final-btn:hover{background:var(--bg-light);transform:translateY(-2px);box-shadow:0 12px 40px rgba(255,255,255,.1)}
.final-pp{margin-top:24px;font-size:14px;color:rgba(255,255,255,.3);font-style:italic;font-weight:400}

footer{background:#0a0908;padding:28px 80px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border-dark)}
.fl{font-size:17px;font-weight:800;color:rgba(255,255,255,.5)}
.fl span{color:var(--brand2)}
.fc-copyright{font-size:12px;color:rgba(255,255,255,.2)}
.flinks{display:flex;gap:20px}
.flinks a{font-size:12px;color:rgba(255,255,255,.3);text-decoration:none}
.flinks a:hover{color:rgba(255,255,255,.6)}

.sh{font-size:clamp(30px,3.5vw,44px);font-weight:800;line-height:1.1;letter-spacing:-1.5px;margin-bottom:14px}
.sh.light{color:var(--text-dark)}
.sh.dark{color:var(--white)}
.sp-dark{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--brand2);margin-bottom:12px;display:block}
.sp-light{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--brand);margin-bottom:12px;display:block}
.ss-dark{font-size:17px;color:var(--text-muted);line-height:1.65;max-width:540px}
.ss-light{font-size:17px;color:var(--text-muted-dark);line-height:1.65;max-width:540px}

@media(max-width:900px){
  nav{padding:0 20px;height:56px}
  .nav-links{display:none}
  .nav-logo{font-size:18px}
  .nav-btn{padding:8px 16px;font-size:13px}
  .hero{grid-template-columns:1fr;padding:88px 20px 52px;gap:0;min-height:auto;text-align:center}
  .hero::before{width:400px;height:400px;left:-100px}
  .hero::after{display:none}
  .hero-pill{font-size:11px;padding:5px 12px;margin-bottom:20px}
  .hero h1{font-size:clamp(32px,8vw,46px);letter-spacing:-1.5px}
  .hero-sub{font-size:15px;margin:16px auto 28px;border-left:none;padding-left:0;border-top:2px solid var(--brand);padding-top:14px;text-align:center}
  .hero-btns{flex-direction:column;align-items:stretch;margin-bottom:36px}
  .btn-main{text-align:center;justify-content:center;padding:15px 20px}
  .btn-outline{text-align:center;justify-content:center;padding:13px 20px}
  .hero-trust{justify-content:center;gap:6px}
  .trust-pill{font-size:11px;padding:5px 10px}
  .hero-visual{display:none}
  .ticker{padding:12px 0}
  .ticker-num{font-size:13px}
  .ticker-text{font-size:11px}
  .ticker-item{padding:0 24px}
  .dband{padding:16px 20px}
  .dband p{font-size:14px}
  .fsec{grid-template-columns:1fr;padding:52px 20px;gap:32px}
  .fsec.rev{direction:ltr}
  .fpill{font-size:11px;padding:4px 12px;margin-bottom:14px}
  .fh{font-size:clamp(22px,6vw,32px);letter-spacing:-0.5px;margin-bottom:12px}
  .fp{font-size:15px;margin-bottom:20px}
  .fchip{font-size:13px}
  .pwin{border-radius:16px}
  .pwin-bar{padding:10px 14px}
  .pwin-body{padding:16px}
  .how{padding:52px 20px}
  .how-grid{grid-template-columns:1fr 1fr;gap:24px;margin-top:40px}
  .how-n{width:44px;height:44px;font-size:18px;margin-bottom:12px}
  .how-t{font-size:14px}
  .how-d{font-size:13px}
  .proof{padding:52px 20px}
  .proof-nums{grid-template-columns:1fr 1fr;margin-bottom:40px}
  .pn{padding:20px 16px;border-right:none;border-bottom:1px solid var(--border-dark)}
  .pn:nth-child(3),.pn:nth-child(4){border-bottom:none}
  .pn-v{font-size:28px}
  .pn-l{font-size:11px}
  .tcards{grid-template-columns:1fr}
  .tcard{padding:20px 18px}
  .ttext{font-size:14px}
  .pricing{padding:52px 20px}
  .pricing-wrap{flex-direction:column;align-items:stretch}
  .pc{width:100%;border-radius:18px;padding:28px 22px}
  .pc.feat{transform:none;border-width:2px}
  .pc-price{font-size:46px}
  .pc-features li{font-size:13px}
  .pc-btn{padding:14px;font-size:14px}
  .pc-buls li{font-size:11px}
  .faq{padding:52px 20px}
  .faq-btn{font-size:14px;padding:16px 18px}
  .faq-body{font-size:13px;padding:0 18px}
  .faq-it.open .faq-body{padding:0 18px 16px}
  .final{padding:52px 20px}
  .final-quote{font-size:15px;padding:22px 20px 22px 28px;margin-bottom:32px}
  .final-quote::before{font-size:40px;top:8px;left:12px}
  .final-h{font-size:clamp(24px,7vw,36px);letter-spacing:-1px}
  .final-sub{font-size:15px}
  .final-sc{font-size:12px}
  .final-btn{display:block;text-align:center;padding:16px 24px;font-size:15px}
  .final-pp{font-size:13px}
  .sh{font-size:clamp(24px,7vw,36px);letter-spacing:-1px}
  .ss-dark,.ss-light{font-size:15px}
  .sp-dark,.sp-light{font-size:11px}
  footer{padding:20px;flex-direction:column;gap:10px;text-align:center}
  .flinks{justify-content:center}
}

@media(max-width:400px){
  .hero h1{font-size:30px}
  .hero-sub{font-size:14px}
  .fh{font-size:22px}
  .how-grid{grid-template-columns:1fr}
  .sh{font-size:24px}
  .final-h{font-size:24px}
  .hero-trust{flex-direction:column;align-items:center}
  .pc-price{font-size:40px}
  .nav-btn{font-size:12px;padding:7px 12px}
}

/* ─── PAIN SECTION ─── */
.pain-sec{padding:80px 80px;background:var(--bg-light)}
.pain-inner{max-width:720px;margin:0 auto;background:#fff;border-radius:20px;padding:48px;border:1px solid var(--bg-light2);box-shadow:0 4px 24px rgba(12,11,9,.06)}
.pain-list{list-style:none;display:flex;flex-direction:column;gap:14px;margin-bottom:32px}
.pain-item{display:flex;align-items:flex-start;gap:12px;font-size:15px;color:var(--text-dark);line-height:1.55}
.pain-x{width:22px;height:22px;min-width:22px;background:#fee2e2;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;color:#dc2626;font-weight:700;margin-top:1px}
.pain-quote{background:var(--bg-light);border-left:3px solid var(--brand);border-radius:0 12px 12px 0;padding:20px 24px;font-size:16px;color:var(--text-dark);line-height:1.75}

/* ─── DIFERENCIAL SECTION ─── */
.diff-sec{padding:80px 80px;background:var(--bg-light)}
.diff-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.diff-card-off{background:#fff;border:1px solid var(--bg-light2);border-radius:14px;padding:26px 22px;opacity:.7}
.diff-card-on{background:#fff;border:1.5px solid rgba(212,79,30,.3);border-radius:14px;padding:26px 22px;box-shadow:0 4px 20px rgba(212,79,30,.08)}
.diff-items{display:flex;flex-direction:column;gap:11px}
.diff-item{display:flex;gap:10px;font-size:14px;color:var(--text-dark);align-items:flex-start}
.diff-badge-off{display:inline-block;background:#f0f0f0;color:#999;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;border-radius:6px;padding:4px 12px;margin-bottom:16px}
.diff-badge-on{display:inline-block;background:rgba(212,79,30,.12);color:var(--brand);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;border-radius:6px;padding:4px 12px;margin-bottom:16px}

@media(max-width:900px){
  .pain-sec{padding:48px 20px}
  .pain-inner{padding:28px 20px;border-radius:16px}
  .pain-item{font-size:14px}
  .pain-quote{font-size:14px;padding:16px 18px}
  .diff-sec{padding:48px 20px}
  .diff-grid{grid-template-columns:1fr}
  .diff-item{font-size:13px}
}
@media(max-width:400px){
  .pain-inner{padding:20px 16px}
}
`;

const LP4 = () => {
  useAnalytics();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Inject CSS into <head> and remove on unmount
  useEffect(() => {
    const styleId = "lp4-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = css;
      document.head.appendChild(style);
    }
    return () => {
      const s = document.getElementById("lp4-styles");
      if (s) s.remove();
    };
  }, []);

  useEffect(() => {
    const fontId = "plus-jakarta-font";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap";
      document.head.appendChild(link);
    }
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("init", "1503006167441659");
      (window as any).fbq("track", "PageView");
    }
  }, []);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  const checkoutUrl = buildCheckoutUrl(CHECKOUT_URL_BASE);

  const faqs = [
    {
      q: "Já uso outro sistema. Por que trocar?",
      a: "Ele foi criado para o seu tipo de negócio? Calcula custo de impressão por pedido? Entende de material por unidade e tempo de produção manual? Se não — você está se adaptando a um sistema que não foi feito pra você. O PreciArte foi.",
    },
    {
      q: "Tá caro.",
      a: "R$ 11,90 por mês — menos que um kit de material. Quando você ajusta o preço do primeiro pedido com o cálculo certo, já recuperou o ano inteiro. 87% das clientes descobrem no primeiro uso que estavam cobrando abaixo do ideal.",
    },
    {
      q: "Meu produto é muito específico. Vai funcionar?",
      a: "Se tem material e tempo de produção — funciona. Papelaria, sublimação, MDF, laser, caixinhas, velas, sabonetes, impressão 3D, brindes. Se você produz sob encomenda, o PreciArte calcula.",
    },
    {
      q: "A IA vai estragar a foto do meu produto?",
      a: "A IA só troca o fundo. Seu produto aparece idêntico — só o cenário muda, ficando profissional pra mostrar pro cliente.",
    },
    {
      q: "Não sei se preciso disso agora.",
      a: "Cada pedido que você fecha sem calcular direito é lucro que vai embora pra sempre. Quanto mais cedo você organiza, menos prejuízo acumula. Quem começa certo não precisa corrigir depois.",
    },
    {
      q: "Posso cancelar quando quiser?",
      a: "No plano mensal, sim — cancela a qualquer momento, sem multa. No anual, o acesso fica ativo até o fim do período contratado.",
    },
  ];

  const tickerItems = [
    { num: "+5 mil", text: "criadoras ativas" },
    { sep: true },
    { num: "87%", text: "cobravam abaixo do ideal" },
    { sep: true },
    { num: "R$2M+", text: "em orçamentos por mês" },
    { sep: true },
    { num: "10 min", text: "pra ver onde vai o lucro" },
    { sep: true },
    { num: "40%", text: "abaixo do ideal em média" },
    { sep: true },
  ];

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">Preci<span>Arte</span></div>
        <div className="nav-links">
          <a href="#features">Funcionalidades</a>
          <a href="#proof">Resultados</a>
          <a href="#pricing">Planos</a>
        </div>
        <a href="#pricing" className="nav-btn">Começar agora →</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div>
          <div className="hero-pill">
            <span className="hero-pill-dot"></span>
            Para quem vive de produto personalizado
          </div>
          <h1>
            Você fez 40 pedidos.<br />
            O Pix caiu todo dia.<br />
            <span className="accent">Trabalhou de graça.</span>
          </h1>
          <p className="hero-sub">
            <strong>87% descobriram que cobravam 40% abaixo do preço ideal.</strong> No primeiro cálculo. Sem saber.
          </p>
          <div className="hero-btns">
            <a href="#pricing" className="btn-main">Quero saber quanto lucro de verdade →</a>
            <a href="#features" className="btn-outline">Ver como funciona</a>
          </div>
          <div className="hero-trust">
            <span className="trust-pill">+5 mil criadoras ativas</span>
            <span className="trust-pill">R$2M+ em orçamentos/mês</span>
            <span className="trust-pill">87% cobravam abaixo</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="fc fc1">
            <div className="fc-label">Lucro real no pedido</div>
            <div className="fc-val">R$ 47,20</div>
            <div className="fc-sub">caixinha personalizada</div>
            <div className="fc-badge">↑ 40% acima do que cobrava</div>
          </div>

          <div className="iphone">
            <div className="iphone-notch">
              <div className="iphone-sensor"></div>
              <div className="iphone-camera"></div>
            </div>
            <div className="iphone-screen">
              <div className="screen-top">
                <div className="sa">P</div>
                <div className="sn">PreciArte</div>
                <div className="sonline">● Online</div>
              </div>
              <div className="chat">
                <div className="mb them">Calcula a caixinha com laço? 🎀<span className="mt">14:22</span></div>
                <div className="mb-calc">
                  📦 Caixinha c/ laço<br />
                  Material: R$ 3,80 &nbsp;|&nbsp; Impressão: R$ 2,40<br />
                  Mão de obra: R$ 8,75 &nbsp;|&nbsp; Custo fixo: R$ 2,10<br />
                  <span className="total">✅ Preço ideal: R$ 21,20 · Lucro: R$ 5,80</span>
                  <span className="mt">14:22</span>
                </div>
                <div className="mb them">Gera o PDF com meu logo?<span className="mt">14:23</span></div>
                <div className="mb me">PDF gerado ✅ Logo + Pix<span className="mt">14:23</span></div>
              </div>
              <div className="screen-chips">
                <span className="schip on">Precificar</span>
                <span className="schip">PDF</span>
                <span className="schip">Financeiro</span>
              </div>
            </div>
          </div>

          <div className="fc" style={{ bottom: '40px', left: '-90px' }}>
            <div className="fc-label">Esse mês</div>
            <div className="fc-val">R$ 3.840</div>
            <div className="fc-sub">lucro real calculado</div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) =>
            "sep" in item ? (
              <div key={i} className="ticker-item"><span className="ticker-sep">◆</span></div>
            ) : (
              <div key={i} className="ticker-item">
                <span className="ticker-num">{item.num}</span>
                <span className="ticker-text">{item.text}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* DOPAMINE BAND 1 */}
      <div className="dband">
        <p>Você nunca soube quanto lucrou de verdade.</p>
      </div>

      {/* PAIN SECTION */}
      <section className="pain-sec">
        <div className="pain-inner">
          <div style={{ width: '40px', height: '3px', background: 'var(--brand)', borderRadius: '2px', marginBottom: '20px' }}></div>
          <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: '10px' }}>Você conhece essa cena?</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted-dark)', marginBottom: '24px', lineHeight: 1.65 }}>É domingo à noite. WhatsApp cheio de pedido. Você anota no caderninho, manda o valor no achismo, e no final do mês olha pra conta e não entende onde foi parar o dinheiro.</p>
          <ul className="pain-list">
            {[
              "A planilha funciona duas semanas, depois vira campo minado de fórmula quebrada",
              "Você cobra igual à concorrente — sem saber se os custos dela são iguais aos seus",
              "A impressora, a energia, o tempo de produção — nada disso entra no preço",
              "O cliente pede 10% de desconto e você dá — porque não tem número nenhum pra mostrar",
              "Você fecha o mês com 40 pedidos entregues e não consegue explicar onde foi o lucro",
              "Multiplica o material por 3 e torce pra dar certo — e às vezes não dá",
            ].map((text, i) => (
              <li key={i} className="pain-item">
                <span className="pain-x">✕</span>
                {text}
              </li>
            ))}
          </ul>
          <div className="pain-quote">
            Você trabalha em casa. Vende pelo Instagram e pelo WhatsApp. Produz de madrugada às vezes. Ama o que faz. E mesmo assim o dinheiro some. Não é falta de dedicação. Não é falta de talento. <strong style={{ color: 'var(--brand)' }}>É que você nunca teve o número certo na mão.</strong>
          </div>
        </div>
      </section>

      {/* FEATURE 1 — Precificação — light bg */}
      <section id="features" className="fsec light">
        <div>
          <div className="fpill orange">💰 Precificação</div>
          <h2 className="fh">Você para de cobrar no achismo. Para sempre.</h2>
          <p className="fp">Material, impressão, custo fixo, valor da sua hora e margem de lucro. O PreciArte calcula tudo em segundos e entrega o preço certo — com a segurança pra você cobrar sem culpa.</p>
          <div className="fchips">
            <div className="fchip"><span className="fchip-dot">✓</span>Custo de impressora e insumos por pedido</div>
            <div className="fchip"><span className="fchip-dot">✓</span>Valor real da sua hora de produção</div>
            <div className="fchip"><span className="fchip-dot">✓</span>Margem de lucro que você define</div>
            <div className="fchip"><span className="fchip-dot">✓</span>Resultado em segundos, sem fórmula</div>
          </div>
        </div>
        <div className="pwin">
          <div className="pwin-bar">
            <div className="pwin-dots"><div className="pwin-dot"></div><div className="pwin-dot"></div><div className="pwin-dot"></div></div>
            <div className="pwin-label">PreciArte — Precificação</div>
          </div>
          <div style={{ background: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '13px', color: '#1a1a1a' }}>
            <div style={{ background: '#fff', padding: '8px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: '11px', color: '#aaa' }}>Sem tempo definido</span>
              <span style={{ fontSize: '11px', color: '#e05b8a', fontWeight: 600 }}>$ Lucro: R$ 6,00</span>
            </div>
            <div style={{ padding: '4px 16px 8px', textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#e05b8a', fontWeight: 600 }}>0.0% lucro</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', padding: '0 12px 12px' }}>
              {[
                <svg key="edit" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth={2}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
                <svg key="copy" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
                <svg key="del" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05b5b" strokeWidth={2}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
              ].map((icon, i) => (
                <div key={i} style={{ border: i === 2 ? '1.5px solid #f8d0d0' : '1.5px solid #e8e8e8', background: i === 2 ? '#fff5f5' : 'transparent', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
              ))}
            </div>
            <div style={{ margin: '0 12px 12px', border: '1.5px solid #f0f0f0', borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start', borderBottom: '1px solid #f5f5f5' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#f5e8d0' }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#f5c842,#e8903a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📦</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.3 }}>BOX MOTIVACIONAL+BALA<br />PERSONALIZADA (100UNI)</div>
                </div>
              </div>
              <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Impressão:', val: 'R$ 2,40', color: '#1a1a1a' },
                  { label: 'Mão de obra:', val: 'R$ 28,15', color: '#1a1a1a' },
                  { label: 'Materiais:', val: 'R$ 19,47', color: '#e05b8a' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#777' }}>{row.label}</span><span style={{ fontWeight: 600, color: row.color }}>{row.val}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 800, paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
                  <span>Custo Total:</span><span>R$ 50,02</span>
                </div>
              </div>
              <div style={{ margin: '0 14px 10px', border: '1.5px solid #ebebeb', borderRadius: '10px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: '#555' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={2}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 2 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  5 material(is) utilizados
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth={2}><polyline points="18 15 12 9 6 15"/></svg>
              </div>
              <div style={{ margin: '0 14px 12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {[
                  ['papel offset 180g: 7 folha', 'R$ 1,54'],
                  ['cola branca: 2 gramas', 'R$ 0,13'],
                  ['BALINHA MACIA: 100 unidade', 'R$ 10,00'],
                  ['papel fotografico: 9 folha', 'R$ 7,20'],
                ].map(([name, val], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666' }}>
                    <span>• {name}</span><span>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '0 14px 14px' }}>
                <div style={{ textAlign: 'center', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '4px' }}>Sugerido</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#e05b8a', letterSpacing: '-0.5px' }}>R$ 85,00</div>
                </div>
                <div style={{ background: '#fdf0f5', borderRadius: '12px', textAlign: 'center', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#e05b8a', fontWeight: 600, marginBottom: '4px' }}>Meu Preço</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#e05b8a', letterSpacing: '-0.5px' }}>R$ 100,00</div>
                  <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: 700, marginTop: '3px' }}>99.9% lucro</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderTop: '1px solid #f5f5f5', fontSize: '12px' }}>
                <span style={{ color: '#666' }}>Tempo: 2h 30min</span>
                <span style={{ color: '#e05b8a', fontWeight: 700 }}>$ Lucro: R$ 49,98</span>
              </div>
            </div>
            {/* Bottom nav */}
            <div style={{ background: '#fff', borderTop: '1px solid #f0f0f0', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '8px 0 4px' }}>
              {[
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Home' },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, label: 'Pedidos' },
                { center: true },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, label: 'Clientes' },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>, label: 'Mais' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  {item.center ? (
                    <div style={{ width: '36px', height: '36px', background: '#e05b8a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-14px', boxShadow: '0 4px 12px rgba(224,91,138,.4)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                  ) : (
                    <>
                      {item.icon}
                      <span style={{ fontSize: '9px', color: '#888' }}>{item.label}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2 — PDF — dark bg, reversed */}
      <section className="fsec dark rev">
        <div>
          <div className="fpill orange">📄 Orçamento Profissional</div>
          <h2 className="fh">Quando o cliente pede desconto, você mostra o cálculo.</h2>
          <p className="fp">PDF com sua logo, itens detalhados e chave Pix gerado em 1 clique. Seus clientes param de questionar o preço quando veem o trabalho por trás.</p>
          <div className="fchips">
            <div className="fchip"><span className="fchip-dot">✓</span>Logo e identidade da sua marca</div>
            <div className="fchip"><span className="fchip-dot">✓</span>Itens, quantidades e valores detalhados</div>
            <div className="fchip"><span className="fchip-dot">✓</span>Chave Pix direta no documento</div>
            <div className="fchip"><span className="fchip-dot">✓</span>1 clique — pronto pra enviar no WhatsApp</div>
          </div>
        </div>
        <div className="pwin">
          <div className="pwin-bar">
            <div className="pwin-dots"><div className="pwin-dot"></div><div className="pwin-dot"></div><div className="pwin-dot"></div></div>
            <div className="pwin-label">PreciArte — Orçamento</div>
          </div>
          <div style={{ background: '#f8f8f8', fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#1a1a1a', overflow: 'hidden' }}>
            {/* Header empresa */}
            <div style={{ background: '#fff', margin: '12px 12px 0', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fce8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🎀</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.3, marginBottom: '4px' }}>CRIAÇÕES DA ANA PERSONALIZADOS</div>
                <div style={{ fontSize: '9px', color: '#bbb', lineHeight: 1.7 }}>
                  Av. das Flores, 142 — Jardim Primavera<br />
                  contato@criacoesdaana.com.br<br />
                  PIX: criações@daana.com.br
                </div>
              </div>
              <div style={{ fontSize: '9px', color: '#bbb', flexShrink: 0 }}>15/05/2026</div>
            </div>
            {/* Badge */}
            <div style={{ background: '#e05b8a', margin: '8px 12px 0', borderRadius: '8px', padding: '8px 14px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>Orçamento ORC-2026-0312</div>
            </div>
            {/* Cliente */}
            <div style={{ background: '#fff', margin: '6px 12px 0', borderRadius: '8px', padding: '10px 14px' }}>
              <span style={{ fontSize: '11px', color: '#1a1a1a' }}><strong>Cliente:</strong>&nbsp; MARIANA SOUZA</span>
            </div>
            {/* Informações básicas */}
            <div style={{ background: '#e05b8a', margin: '8px 12px 0', borderRadius: '8px', padding: '8px 14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>Informações básicas</span>
            </div>
            <div style={{ background: '#fff', margin: '6px 12px 0', borderRadius: '8px', padding: '10px 14px' }}>
              <div style={{ fontSize: '9px', color: '#bbb', marginBottom: '3px' }}>Prazo de entrega</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a1a' }}>A combinar</div>
            </div>
            {/* Produtos */}
            <div style={{ background: '#e05b8a', margin: '8px 12px 0', borderRadius: '8px', padding: '8px 14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>Produtos</span>
            </div>
            <div style={{ background: '#fff', margin: '6px 12px 0', borderRadius: '8px', padding: '4px 14px 6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ flex: 1, fontSize: '9px', fontWeight: 700, color: '#aaa' }}>Descrição</span>
                <span style={{ width: '24px', textAlign: 'center', fontSize: '9px', fontWeight: 700, color: '#aaa' }}>Qtd</span>
                <span style={{ width: '62px', textAlign: 'right', fontSize: '9px', fontWeight: 700, color: '#aaa' }}>Preço Unit.</span>
                <span style={{ width: '56px', textAlign: 'right', fontSize: '9px', fontWeight: 700, color: '#aaa' }}>Total</span>
              </div>
              {[
                { name: 'TOPO', qty: '1', unit: 'R$ 40,00', total: 'R$ 40,00' },
                { name: 'KIT CAIXAS SIMPLES 15 UNI VAZIO', qty: '1', unit: 'R$ 93,00', total: 'R$ 93,00' },
                { name: 'TOPPER DE DOCINHO', qty: '40', unit: 'R$ 0,90', total: 'R$ 36,00' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < 2 ? '1px solid #f5f5f5' : 'none', gap: '4px' }}>
                  <span style={{ flex: 1, fontSize: '11px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4 }}>{row.name}</span>
                  <span style={{ width: '24px', textAlign: 'center', fontSize: '11px', color: '#666', flexShrink: 0 }}>{row.qty}</span>
                  <span style={{ width: '62px', textAlign: 'right', fontSize: '11px', color: '#666', flexShrink: 0 }}>{row.unit}</span>
                  <span style={{ width: '56px', textAlign: 'right', fontSize: '11px', fontWeight: 700, color: '#1a1a1a', flexShrink: 0 }}>{row.total}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 6px', borderTop: '1px solid #f0f0f0', fontSize: '11px' }}>
                <span style={{ color: '#aaa' }}>Subtotal:</span>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>R$ 169,00</span>
              </div>
            </div>
            {/* Total */}
            <div style={{ background: '#e05b8a', margin: '6px 12px 0', borderRadius: '8px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>Total:</span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>R$ 169,00</span>
            </div>
            {/* Pagamento */}
            <div style={{ background: '#e05b8a', margin: '8px 12px 0', borderRadius: '8px', padding: '8px 14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>Pagamento</span>
            </div>
            <div style={{ background: '#fff', margin: '6px 12px 12px', borderRadius: '8px', padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '9px', color: '#bbb', marginBottom: '3px' }}>Forma de pagamento</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a1a', marginBottom: '10px' }}>A combinar</div>
                  <div style={{ fontSize: '9px', color: '#bbb', marginBottom: '3px' }}>Condições de pagamento</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a1a' }}>ENTRADA DE R$84,50</div>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <div style={{ fontSize: '9px', color: '#bbb', marginBottom: '6px' }}>PIX</div>
                  <div style={{ background: '#f5f5f5', border: '1px solid #ebebeb', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', fontWeight: 700, color: '#1a1a1a' }}>criações@daana.com.br</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 3 — Financeiro — light bg, reversed */}
      <section className="fsec light rev">
        <div>
          <div className="fpill orange">📊 Financeiro Real</div>
          <h2 className="fh">Você vai saber, pela primeira vez, quanto sobra de verdade.</h2>
          <p className="fp">Receitas, despesas e lucro real num só painel. Chega de fechar o mês com 40 pedidos entregues e não conseguir explicar onde foi o dinheiro.</p>
          <div className="fchips">
            <div className="fchip"><span className="fchip-dot">✓</span>Receitas e despesas por categoria</div>
            <div className="fchip"><span className="fchip-dot">✓</span>Lucro líquido calculado automaticamente</div>
            <div className="fchip"><span className="fchip-dot">✓</span>Histórico de pedidos e pagamentos</div>
            <div className="fchip"><span className="fchip-dot">✓</span>Visão do mês, semana ou período</div>
          </div>
        </div>
        <div className="pwin">
          <div className="pwin-bar">
            <div className="pwin-dots"><div className="pwin-dot"></div><div className="pwin-dot"></div><div className="pwin-dot"></div></div>
            <div className="pwin-label">PreciArte — Financeiro</div>
          </div>
          <div style={{ background: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '13px', color: '#1a1a1a' }}>
            <div style={{ padding: '14px 16px 6px', borderBottom: '1px solid #f5f5f5' }}>
              <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 600, marginBottom: '2px' }}>PreciArte</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>Financeiro</div>
            </div>
            <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ border: '1.5px solid #e8e8e8', borderRadius: '12px', padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#555' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={2}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                Venda
              </div>
              <div style={{ background: '#e05b8a', borderRadius: '12px', padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Novo Registro
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', padding: '0 12px 10px' }}>
              {[
                { label: 'Movim.', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={2}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { label: 'Recorr.', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={2}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg> },
                { label: 'Dash', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={2}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
              ].map((tab, i) => (
                <div key={i} style={{ background: '#f5f5f5', borderRadius: '10px', padding: '8px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '11px', fontWeight: 700, color: '#555' }}>
                  {tab.icon}{tab.label}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', padding: '0 12px 10px' }}>
              <span style={{ fontSize: '12px', color: '#777' }}>Período:</span>
              <div style={{ border: '1.5px solid #e8e8e8', borderRadius: '10px', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#555', fontWeight: 600 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Selecionar período
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '0 12px 10px' }}>
              {[
                { label: 'Receitas', val: 'R$ 9.212', color: '#22c55e', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
                { label: 'Despesas', val: 'R$ 388', color: '#ef4444', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg> },
                { label: 'Saldo', val: 'R$ 8.824', color: '#22c55e', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { label: 'Registros', val: '47', color: '#d44f1e', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d44f1e" strokeWidth={2}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
              ].map((card, i) => (
                <div key={i} style={{ border: '1.5px solid #eee', borderRadius: '12px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '4px' }}>{card.label}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: card.color, letterSpacing: '-0.5px' }}>{card.val}</span>
                    {card.icon}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '6px 12px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e05b8a" strokeWidth={2.5}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#1a1a1a' }}>Movimentações</span>
            </div>
            {/* Bottom nav */}
            <div style={{ background: '#fff', borderTop: '1px solid #f0f0f0', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '8px 0 4px' }}>
              {[
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Home' },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, label: 'Pedidos' },
                { center: true },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, label: 'Clientes' },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>, label: 'Mais' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  {item.center ? (
                    <div style={{ width: '34px', height: '34px', background: '#e05b8a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-12px', boxShadow: '0 4px 12px rgba(224,91,138,.4)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                  ) : (
                    <>
                      {item.icon}
                      <span style={{ fontSize: '9px', color: '#888' }}>{item.label}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="sp-dark">Como funciona</span>
          <h2 className="sh dark">Não tem jeito certo de usar.<br />Tem o seu jeito.</h2>
          <p className="ss-dark" style={{ margin: '0 auto' }}>Precifica, gera orçamento, controla o financeiro. No ritmo que você trabalha.</p>
        </div>
        <div className="how-grid">
          {[
            { n: '1', t: 'Cadastra seus materiais uma vez', d: 'Nunca mais calcula do zero. O sistema lembra de tudo e atualiza o impacto no lucro quando o preço muda.' },
            { n: '2', t: 'Descobre em 10 segundos se está lucrando', d: 'Ou se está trabalhando de graça. O número aparece na tela. Sem fórmula. Sem achismo.' },
            { n: '3', t: 'O cliente para de pechinchar', d: 'Você manda o PDF com logo, itens e Pix. Ele vê o trabalho por trás. Sem mais discussão de preço.' },
            { n: '4', t: 'Vê quanto sobra de verdade', d: 'Pela primeira vez você sabe o lucro real. Pode ser um choque.' },
          ].map((step) => (
            <div key={step.n} className="how-card">
              <div className="how-n">{step.n}</div>
              <div className="how-t">{step.t}</div>
              <div className="how-d">{step.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <section id="proof" className="proof">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <span className="sp-dark">Resultados reais</span>
          <h2 className="sh dark" style={{ marginBottom: '12px' }}>+5 mil criadoras já descobriram<br />quanto deixavam na mesa.</h2>
          <p className="ss-dark" style={{ marginBottom: '48px' }}>A maioria descobriu no primeiro pedido que calculou.</p>
          <div className="proof-nums">
            {[
              { v: '+5mil', l: 'criadoras ativas' },
              { v: '87%', l: 'cobravam abaixo do ideal' },
              { v: 'R$2M+', l: 'em orçamentos/mês' },
              { v: '10min', l: 'pra ver o resultado' },
            ].map((num) => (
              <div key={num.v} className="pn">
                <span className="pn-v">{num.v}</span>
                <span className="pn-l">{num.l}</span>
              </div>
            ))}
          </div>
          <div className="tcards">
            {[
              { init: 'P', name: 'Criadora de Papelaria', city: 'São Paulo, SP', text: 'Descobri que estava cobrando 40% abaixo do ideal. Reajustei os preços e não perdi nenhum cliente.' },
              { init: 'S', name: 'Especialista em Sublimação', city: 'Minas Gerais, MG', text: 'O PDF de orçamento mudou como os clientes me enxergam. Quando mostro o cálculo, ninguém mais pede desconto.' },
              { init: 'M', name: 'Criadora em MDF', city: 'Paraná, PR', text: 'Em dois anos nunca coloquei o custo da impressora no preço. O PreciArte me mostrou isso em 10 minutos.' },
              { init: 'C', name: 'Produtora de Caixinhas', city: 'Rio de Janeiro, RJ', text: 'Fechei o mês com o dobro de lucro. Não vendi mais — só parei de cobrar errado.' },
            ].map((t) => (
              <div key={t.init} className="tcard">
                <div className="tstars">★★★★★</div>
                <p className="ttext">{t.text}</p>
                <div className="tauthor">
                  <div className="tav">{t.init}</div>
                  <div>
                    <div className="tname">{t.name}</div>
                    <div className="tni">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '40px', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '17px', fontWeight: 700, color: 'rgba(255,255,255,.6)', fontStyle: 'italic' }}>
            A próxima a descobrir quanto deixou na mesa pode ser você.
          </p>
        </div>
      </section>

      {/* DOPAMINE BAND 2 */}
      <div className="dband">
        <p>"Em dois anos nunca coloquei o custo da impressora no preço."</p>
      </div>

      {/* PRICING */}
      <section id="pricing" className="pricing">
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <span className="sp-light">Investimento</span>
          <h2 className="sh light" style={{ marginBottom: '12px' }}>Menos que um kit de material.<br />Resultado que dura o ano inteiro.</h2>
          <p className="ss-light" style={{ margin: '0 auto' }}>Escolha o plano certo pra você.</p>
        </div>
        <div className="pricing-wrap">
          <div className="pc feat" style={{ width: '360px' }}>
            <span className="pc-badge">🔥 Mais econômico</span>
            <p className="pc-name">Plano Anual</p>
            <p className="pc-price"><sup>R$</sup>11<span style={{ fontSize: '28px' }}>,90</span></p>
            <p className="pc-per">por mês — R$ 119,90 à vista</p>
            <p className="pc-save">Você economiza R$ 358,90 no ano</p>
            <ul className="pc-features">
              {[
                'Precificação automática completa',
                'Orçamentos em PDF ilimitados',
                'Controle financeiro real',
                'Catálogo online com link próprio',
                'Edição de fotos com IA',
                'Assistente de marketing IA',
                'Acesso imediato e completo',
                'Atualizações inclusas',
                'Sem aumento surpresa',
                'Suporte individual no WhatsApp',
                'Treinamento de como usar a plataforma',
              ].map((feat) => <li key={feat}>{feat}</li>)}
            </ul>
            <a href={checkoutUrl} className="pc-btn">Assinar anual agora →</a>
            <div className="pc-post">
              <p className="pc-pl">Você também vai descobrir:</p>
              <ul className="pc-buls">
                <li><span>→</span>Por que multiplicar por 3 te faz perder dinheiro mesmo parecendo certo</li>
                <li><span>→</span>O custo que 9 em 10 criadoras nunca colocam no preço</li>
                <li><span>→</span>Quanto você realmente deveria cobrar pelo seu pedido mais comum</li>
              </ul>
            </div>
          </div>
        </div>
        <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--text-muted-dark)' }}>Pagamento seguro. Acesso imediato. Sem pegadinhas.</p>
      </section>

      {/* DIFERENCIAL */}
      <section className="diff-sec">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span className="sp-light">Por que o PreciArte</span>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '14px' }}>A concorrência não foi feita pra você.<br />Foi feita pra qualquer um.</h2>
          <p style={{ fontSize: '17px', color: 'var(--text-muted-dark)', maxWidth: '560px', lineHeight: 1.65, marginBottom: '20px' }}>Bling, Tiny, planilhas, ERPs — você se adapta ao sistema deles. Com o PreciArte, o sistema se adapta a você.</p>
          <p style={{ fontSize: '16px', color: 'var(--text-dark)', lineHeight: 1.7, marginBottom: '32px', padding: '18px 22px', background: 'var(--bg-light2)', borderRadius: '10px', borderLeft: '3px solid var(--brand)' }}>
            Você provavelmente já tentou usar algum desses sistemas. Passou horas tentando encaixar o seu negócio nele. Adaptou o que podia, desistiu do resto. Não era você que estava errada — era o sistema que não foi feito pra você.
          </p>
          <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-muted-dark)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '16px' }}>Veja a diferença na prática:</p>
          <div className="diff-grid">
            <div className="diff-card-off">
              <div className="diff-badge-off">Outros sistemas</div>
              <div className="diff-items">
                {[
                  'Feitos para qualquer tipo de negócio',
                  'Não calculam impressão por pedido',
                  'Não entendem de material por unidade',
                  'Você força o negócio a caber neles',
                  'Adaptação — nunca encaixa de verdade',
                ].map((item) => (
                  <div key={item} className="diff-item">
                    <span style={{ color: '#dc2626', fontWeight: 700, flexShrink: 0 }}>✕</span>{item}
                  </div>
                ))}
              </div>
            </div>
            <div className="diff-card-on">
              <div className="diff-badge-on">PreciArte</div>
              <div className="diff-items">
                {[
                  'Criado do zero para produto personalizado',
                  'Calcula impressão, insumo, hora e margem',
                  'Entende de produção sob encomenda',
                  'O sistema funciona do jeito que você trabalha',
                  'Nativo — foi criado pra isso, não adaptado',
                ].map((item) => (
                  <div key={item} className="diff-item">
                    <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <span className="sp-dark">Dúvidas frequentes</span>
          <h2 className="sh dark" style={{ marginBottom: '12px' }}>Antes de fechar,<br />deixa eu responder.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-it${openFaq === i ? ' open' : ''}`}>
              <button className="faq-btn" onClick={() => toggleFaq(i)}>
                {faq.q}<span className="faq-ic">+</span>
              </button>
              <div className="faq-body">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <div className="final-box">
          <div className="final-quote">
            Olha, eu não tô aqui pra te convencer de nada. Mas posso te dizer uma coisa: 87% das criadoras que usaram o PreciArte descobriram que estavam cobrando errado — algumas por anos. Não é culpa sua. Nunca teve uma ferramenta feita pra você. Agora tem. Se você usar e não ver diferença nenhuma, tudo bem. Mas se você for como a maioria — você vai entender em 10 minutos por que o dinheiro some no fim do mês.
          </div>
          <h2 className="final-h">Você já sabe que algo não tá certo.<br />Agora você pode descobrir o quê.</h2>
          <p className="final-sub">R$ 11,90 por mês. Acesso imediato.</p>
          <p className="final-sc">O preço atual é de lançamento. Quando o plano mensal for descontinuado, o anual sobe.</p>
          <a href={checkoutUrl} className="final-btn">Quero precificar certo agora →</a>
          <p className="final-pp">A escolha é sua. Mas cada pedido que você fecha hoje sem calcular direito é lucro que vai embora pra sempre.</p>
        </div>
      </section>

      <footer>
        <div className="fl">Preci<span>Arte</span></div>
        <span className="fc-copyright">© 2025 PreciArte · Todos os direitos reservados</span>
        <div className="flinks">
          <a href="#">Termos de uso</a>
          <a href="#">Privacidade</a>
        </div>
      </footer>
    </>
  );
};

export default LP4;
