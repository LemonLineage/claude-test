# Force Dark Mode — Browser Extension

A lightweight Chrome/Edge extension that forces dark mode on any website.

## Features
- Global dark mode toggle
- Per-site override (site setting overrides global)
- Settings sync across devices via `chrome.storage.sync`
- Keyboard shortcut: `Alt+Shift+D`

## How it works
Injects CSS `filter: invert(1) hue-rotate(180deg)` on the page root, then re-inverts images and videos so they keep their natural colors.

## Install (unpacked / dev mode)
1. Clone or download this repo
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select this folder

## Usage
- Click the extension icon to toggle globally or per-site
- Use `Alt+Shift+D` to quickly toggle on the current tab

## File structure
```
manifest.json
background/service-worker.js
content/darkmode.js
popup/popup.html
popup/popup.js
popup/popup.css
icons/
```
