 (function () {
  const yearEl = document.getElementById("year");
  yearEl.textContent = String(new Date().getFullYear());

  // Replace these with your real details later
  const EMAIL = "hello@yourdomain.com";
  const SOCIAL_URL = "https://www.instagram.com/";
  const CTA_EMAIL_SUBJECT = "OneThing updates";
  const CTA_EMAIL_BODY = "Hi — please keep me posted on OneThing. (Tell me what you’re building and when it’s available.)";

  const emailLink = document.getElementById("emailLink");
  emailLink.textContent = EMAIL;
  emailLink.href = `mailto:${EMAIL}?subject=${encodeURIComponent(CTA_EMAIL_SUBJECT)}`;

  const socialLink = document.getElementById("socialLink");
  socialLink.href = SOCIAL_URL;

  // CTA button scrolls to contact section (or you can make it mailto)
  const primaryCta = document.getElementById("primaryCta");
  primaryCta.addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });

  // OneThing editor (saved locally in the browser)
  const oneThingDisplay = document.getElementById("oneThingDisplay");
  const editBtn = document.getElementById("editOneThing");
  const dialog = document.getElementById("oneThingDialog");
  const input = document.getElementById("oneThingInput");
  const saveBtn = document.getElementById("saveOneThing");

  const STORAGE_KEY = "onething.statement";

  function loadOneThing() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim().length) oneThingDisplay.textContent = saved.trim();
  }

  loadOneThing();

  editBtn.addEventListener("click", () => {
    input.value = oneThingDisplay.textContent.trim();
    dialog.showModal();
    setTimeout(() => input.focus(), 50);
  });

  saveBtn.addEventListener("click", () => {
    const v = (input.value || "").trim();
    if (v.length) {
      localStorage.setItem(STORAGE_KEY, v);
      oneThingDisplay.textContent = v;
    }
  });

  // Copy email
  const copyBtn = document.getElementById("copyEmail");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      copyBtn.textContent = "Copied";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
    } catch {
      // fallback: open mail
      window.location.href = emailLink.href;
    }
  });
})();
