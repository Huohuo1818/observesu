(() => {
  const pad = (number) => String(number).padStart(2, "0");

  document.querySelectorAll(".collection-page .product-showcase").forEach((showcase) => {
    const track = showcase.querySelector(".product-carousel-track");
    const slides = Array.from(track?.querySelectorAll(".product-showcase-visual-card") || []);
    const prev = showcase.querySelector(".carousel-prev");
    const next = showcase.querySelector(".carousel-next");
    const count = showcase.querySelector(".carousel-count");

    if (!track || slides.length === 0) return;

    let activeIndex = 0;
    let startX = 0;
    let startY = 0;
    let pointerDown = false;
    let swiped = false;

    const show = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      if (count) {
        count.textContent = `${pad(activeIndex + 1)} / ${pad(slides.length)}`;
      }
    };

    const goPrev = () => show(activeIndex - 1);
    const goNext = () => show(activeIndex + 1);

    track.setAttribute("tabindex", "0");
    track.setAttribute("role", "button");
    track.setAttribute("aria-roledescription", "产品图片切换");

    prev?.addEventListener("click", goPrev);
    next?.addEventListener("click", goNext);
    track.addEventListener("click", () => {
      if (swiped) {
        swiped = false;
        return;
      }

      goNext();
    });
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }

      if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        goNext();
      }
    });

    track.addEventListener("pointerdown", (event) => {
      pointerDown = true;
      swiped = false;
      startX = event.clientX;
      startY = event.clientY;
    });

    track.addEventListener("pointerup", (event) => {
      if (!pointerDown) return;
      pointerDown = false;

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      if (Math.abs(deltaX) < 36 || Math.abs(deltaX) < Math.abs(deltaY)) return;

      swiped = true;
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    });

    track.addEventListener("pointercancel", () => {
      pointerDown = false;
    });

    slides.forEach((slide) => {
      slide.querySelectorAll("img").forEach((image) => {
        image.setAttribute("draggable", "false");
      });
    });

    show(0);
  });
})();
