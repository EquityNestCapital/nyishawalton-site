
(function(){
  var cur='f-med';
  function setF(c){document.documentElement.classList.remove('f-bold','f-med','f-soft');document.documentElement.classList.add(c);[].slice.call(document.querySelectorAll('.fpick button')).forEach(function(x){x.setAttribute('aria-pressed',x.dataset.f===c?'true':'false')});}
  var fp=document.createElement('div');fp.className='fpick';fp.innerHTML='<span>Font</span><button type="button" data-f="f-bold">Bold</button><button type="button" data-f="f-med">Medium</button><button type="button" data-f="f-soft">Elegant</button>';
  [].slice.call(fp.querySelectorAll('button')).forEach(function(x){x.addEventListener('click',function(){setF(x.dataset.f)})});setF(cur);
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(window.Lenis&&!reduce){try{var len=new Lenis({lerp:.085,smoothWheel:true});(function raf(t){len.raf(t);requestAnimationFrame(raf)})(0)}catch(e){}}
  /* word reveal for headings below the fold */
  if('IntersectionObserver' in window&&!reduce){
    var wio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');wio.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px'});
    [].slice.call(document.querySelectorAll('h2.big')).forEach(function(h){
      if(h.getBoundingClientRect().top<window.innerHeight)return;var i=0;
      (function walk(n){[].slice.call(n.childNodes).forEach(function(c){
        if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return}var o=document.createElement('span');o.className='wd';var s=document.createElement('span');s.textContent=w;s.style.setProperty('--i',i++);o.appendChild(s);f.appendChild(o)});n.replaceChild(f,c)}
        else if(c.nodeType===1&&c.tagName!=='BR')walk(c)})})(h);
      h.classList.add('wr','pre');wio.observe(h)});
  }
  /* parallax */
  var heroImg=document.querySelector('.hero .photo img'),ppl=[].slice.call(document.querySelectorAll('.person'));
  if(!reduce){var tick=false;window.addEventListener('scroll',function(){if(tick)return;tick=true;requestAnimationFrame(function(){var y=window.scrollY;ppl.forEach(function(p){var r=p.getBoundingClientRect();p.style.setProperty('--py',((r.top+r.height/2-innerHeight/2)*-0.05)+'px')});tick=false})},{passive:true})}
  /* magnetic buttons */
  if(matchMedia('(pointer:fine)').matches&&!reduce){[].slice.call(document.querySelectorAll('.btn')).forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*0.18)+'px,'+((e.clientY-r.top-r.height/2)*0.3)+'px)'});b.addEventListener('mouseleave',function(){b.style.transform=''})})}
  /* soft page transitions */
  [].slice.call(document.querySelectorAll('a[href$=".html"]')).forEach(function(a){if(a.target)return;a.addEventListener('click',function(e){if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();var h=a.getAttribute('href');document.body.classList.add('leaving');setTimeout(function(){location.href=h},330)})});
  window.addEventListener('pageshow',function(){document.body.classList.remove('leaving')});
  /* gallery drag + arrows */
  var g=document.querySelector('.gal');if(g){var down=false,sx=0,sl=0,moved=false;
    g.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=g.scrollLeft;g.classList.add('drag')});
    window.addEventListener('pointermove',function(e){if(!down)return;var d=e.clientX-sx;if(Math.abs(d)>4)moved=true;g.scrollLeft=sl-d});
    window.addEventListener('pointerup',function(){down=false;g.classList.remove('drag')});
    g.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation()}},true);
    [].slice.call(document.querySelectorAll('.galnav button')).forEach(function(b){b.addEventListener('click',function(){g.scrollBy({left:(+b.dataset.d)*400,behavior:'smooth'})})});}

  var nav=document.getElementById('nav');
  function onScroll(){nav.classList.toggle('solid',window.scrollY>40)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var tabs=[].slice.call(document.querySelectorAll('.tab')),panels=[].slice.call(document.querySelectorAll('#panels .panel'));
  tabs.forEach(function(t){t.addEventListener('click',function(){var i=+t.dataset.p;tabs.forEach(function(x,j){x.setAttribute('aria-selected',j===i?'true':'false')});panels.forEach(function(p,j){p.hidden=j!==i});});});
  var els=[].slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){var r=el.getBoundingClientRect();if(r.top>window.innerHeight){el.classList.add('pre');io.observe(el)}});
  }
  var f=document.getElementById('applyForm');if(f)f.addEventListener('submit',function(e){e.preventDefault();
  var KEY=''; /* Web3Forms access key: messages go privately to the owner's inbox, the address is never shown */
  var th=document.getElementById('thanks');var g=function(id){var el=document.getElementById(id);return el?el.value:''};
  var needs=[].slice.call(f.querySelectorAll('.checks input:checked')).map(function(c){return c.parentNode.textContent.trim()}).join(', ');
  var data={access_key:KEY,subject:'New consultation request: '+g('f-name'),from_name:'NyishaWalton.com',name:g('f-name'),email:g('f-email'),phone:g('f-phone'),business:g('f-biz'),industry:g('f-ind'),preferred_day:g('f-day'),preferred_time:g('f-time'),needs:needs,notes:g('f-msg')};
  if(!KEY){th.textContent='Preview only. Booking connects when the site goes live.';th.hidden=false;return}
  th.textContent='Sending...';th.hidden=false;
  fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)}).then(function(r){return r.json()}).then(function(j){th.textContent=j.success?'Thank you. We will reach out to confirm your consultation time.':'Something went wrong. Please try again in a minute.';if(j.success)f.reset()}).catch(function(){th.textContent='Something went wrong. Please try again in a minute.'});
});
var mb=document.querySelector('.menu');if(mb)mb.addEventListener('click',function(){document.querySelector('.links').classList.toggle('open')});
})();
