async function getCurrentDomain() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  try {
    return new URL(tab.url).hostname;
  } catch {
    return null;
  }
}

async function init() {
  const domain = await getCurrentDomain();
  const data = await chrome.storage.sync.get(['globalEnabled', 'sitelist']);
  const globalEnabled = data.globalEnabled !== false;
  const sitelist = data.sitelist || {};

  const globalToggle = document.getElementById('globalToggle');
  const siteToggle = document.getElementById('siteToggle');
  const siteLabel = document.getElementById('siteLabel');

  globalToggle.checked = globalEnabled;

  if (domain) {
    siteLabel.textContent = domain;
    siteToggle.checked = sitelist[domain] !== undefined ? sitelist[domain] : globalEnabled;
  } else {
    siteToggle.disabled = true;
  }

  globalToggle.addEventListener('change', async () => {
    await chrome.storage.sync.set({ globalEnabled: globalToggle.checked });
  });

  siteToggle.addEventListener('change', async () => {
    const fresh = await chrome.storage.sync.get('sitelist');
    const updated = fresh.sitelist || {};
    updated[domain] = siteToggle.checked;
    await chrome.storage.sync.set({ sitelist: updated });
  });
}

init();
