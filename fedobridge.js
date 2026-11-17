/* Fedophone bridge: lets two friends watch Fidorium together inside a Fedophone call.
   Only active when Fidorium is opened inside Fedophone (an iframe). It reports what you open and play,
   and repeats what your friend does — the page itself is not changed in any other way. */
(() => {
  if (window.parent === window) return;
  const FEDO = /^https:\/\/(fedophone\.pages\.dev|zyziikmelon-cmyk\.github\.io|[a-z0-9-]+\.fedophone\.pages\.dev)$|^http:\/\/localhost(:\d+)?$/;
  let quiet = 0, parentOrigin = '*';
  const post = m => { try { window.parent.postMessage(Object.assign({ fido: 1 }, m), parentOrigin); } catch (e) {} };
  const FNS = ['playEpisode', 'playTrailer', 'playResume', 'closePlayer'];
  FNS.forEach(n => { const f = window[n]; if (typeof f !== 'function') return;
    window[n] = function (...a) { if (!quiet) post({ op: 'call', fn: n, a: a.slice(0, 3) }); return f.apply(this, a); }; });
  addEventListener('hashchange', () => { if (!quiet) post({ op: 'nav', h: location.hash }); });
  const v = document.getElementById('video');
  if (v) ['play', 'pause', 'seeked'].forEach(ev => v.addEventListener(ev, () => { if (!quiet) post({ op: 'v', ev, t: v.currentTime }); }));
  addEventListener('message', e => {
    if (!FEDO.test(e.origin)) return; parentOrigin = e.origin;
    const m = e.data; if (!m || !m.fidoCmd) return;
    quiet++;
    try {
      if (m.op === 'nav' && typeof m.h === 'string' && /^#?[\w-]*$/.test(m.h)) { if (location.hash !== m.h) location.hash = m.h; }
      else if (m.op === 'call' && FNS.includes(m.fn) && typeof window[m.fn] === 'function') window[m.fn](...(Array.isArray(m.a) ? m.a.slice(0, 3) : []));
      else if (m.op === 'v' && v) {
        if (typeof m.t === 'number' && Math.abs(v.currentTime - m.t) > 1.2) v.currentTime = m.t;
        if (m.ev === 'play') v.play().catch(() => {}); else if (m.ev === 'pause') v.pause();
      } else if (m.op === 'state') post({ op: 'state', h: location.hash, playing: !!(v && !v.paused), t: v ? v.currentTime : 0 });
    } catch (err) {}
    setTimeout(() => { quiet--; }, 500);
  });
  post({ op: 'ready', h: location.hash });
})();
