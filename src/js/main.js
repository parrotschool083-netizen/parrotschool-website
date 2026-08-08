(function(){
var s=document.createElement('style');
s.textContent='@keyframes wing-l{0%,100%{transform:rotate(0) scaleY(1)}38%{transform:rotate(-28deg) scaleY(.8)}65%{transform:rotate(16deg) scaleY(1.07)}}@keyframes wing-r{0%,100%{transform:rotate(0) scaleY(1)}38%{transform:rotate(28deg) scaleY(.8)}65%{transform:rotate(-16deg) scaleY(1.07)}}@keyframes head-bob{0%,100%{transform:rotate(0)}28%{transform:rotate(-9deg)}72%{transform:rotate(7deg)}}@keyframes tail-wave{0%,100%{transform:rotate(0)}50%{transform:rotate(7deg)}}@keyframes body-breathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.035)}}@keyframes blink-anim{0%,80%,100%{transform:scaleY(0)}84%,96%{transform:scaleY(1)}}@keyframes sparkle-anim{0%,100%{opacity:0;transform:scale(.4)}50%{opacity:1;transform:scale(1)}}';
document.head.appendChild(s);
var pc=document.getElementById('particles');
if(pc){pc.style.cssText='position:absolute;inset:0;pointer-events:none';for(var i=0;i<28;i++){var d=document.createElement('div');var sz=(Math.random()*3+1);d.style.cssText='position:absolute;border-radius:50%;left:'+Math.random()*100+'%;width:'+sz+'px;height:'+sz+'px;background:'+(Math.random()>.5?'white':'rgba(240,101,26,.6)')+';animation:p-rise linear infinite;animation-duration:'+(Math.random()*12+7)+'s;animation-delay:'+(Math.random()*8)+'s;opacity:0;';pc.appendChild(d);}}
var nav=document.querySelector('.nav');
if(nav){window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>50);},{passive:true});}
var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(!en.isIntersecting)return;en.target.classList.add('on');en.target.querySelectorAll('[data-target]').forEach(function(el){if(el.dataset.animated)return;el.dataset.animated=1;var tgt=+el.dataset.target;var sfx=el.dataset.sfx!==undefined?el.dataset.sfx:'+';var t0=performance.now();var dur=1600;(function tick(now){var p=Math.min((now-t0)/dur,1);var e=1-Math.pow(1-p,3);el.textContent=Math.round(e*tgt)+sfx;if(p<1)requestAnimationFrame(tick);})(performance.now());});en.target.querySelectorAll('.pb-fill').forEach(function(b){setTimeout(function(){b.classList.add('go');},400);});});},{threshold:.14,rootMargin:'0px 0px -44px 0px'});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(function(el){io.observe(el);});
var burger=document.getElementById('nav-burger');
var navLinks=document.getElementById('nav-links');
if(burger&&navLinks){
  burger.addEventListener('click',function(){
    var open=navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded',String(open));
    var sp=burger.querySelectorAll('span');
    sp[0].style.transform=open?'rotate(45deg) translate(5px,5px)':'';
    sp[1].style.opacity=open?'0':'';
    sp[2].style.transform=open?'rotate(-45deg) translate(5px,-5px)':'';
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
      burger.querySelectorAll('span').forEach(function(sp){sp.style.transform='';sp.style.opacity='';});
    });
  });
}
if(matchMedia('(hover:hover)').matches){document.querySelectorAll('.sc,.lc,.pc,.hc').forEach(function(card){card.addEventListener('mousemove',function(e){var r=card.getBoundingClientRect();var x=(e.clientX-r.left)/r.width-.5;var y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(700px) rotateY('+(x*9)+'deg) rotateX('+(-y*9)+'deg) translateY(-4px)';},{passive:true});card.addEventListener('mouseleave',function(){card.style.transform='';});});}
})();
document.querySelectorAll('a').forEach(function(a){
  var href=a.getAttribute('href');
  if(href&&(href.indexOf('/pages/')===0||href.indexOf('pages/')===0)){
    a.onclick=function(e){e.preventDefault();e.stopImmediatePropagation();window.location.assign(href);};
  }
});

(function(){
  var canvas=document.getElementById('orbit-canvas');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var W=420,cx=W/2,cy=W/2,R=185;
  var labels=['🌍 World Events','🎬 Movies & Pop','🤖 AI & Tech','🎮 Gaming','✈️ Travel','🎵 Music & Art'];
  var colors=['rgba(18,184,160,.35)','rgba(255,212,59,.35)','rgba(240,101,26,.35)','rgba(255,255,255,.1)','rgba(18,184,160,.35)','rgba(255,212,59,.35)'];
  var textColors=['#12B8A0','#FFD43B','#F0651A','#fff','#12B8A0','#FFD43B'];
  var n=labels.length;
  var angle=0;
  ctx.font='bold 13px Nunito,sans-serif';
  function draw(){
    ctx.clearRect(0,0,W,W);
    for(var i=0;i<n;i++){
      var a=angle+i*(Math.PI*2/n);
      var x=cx+R*Math.cos(a);
      var y=cy+R*Math.sin(a);
      var txt=labels[i];
      var tw=ctx.measureText(txt).width;
      var pw=tw+20,ph=30,pr=15;
      var rx=x-pw/2,ry=y-ph/2;
      ctx.beginPath();
      ctx.roundRect(rx,ry,pw,ph,pr);
      ctx.fillStyle='rgba(22,22,42,0.96)';
      ctx.fill();
      ctx.strokeStyle=colors[i];
      ctx.lineWidth=1;
      ctx.stroke();
      ctx.fillStyle=textColors[i];
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.fillText(txt,x,y);
    }
    angle+=0.007;
    requestAnimationFrame(draw);
  }
  draw();
})();

function switchTab(tab){
  document.querySelectorAll('.mot-content').forEach(function(el){el.style.display='none';});
  document.querySelectorAll('.mot-tab').forEach(function(el){el.classList.remove('active');});
  document.getElementById('tab-'+tab).style.display='block';
  event.target.classList.add('active');
}

function switchBooksTab(tab){
  document.getElementById('books-junior').style.display=tab==='junior'?'block':'none';
  document.getElementById('books-senior').style.display=tab==='senior'?'block':'none';
  document.querySelectorAll('.books-tabs .mot-tab').forEach(function(el){el.classList.remove('active');});
  event.target.classList.add('active');
}



/* ═══ PARROT V2 REALISTIC ═══ */
(function(){
  var canvas=document.getElementById('parrot-canvas');
  var speech=document.getElementById('parrot-speech');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var W=canvas.width,H=canvas.height;
  var phrases=["Привіт! 🦜","Чекаємо тебе! 📚","Hello! 🌍","Cambridge A2! 🏆","Let's speak! 🗣️","Great job! ⭐","Вчи англійську! 🎯","See you in class! ✈️"];
  var x=W/2,dir=1,spd=1.2,t=0,wCyc=0;
  var wingA=0,beakO=0,blinkV=0,blinkT=200,headT=0;
  var talking=false,wingUp=false,wingUpA=0;

  function speak(){
    if(talking)return;
    talking=true;wingUp=true;
    speech.textContent=phrases[Math.floor(Math.random()*phrases.length)];
    speech.style.opacity='1';
    setTimeout(function(){speech.style.opacity='0';},3000);
    setTimeout(function(){talking=false;wingUp=false;},3500);
    setTimeout(speak,5000+Math.random()*5000);
  }
  canvas.addEventListener('click',speak);
  setTimeout(speak,2000);

  function roundRect(x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);
    ctx.closePath();
  }

  function draw(){
    var bob=talking?0:Math.sin(wCyc)*4;
    var py=H-60+bob;
    var flip=dir<0?-1:1;

    ctx.clearRect(0,0,W,H);
    ctx.save();
    ctx.translate(x,py);
    ctx.scale(flip,1);

    var sc=1.35;
    ctx.scale(sc,sc);

    /* SHADOW */
    ctx.beginPath();
    ctx.ellipse(0,72,38,8,0,0,Math.PI*2);
    ctx.fillStyle='rgba(0,0,0,0.15)';ctx.fill();

    /* TAIL */
    ctx.save();ctx.rotate(Math.sin(t*0.7)*0.06);
    for(var i=-1;i<=1;i++){
      ctx.beginPath();
      ctx.moveTo(i*10,50);
      ctx.bezierCurveTo(i*14,60,i*16+5,72,i*12+2,82);
      ctx.bezierCurveTo(i*8,76,i*6,64,i*8,52);
      ctx.closePath();
      ctx.fillStyle=i===0?'#3a9a3a':'#2d7a2d';ctx.fill();
    }
    ctx.restore();

    /* FEET & LEGS */
    var legPhase=talking?0:Math.sin(wCyc)*6;
    [[-16,legPhase],[16,-legPhase]].forEach(function(leg){
      var lx=leg[0],ly=leg[1];
      /* leg */
      ctx.beginPath();ctx.moveTo(lx,55);ctx.lineTo(lx+ly*0.2,70);
      ctx.strokeStyle='#8B6914';ctx.lineWidth=4;ctx.lineCap='round';ctx.stroke();
      /* toes */
      var tx=lx+ly*0.2,ty2=70;
      [[-14,2],[-6,6],[4,4],[10,-2]].forEach(function(toe){
        ctx.beginPath();ctx.moveTo(tx,ty2);
        ctx.lineTo(tx+toe[0],ty2+toe[1]);
        ctx.strokeStyle='#6B4C10';ctx.lineWidth=3;ctx.stroke();
        /* nail */
        ctx.beginPath();ctx.arc(tx+toe[0],ty2+toe[1],2,0,Math.PI*2);
        ctx.fillStyle='#3a2a05';ctx.fill();
      });
    });

    /* WING BACK (left) */
    var wBack=talking&&wingUp?-wingUpA:-Math.abs(Math.sin(t*4))*20;
    ctx.save();ctx.translate(-40,5);ctx.rotate(wBack*Math.PI/180);
    /* main wing shape */
    ctx.beginPath();
    ctx.moveTo(0,-30);
    ctx.bezierCurveTo(-22,-28,-28,0,-24,30);
    ctx.bezierCurveTo(-20,42,-8,46,0,42);
    ctx.bezierCurveTo(8,38,10,10,6,-20);
    ctx.closePath();
    ctx.fillStyle='#2d7a2d';ctx.fill();
    /* feather lines */
    for(var f=0;f<6;f++){
      ctx.beginPath();
      ctx.moveTo(-4+f*2,-20+f*8);ctx.lineTo(-16+f*2,30+f*2);
      ctx.strokeStyle='rgba(0,60,0,0.3)';ctx.lineWidth=1.5;ctx.stroke();
    }
    /* feather tips - darker */
    ctx.beginPath();
    ctx.moveTo(-24,22);ctx.bezierCurveTo(-26,30,-22,40,-16,42);
    ctx.bezierCurveTo(-10,44,-8,38,-12,30);
    ctx.fillStyle='#1a5a1a';ctx.fill();
    ctx.restore();

    /* BODY - white/cream chest */
    /* green back */
    ctx.beginPath();
    ctx.ellipse(4,8,40,56,0.08,0,Math.PI*2);
    ctx.fillStyle='#3d8c3d';ctx.fill();
    /* white front */
    ctx.beginPath();
    ctx.ellipse(-4,12,30,48,-0.08,0,Math.PI*2);
    ctx.fillStyle='#f0ede8';ctx.fill();
    /* feather texture on chest */
    for(var row=0;row<5;row++){
      for(var col=0;col<2;col++){
        ctx.beginPath();
        ctx.ellipse(-14+col*18,-10+row*16,10,12,0,0,Math.PI*2);
        ctx.fillStyle=row%2===0?'#ebe8e2':'#f4f1eb';
        ctx.fill();
        ctx.strokeStyle='rgba(0,0,0,0.06)';ctx.lineWidth=1;ctx.stroke();
      }
    }
    /* orange shoulder patches */
    ctx.beginPath();ctx.ellipse(-30,-18,10,9,0.4,0,Math.PI*2);
    ctx.fillStyle='#F0651A';ctx.fill();

    /* WING FRONT (right) */
    var wFront=talking&&wingUp?wingUpA:Math.abs(Math.sin(t*4))*20;
    ctx.save();ctx.translate(40,5);ctx.rotate(wFront*Math.PI/180);
    ctx.beginPath();
    ctx.moveTo(0,-30);
    ctx.bezierCurveTo(22,-28,28,0,24,30);
    ctx.bezierCurveTo(20,42,8,46,0,42);
    ctx.bezierCurveTo(-8,38,-10,10,-6,-20);
    ctx.closePath();
    ctx.fillStyle='#3a8a3a';ctx.fill();
    for(var f=0;f<6;f++){
      ctx.beginPath();
      ctx.moveTo(4-f*2,-20+f*8);ctx.lineTo(16-f*2,30+f*2);
      ctx.strokeStyle='rgba(0,60,0,0.3)';ctx.lineWidth=1.5;ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(24,22);ctx.bezierCurveTo(26,30,22,40,16,42);
    ctx.bezierCurveTo(10,44,8,38,12,30);
    ctx.fillStyle='#1a5a1a';ctx.fill();
    /* orange patch on wing */
    ctx.beginPath();ctx.ellipse(6,-22,9,8,-0.3,0,Math.PI*2);
    ctx.fillStyle='#F0651A';ctx.fill();
    ctx.restore();

    /* HEAD */
    ctx.save();ctx.translate(0,-42+Math.sin(t*1.8)*2.5);
    ctx.rotate(Math.sin(t*1.2)*0.04);

    /* head base - orange/brown */
    ctx.beginPath();ctx.ellipse(0,0,34,36,0,0,Math.PI*2);
    ctx.fillStyle='#c8641e';ctx.fill();
    /* orange feather layers */
    ctx.beginPath();ctx.ellipse(-10,-6,20,26,-0.1,0,Math.PI*2);
    ctx.fillStyle='#d4742a';ctx.fill();
    ctx.beginPath();ctx.ellipse(10,-6,20,26,0.1,0,Math.PI*2);
    ctx.fillStyle='#be5a18';ctx.fill();
    /* top green */
    ctx.beginPath();ctx.ellipse(0,-22,16,14,0,0,Math.PI*2);
    ctx.fillStyle='#4aaa4a';ctx.fill();
    ctx.beginPath();ctx.ellipse(-8,-28,9,8,0.3,0,Math.PI*2);
    ctx.fillStyle='#3a9a3a';ctx.fill();
    ctx.beginPath();ctx.ellipse(8,-28,9,8,-0.3,0,Math.PI*2);
    ctx.fillStyle='#3a9a3a';ctx.fill();

    /* EYE */
    /* eye ring */
    ctx.beginPath();ctx.arc(14,-2,16,0,Math.PI*2);
    ctx.fillStyle='#f5f0e8';ctx.fill();
    /* iris outer */
    ctx.beginPath();ctx.arc(14,-2,12,0,Math.PI*2);
    ctx.fillStyle='#2a6b18';ctx.fill();
    /* iris inner */
    ctx.beginPath();ctx.arc(14,-2,8,0,Math.PI*2);
    ctx.fillStyle='#1a4a10';ctx.fill();
    /* pupil */
    ctx.beginPath();ctx.arc(14,-2,5,0,Math.PI*2);
    ctx.fillStyle='#050505';ctx.fill();
    /* shine main */
    ctx.beginPath();ctx.arc(18,-6,3,0,Math.PI*2);
    ctx.fillStyle='white';ctx.fill();
    /* shine small */
    ctx.beginPath();ctx.arc(11,2,1.5,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.7)';ctx.fill();
    /* BLINK */
    if(blinkV>0){
      ctx.beginPath();ctx.arc(14,-2,16,0,Math.PI*2);
      ctx.save();ctx.scale(1,blinkV);
      ctx.beginPath();ctx.arc(14,-2/blinkV,16,0,Math.PI*2);
      ctx.fillStyle='#c8641e';ctx.fill();
      ctx.restore();
    }

    /* BEAK */
    ctx.save();ctx.translate(2,14);
    /* upper */
    ctx.beginPath();
    ctx.moveTo(-12,-4);
    ctx.bezierCurveTo(-14,-10,14,-10,12,-4);
    ctx.bezierCurveTo(14,4,6,16,0,18);
    ctx.bezierCurveTo(-6,16,-14,4,-12,-4);
    ctx.fillStyle='#8a8070';ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-10,-2);ctx.bezierCurveTo(-12,-8,12,-8,10,-2);
    ctx.bezierCurveTo(12,2,4,10,0,12);
    ctx.bezierCurveTo(-4,10,-12,2,-10,-2);
    ctx.fillStyle='#9a9080';ctx.fill();
    /* lower jaw */
    var bO=talking?beakO*12:0;
    ctx.beginPath();
    ctx.moveTo(-9,2);
    ctx.bezierCurveTo(-10,2+bO,10,2+bO,9,2);
    ctx.bezierCurveTo(6,12+bO,0,16+bO,-0,16+bO);
    ctx.bezierCurveTo(-0,16+bO,-6,12+bO,-9,2);
    ctx.fillStyle='#7a7060';ctx.fill();
    /* mouth */
    if(bO>2){
      ctx.beginPath();
      ctx.moveTo(-7,4);ctx.bezierCurveTo(-8,4+bO,8,4+bO,7,4);
      ctx.bezierCurveTo(4,12+bO,0,14+bO,0,14+bO);
      ctx.bezierCurveTo(0,14+bO,-4,12+bO,-7,4);
      ctx.fillStyle='#7a1010';ctx.fill();
      /* tongue */
      ctx.beginPath();ctx.ellipse(0,10+bO,4,3,0,0,Math.PI*2);
      ctx.fillStyle='#c03030';ctx.fill();
    }
    ctx.restore();

    /* cheek blush */
    ctx.beginPath();ctx.ellipse(-18,8,8,5,0.2,0,Math.PI*2);
    ctx.fillStyle='rgba(200,80,20,0.3)';ctx.fill();

    ctx.restore(); /* head */
    ctx.restore(); /* main */
  }

  /* blink logic */
  var blinkPhase=0,isBlinking=false;

  function tick(){
    t+=0.02; wCyc+=talking?0:0.18;
    if(!talking){x+=dir*spd;if(x>W-90){dir=-1;}if(x<90){dir=1;}}
    wingA=Math.abs(Math.sin(t*4))*20;
    beakO=Math.sin(t*10)*0.5+0.5;
    wingUpA=Math.min(wingUpA+(wingUp?5:-5),60);
    wingUpA=Math.max(wingUpA,0);
    blinkT--;
    if(blinkT<=0&&!isBlinking){isBlinking=true;blinkPhase=0;blinkT=100+Math.random()*180;}
    if(isBlinking){
      blinkPhase+=0.2;
      blinkV=blinkPhase<1?blinkPhase:Math.max(0,2-blinkPhase);
      if(blinkPhase>2){isBlinking=false;blinkV=0;}
    }
    draw();
    requestAnimationFrame(tick);
  }
  tick();
})();
