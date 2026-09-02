(() => {
  const form = document.getElementById("boom-contact-form");
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const replyto = document.getElementById("boom-replyto");
  const mediumSelect = document.getElementById("preferred-medium");
  const contactDetailRow = document.getElementById("contact-detail-row");
  const contactDetailLabel = document.getElementById("contact-detail-label");
  const contactDetailInput = document.getElementById("contact-detail");

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
