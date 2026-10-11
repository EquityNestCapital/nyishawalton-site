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
  '.an-btn{position:fixed;right:20px;bottom:20px;z-index:60;width:66px;height:66px;border-radius:50%;padding:0;border:2px solid #D9C193;background:#0F6B4A url(nyisha.jpg) 50% 18%/cover no-repeat;box-shadow:0 14px 34px -10px rgba(0,0,0,.55);cursor:pointer;transition:transform .3s}' +
  '.an-btn:hover{transform:translateY(-3px)}' +
  '.an-btn:focus-visible{outline:2px solid #D9C193;outline-offset:3px}' +
  '.an-tease{position:fixed;right:96px;bottom:30px;z-index:60;max-width:250px;background:#fff;color:#141519;border-radius:12px;padding:12px 30px 12px 14px;font:400 14px/1.45 "Jost",Arial,sans-serif;box-shadow:0 14px 34px -14px rgba(0,0,0,.45);opacity:0;transform:translateY(8px);transition:opacity .4s,transform .4s;pointer-events:none}' +
  '.an-tease.on{opacity:1;transform:none;pointer-events:auto}' +
  '.an-tease b{display:block;color:#0F6B4A;font-weight:500;margin-bottom:2px}' +
  '.an-tease button{position:absolute;top:4px;right:6px;border:0;background:none;font-size:18px;line-height:1;color:#77756D;cursor:pointer}' +
  '.an-panel{position:fixed;right:20px;bottom:98px;z-index:61;width:min(380px,calc(100vw - 32px));max-height:min(560px,calc(100vh - 120px));display:none;flex-direction:column;background:#fff;color:#141519;border-radius:14px;overflow:hidden;box-shadow:0 30px 70px -20px rgba(0,0,0,.6);font:400 14.5px/1.5 "Jost",Arial,sans-serif}' +
  '.an-panel.on{display:flex}' +
  '.an-head{display:flex;align-items:center;gap:12px;padding:14px 16px;background:#080807;color:#F1EFE9;border-bottom:1px solid #D9C193}' +
  '.an-head i{width:38px;height:38px;border-radius:50%;flex:none;background:url(nyisha.jpg) 50% 18%/cover;border:1px solid #D9C193}' +
  '.an-head b{display:block;font-weight:500;letter-spacing:.04em}' +
  '.an-head small{display:block;color:#B5B2A8;font-size:12px}' +
  '.an-head button{margin-left:auto;border:0;background:none;color:#B5B2A8;font-size:22px;line-height:1;cursor:pointer}' +
  '.an-log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#F7F6F2}' +
  '.an-m{max-width:88%;padding:10px 13px;border-radius:12px;white-space:pre-line}' +
  '.an-m.bot{background:#fff;border:1px solid #E7E4DC;align-self:flex-start;border-top-left-radius:4px}' +
  '.an-m.me{background:#0F6B4A;color:#fff;align-self:flex-end;border-top-right-radius:4px}' +
  '.an-m a{color:#0F6B4A;font-weight:500}' +
  '.an-chips{display:flex;flex-wrap:wrap;gap:6px}' +
  '.an-chips button{border:1px solid #D9C193;background:#fff;color:#141519;border-radius:999px;padding:6px 11px;font:inherit;font-size:13px;cursor:pointer}' +
  '.an-chips button:hover{border-color:#0F6B4A;color:#0F6B4A}' +
  '.an-form{display:grid;gap:7px;background:#fff;border:1px solid #E7E4DC;border-radius:12px;padding:12px}' +
  '.an-form input,.an-form textarea{font:inherit;font-size:14px;border:1px solid #D9D5CC;border-radius:8px;padding:8px 10px;width:100%;box-sizing:border-box}' +
  '.an-form textarea{min-height:64px;resize:vertical}' +
  '.an-form button{background:#0F6B4A;color:#fff;border:0;border-radius:8px;padding:9px 12px;font:inherit;font-weight:500;cursor:pointer}' +
  '.an-in{display:flex;gap:8px;padding:10px;border-top:1px solid #E7E4DC;background:#fff}' +
  '.an-in input{flex:1;font:inherit;border:1px solid #D9D5CC;border-radius:8px;padding:9px 11px;min-width:0}' +
  '.an-in button{background:#080807;color:#fff;border:0;border-radius:8px;padding:0 14px;font:inherit;cursor:pointer}' +
  '.an-foot{padding:6px 12px 9px;font-size:11px;color:#77756D;background:#fff;text-align:center}' +
  '@media (max-width:560px){.an-tease{display:none}.an-btn{width:58px;height:58px;right:14px;bottom:14px}.an-panel{right:16px;bottom:82px}}' +
  '@media (prefers-reduced-motion:reduce){.an-btn,.an-tease{transition:none}}';
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
  panel.innerHTML = '<div class="an-head"><i></i><div><b>Ask Nyisha</b><small>Automated assistant · Nyisha replies to messages personally</small></div><button type="button" aria-label="Close">×</button></div>' +
    '<div class="an-log" aria-live="polite"></div>' +
    '<form class="an-in"><input type="text" placeholder="Type your question" aria-label="Your question" maxlength="300"><button type="submit">Send</button></form>' +
    '<div class="an-foot">Automated answers come from this website.</div>';
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
