(function () {
  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);

  // Detect current lang folder if present
  const currentLang = ["es", "en", "ru"].includes(parts[0]) ? parts[0] : null;

  // Current filename (default index.html)
  const file = parts[parts.length - 1] && parts[parts.length - 1].includes(".html")
    ? parts[parts.length - 1]
    : "index.html";

  document.querySelectorAll(".lang-switch a[data-lang]").forEach(a => {
    const targetLang = a.dataset.lang;

    // Build correct target URL:
    // - if you are in /es/... then switch to /en/<same file>
    // - if you are in root, go to /<lang>/index.html
    const href = currentLang
      ? `../${targetLang}/${file}`
      : `./${targetLang}/${file}`;

    a.setAttribute("href", href);

    if (currentLang === targetLang || (!currentLang && targetLang === "es")) {
      a.classList.add("active");
    }
    document.addEventListener("click", (e) => {
  const link = e.target.closest(".lang-switch a[data-lang]");
  if (!link) return;
  localStorage.setItem("site_lang", link.dataset.lang);
});

  });
})();

