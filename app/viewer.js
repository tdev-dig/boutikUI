// Boutik UI — cadre des écrans.
// L'écran tourne dans un iframe (390 × 844) : ses boutons mènent d'écran en écran, comme dans l'app.
// Ce script met le cadre à l'échelle, suit l'écran affiché et tient à jour titre, compteur et flèches.
(function () {
  var fit = document.getElementById('bk-fit');
  var frame = document.getElementById('bk-screen');
  var list = window.BK_SCREENS || [];
  if (!fit || !frame) return;

  function layout() {
    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;
    // Téléphone : pleine largeur. Ordinateur : jamais agrandi, réduit si la fenêtre est basse.
    var k = vw <= 520 ? vw / 390 : Math.max(0.45, Math.min(1, (vh - 144) / 844, (vw - 32) / 390));
    frame.style.transform = k === 1 ? '' : 'scale(' + k + ')';
    fit.style.width = 390 * k + 'px';
    fit.style.height = 844 * k + 'px';
    document.documentElement.style.setProperty('--k', k);
  }
  layout();
  window.addEventListener('resize', layout);

  // Avec les adresses courtes de Vercel (/app/Main), on garde ce format ; en local, /app/Main.html.
  var ext = /\.html$/.test(window.location.pathname) ? '.html' : '';

  function sync() {
    var name;
    try {
      name = decodeURIComponent(frame.contentWindow.location.pathname.split('/').pop()).replace(/\.dc\.html$/, '');
    } catch (err) { return; }
    var i = -1;
    for (var j = 0; j < list.length; j++) if (list[j].name === name) { i = j; break; }
    if (i < 0) return;
    var s = list[i], n = list.length;
    document.getElementById('bk-group').textContent = s.group;
    document.getElementById('bk-name').textContent = s.title;
    document.getElementById('bk-count').textContent = (i + 1) + ' / ' + n;
    document.getElementById('bk-prev').href = list[(i - 1 + n) % n].name + ext;
    document.getElementById('bk-next').href = list[(i + 1) % n].name + ext;
    document.title = s.title + ' — Boutik';
    var here = window.location.pathname.split('/').pop();
    if (here !== s.name + ext && window.history && window.history.replaceState) {
      window.history.replaceState(null, '', s.name + ext);
    }
  }
  frame.addEventListener('load', sync);

  window.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    var link = e.key === 'ArrowLeft' ? document.getElementById('bk-prev')
      : e.key === 'ArrowRight' ? document.getElementById('bk-next') : null;
    if (link) window.location.href = link.href;
  });
})();
