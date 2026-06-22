(() => {
  const menuButton = document.querySelector("[data-menu-button]");
  const navLinks = document.getElementById("site-nav");
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.classList.contains("nav-cta")) return;
    const target = link.dataset.page || "";
    const active = target === page;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
})();
