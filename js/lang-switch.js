(function () {
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  const currentLang = ["es", "en", "ru"].includes(pathParts[0]) ? pathParts[0] : null;
  const file = pathParts[pathParts.length - 1]?.endsWith(".html") ? pathParts[pathParts.length - 1] : "index.html";

  document.querySelectorAll(".lang-switch a[data-lang]").forEach((a) => {
    const targetLang = a.dataset.lang;

    // Si estás en /es/... -> /en/<mismo archivo>
    // Si estás en raíz -> /en/index.html (o el archivo actual)
    const href = currentLang
      ? `/${targetLang}/${file}`
      : `/${targetLang}/${file}`;

    a.href = href;

    // Marcar activo
    const isActive = (currentLang && currentLang === targetLang) || (!currentLang && targetLang === "es");
    if (isActive) a.classList.add("active");

    // Guardar preferencia al hacer click
    a.addEventListener("click", () => {
      localStorage.setItem("site_lang", targetLang);
    });
  });
})();

