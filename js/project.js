function initProjectSlider(images) {
  let current = 0;

  const imgEl = document.getElementById("slide-img");
  const counterEl = document.getElementById("counter");

  function render() {
    imgEl.src = images[current];
    counterEl.textContent = `${current + 1} de ${images.length}`;
  }

  document.getElementById("prev").addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    render();
  });

  document.getElementById("next").addEventListener("click", () => {
    current = (current + 1) % images.length;
    render();
  });

  render();
}
