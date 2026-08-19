(() => {
  const form = document.getElementById("boom-contact-form");
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const replyto = document.getElementById("boom-replyto");
  const emailInput = document.getElementById("boom-email");

  form.addEventListener("submit", () => {
    if (replyto && emailInput) {
      replyto.value = emailInput.value.trim();
    }
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
  });
})();
