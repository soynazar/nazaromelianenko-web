window.addEventListener('componentsLoaded', () => {
  // Definimos pathParts dentro para que esté disponible al cargar los componentes
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  
  // Detectamos el idioma actual (es, en o ru)
  const currentLang = ["es", "en", "ru"].includes(pathParts[0]) ? pathParts[0] : null;
  
  // Obtenemos el nombre de la página (sin el idioma)
  let currentPage = "index";
  
  if (currentLang && pathParts.length > 1) {
    currentPage = pathParts[pathParts.length - 1].replace(".html", "");
  } else if (!currentLang && pathParts.length > 0) {
    currentPage = pathParts[0].replace(".html", "");
  }

  document.querySelectorAll(".lang-switch a[data-lang]").forEach((a) => {
    const targetLang = a.dataset.lang;

    // Construimos la URL limpia
    let newPath = "";
    if (currentPage === "index") {
      newPath = `/${targetLang}/`;
    } else {
      newPath = `/${targetLang}/${currentPage}`;
    }

    a.href = newPath;

    // Marcar idioma activo
    const isActive = (currentLang === targetLang) || (!currentLang && targetLang === "es");
    if (isActive) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }

    // Guardar preferencia
    a.addEventListener("click", () => {
      localStorage.setItem("site_lang", targetLang);
    });
  });
});
