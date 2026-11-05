// Service Worker für „Unser Ägypten“: macht den Kurs offline lesbar.
//
// Er pflegt sich selbst, eine Liste der Dateien braucht es nicht. Beim Installieren und danach
// höchstens einmal pro Stunde, sobald eine Seite mit Netz geöffnet wird, geht er von index.html aus
// alle verlinkten Seiten durch und speichert sie samt Stylesheet, Skripten, Aufnahmen
// (assets/audio/*.mp3, auch die nur in cards.js genannten), Fotos von Wikimedia und Schriften.
// Eine neue Lektion ist also offline, sobald sie in index.html verlinkt ist.
//
// Mit Netz kommt jede Seite frisch vom Server (nach 4 Sekunden ohne Antwort aus dem Speicher),
// ohne Netz aus dem Speicher. Fotos, Aufnahmen und Schriften kommen immer zuerst aus dem Speicher.

const VERSION = "1";
const PAGES = "red-sea-pages";     // was der Rundgang findet; alles Veraltete wird dort aufgeräumt
const RUNTIME = "red-sea-runtime"; // Schriften und Fotos, die beim Lesen nachgeladen wurden
const STATUS_KEY = "__offline-status.json";
const RECRAWL_MS = 60 * 60 * 1000;
const NETWORK_TIMEOUT_MS = 4000;

const SCOPE = self.registration.scope; // z. B. https://afarkas.github.io/red-sea/
const STATUS_URL = new URL(STATUS_KEY, SCOPE).href;
const START = [SCOPE, new URL("index.html", SCOPE).href];
const OWN_TYPES = /\.(html|css|js|json|webmanifest|mp3|m4a|ogg|png|jpe?g|gif|svg|webp|avif|ico)$/i;
const IMAGE_HOSTS = ["upload.wikimedia.org"];
const FONT_CSS_HOST = "fonts.googleapis.com";
const FONT_HOST = "fonts.gstatic.com";

// ---------- Lebenszyklus ----------

self.addEventListener("install", (event) => {
  self.skipWaiting();
  // Ein Teil-Erfolg reicht zum Installieren; was fehlt, holt der nächste Rundgang.
  event.waitUntil(crawl().catch(() => {}));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keep = [PAGES, RUNTIME];
    for (const name of await caches.keys()) {
      if (name.startsWith("red-sea-") && !keep.includes(name)) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  const msg = event.data || {};
  if (msg.type === "crawl") event.waitUntil(crawl({ force: true }).catch(() => {}));
  if (msg.type === "status") event.waitUntil(readStatus().then((s) => event.source && event.source.postMessage({ type: "status", ...s, running: !!running })));
});

// ---------- Anfragen beantworten ----------

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.href.startsWith(SCOPE)) {
    if (req.mode === "navigate") maybeRecrawl(event);
    if (req.headers.has("range")) return event.respondWith(rangeFromCache(req));
    if (isMedia(url)) return event.respondWith(cacheFirst(req, PAGES));
    return event.respondWith(networkFirst(req, req.mode === "navigate"));
  }
  if (IMAGE_HOSTS.includes(url.hostname) || url.hostname === FONT_HOST) {
    return event.respondWith(cacheFirstExternal(req));
  }
  if (url.hostname === FONT_CSS_HOST) return event.respondWith(staleWhileRevalidate(req));
  // Alles andere (YouTube, Karten, Quellen) geht unverändert ans Netz.
});

function isMedia(url) {
  return /\.(mp3|m4a|ogg|png|jpe?g|gif|svg|webp|avif|ico)$/i.test(url.pathname);
}

async function lookup(req) {
  return (await caches.match(req, { ignoreSearch: true, ignoreVary: true })) ||
         (await caches.match(stripHash(req.url), { ignoreSearch: true, ignoreVary: true }));
}

async function networkFirst(req, isNavigation) {
  const cached = lookup(req);
  const network = fetch(req).then(async (res) => {
    if (res.ok && res.type === "basic") {
      const cache = await caches.open(PAGES);
      await cache.put(stripHash(req.url), res.clone());
    }
    return res;
  });
  network.catch(() => {}); // Fehler wird unten behandelt; hier nur keine Warnung, falls der Speicher gewinnt
  const timeout = new Promise((resolve) => setTimeout(resolve, NETWORK_TIMEOUT_MS));
  try {
    // Schnelles Netz gewinnt; bei langsamem Netz nimmt man den Speicher, falls es ihn gibt.
    const res = await Promise.race([network, timeout.then(() => cached)]);
    if (res) return res;
    return await network;
  } catch (e) {
    const hit = await cached;
    if (hit) return hit;
    if (isNavigation) return offlinePage(req.url);
    return new Response("", { status: 504, statusText: "offline" });
  }
}

async function cacheFirst(req, cacheName) {
  const hit = await lookup(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok || res.type === "opaque") {
      const cache = await caches.open(cacheName);
      await cache.put(req.url, res.clone());
    }
    return res;
  } catch (e) {
    return new Response("", { status: 504, statusText: "offline" });
  }
}

// <img> fragt ohne CORS; eine solche Antwort verrät nicht, ob sie ein Foto oder ein Fehler ist.
// Deshalb holt der Service Worker die Datei selbst mit CORS und speichert nur echte Treffer.
async function cacheFirstExternal(req) {
  const hit = await caches.match(req.url, { ignoreVary: true });
  if (hit && hit.ok) return hit;
  try {
    const res = await fetch(req.url, { mode: "cors", credentials: "omit" });
    if (res.ok) await (await caches.open(RUNTIME)).put(req.url, res.clone());
    return res;
  } catch (e) {
    return fetch(req).catch(() => new Response("", { status: 504, statusText: "offline" }));
  }
}

async function staleWhileRevalidate(req) {
  const hit = await lookup(req);
  const network = fetch(req).then(async (res) => {
    if (res.ok) await (await caches.open(RUNTIME)).put(req.url, res.clone());
    return res;
  }).catch(() => null);
  return hit || (await network) || new Response("", { status: 504, statusText: "offline" });
}

// Safari spielt Audio nur ab, wenn Teilanfragen (Range) mit 206 beantwortet werden.
async function rangeFromCache(req) {
  let res = await lookup(req);
  if (!res) {
    try {
      const full = await fetch(req.url);
      if (full.ok) {
        await (await caches.open(PAGES)).put(stripHash(req.url), full.clone());
        res = full;
      }
    } catch (e) { /* offline */ }
  }
  if (!res) return fetch(req).catch(() => new Response("", { status: 504, statusText: "offline" }));
  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get("range") || "");
  let start = m && m[1] ? Number(m[1]) : 0;
  let end = m && m[2] ? Number(m[2]) : size - 1;
  if (m && !m[1] && m[2]) { start = Math.max(0, size - Number(m[2])); end = size - 1; }
  end = Math.min(end, size - 1);
  if (start >= size || start > end) {
    return new Response("", { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  }
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "audio/mpeg",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes",
    },
  });
}

function offlinePage(url) {
  const home = new URL("index.html", SCOPE).href;
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>Offline</title>
<style>body{font:1.1rem/1.5 system-ui,sans-serif;max-width:32rem;margin:3rem auto;padding:0 1rem;color:#1d2730;background:#fbfaf6}
a{color:#0d6e8a}@media (prefers-color-scheme:dark){body{color:#e6e2d8;background:#11181d}a{color:#5fb8d0}}</style></head>
<body><h1>Gerade kein Netz</h1><p>Diese Seite ist noch nicht offline gespeichert.</p>
<p><a href="${home}">Zur Übersicht</a>: Alles, was dort verlinkt ist, liest du auch ohne Netz.</p></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

function stripHash(u) {
  const url = new URL(u);
  url.hash = "";
  return url.href;
}

// ---------- Rundgang: alles einsammeln ----------

let running = null;

function maybeRecrawl(event) {
  event.waitUntil(readStatus().then((s) => {
    // Fehlte beim letzten Mal etwas, schon nach zwei Minuten wieder versuchen.
    const wait = s.failed ? 2 * 60 * 1000 : RECRAWL_MS;
    if (!s.finished || Date.now() - s.finished > wait) return crawl().catch(() => {});
  }));
}

function crawl({ force = false } = {}) {
  if (running) return running;
  running = doCrawl(force).finally(() => { running = null; });
  return running;
}

async function doCrawl(force) {
  const pages = await caches.open(PAGES);
  const runtime = await caches.open(RUNTIME);
  const seen = new Set();
  const queue = [];
  const failed = [];
  let done = 0;

  const add = (u, kind) => {
    const href = stripHash(u);
    if (seen.has(href)) return;
    seen.add(href);
    queue.push({ href, kind });
  };
  START.forEach((u) => add(u, "own"));

  const notify = (extra = {}) => broadcast({ type: "progress", done, total: seen.size, failed: failed.length, ...extra });

  async function handle({ href, kind }) {
    try {
      if (kind === "image" || kind === "font") {
        // Fotos und Schriften ändern sich unter derselben Adresse nicht.
        const hit = await runtime.match(href);
        if (!hit || !hit.ok) await runtime.put(href, await fetchExternal(href));
        return;
      }
      if (kind === "fontcss") {
        const res = await fetch(href);
        if (!res.ok) throw new Error(res.status);
        const css = await res.clone().text();
        await runtime.put(href, res);
        // Nur die Zeichensätze für Deutsch und Umschrift, nicht Kyrillisch, Griechisch usw.
        for (const block of css.split("/*").slice(1)) {
          const subset = block.slice(0, block.indexOf("*/")).trim();
          if (subset !== "latin" && subset !== "latin-ext") continue;
          for (const m of block.matchAll(/url\(([^)]+)\)/g)) add(m[1].replace(/["']/g, ""), "font");
        }
        return;
      }
      // Eigene Dateien: mit Netz neu prüfen (ETag, meist nur ein kurzes „unverändert“).
      const res = await fetch(href, { cache: force ? "reload" : "no-cache" });
      if (!res.ok) throw new Error(res.status);
      const type = res.headers.get("Content-Type") || "";
      if (/html|css|javascript/.test(type) || /\.(html|css|js)$/.test(new URL(href).pathname) || href.endsWith("/")) {
        const text = await res.clone().text();
        discover(href, type, text, add);
      }
      await pages.put(href, res);
    } catch (e) {
      failed.push(href);
    } finally {
      done++;
      if (done % 5 === 0) notify();
    }
  }

  // Sechs Anfragen gleichzeitig, wie ein Browser.
  let active = 0;
  const worker = async () => {
    for (;;) {
      const next = queue.shift();
      if (next) {
        active++;
        try { await handle(next); } finally { active--; }
        continue;
      }
      // Andere Arbeiter finden vielleicht noch Neues.
      if (active === 0) return;
      await new Promise((r) => setTimeout(r, 30));
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));

  // Aufräumen nur nach einem vollständigen Rundgang, sonst lieber zu viel behalten.
  if (failed.length === 0) {
    for (const req of await pages.keys()) {
      if (!seen.has(req.url) && req.url !== STATUS_URL) await pages.delete(req);
    }
  }

  const status = { version: VERSION, finished: Date.now(), total: seen.size, failed: failed.length, failedUrls: failed.slice(0, 20) };
  await pages.put(STATUS_URL, new Response(JSON.stringify(status), { headers: { "Content-Type": "application/json" } }));
  notify({ type: "status", ...status, running: false });
  return status;
}

// Fremde Dateien (Wikimedia, Google Fonts) mit CORS holen, damit man sieht, ob es geklappt hat.
// Höchstens zwei gleichzeitig; bei 429 (zu viele Anfragen) kurz warten und noch zweimal versuchen.
let externalSlots = 2;
const externalWaiting = [];
async function fetchExternal(href) {
  if (externalSlots > 0) externalSlots--;
  else await new Promise((r) => externalWaiting.push(r));
  try {
    for (let attempt = 0; ; attempt++) {
      const res = await fetch(href, { mode: "cors", credentials: "omit" });
      if (res.ok) return res;
      if ((res.status === 429 || res.status >= 500) && attempt < 2) {
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
        continue;
      }
      throw new Error(res.status);
    }
  } finally {
    const next = externalWaiting.shift();
    if (next) next(); else externalSlots++;
  }
}

function discover(base, type, text, add) {
  const own = (raw) => {
    let u;
    try { u = new URL(raw.replace(/&amp;/g, "&"), base); } catch (e) { return; }
    if (!u.href.startsWith(SCOPE)) return;
    u.hash = "";
    u.search = "";
    if (u.pathname.endsWith("/") || OWN_TYPES.test(u.pathname)) add(u.href, "own");
  };
  const isCss = /css/.test(type) || /\.css$/.test(new URL(base).pathname);
  const isJs = /javascript/.test(type) || /\.js$/.test(new URL(base).pathname);

  if (isCss) {
    for (const m of text.matchAll(/@import\s+url\(\s*["']?([^"')]+)["']?\s*\)|@import\s+["']([^"']+)["']|url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
      const raw = m[1] || m[2] || m[3];
      if (!raw || raw.startsWith("data:")) continue;
      const u = new URL(raw, base);
      if (u.hostname === FONT_CSS_HOST) add(u.href, "fontcss");
      else own(u.href);
    }
    return;
  }
  if (isJs) {
    // Aufnahmen, die nur als Dateiname in einem Skript stehen (cards.js), liegen in assets/audio/.
    for (const m of text.matchAll(/["']([\w.-]+\.mp3)["']/g)) own(new URL("audio/" + m[1], base).href);
    return;
  }
  // HTML
  for (const m of text.matchAll(/\s(?:href|src|data-src|poster)\s*=\s*"([^"]+)"/g)) own(m[1]);
  for (const m of text.matchAll(/<(?:img|source)\b[^>]*>/g)) {
    const tag = m[0];
    const urls = [];
    const src = /\ssrc\s*=\s*"([^"]+)"/.exec(tag);
    if (src) urls.push(src[1]);
    const srcset = /\ssrcset\s*=\s*"([^"]+)"/.exec(tag);
    if (srcset) srcset[1].split(",").forEach((part) => urls.push(part.trim().split(/\s+/)[0]));
    for (const raw of urls) {
      let u;
      try { u = new URL(raw.replace(/&amp;/g, "&"), base); } catch (e) { continue; }
      if (IMAGE_HOSTS.includes(u.hostname)) add(u.href, "image");
    }
  }
}

async function readStatus() {
  const res = await caches.match(STATUS_URL);
  if (!res) return {};
  try { return await res.json(); } catch (e) { return {}; }
}

async function broadcast(msg) {
  for (const client of await self.clients.matchAll({ includeUncontrolled: true })) client.postMessage(msg);
}
