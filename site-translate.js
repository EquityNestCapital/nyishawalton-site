/* English / Español switch. Uses Google's free page translator, with its banner hidden.
   Drop in with: <script src="/site-translate.js" defer></script>
   It places itself at the end of the page's <footer> (or a small pill at the bottom if there is no footer). */
(function () {
  if (window.__siteTranslate) return; window.__siteTranslate = 1;
  var host = location.hostname.replace(/^www\./, "");
  function current() { var m = document.cookie.match(/googtrans=\/en\/(\w+)/); return m ? m[1] : "en"; }
  function setLang(l) {
    var exp = l === "en" ? "Thu, 01 Jan 1970 00:00:00 GMT" : "Fri, 31 Dec 2099 23:59:59 GMT";
    var v = "/en/" + l;
    document.cookie = "googtrans=" + v + ";path=/;expires=" + exp;
    document.cookie = "googtrans=" + v + ";path=/;domain=." + host + ";expires=" + exp;
    location.reload();
  }
  var css = document.createElement("style");
  css.textContent =
    ".goog-te-banner-frame,.skiptranslate>iframe,#goog-gt-tt,.goog-te-balloon-frame{display:none!important}" +
    "body{top:0!important}.goog-text-highlight{background:none!important;box-shadow:none!important}" +
    ".st-lang{display:flex;justify-content:center;gap:6px;align-items:center;padding:14px 0 6px;font:500 14px/1 inherit;width:100%}" +
    ".st-lang button{all:unset;cursor:pointer;padding:7px 14px;border-radius:999px;border:1px solid currentColor;opacity:.75;font:inherit;color:inherit}" +
    ".st-lang button[aria-pressed=true]{opacity:1;font-weight:700}" +
    ".st-lang.st-float{position:fixed;left:12px;bottom:12px;width:auto;z-index:9999;background:#fff;color:#111;padding:6px;border-radius:999px;box-shadow:0 6px 20px rgba(0,0,0,.18)}";
  document.head.appendChild(css);
  function build() {
    var cur = current();
    var box = document.createElement("div");
    box.className = "st-lang notranslate"; box.setAttribute("translate", "no");
    box.setAttribute("role", "group"); box.setAttribute("aria-label", "Language");
    [["en", "English"], ["es", "Español"]].forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = p[1]; b.setAttribute("lang", p[0]);
      b.setAttribute("aria-pressed", String(cur === p[0]));
      b.onclick = function () { if (current() !== p[0]) setLang(p[0]); };
      box.appendChild(b);
    });
    var f = document.querySelector("footer");
    if (f) f.appendChild(box); else { box.classList.add("st-float"); document.body.appendChild(box); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
  if (current() !== "en") {
    var holder = document.createElement("div"); holder.id = "google_translate_element"; holder.style.display = "none";
    document.body.appendChild(holder);
    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement({ pageLanguage: "en", includedLanguages: "en,es", autoDisplay: false }, "google_translate_element");
    };
    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(s);
  }
})();
