(() => {
  const form = document.getElementById("boom-contact-form");
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const replyto = document.getElementById("boom-replyto");
  const mediumSelect = document.getElementById("preferred-medium");
  const contactDetailRow = document.getElementById("contact-detail-row");
  const contactDetailLabel = document.getElementById("contact-detail-label");
  const contactDetailInput = document.getElementById("contact-detail");
  const subjectInput = form.querySelector('input[name="_subject"]');
  const sourceInput = document.getElementById("boom-source");
  const landingInput = document.getElementById("boom-landing-page");
  const referrerInput = document.getElementById("boom-referrer");
  const lastSourceInput = document.getElementById("boom-last-source");

  const readTouch = (key) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  const describeSource = (touch) => {
    if (!touch || !touch.source) return "";
    return [touch.source, touch.utm_medium, touch.utm_campaign].filter(Boolean).join(" / ");
  };

  const referrerHost = (referrer) => {
    if (!referrer || referrer === "direct") return "";
    try {
      const host = new URL(referrer).hostname;
      return host === window.location.hostname ? "" : host.replace(/^www\./, "");
    } catch (e) {
      return "";
    }
  };

  const params = new URLSearchParams(window.location.search);
  const urlSource = params.get("source") || params.get("utm_source") || "";
  const firstTouch = readTouch("boom_attr");
  const lastTouch = readTouch("boom_last");

  const sourceName = urlSource || (firstTouch && firstTouch.source) || "";
  if (sourceInput) sourceInput.value = urlSource || describeSource(firstTouch);
  if (landingInput) landingInput.value = (firstTouch && firstTouch.landing) || window.location.pathname;
  if (referrerInput) referrerInput.value = (firstTouch && firstTouch.referrer) || document.referrer || "direct";
  if (lastSourceInput && lastTouch) {
    lastSourceInput.value = [
      describeSource(lastTouch) || referrerHost(lastTouch.referrer) || "direct",
      lastTouch.landing,
      lastTouch.ts,
    ].filter(Boolean).join(" | ");
  }
  const subjectSource = sourceName || referrerHost(referrerInput ? referrerInput.value : "") || "direct";

  const updateContactDetailField = () => {
    if (!mediumSelect || !contactDetailRow || !contactDetailLabel || !contactDetailInput) return;

    const medium = mediumSelect.value;
    if (!medium) {
      contactDetailRow.classList.add("is-hidden");
      contactDetailInput.removeAttribute("required");
      contactDetailInput.value = "";
      return;
    }

    contactDetailRow.classList.remove("is-hidden");
    contactDetailInput.required = true;

    if (medium === "E-Mail") {
      contactDetailLabel.textContent = "Email";
      contactDetailInput.type = "email";
      contactDetailInput.name = "email";
      contactDetailInput.autocomplete = "email";
      contactDetailInput.placeholder = "you@company.com";
    } else {
      contactDetailLabel.textContent = "WhatsApp number";
      contactDetailInput.type = "tel";
      contactDetailInput.name = "whatsapp";
      contactDetailInput.autocomplete = "tel";
      contactDetailInput.placeholder = "+91 XXXXX XXXXX";
    }
  };

  if (mediumSelect) {
    mediumSelect.addEventListener("change", updateContactDetailField);
  }

  form.addEventListener("submit", () => {
    if (subjectInput) {
      subjectInput.value = `New BOOM Demo Request — ${subjectSource}`;
    }
    if (replyto) {
      if (mediumSelect?.value === "E-Mail" && contactDetailInput) {
        replyto.value = contactDetailInput.value.trim();
      } else {
        replyto.value = "";
      }
    }
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
  });
})();
