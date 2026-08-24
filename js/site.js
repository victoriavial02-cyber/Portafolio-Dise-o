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

// Filter photos within the "fotografía" panel by category
const filterButtons = document.querySelectorAll(".filter-btn");
const photoItems = document.querySelectorAll(".photo-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    photoItems.forEach((item) => {
      if (filter === "todas" || item.dataset.category === filter) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
});
