// Boutik UI — met l'écran (390 × 844) à l'échelle de la fenêtre et gère les flèches du clavier.
(function () {
  var fit = document.getElementById('bk-fit');
  var screen = document.getElementById('bk-screen');
  if (!fit || !screen) return;

  function layout() {
    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;
    // Téléphone : pleine largeur. Ordinateur : jamais agrandi, réduit si la fenêtre est basse.
    var k = vw <= 520 ? vw / 390 : Math.max(0.45, Math.min(1, (vh - 144) / 844, (vw - 32) / 390));
    screen.style.transform = k === 1 ? '' : 'scale(' + k + ')';
    fit.style.width = 390 * k + 'px';
    fit.style.height = 844 * k + 'px';
    document.documentElement.style.setProperty('--k', k);
  }
  layout();
  window.addEventListener('resize', layout);

  window.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    var link = e.key === 'ArrowLeft' ? document.querySelector('a[rel="prev"]')
      : e.key === 'ArrowRight' ? document.querySelector('a[rel="next"]') : null;
    if (link) window.location.href = link.href;
  });
})();
