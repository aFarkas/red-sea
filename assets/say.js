// Aussprache anhören. button.say mit data-src spielt eine echte Aufnahme ab (Ägyptisch-Arabisch),
// button.say mit data-tts liest den arabischen Text mit der Computerstimme des Geräts vor. Die
// Computerstimmen sprechen Hocharabisch, deshalb taugen sie nur zum Vergleich.
// Ein Element mit data-wort="<id aus window.WORDS>" bekommt beide Knöpfe davor gesetzt, auch in später
// gebauten Karten. Dafür muss assets/cards.js vor dieser Datei geladen sein.
(function () {
  const AUDIO_DIR = new URL("audio/", document.currentScript.src).href;
  const synth = window.speechSynthesis;
  let playing = null;
  // Chrome räumt eine Äußerung ohne Verweis mitten im Sprechen weg und bleibt dann stumm hängen.
  let utterance = null;

  // Eine ägyptische Stimme (ar-EG) würde den Vergleich verderben, sie spricht g statt dsch.
  // Unter den übrigen haben lokale Stimmen Vorrang, die Netzstimmen von Chrome fallen gelegentlich still aus.
  function arabicVoice() {
    if (!synth) return null;
    const voices = synth
      .getVoices()
      .filter((v) => v.lang.toLowerCase().startsWith("ar") && !v.lang.toLowerCase().startsWith("ar-eg"));
    return voices.find((v) => v.localService) || voices[0] || null;
  }

  // Chrome liefert die Stimmen erst nach "voiceschanged", beim ersten Klick ist die Liste oft leer.
  function withVoice(callback) {
    const voice = arabicVoice();
    if (voice || !synth) return callback(voice);
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      synth.removeEventListener("voiceschanged", finish);
      callback(arabicVoice());
    };
    synth.addEventListener("voiceschanged", finish);
    setTimeout(finish, 1000);
  }

  function markMissing(btn) {
    btn.disabled = true;
    btn.title = "Auf diesem Gerät gibt es keine arabische Computerstimme.";
    btn.classList.add("missing");
  }

  function speak(btn) {
    withVoice((voice) => {
      if (!voice) return markMissing(btn);
      utterance = new SpeechSynthesisUtterance(btn.dataset.tts);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.rate = 0.8;
      // Direkt nach cancel() verschluckt Chrome ein speak() manchmal und meldet trotzdem Ton.
      // Ein kurzer Abstand und resume() lösen den Hänger.
      setTimeout(() => {
        synth.resume();
        synth.speak(utterance);
      }, 80);
    });
  }

  function stop() {
    if (playing) playing.pause();
    // Immer abbrechen: Edge bleibt nach der ersten Äußerung hängen und meldet dabei speaking und
    // pending als false.
    if (synth) synth.cancel();
  }

  // Am Dokument statt an jeder Taste, damit auch Tasten in später gebauten Karten (review.js) klingen.
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("button.say");
    if (!btn) return;
    stop();
    if (btn.dataset.src) {
      playing = new Audio(btn.dataset.src);
      // AbortError heißt nur, dass ein neuer Klick die Aufnahme unterbrochen hat.
      playing.play().catch((err) => {
        if (err.name === "AbortError") return;
        btn.title = "Die Aufnahme ließ sich nicht abspielen.";
        btn.classList.add("missing");
      });
    } else {
      speak(btn);
    }
  });

  function buttons(w) {
    return `<button class="say" type="button" data-src="${AUDIO_DIR}${w.audio}" aria-label="Anhören auf Ägyptisch: ${w.wort}">▶ Ägyptisch</button>`
      + `<button class="say tts" type="button" data-tts="${w.ar}" aria-label="Anhören auf Hocharabisch, Computerstimme: ${w.hoch}">▶ Hocharabisch</button>`;
  }

  function expand(root) {
    for (const node of root.querySelectorAll("[data-wort]:not([data-wort-done])")) {
      const w = (window.WORDS || []).find((x) => x.id === node.dataset.wort);
      if (!w) continue;
      node.setAttribute("data-wort-done", "");
      node.insertAdjacentHTML("beforebegin", buttons(w));
    }
  }

  window.Say = { buttons };
  expand(document);
  new MutationObserver(() => expand(document)).observe(document.body, { childList: true, subtree: true });
})();
