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

/* ═══ PARROT CANVAS CHARACTER ═══ */
(function(){
  var canvas = document.getElementById('parrot-canvas');
  var speech = document.getElementById('parrot-speech');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;

  var phrases = [
    "Привіт! 🦜","Чекаємо тебе! 📚","Hello! 🌍",
    "Cambridge A2! 🏆","Let's speak! 🗣️","Homework? ✅",
    "Great job! ⭐","See you! ✈️","Вчи англійську! 🎯"
  ];

  /* STATE */
  var x = W/2, y = H-100;
  var dir = 1;         /* 1=right -1=left */
  var speed = 1.4;
  var maxX = W-80, minX = 80;
  var t = 0;

  /* ANIMATION STATE */
  var wingAngle = 0;
  var bodyBob = 0;
  var headBob = 0;
  var eyeBlink = 0;
  var beakOpen = 0;
  var walkCycle = 0;

  /* TALK STATE */
  var talking = false;
  var talkTimer = 0;
  var wingRaised = false;
  var wingRaiseAngle = 0;

  function startTalk(){
    if(talking) return;
    talking = true;
    talkTimer = 180;
    wingRaised = true;
    var p = phrases[Math.floor(Math.random()*phrases.length)];
    speech.textContent = p;
    speech.style.opacity = '1';
    setTimeout(function(){
      speech.style.opacity = '0';
    }, 2800);
    setTimeout(function(){
      talking = false;
      wingRaised = false;
    }, 3200);
    /* Next talk */
    setTimeout(startTalk, 4000 + Math.random()*5000);
  }

  canvas.addEventListener('click', startTalk);
  setTimeout(startTalk, 2000);

  /* DRAW FEATHER BODY */
  function drawBody(flip){
    ctx.save();
    ctx.scale(flip, 1);

    /* SHADOW */
    ctx.beginPath();
    ctx.ellipse(0, 95, 55, 12, 0, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fill();

    /* TAIL */
    ctx.save();
    ctx.rotate(Math.sin(t*0.8)*0.08);
    ctx.beginPath();
    ctx.ellipse(10, 70, 18, 32, 0.3, 0, Math.PI*2);
    ctx.fillStyle = '#2d7a2d';
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, 75, 14, 28, 0, 0, Math.PI*2);
    ctx.fillStyle = '#3a9a3a';
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-12, 70, 16, 30, -0.3, 0, Math.PI*2);
    ctx.fillStyle = '#2d7a2d';
    ctx.fill();
    ctx.restore();

    /* FEET */
    var legBob = talking ? 0 : Math.sin(walkCycle)*8;
    /* left leg */
    ctx.beginPath();
    ctx.moveTo(-14, 78);
    ctx.lineTo(-20+legBob*0.3, 95);
    ctx.strokeStyle='#7a5c12';ctx.lineWidth=5;ctx.lineCap='round';ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-20+legBob*0.3,95);ctx.lineTo(-32+legBob*0.3,98);
    ctx.moveTo(-20+legBob*0.3,95);ctx.lineTo(-18+legBob*0.3,100);
    ctx.moveTo(-20+legBob*0.3,95);ctx.lineTo(-10+legBob*0.3,97);
    ctx.strokeStyle='#5a3c08';ctx.lineWidth=4;ctx.stroke();
    /* right leg */
    ctx.beginPath();
    ctx.moveTo(14, 78);
    ctx.lineTo(20-legBob*0.3, 95);
    ctx.strokeStyle='#7a5c12';ctx.lineWidth=5;ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(20-legBob*0.3,95);ctx.lineTo(32-legBob*0.3,98);
    ctx.moveTo(20-legBob*0.3,95);ctx.lineTo(18-legBob*0.3,100);
    ctx.moveTo(20-legBob*0.3,95);ctx.lineTo(10-legBob*0.3,97);
    ctx.strokeStyle='#5a3c08';ctx.lineWidth=4;ctx.stroke();

    /* WING LEFT (back) */
    var wL = talking && wingRaised ? -wingRaiseAngle : -Math.sin(t*4)*18;
    ctx.save();
    ctx.translate(-38, 10);
    ctx.rotate(wL * Math.PI/180);
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 42, -0.2, 0, Math.PI*2);
    ctx.fillStyle = '#2a6e2a';
    ctx.fill();
    /* feather lines */
    for(var i=0;i<5;i++){
      ctx.beginPath();
      ctx.moveTo(-12+i*5,-10);ctx.lineTo(-14+i*5,20);
      ctx.strokeStyle='rgba(0,80,0,0.25)';ctx.lineWidth=1.5;ctx.stroke();
    }
    ctx.restore();

    /* BODY */
    ctx.beginPath();
    ctx.ellipse(0, 20, 46, 58, 0, 0, Math.PI*2);
    ctx.fillStyle = '#f5f5f0';
    ctx.fill();
    /* body feathers */
    for(var row=0;row<4;row++){
      for(var col=0;col<3;col++){
        ctx.beginPath();
        ctx.ellipse(-20+col*20, -10+row*20, 12, 14, 0, 0, Math.PI*2);
        ctx.fillStyle = row===0?'#e8e8e0':'#f0f0ea';
        ctx.fill();
        ctx.strokeStyle='rgba(0,0,0,0.07)';ctx.lineWidth=1;ctx.stroke();
      }
    }

    /* GREEN BACK */
    ctx.save();
    ctx.globalCompositeOperation='destination-over';
    ctx.beginPath();
    ctx.ellipse(8, 15, 44, 55, 0.15, 0, Math.PI*2);
    ctx.fillStyle='#4aaa4a';
    ctx.fill();
    ctx.restore();

    /* WING RIGHT (front) - raises when talking */
    var wR = talking && wingRaised ? wingRaiseAngle : Math.sin(t*4)*18;
    ctx.save();
    ctx.translate(38, 10);
    ctx.rotate(wR * Math.PI/180);
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 42, 0.2, 0, Math.PI*2);
    ctx.fillStyle='#3a8a3a';
    ctx.fill();
    for(var i=0;i<5;i++){
      ctx.beginPath();
      ctx.moveTo(-10+i*4,-10);ctx.lineTo(-12+i*4,20);
      ctx.strokeStyle='rgba(0,80,0,0.25)';ctx.lineWidth=1.5;ctx.stroke();
    }
    /* orange shoulder patch */
    ctx.beginPath();
    ctx.ellipse(-4, -20, 10, 10, 0, 0, Math.PI*2);
    ctx.fillStyle='#F0651A';
    ctx.fill();
    ctx.restore();

    /* HEAD */
    ctx.save();
    ctx.translate(0, -42+headBob);
    ctx.rotate(Math.sin(t*1.5)*0.05);

    /* HEAD BASE */
    ctx.beginPath();
    ctx.ellipse(0, 0, 38, 40, 0, 0, Math.PI*2);
    ctx.fillStyle='#d4742a';
    ctx.fill();
    /* head feathers */
    ctx.beginPath();
    ctx.ellipse(-8,-8,22,28,-.1,0,Math.PI*2);
    ctx.fillStyle='#e8823a';ctx.fill();
    ctx.beginPath();
    ctx.ellipse(8,-8,22,28,.1,0,Math.PI*2);
    ctx.fillStyle='#cc6820';ctx.fill();
    /* crown green patch */
    ctx.beginPath();
    ctx.ellipse(0,-22,18,14,0,0,Math.PI*2);
    ctx.fillStyle='#4aaa4a';ctx.fill();

    /* EYE WHITE */
    ctx.beginPath();
    ctx.ellipse(16, -4, 13, 13, 0, 0, Math.PI*2);
    ctx.fillStyle='white';ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,0.15)';ctx.lineWidth=1;ctx.stroke();
    /* iris */
    ctx.beginPath();
    ctx.ellipse(16,-4,8,8,0,0,Math.PI*2);
    ctx.fillStyle='#2d5a1a';ctx.fill();
    /* pupil */
    ctx.beginPath();
    ctx.ellipse(16,-4,5,5,0,0,Math.PI*2);
    ctx.fillStyle='#0a0a0a';ctx.fill();
    /* shine */
    ctx.beginPath();
    ctx.ellipse(19,-7,2.5,2.5,0,0,Math.PI*2);
    ctx.fillStyle='white';ctx.fill();
    ctx.beginPath();
    ctx.ellipse(14,-1,1.2,1.2,0,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.6)';ctx.fill();
    /* BLINK */
    if(eyeBlink > 0){
      ctx.beginPath();
      ctx.ellipse(16,-4,13,13*eyeBlink,0,0,Math.PI*2);
      ctx.fillStyle='#d4742a';ctx.fill();
    }

    /* BEAK */
    ctx.save();
    ctx.translate(-2,12);
    /* upper beak */
    ctx.beginPath();
    ctx.moveTo(-12,-2);
    ctx.quadraticCurveTo(0,-8,12,-2);
    ctx.quadraticCurveTo(4,14,0,16);
    ctx.quadraticCurveTo(-4,14,-12,-2);
    ctx.fillStyle='#8a8070';ctx.fill();
    /* lower beak - opens when talking */
    var bOpen = talking ? beakOpen*14 : 0;
    ctx.beginPath();
    ctx.moveTo(-8,4);
    ctx.quadraticCurveTo(0,2+bOpen,8,4);
    ctx.quadraticCurveTo(2,12+bOpen,0,14+bOpen);
    ctx.quadraticCurveTo(-2,12+bOpen,-8,4);
    ctx.fillStyle='#6a6060';ctx.fill();
    /* mouth interior */
    if(bOpen>2){
      ctx.beginPath();
      ctx.moveTo(-6,5);ctx.quadraticCurveTo(0,4+bOpen,6,5);
      ctx.quadraticCurveTo(2,10+bOpen,0,12+bOpen);
      ctx.quadraticCurveTo(-2,10+bOpen,-6,5);
      ctx.fillStyle='#8b1a1a';ctx.fill();
    }
    ctx.restore();

    /* CHEEK patches */
    ctx.beginPath();
    ctx.ellipse(-14, 6, 7, 5, -0.3, 0, Math.PI*2);
    ctx.fillStyle='rgba(255,140,80,0.45)';ctx.fill();

    ctx.restore(); /* head */
    ctx.restore(); /* flip */
  }

  /* BLINK timer */
  var nextBlink = 120 + Math.random()*180;
  var blinkT = 0;
  var blinking = false;

  function tick(){
    t += 0.022;
    walkCycle += talking ? 0 : 0.18;

    /* walk */
    if(!talking){
      x += dir * speed;
      if(x > maxX){ dir=-1; }
      if(x < minX){ dir=1; }
    }

    /* body bob */
    bodyBob = talking ? 0 : Math.sin(walkCycle)*5;
    headBob = Math.sin(t*2)*3;

    /* blink */
    nextBlink--;
    if(nextBlink <= 0 && !blinking){
      blinking = true; blinkT = 0;
      nextBlink = 120 + Math.random()*200;
    }
    if(blinking){
      blinkT += 0.18;
      eyeBlink = blinkT < 1 ? blinkT : Math.max(0, 2-blinkT);
      if(blinkT > 2){ blinking=false; eyeBlink=0; }
    }

    /* beak */
    if(talking){
      beakOpen = (Math.sin(t*12)*0.5+0.5);
    } else {
      beakOpen = 0;
    }

    /* wing raise */
    if(wingRaised){
      wingRaiseAngle = Math.min(wingRaiseAngle+4, 60);
    } else {
      wingRaiseAngle = Math.max(wingRaiseAngle-4, 0);
    }

    /* DRAW */
    ctx.clearRect(0,0,W,H);

    var by = y + bodyBob;
    ctx.save();
    ctx.translate(x, by);

    /* 3D tilt based on direction */
    ctx.save();
    if(!talking){
      ctx.transform(1, 0, dir*0.06, 1, 0, 0);
    }
    drawBody(dir);
    ctx.restore();
    ctx.restore();

    requestAnimationFrame(tick);
  }

  tick();
})();
