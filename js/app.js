const slides = [
  { img: "img/trabajo/fotografia.jpg", title: "fotografía", role: "Fotografía, Dirección de Arte" },
  { img: "img/trabajo/angelica-nielsen.jpg", title: "angélica nielsen", role: "Fotografía, Diseño" },
  { img: "img/trabajo/polo-los-maitenes.jpg", title: "polo los maitenes", role: "Fotografía, Dirección de Arte" },
  { img: "img/trabajo/vina-panqueco.jpg", title: "viña panqueco", role: "Fotografía, Diseño" },
  { img: "img/trabajo/letreros-rancho.jpg", title: "letrero viña río bueno", role: "Fotografía" },
];

let current = 0;

const imgEl = document.getElementById("slide-img");
const titleEl = document.getElementById("slide-title");
const roleEl = document.getElementById("slide-role");
const counterEl = document.getElementById("counter");

function render() {
  const s = slides[current];
  imgEl.src = s.img;
  imgEl.alt = s.title;
  titleEl.textContent = s.title;
  roleEl.textContent = s.role;
  counterEl.textContent = `${current + 1} de ${slides.length}`;
}

document.getElementById("prev").addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  render();
});

document.getElementById("next").addEventListener("click", () => {
  current = (current + 1) % slides.length;
  render();
});
