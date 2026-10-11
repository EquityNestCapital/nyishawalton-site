/* Ask Nyisha: a free automated helper. It answers common questions from
   what is on this website. Anything it cannot answer, it asks the visitor
   to leave a message, which is emailed to Nyisha through FormSubmit (the
   same free service the booking form uses). No AI service, no monthly cost.
   9 Oct 2026. */
(function () {
  if (window.__askNyisha) return; window.__askNyisha = 1;
  var TO = 'https://formsubmit.co/ajax/coachnyisha@gmail.com';
  var BOOK = 'apply.html';

  var css = '' +
  '.an-btn{position:fixed;right:22px;bottom:22px;z-index:60;width:68px;height:68px;border-radius:50%;padding:0;border:1.5px solid #D9C193;background:#0F6B4A url(ask-nyisha.jpg) 50% 50%/cover no-repeat;box-shadow:0 0 0 5px rgba(217,193,147,.14),0 16px 36px -10px rgba(0,0,0,.6);cursor:pointer;transition:transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .35s}' +
  '.an-btn::after{content:"";position:absolute;right:3px;bottom:3px;width:12px;height:12px;border-radius:50%;background:#2DB27C;border:2px solid #fff}' +
  '.an-btn:hover{transform:translateY(-3px);box-shadow:0 0 0 7px rgba(217,193,147,.22),0 20px 40px -10px rgba(0,0,0,.6)}' +
  '.an-btn:focus-visible{outline:2px solid #D9C193;outline-offset:4px}' +
  '.an-tease{position:fixed;right:102px;bottom:36px;z-index:60;max-width:240px;padding:13px 32px 13px 16px;border-radius:20px 20px 4px 20px;background:rgba(14,14,12,.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(217,193,147,.45);color:#F1EFE9;font:400 14px/1.45 "Jost",Arial,sans-serif;box-shadow:0 18px 40px -16px rgba(0,0,0,.6);opacity:0;transform:translateY(10px) scale(.96);transform-origin:right bottom;transition:opacity .45s,transform .45s cubic-bezier(.2,.7,.2,1);pointer-events:none;cursor:pointer}' +
  '.an-tease.on{opacity:1;transform:none;pointer-events:auto}' +
  '.an-tease b{display:block;font:500 10.5px/1 "Jost",Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#D9C193;margin-bottom:6px}' +
  '.an-tease button{position:absolute;top:6px;right:9px;border:0;background:none;font-size:17px;line-height:1;color:#B5B2A8;cursor:pointer}' +
  '.an-panel{position:fixed;right:22px;bottom:104px;z-index:61;width:min(360px,calc(100vw - 32px));height:min(540px,calc(100vh - 130px));display:none;flex-direction:column;justify-content:flex-end;gap:10px;font:400 14.5px/1.5 "Jost",Arial,sans-serif;pointer-events:none}' +
  '.an-panel.on{display:flex}' +
  '.an-panel>*{pointer-events:auto}' +
  '.an-head{align-self:flex-end;display:flex;align-items:center;gap:10px;padding:7px 8px 7px 14px;border-radius:999px;background:rgba(14,14,12,.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(217,193,147,.35);color:#F1EFE9;animation:anIn .5s cubic-bezier(.2,.7,.2,1) both}' +
  '.an-head i{display:none}' +
  '.an-head b{font:500 10.5px/1 "Jost",Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#D9C193}' +
  '.an-head small{font-size:11.5px;color:#B5B2A8}' +
  '.an-head div{display:flex;align-items:baseline;gap:8px}' +
  '.an-head button{width:24px;height:24px;border-radius:50%;border:1px solid rgba(255,255,255,.18);background:none;color:#F1EFE9;font-size:15px;line-height:1;cursor:pointer}' +
  '.an-log{flex:0 1 auto;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:9px;padding:24px 2px 2px;scrollbar-width:none;-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 34px);mask-image:linear-gradient(to bottom,transparent 0,#000 34px)}' +
  '.an-log::-webkit-scrollbar{display:none}' +
  '.an-m{max-width:86%;padding:11px 15px;white-space:pre-line;box-shadow:0 14px 30px -18px rgba(0,0,0,.7);animation:anIn .45s cubic-bezier(.2,.7,.2,1) both}' +
  '.an-m.bot{align-self:flex-start;border-radius:20px 20px 20px 5px;background:rgba(14,14,12,.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(217,193,147,.32);color:#F1EFE9}' +
  '.an-m.me{align-self:flex-end;border-radius:20px 20px 5px 20px;background:linear-gradient(135deg,#17986A,#0F6B4A);color:#fff;border:1px solid rgba(255,255,255,.12)}' +
  '.an-m a{color:#E8D6A8;font-weight:500;text-decoration:underline;text-underline-offset:3px}' +
  '.an-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-start;animation:anIn .5s .1s cubic-bezier(.2,.7,.2,1) both}' +
  '.an-chips button{border:1px solid rgba(217,193,147,.55);background:rgba(14,14,12,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#F1EFE9;border-radius:12px;padding:7px 12px;font:inherit;font-size:13px;cursor:pointer;transition:background .25s,border-color .25s}' +
  '.an-chips button:hover{background:rgba(23,152,106,.85);border-color:#2DB27C}' +
  '.an-form{display:grid!important;grid-template-columns:1fr!important;gap:8px;padding:14px;border-radius:20px 20px 20px 5px;background:rgba(14,14,12,.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(217,193,147,.32);max-width:92%;animation:anIn .45s cubic-bezier(.2,.7,.2,1) both}' +
  '.an-form input,.an-form textarea{font:inherit;font-size:14px;color:#F1EFE9;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:9px 12px;width:100%;box-sizing:border-box}' +
  '.an-form input::placeholder,.an-form textarea::placeholder,.an-in input::placeholder{color:#8C8A82}' +
  '.an-form textarea{min-height:64px;resize:vertical}' +
  '.an-form button{background:linear-gradient(135deg,#17986A,#0F6B4A);color:#fff;border:0;border-radius:12px;padding:10px 12px;font:inherit;font-weight:500;cursor:pointer}' +
  '.an-in{display:flex;align-items:center;gap:6px;padding:6px 6px 6px 16px;border-radius:24px;background:rgba(14,14,12,.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(217,193,147,.45);box-shadow:0 18px 40px -18px rgba(0,0,0,.7);animation:anIn .5s .05s cubic-bezier(.2,.7,.2,1) both}' +
  '.an-in input{flex:1;font:inherit;color:#F1EFE9;background:none;border:0;outline:0;padding:8px 0;min-width:0}' +
  '.an-in button{width:38px;height:38px;flex:none;border-radius:50%;border:0;background:linear-gradient(135deg,#E8D6A8,#B08D48);color:#080807;font-size:0;cursor:pointer;position:relative}' +
  '.an-in button::before{content:"";position:absolute;left:50%;top:50%;width:9px;height:9px;border-top:2px solid #080807;border-right:2px solid #080807;transform:translate(-65%,-50%) rotate(45deg)}' +
  '.an-foot{align-self:flex-end;font-size:10.5px;letter-spacing:.04em;color:#8C8A82;padding:0 10px;text-shadow:0 1px 2px rgba(0,0,0,.4)}' +
  '@keyframes anIn{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}' +
  '@media (max-width:560px){.an-tease{display:none}.an-btn{width:60px;height:60px;right:14px;bottom:14px}.an-panel{right:16px;bottom:86px}}' +
  '@media (prefers-reduced-motion:reduce){.an-btn,.an-tease{transition:none}.an-m,.an-head,.an-in,.an-chips,.an-form{animation:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var book = 'You can book a consultation here: <a href="' + BOOK + '">Book a Consultation</a>.';
  /* Each answer is matched by its keywords. Order matters: first match wins. */
  var KB = [
    { q: 'Can I talk to a person?', k: ['person', 'human', 'talk to', 'speak', 'call me', 'contact', 'reach you', 'phone', 'email you', 'message'],
      a: 'Of course. Leave your name, email and question below and Nyisha will reach out personally.', form: true },
    { q: 'How much does it cost?', k: ['cost', 'price', 'pricing', 'how much', 'budget', 'fee', 'charge', 'rate', 'afford', 'quote', 'estimate'],
      a: 'Every project is different, so every proposal is shaped around your scope, the technical requirements and the support you choose. The best first step is a conversation. ' + book },
    { q: 'How long does it take?', k: ['how long', 'timeline', 'time frame', 'timeframe', 'weeks', 'turnaround', 'fast', 'when can', 'deadline'],
      a: 'Timing depends on the size of the project. A website and a full custom system are very different builds. You will get a clear timeline in your proposal. ' + book },
    { q: 'Do you build CRMs?', k: ['crm', 'customer relationship', 'pipeline', 'follow up', 'follow-up', 'leads', 'lead management'],
      a: 'Yes. We build custom CRMs shaped around how your business works: relationships, tasks, follow-up, automations and the information your team needs to act. See <a href="systems.html">Systems</a>.' },
    { q: 'Do you do automations?', k: ['automat', 'workflow', 'reminder', 'zapier', 'save time', 'repetitive'],
      a: 'Yes. We connect the steps in your process so reminders, emails, document requests and tasks happen on their own, and your team gets time back. See <a href="systems.html">Systems</a>.' },
    { q: 'What is LenderNest?', k: ['lendernest', 'lender nest', 'loan origination', 'los', 'mortgage', 'lending', 'loan officer', 'broker'],
      a: 'LenderNest is a complete commercial lending operating system that Nyisha Walton and Ome Sanchez designed together, with AI-enhanced lender matching, a CRM, automations, processing, HR and financial tracking. We can build a system shaped around your own lending process. See <a href="systems.html">Systems</a>.' },
    { q: 'Do you build websites?', k: ['website', 'web site', 'site', 'landing page', 'web design', 'redesign'],
      a: 'Yes. We design and build custom websites that give your business a distinctive home and make the next step clear for your customers. Ongoing care is available after launch. See <a href="work.html">Our Projects</a> for examples.' },
    { q: 'Can you help with branding?', k: ['brand', 'logo', 'identity', 'messaging', 'rebrand', 'design'],
      a: 'Yes. We help with ideas and strategy, brand identity, brand messaging, and design and presentation, so your business looks and sounds like you everywhere it appears.' },
    { q: 'Do you offer coaching?', k: ['coach', 'consult', 'strategy', 'advice', 'mentor', 'guidance'],
      a: 'Yes. Business strategy and consulting gives you an outside perspective on your processes and priorities, and business coaching gives you focused support as you put your plans into action. ' + book },
    { q: 'Can you help with social media?', k: ['social', 'instagram', 'facebook', 'tiktok', 'marketing', 'lead gen', 'campaign', 'ads', 'grow'],
      a: 'Yes. We help you get clear on how you reach your audience, how you generate leads from social media, and how your business follows up when people show interest.' },
    { q: 'Do you help start a business?', k: ['start', 'launch', 'new business', 'llc', 'ein', 'set up', 'setup', 'google business'],
      a: 'Yes. Business launch support helps you work through presenting your business, preparing your digital presence and supporting your customer experience from day one. ' + book },
    { q: 'Do you offer monthly support?', k: ['maintenance', 'support', 'monthly', 'update', 'care plan', 'after launch', 'backup', 'security', 'host'],
      a: 'Yes. Ongoing care is available after launch: website monitoring, updates and backups, content and photo changes, security and speed checks, and more. New pages, features and integrations are scoped separately.' },
    { q: 'Who is on the team?', k: ['team', 'who are you', 'jacob', 'christian', 'sons', 'family', 'designer', 'who built'],
      a: 'We are a family of builders: Nyisha Walton with her sons Jacob Walton and Christian Simmons, each with their own expertise. Meet them on <a href="designers.html">Meet the Team</a>.' },
    { q: 'What industries do you work with?', k: ['industr', 'kind of business', 'type of business', 'real estate', 'coaching business', 'moving', 'senior', 'trading', 'who do you work'],
      a: 'Nyisha has helped coaching businesses, moving companies, senior placement agencies, real estate professionals, trading educators, loan officers and commercial lenders. Your industry shapes the solution, and your vision gives it direction.' },
    { q: 'What do you build?', k: ['build', 'what do you do', 'services', 'offer', 'make', 'create', 'help with', 'calendar', 'booking', 'scheduling', 'video', 'live stream', 'zoom', 'signing', 'signature', 'docusign', 'membership', 'course', 'directory', 'app', 'integrat', 'system'],
      a: 'We build custom websites, custom CRMs and business systems, loan origination systems, membership and education platforms, calendar and booking tools, video meetings and live streaming, and document signing workflows. We also help with branding, business strategy, social media and lead generation, launch support and business coaching. See the full list on <a href="services.html">Services</a>.' },
    { q: 'Can I see your work?', k: ['example', 'portfolio', 'work', 'projects', 'see', 'samples', 'show me'],
      a: 'Absolutely. Take a look at <a href="work.html">Our Projects</a>, including LenderNest, The Greenprint and Carta Ink.' },
    { q: 'How do I get started?', k: ['get started', 'next step', 'book a', 'book an', 'book time', 'consult', 'schedule', 'appointment', 'meet', 'hire', 'work with you', 'interested'],
      a: 'Start with a consultation. Tell us about your business and what you want to make easier or bring to life. ' + book }
  ];
  var CHIPS = ['What do you build?', 'How much does it cost?', 'Do you build CRMs?', 'Do you build websites?', 'Can I see your work?', 'How do I get started?', 'Can I talk to a person?'];

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var btn = el('button', 'an-btn'); btn.type = 'button'; btn.setAttribute('aria-label', 'Ask Nyisha');
  var tease = el('div', 'an-tease', '<b>Ask Nyisha</b>What would you like to build, brand or grow?<button type="button" aria-label="Close">×</button>');
  var panel = el('div', 'an-panel'); panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Ask Nyisha');
  panel.innerHTML = '<div class="an-head"><i></i><div><b>Ask Nyisha</b><small>automated assistant</small></div><button type="button" aria-label="Close">×</button></div>' +
    '<div class="an-log" aria-live="polite"></div>' +
    '<form class="an-in"><input type="text" placeholder="Ask me anything" aria-label="Your question" maxlength="300"><button type="submit" aria-label="Send">Send</button></form>' +
    '<div class="an-foot">Nyisha replies to messages personally</div>';
  document.body.appendChild(tease); document.body.appendChild(panel); document.body.appendChild(btn);
  var log = panel.querySelector('.an-log');

  function say(html, who) { var m = el('div', 'an-m ' + (who || 'bot'), html); log.appendChild(m); log.scrollTop = log.scrollHeight; return m; }
  function chips() {
    var c = el('div', 'an-chips');
    CHIPS.forEach(function (t) { var b = el('button', null, esc(t)); b.type = 'button'; b.onclick = function () { ask(t); }; c.appendChild(b); });
    log.appendChild(c); log.scrollTop = log.scrollHeight;
  }
  function form(question) {
    var f = el('form', 'an-form');
    f.innerHTML = '<input name="name" placeholder="Your name" required maxlength="80" autocomplete="name">' +
      '<input name="email" type="email" placeholder="Your email" required maxlength="120" autocomplete="email">' +
      '<textarea name="message" placeholder="Your question" required maxlength="1000"></textarea>' +
      '<input name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
      '<button type="submit">Send to Nyisha</button>';
    if (question) f.message.value = question;
    f.onsubmit = function (e) {
      e.preventDefault();
      if (f._honey.value) { f.replaceWith(el('div', 'an-m bot', 'Thank you. Your message is on its way.')); return; }
      var last = 0; try { last = +sessionStorage.getItem('anSent') || 0; } catch (_) {}
      if (Date.now() - last < 30000) { say('Thank you, Nyisha already has your message.'); return; }
      var b = f.querySelector('button'); b.disabled = true; b.textContent = 'Sending...';
      fetch(TO, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: 'Ask Nyisha question from ' + f.name.value, _template: 'table', _captcha: 'false',
          Name: f.name.value, email: f.email.value, Question: f.message.value, Page: location.pathname }) })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var ok = j && (j.success === true || j.success === 'true');
          if (ok) { try { sessionStorage.setItem('anSent', String(Date.now())); } catch (_) {} f.replaceWith(el('div', 'an-m bot', 'Thank you, ' + esc(f.name.value.split(' ')[0]) + '. Your message is on its way to Nyisha, and she will reach out to you soon.')); }
          else { b.disabled = false; b.textContent = 'Send to Nyisha'; say('That did not go through. Please try again in a minute, or use <a href="' + BOOK + '">Book a Consultation</a>.'); }
        })
        .catch(function () { b.disabled = false; b.textContent = 'Send to Nyisha'; say('That did not go through. Please try again in a minute, or use <a href="' + BOOK + '">Book a Consultation</a>.'); });
    };
    log.appendChild(f); log.scrollTop = log.scrollHeight;
  }
  function find(text) {
    var t = ' ' + text.toLowerCase() + ' ';
    for (var i = 0; i < KB.length; i++) { if (KB[i].q.toLowerCase() === text.toLowerCase()) return KB[i]; }
    for (var j = 0; j < KB.length; j++) { for (var k = 0; k < KB[j].k.length; k++) { var w = KB[j].k[k].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); if (new RegExp('(^|[^a-z])' + w).test(t)) return KB[j]; } }
    return null;
  }
  function ask(text) {
    text = String(text || '').trim(); if (!text) return;
    say(esc(text), 'me');
    var hit = find(text);
    setTimeout(function () {
      if (hit) { say(hit.a); if (hit.form) form(''); else say('Anything else I can help with?'); }
      else { say('Good question. I want Nyisha to answer that one herself. Leave your name and email and she will reach out.'); form(text); }
    }, 350);
  }

  var started = false;
  function open() {
    panel.classList.add('on'); tease.classList.remove('on');
    try { sessionStorage.setItem('anTease', '1'); } catch (_) {}
    if (!started) { started = true; say('Hi, I am Nyisha. I can answer questions about websites, custom systems, branding and growing your business. What are you working on?'); chips(); }
    setTimeout(function () { panel.querySelector('.an-in input').focus(); }, 50);
  }
  function close() { panel.classList.remove('on'); btn.focus(); }
  btn.onclick = function () { panel.classList.contains('on') ? close() : open(); };
  panel.querySelector('.an-head button').onclick = close;
  tease.onclick = function (e) { if (e.target.tagName === 'BUTTON') { tease.classList.remove('on'); try { sessionStorage.setItem('anTease', '1'); } catch (_) {} } else open(); };
  panel.querySelector('.an-in').onsubmit = function (e) { e.preventDefault(); var i = this.querySelector('input'); ask(i.value); i.value = ''; };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('on')) close(); });
  var seen = false; try { seen = sessionStorage.getItem('anTease') === '1'; } catch (_) {}
  if (!seen) setTimeout(function () { if (!panel.classList.contains('on')) tease.classList.add('on'); }, 6000);
})();
