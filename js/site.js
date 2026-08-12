// Toggle between "diseño" and "fotografía" work panels
const tabButtons = document.querySelectorAll(".work-tab");
const panelDiseno = document.getElementById("panel-diseno");
const panelFotografia = document.getElementById("panel-fotografia");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (btn.dataset.tab === "diseno") {
      panelDiseno.hidden = false;
      panelFotografia.hidden = true;
    } else {
      panelDiseno.hidden = true;
      panelFotografia.hidden = false;
    }
  });
});

// Shuffle the photo grid into random order (so photos aren't grouped by category)
const photoGrid = document.getElementById("photo-grid");
if (photoGrid) {
  const items = Array.from(photoGrid.children);
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  items.forEach((item) => photoGrid.appendChild(item));
}

// Filter photos within the "fotografía" panel by category
const filterButtons = document.querySelectorAll(".filter-btn");
const photoItems = document.querySelectorAll(".photo-grid-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    photoItems.forEach((img) => {
      if (filter === "todas" || img.dataset.category === filter) {
        img.style.display = "";
      } else {
        img.style.display = "none";
      }
    });
  });
});
