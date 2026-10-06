export function heroSlider() {
  const slider = document.querySelector(".hero__slider");
  const track = document.querySelector(".hero__track");
  const slides = document.querySelectorAll(".hero__content");
  const prevBtn = document.querySelector(".product__slider-button--prev");
  const nextBtn = document.querySelector(".product__slider-button--next");
  const dots = document.querySelectorAll(".solid");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });
  });

  let touchStartX = 0;
  const swipeThreshold = 50;

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  slider.addEventListener(
    "touchend",
    (e) => {
      const distance = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) < swipeThreshold) return;
      distance < 0 ? nextSlide() : prevSlide();
    },
    { passive: true },
  );

  updateSlider();
}
