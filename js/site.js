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
      layoutPhotoGrid();
    }
  });
});

// Filter photos within the "fotografía" panel by category
const filterButtons = document.querySelectorAll(".filter-btn");
const photoGrid = document.getElementById("photo-grid");
const photoItems = Array.from(document.querySelectorAll(".photo-item"));

// Shuffle photos within each category once on load (keeping the category
// blocks in their original order) so photos from the same event/subfolder
// don't all appear bunched together. This reorders both the array we use
// for layout below AND the actual DOM nodes, so filtering/keyboard order
// stay consistent with what's on screen.
if (photoGrid) {
  const categoryOrder = [];
  photoItems.forEach((item) => {
    const cat = item.dataset.category;
    if (!categoryOrder.includes(cat)) categoryOrder.push(cat);
  });

  const shuffled = [];
  categoryOrder.forEach((cat) => {
    const group = photoItems.filter((item) => item.dataset.category === cat);
    for (let i = group.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [group[i], group[j]] = [group[j], group[i]];
    }
    shuffled.push(...group);
  });

  shuffled.forEach((item) => photoGrid.appendChild(item));
  photoItems.length = 0;
  photoItems.push(...shuffled);
}

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
    layoutPhotoGrid();
  });
});

// True masonry layout, computed in JS (same idea as Pinterest): every photo
// is placed in whichever column is shortest at that point, so there are
// never leftover gaps like CSS Grid's "dense" auto-placement can leave when
// photo sizes vary a lot. Horizontal (landscape) photos span two columns.
// Every <img> has width/height attributes baked into the HTML, so we know
// each photo's real aspect ratio without waiting for it to download.
const GRID_GAP = 12; // px, matches the visual spacing used everywhere else

function getColumnCount() {
  if (window.innerWidth >= 1300) return 5;
  if (window.innerWidth >= 900) return 4;
  if (window.innerWidth >= 640) return 3;
  return 2;
}

function layoutPhotoGrid() {
  if (!photoGrid) return;
  if (!photoGrid.clientWidth) return; // grid is hidden (e.g. "diseño" tab active)

  const styles = getComputedStyle(photoGrid);
  const paddingLeft = parseFloat(styles.paddingLeft) || 0;
  const paddingRight = parseFloat(styles.paddingRight) || 0;
  const paddingBottom = parseFloat(styles.paddingBottom) || 0;
  const columns = getColumnCount();
  const innerWidth = photoGrid.clientWidth - paddingLeft - paddingRight;
  const columnWidth = (innerWidth - GRID_GAP * (columns - 1)) / columns;

  const columnHeights = new Array(columns).fill(0);

  photoItems.forEach((item) => {
    if (item.style.display === "none") return;

    const img = item.querySelector("img");
    if (!img) return;
    const w = parseFloat(img.getAttribute("width"));
    const h = parseFloat(img.getAttribute("height"));
    if (!w || !h) return;

    const ratio = w / h;
    const span = ratio > 1.25 && columns > 1 ? 2 : 1;
    item.classList.toggle("landscape", span === 2);

    // Find the position (among the possible starting columns for this span)
    // with the smallest current height — that's where this photo goes.
    let bestCol = 0;
    let bestHeight = Infinity;
    for (let c = 0; c <= columns - span; c++) {
      let h2 = 0;
      for (let k = c; k < c + span; k++) h2 = Math.max(h2, columnHeights[k]);
      if (h2 < bestHeight) {
        bestHeight = h2;
        bestCol = c;
      }
    }

    const itemWidth = columnWidth * span + GRID_GAP * (span - 1);
    const itemHeight = itemWidth / ratio;
    const left = paddingLeft + bestCol * (columnWidth + GRID_GAP);

    item.style.width = itemWidth + "px";
    item.style.left = left + "px";
    item.style.top = bestHeight + "px";

    const newHeight = bestHeight + itemHeight + GRID_GAP;
    for (let k = bestCol; k < bestCol + span; k++) columnHeights[k] = newHeight;
  });

  const maxHeight = Math.max(0, ...columnHeights);
  photoGrid.style.height = maxHeight + paddingBottom + "px";
}

if (photoGrid) {
  layoutPhotoGrid();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutPhotoGrid, 150);
  });
}
