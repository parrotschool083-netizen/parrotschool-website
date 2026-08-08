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
