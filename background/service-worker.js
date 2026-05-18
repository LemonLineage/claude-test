chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'toggle-darkmode') return;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  let domain;
  try {
    domain = new URL(tab.url).hostname;
  } catch {
    return;
  }

  const data = await chrome.storage.sync.get(['globalEnabled', 'sitelist']);
  const globalEnabled = data.globalEnabled !== false;
  const sitelist = data.sitelist || {};

  const current = sitelist[domain] !== undefined ? sitelist[domain] : globalEnabled;
  sitelist[domain] = !current;

  await chrome.storage.sync.set({ sitelist });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content/darkmode.js']
  });
});
