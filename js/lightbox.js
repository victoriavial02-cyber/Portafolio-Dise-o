// Click-to-enlarge lightbox, reused on the homepage photo grid and on every
// project page. Call initLightbox(selector) once per gallery you want to
// enable — it builds the shared overlay the first time it's needed.
(function () {
  let overlay, imgEl, closeBtn, prevBtn, nextBtn;
  let currentList = [];
  let currentIndex = 0;

  function build() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Cerrar">&times;</button>' +
      '<button type="button" class="lightbox-prev" aria-label="Anterior">&lsaquo;</button>' +
      '<img class="lightbox-image" alt="">' +
      '<button type="button" class="lightbox-next" aria-label="Siguiente">&rsaquo;</button>';
    document.body.appendChild(overlay);

    imgEl = overlay.querySelector(".lightbox-image");
    closeBtn = overlay.querySelector(".lightbox-close");
    prevBtn = overlay.querySelector(".lightbox-prev");
    nextBtn = overlay.querySelector(".lightbox-next");

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    prevBtn.addEventListener("click", () => show(currentIndex - 1));
    nextBtn.addEventListener("click", () => show(currentIndex + 1));

    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(currentIndex - 1);
      if (e.key === "ArrowRight") show(currentIndex + 1);
    });
  }

  function show(index) {
    currentIndex = (index + currentList.length) % currentList.length;
    const img = currentList[currentIndex];
    imgEl.src = img.currentSrc || img.src;
    imgEl.alt = img.alt || "";
    prevBtn.style.display = currentList.length > 1 ? "" : "none";
    nextBtn.style.display = currentList.length > 1 ? "" : "none";
  }

  function open(list, index) {
    currentList = list;
    show(index);
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  window.initLightbox = function (selector) {
    const imgs = Array.from(document.querySelectorAll(selector));
    if (!imgs.length) return;
    build();
    imgs.forEach((img) => {
      img.classList.add("lightbox-trigger");
      img.addEventListener("click", () => {
        const visible = imgs.filter((el) => {
          const item = el.closest(".photo-item");
          return !item || item.style.display !== "none";
        });
        open(visible, visible.indexOf(img));
      });
    });
  };
})();
