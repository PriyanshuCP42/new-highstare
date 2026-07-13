// View transitions disabled completely to prevent Instagram WebView freezes
// The pageswap event listener here was identified as a major crash vector for WKWebView.
(function () {
  const viewTransitionRenderBlocker = document.getElementById('view-transition-render-blocker');
  if (viewTransitionRenderBlocker) {
    viewTransitionRenderBlocker.remove();
  }
})();
