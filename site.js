
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
  var lastY=window.scrollY;function onScroll(){var y=window.scrollY;nav.classList.toggle('solid',y>40);var open=document.querySelector('.links.open');if(y>160&&y>lastY+4&&!open)nav.classList.add('hide');else if(y<lastY-4||y<=160)nav.classList.remove('hide');lastY=y}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var tabs=[].slice.call(document.querySelectorAll('.tab')),panels=[].slice.call(document.querySelectorAll('#panels .panel'));
  tabs.forEach(function(t){t.addEventListener('click',function(){var i=+t.dataset.p;tabs.forEach(function(x,j){x.setAttribute('aria-selected',j===i?'true':'false')});panels.forEach(function(p,j){p.hidden=j!==i});});});
  var els=[].slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){var r=el.getBoundingClientRect();if(r.top>window.innerHeight){el.classList.add('pre');io.observe(el)}});
  }
  var f=document.getElementById('applyForm');if(f)f.addEventListener('submit',function(e){e.preventDefault();
  /* Consultation requests are emailed privately through FormSubmit (chosen by the site owner). */
  var TO='https://formsubmit.co/ajax/coachnyisha@gmail.com';
  var th=document.getElementById('thanks');var g=function(id){var el=document.getElementById(id);return el?el.value:''};
  var needs=[].slice.call(f.querySelectorAll('.checks input:checked')).map(function(c){return c.parentNode.textContent.trim()}).join(', ');
  var btn=f.querySelector('button[type=submit]');if(btn)btn.disabled=true;
  var data={_subject:'New consultation request: '+g('f-name'),_template:'table',_captcha:'false',Name:g('f-name'),email:g('f-email'),Phone:g('f-phone'),Business:g('f-biz'),Industry:g('f-ind'),'Best way to reach them':g('f-contact'),'Where they want support':needs,'What they want to make easier or bring to life':g('f-msg')};
  th.textContent='Sending...';th.hidden=false;
  fetch(TO,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)}).then(function(r){return r.json()}).then(function(j){
    var ok=j&&(j.success===true||j.success==='true');
    th.textContent=ok?'Thank you for reaching out. We\'ll review your request and reach out by phone or email with two times to talk.':'Something went wrong. Please try again in a minute.';
    if(ok)f.reset();if(btn)btn.disabled=false}).catch(function(){th.textContent='Something went wrong. Please try again in a minute.';if(btn)btn.disabled=false});
});
var mb=document.querySelector('.menu');if(mb)mb.addEventListener('click',function(){document.querySelector('.links').classList.toggle('open')});
var fl=document.getElementById('fline'),ft=document.getElementById('ftime');if(fl){var L=['New lead captured from the website','Welcome email sent automatically','Strategy call booked for Tuesday','Lender match found in seconds','Contract signed and filed','New site launched','Follow-up text sent on schedule','Monthly report delivered'],T=['just now','2 sec ago','just now','4 sec ago','just now','1 min ago','just now','just now'],n=0;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(function(){fl.classList.add('out');setTimeout(function(){n=(n+1)%L.length;fl.textContent=L[n];ft.textContent=T[n];fl.classList.remove('out')},420)},2600)}
})();
