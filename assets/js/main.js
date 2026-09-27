(() => {
  try {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("source") || params.get("utm_source");
    const referrer = document.referrer || "";
    let externalReferrer = false;
    if (referrer) {
      try { externalReferrer = new URL(referrer).hostname !== window.location.hostname; } catch (e) { externalReferrer = false; }
    }
    const touch = {
      source: source || "",
      landing: window.location.pathname,
      referrer: referrer || "direct",
      ts: new Date().toISOString(),
    };
    ["utm_medium", "utm_campaign"].forEach((key) => {
      const value = params.get(key);
      if (value) touch[key] = value;
    });
    if (!localStorage.getItem("boom_attr")) {
      localStorage.setItem("boom_attr", JSON.stringify(touch));
    }
    if (source || externalReferrer) {
      localStorage.setItem("boom_last", JSON.stringify(touch));
    }
  } catch (e) {
    // localStorage can be unavailable (private mode, blocked storage).
  }

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
