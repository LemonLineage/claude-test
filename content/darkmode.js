(function () {
  const STYLE_ID = 'force-dark-mode-style';

  function applyDarkMode() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html {
        filter: invert(1) hue-rotate(180deg) !important;
        color-scheme: dark !important;
      }
      img, video, iframe, canvas, picture, svg image {
        filter: invert(1) hue-rotate(180deg) !important;
      }
    `;
    document.documentElement.appendChild(style);
  }

  function removeDarkMode() {
    const style = document.getElementById(STYLE_ID);
    if (style) style.remove();
  }

  function checkAndApply() {
    const domain = window.location.hostname;
    chrome.storage.sync.get(['globalEnabled', 'sitelist'], (data) => {
      const globalEnabled = data.globalEnabled !== false;
      const sitelist = data.sitelist || {};

      const enabled = sitelist[domain] !== undefined ? sitelist[domain] : globalEnabled;

      if (enabled) {
        applyDarkMode();
      } else {
        removeDarkMode();
      }
    });
  }

  checkAndApply();

  chrome.storage.onChanged.addListener(checkAndApply);
})();
