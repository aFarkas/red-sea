// Karten für Rundgänge in Lektionen: eine Übersicht mit dem ganzen Weg und kleine Karten je Station,
// alle mit eurem Standort als blauem Punkt. Daten stehen in der Lektion:
//   <script>window.RUNDGANG = { stationen: { "1": { name, geo: [lat, lon] }, … }, weg: [[lat, lon], …], wegZurueck: [[lat, lon], …] }</script>
//   <div class="rundgang-karte" data-zeige="alle"></div>   Übersicht
//   <div class="rundgang-karte" data-zeige="3"></div>      Station 3, darunter die Entfernung
// Braucht ../assets/leaflet/leaflet.js und leaflet.css.
(function () {
  const R = window.RUNDGANG;
  if (!R || !window.L) return;
  const karten = [];
  let ich = null, watch = null, gestartet = false, wartend = null;

  function nummer(n, aktiv) {
    return L.divIcon({
      className: "rg-pin" + (aktiv ? " aktiv" : ""),
      html: `<span>${n}</span>`,
      iconSize: aktiv ? [34, 34] : [24, 24],
      iconAnchor: aktiv ? [17, 17] : [12, 12],
    });
  }

  function baue(div) {
    const zeige = div.dataset.zeige;
    const station = R.stationen[zeige];
    const box = div.appendChild(document.createElement("div"));
    box.className = "rg-map";
    const map = L.map(box, {
      zoomControl: true, scrollWheelZoom: false, tap: false,
      dragging: !L.Browser.touch, // auf iPad und Handy scrollt der Finger die Seite, nicht die Karte; zoomen geht mit + und −
      attributionControl: true,
    });
    // Erst die Ansicht setzen, dann Linien und Punkte; sonst zeichnet Leaflet sie bei fitBounds nicht.
    if (station) map.setView(station.geo, 18);
    else map.fitBounds(L.latLngBounds(Object.values(R.stationen).map((s) => s.geo).concat(R.weg || [])).pad(0.08));
    map.createPane("ich").style.zIndex = 650; // der blaue Punkt liegt über den Stationsnummern
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19, attribution: "Luftbild © Esri, Maxar",
    }).addTo(map);
    const linie = { color: "#ffd166", weight: 3, opacity: 0.9 };
    if (R.weg) L.polyline(R.weg, linie).addTo(map);
    if (R.wegZurueck) L.polyline(R.wegZurueck, Object.assign({}, linie, { dashArray: "6 7", opacity: 0.75 })).addTo(map);
    for (const [n, s] of Object.entries(R.stationen)) {
      L.marker(s.geo, { icon: nummer(n, n === zeige), title: `${n} · ${s.name}`, zIndexOffset: n === zeige ? 1000 : 0 })
        .bindTooltip(`${n} · ${s.name}`).addTo(map);
    }
    const knopf = document.createElement("button");
    knopf.type = "button";
    knopf.className = "rg-ich";
    knopf.textContent = "📍";
    knopf.title = "Wo sind wir?";
    knopf.setAttribute("aria-label", "Unseren Standort zeigen");
    knopf.addEventListener("click", (e) => { e.preventDefault(); starte(true, map); });
    const Steuer = L.Control.extend({ options: { position: "bottomright" }, onAdd: () => { const d = L.DomUtil.create("div", "leaflet-bar"); d.append(knopf); L.DomEvent.disableClickPropagation(d); return d; } });
    new Steuer().addTo(map);

    const info = div.appendChild(document.createElement("p"));
    info.className = "rg-info";
    info.textContent = station ? "Tippt auf 📍, dann zeigt der blaue Punkt, wo ihr seid." : "Gelb der Weg, gestrichelt der Rückweg. Tippt auf 📍 für euren Standort.";
    const k = { map, station, info, punkt: null, kreis: null };
    karten.push(k);
    if (ich) zeichne(k);
  }

  function zeichne(k) {
    const ll = [ich.latitude, ich.longitude];
    if (!k.punkt) {
      k.kreis = L.circle(ll, { pane: "ich", radius: ich.accuracy, color: "#1a73e8", weight: 1, fillOpacity: 0.12, interactive: false }).addTo(k.map);
      k.punkt = L.circleMarker(ll, { pane: "ich", radius: 8, color: "#fff", weight: 3, fillColor: "#1a73e8", fillOpacity: 1 }).addTo(k.map).bindTooltip("Ihr seid hier");
    } else { k.punkt.setLatLng(ll); k.kreis.setLatLng(ll).setRadius(ich.accuracy); }
    if (k.station) {
      const m = k.map.distance(ll, k.station.geo);
      k.info.textContent = m > 3000 ? `Ihr seid ${(m / 1000).toLocaleString("de-DE", { maximumFractionDigits: 0 })} km entfernt.`
        : m <= Math.max(20, ich.accuracy) ? "Ihr seid da."
        : `Noch etwa ${Math.round(m / 5) * 5} Meter bis hierher.`;
    }
  }

  function starte(vonHand, map) {
    if (!("geolocation" in navigator)) { if (vonHand) alert("Dieses Gerät gibt keinen Standort heraus."); return; }
    if (vonHand && map) { if (ich) map.setView([ich.latitude, ich.longitude], Math.max(map.getZoom(), 17)); else wartend = map; }
    if (gestartet) return;
    gestartet = true;
    watch = navigator.geolocation.watchPosition((pos) => {
      ich = pos.coords;
      karten.forEach(zeichne);
      if (wartend) { wartend.setView([ich.latitude, ich.longitude], Math.max(wartend.getZoom(), 17)); wartend = null; }
    }, (err) => {
      navigator.geolocation.clearWatch(watch); watch = null; gestartet = false;
      if (vonHand) alert(err.code === 1 ? "Standort nicht erlaubt. Auf dem iPad: Einstellungen → Datenschutz → Ortungsdienste → Safari-Websites → „Beim Verwenden“." : "Standort gerade nicht verfügbar.");
    }, { enableHighAccuracy: true, maximumAge: 10000, timeout: 30000 });
  }

  // Karten erst bauen, wenn sie ins Bild kommen; das spart Kacheln.
  const divs = document.querySelectorAll(".rundgang-karte");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); baue(e.target); } }), { rootMargin: "300px" });
    divs.forEach((d) => io.observe(d));
  } else divs.forEach(baue);

  // Hat das Gerät den Standort schon erlaubt, gleich mitlaufen lassen.
  if (navigator.permissions && navigator.permissions.query) {
    navigator.permissions.query({ name: "geolocation" }).then((p) => { if (p.state === "granted") starte(false); }).catch(() => {});
  }
})();
