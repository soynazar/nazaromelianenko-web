const pageMap = {
    'teaching.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyança.html' },
    'ensenanza.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyança.html' },
    'ensenyança.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyança.html' }, // <--- AÑADIR ESTA
    
    'development.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html', ca: 'desenvolupament.html' },
    'desarrollo.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html', ca: 'desenvolupament.html' },
    'desenvolupament.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html', ca: 'desenvolupament.html' }, // <--- AÑADIR ESTA
    
    'contact.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    'contacto.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    'contacte.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' }, // <--- AÑADIR ESTA
    
    'about-me.html': { es: 'sobre-mi.html', ru: 'sobre-mi.html', en: 'about-me.html', ca: 'sobre-mi.html' },
    'sobre-mi.html': { es: 'sobre-mi.html', ru: 'sobre-mi.html', en: 'about-me.html', ca: 'sobre-mi.html' },
    'index.html': { es: 'index.html', ru: 'index.html', en: 'index.html', ca: 'index.html' }
};

const uiStrings = {
    es: { home: "Inicio", teaching: "Enseñanza", dev: "Desarrollo", about: "Sobre mí", contact: "Contacto" },
    en: { home: "Home", teaching: "Teaching", dev: "Development", about: "About me", contact: "Contact" },
    ru: { home: "Главная", teaching: "Обучение", dev: "Разработка",materials: "Материалы", about: "Обо мне", contact: "Контакт" },
    ca: { home: "Inici", teaching: "Ensenyança", dev: "Desenvolupament", about: "Sobre mi", contact: "Contacte" }
};
const initLanguageSwitch = () => {

   // ... dentro de initLanguageSwitch ...
const currentLang = pathParts[1] || 'es';
const currentPage = pathParts.pop() || 'index.html';

// BUSCAR EL LINK DE MATERIALES
const materialsLink = document.querySelector('.nav-link[data-key="materials"]');

// Solo intentamos cambiar el estilo si el link realmente existe en el DOM
if (materialsLink) {
    if (currentLang === 'ru') {
        materialsLink.style.display = 'inline-block';
    } else {
        materialsLink.style.display = 'none';
    }
}
    const langLinks = document.querySelectorAll('.lang-switch a');
    if (langLinks.length === 0) return;

    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const currentLang = pathParts[1] || 'es';
    const currentPage = pathParts.pop() || 'index.html';

    // 1. Traducir los textos del menú y corregir enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    const strings = uiStrings[currentLang];

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
