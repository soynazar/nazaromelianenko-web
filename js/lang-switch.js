const pageMap = {
    // de -> a
    'teaching.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html' },
    'ensenanza.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html' },
    'development.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html' },
    'desarrollo.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html' },
    'about-me.html': { es: 'sobre-mi.html', ru: 'sobre-mi.html', en: 'about-me.html' },
    'sobre-mi.html': { es: 'sobre-mi.html', ru: 'sobre-mi.html', en: 'about-me.html' },
    'contact.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html' },
    'contacto.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html' },
    'index.html': { es: 'index.html', ru: 'index.html', en: 'index.html' }
};

const initLanguageSwitch = () => {
    const langLinks = document.querySelectorAll('.lang-switch a');
    if (langLinks.length === 0) return;

    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const currentLang = pathParts[1] || 'es';
    const currentPage = pathParts.pop() || 'index.html';

    // 1. Corregir los enlaces del menú según el idioma actual
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && pageMap[href]) {
            link.href = `/${currentLang}/${pageMap[href][currentLang]}`;
        }
    });

    // 2. Configurar el selector de idiomas
    langLinks.forEach(link => {
        const targetLang = link.getAttribute('data-lang');
        if (targetLang === currentLang) link.classList.add('active');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const translatedPage = pageMap[currentPage] ? pageMap[currentPage][targetLang] : 'index.html';
            window.location.href = `/${targetLang}/${translatedPage}`;
        });
    });
};

window.addEventListener('componentsLoaded', initLanguageSwitch);
