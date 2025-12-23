window.addEventListener('componentsLoaded', () => {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  
  // 1. Identificar idioma y página actual
  const currentLang = ["es", "en", "ru"].includes(pathParts[0]) ? pathParts[0] : null;
  
  let currentPage = "index";
  if (currentLang && pathParts.length > 1) {
    currentPage = pathParts[pathParts.length - 1].replace(".html", "");
  } else if (!currentLang && pathParts.length > 0) {
    currentPage = pathParts[0].replace(".html", "");
  }

  // 2. Configurar el selector de idiomas (ES, EN, RU)
  document.querySelectorAll(".lang-switch a[data-lang]").forEach((a) => {
    const targetLang = a.dataset.lang;
    let newPath = (currentPage === "index") ? `/${targetLang}/` : `/${targetLang}/${currentPage}`;

    a.href = newPath;

    const isActive = (currentLang === targetLang) || (!currentLang && targetLang === "es");
    if (isActive) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }

    a.addEventListener("click", () => {
      localStorage.setItem("site_lang", targetLang);
    });
  });

  // 3. Actualizar enlaces del menú principal según el idioma activo
  document.querySelectorAll(".nav a[data-link]").forEach((link) => {
    const page = link.dataset.link;
    const lang = currentLang || "es"; 
    
    if (page === "index") {
      link.href = `/${lang}/`;
    } else {
      link.href = `/${lang}/${page}`;
    }
  });
});
