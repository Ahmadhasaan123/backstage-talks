const sections = document.querySelectorAll(".container");
let currentColor = "";

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const newColor = section.getAttribute("data-color");

        if (newColor !== currentColor) {
          currentColor = newColor;

          anime({
            targets: document.body,
            backgroundColor: newColor,
            duration: 700,
            easing: "easeInOutQuad",
          });
        }
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => observer.observe(section));

// scroll fixed

let scrollTimeout;

function handleScroll(direction) {
  if (scrollTimeout) return;

  scrollTimeout = setTimeout(() => {
    scrollTimeout = null;

    const sections = Array.from(document.querySelectorAll(".container"));
    const currentSection = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top >= -10 && rect.top <= window.innerHeight / 2;
    });

    const nextIndex = Math.max(
      0,
      Math.min(
        sections.length - 1,
        sections.indexOf(currentSection) + direction
      )
    );

    sections[nextIndex].scrollIntoView({ behavior: "smooth" });
  }, 300);
}

// Scroll by mouse wheel
window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    handleScroll(direction);
  },
  { passive: false }
);

// Scroll by arrow keys
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    handleScroll(1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    handleScroll(-1);
  }
});
