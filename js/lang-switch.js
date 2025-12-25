const pageMap = {
    'teaching.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyança.html' },
    'ensenanza.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyança.html' },
    'ensenyança.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyança.html' },
    'development.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html', ca: 'desenvolupament.html' },
    'desarrollo.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html', ca: 'desenvolupament.html' },
    'desenvolupament.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html', ca: 'desenvolupament.html' },
    'contact.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    'contacto.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    'contacte.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    'about-me.html': { es: 'sobre-mi.html', ru: 'sobre-mi.html', en: 'about-me.html', ca: 'sobre-mi.html' },
    'sobre-mi.html': { es: 'sobre-mi.html', ru: 'sobre-mi.html', en: 'about-me.html', ca: 'sobre-mi.html' },
    'index.html': { es: 'index.html', ru: 'index.html', en: 'index.html', ca: 'index.html' },
    'materiales.html': { es: 'index.html', ru: 'materiales.html', en: 'index.html', ca: 'index.html' }
};

const uiStrings = {
    es: { home: "Inicio", teaching: "Enseñanza", dev: "Desarrollo", about: "Sobre mí", contact: "Contacto", materials: "Materiales" },
    en: { home: "Home", teaching: "Teaching", dev: "Development", about: "About me", contact: "Contact", materials: "Materials" },
    ru: { home: "Главная", teaching: "Обучение", dev: "Разработка", about: "Обо мне", contact: "Контакт", materials: "Материалы" },
    ca: { home: "Inici", teaching: "Ensenyança", dev: "Desenvolupament", about: "Sobre mi", contact: "Contacte", materials: "Materials" }
};

const initLanguageSwitch = () => {
    const langLinks = document.querySelectorAll('.lang-switch a');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Detectar idioma y página actual
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const currentLang = pathParts[1] || 'es';
    const currentPage = pathParts.pop() || 'index.html';

    // 1. Control de visibilidad del botón Materiales
    const materialsLink = document.querySelector('.nav-link[data-key="materials"]');
    if (materialsLink) {
        materialsLink.style.display = (currentLang === 'ru') ? 'inline-block' : 'none';
    }

    // 2. Traducir textos y corregir enlaces del menú
    const strings = uiStrings[currentLang] || uiStrings.es;
    navLinks.forEach(link => {
        const key = link.getAttribute('data-key');
        if (key && strings[key]) {
            link.textContent = strings[key];
        }
        
        const href = link.getAttribute('href');
        if (href && pageMap[href]) {
            link.href = `/${currentLang}/${pageMap[href][currentLang]}`;
        }
    });

    // 3. Configurar clics del selector de idiomas
    langLinks.forEach(link => {
        const targetLang = link.getAttribute('data-lang');
        if (targetLang === currentLang) link.classList.add('active');

        // Clonar para evitar múltiples listeners si el evento se dispara dos veces
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);

        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            const translatedPage = pageMap[currentPage] ? pageMap[currentPage][targetLang] : 'index.html';
            window.location.href = `/${targetLang}/${translatedPage}`;
        });
    });
};

// Escuchar el evento de carga de componentes
window.addEventListener('componentsLoaded', initLanguageSwitch);
