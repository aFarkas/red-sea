// Meldet den Service Worker (../sw.js) an und zeigt auf der Übersicht, ob der Kurs offline bereit ist.
// Jede Seite bindet dieses Skript im <head> ein (siehe NOTES.md, Seitenpflege).
(function () {
  if (!("serviceWorker" in navigator)) return;
  const base = new URL("../", document.currentScript.src);
  const swUrl = new URL("sw.js", base).href;

  navigator.serviceWorker.register(swUrl, { scope: base.pathname }).catch(() => {});
  // Bittet den Browser, den Speicher nicht bei Platzmangel zu leeren.
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

  document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("offline");
    if (!box) return;

    const text = box.querySelector("[data-offline-text]");
    const btn = box.querySelector("button");
    const fmt = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
    let running = false;

    function show(s) {
      if (s.type === "progress" && s.total) {
        running = true;
        text.textContent = `Wird gespeichert … ${s.done} von ${s.total} Dateien.`;
      } else if (s.finished) {
        running = !!s.running;
        const when = fmt.format(new Date(s.finished));
        text.textContent = s.failed
          ? `Gespeichert am ${when}, aber ${s.failed} von ${s.total} Dateien fehlen noch. Mit Netz noch einmal laden.`
          : `Alles da: ${s.total} Dateien, Stand ${when}. Der Kurs geht auch ohne Netz.`;
        box.dataset.state = s.failed ? "teilweise" : "fertig";
      } else {
        text.textContent = navigator.onLine
          ? "Noch nicht gespeichert. Das passiert jetzt im Hintergrund."
          : "Noch nicht gespeichert. Sobald du Netz hast, geht es los.";
      }
      btn.disabled = running || !navigator.onLine;
    }

    navigator.serviceWorker.addEventListener("message", (e) => {
      if (e.data && (e.data.type === "progress" || e.data.type === "status")) show(e.data);
    });
    navigator.serviceWorker.ready.then((reg) => {
      const sw = navigator.serviceWorker.controller || reg.active;
      sw.postMessage({ type: "status" });
      btn.addEventListener("click", () => {
        running = true;
        btn.disabled = true;
        text.textContent = "Wird gespeichert …";
        sw.postMessage({ type: "crawl" });
      });
    });
    window.addEventListener("online", () => { btn.disabled = running; });
    window.addEventListener("offline", () => { btn.disabled = true; });
    box.hidden = false;
    show({});
  });
})();
