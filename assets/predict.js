// "Erst tippen, dann aufdecken": jede .predict-Box hat Buttons, einer davon mit data-correct.
// Ein Klick markiert die Wahl, zeigt die richtige Option und deckt .answer auf.
document.querySelectorAll(".predict").forEach((box) => {
  const buttons = box.querySelectorAll(".options button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.disabled = true;
        if (b.hasAttribute("data-correct")) b.classList.add("right");
      });
      if (!btn.hasAttribute("data-correct")) btn.classList.add("wrong");
      box.classList.add("done");
    });
  });
});
