/* =========================================
   LÓGICA DE IDIOMAS Y NAVEGACIÓN
   ========================================= */

const pageMap = {
    'teaching.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyanca.html' },
    'ensenanza.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyanca.html' },
    'ensenyanca.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyanca.html' },
    
    'contact.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    'contacto.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    'contacte.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    
    'about-me.html': { es: 'sobre-mi.html', ru: 'sobre-mi.html', en: 'about-me.html', ca: 'sobre-mi.html' },
    'sobre-mi.html': { es: 'sobre-mi.html', ru: 'sobre-mi.html', en: 'about-me.html', ca: 'sobre-mi.html' },
    
    'index.html': { es: 'index.html', ru: 'index.html', en: 'index.html', ca: 'index.html' },
    'materiales.html': { es: 'index.html', ru: 'materiales.html', en: 'index.html', ca: 'index.html' },
    
    // Libro «По ту сторону правил» (solo existe en ruso)
    'book.html': { es: 'index.html', ru: 'book.html', en: 'index.html', ca: 'index.html' },
    'kniga.html': { es: 'index.html', ru: 'book.html', en: 'index.html', ca: 'index.html' }
};

const uiStrings = {
    es: { home: "Inicio", teaching: "Enseñanza", about: "Sobre mí", contact: "Contacto", materials: "Materiales", book: "Libro" },
    en: { home: "Home",   teaching: "Teaching",  about: "About me", contact: "Contact",  materials: "Materials", book: "Book" },
    ru: { home: "Главная", teaching: "Обучение", about: "Обо мне", contact: "Контакт",  materials: "Материалы", book: "Книга" },
    ca: { home: "Inici",  teaching: "Ensenyança",about: "Sobre mi", contact: "Contacte", materials: "Materials", book: "Llibre" }
};

const initLanguageSwitch = () => {
    const langLinks = document.querySelectorAll('.lang-switch a');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const currentPath = window.location.pathname; 
    const pathParts = currentPath.split('/').filter(Boolean); 
    
    const currentLang = (pathParts.length > 0 && ['es', 'en', 'ru', 'ca'].includes(pathParts[0])) ? pathParts[0] : 'es';
    const currentPage = pathParts.length > 1 ? pathParts[1] : 'index.html';

    document.querySelectorAll('.nav-link[data-key="materials"], .nav-link[data-key="book"]').forEach(link => {
        link.style.display = (currentLang === 'ru') ? 'inline-block' : 'none';
    });

    const strings = uiStrings[currentLang] || uiStrings.es;
    
    navLinks.forEach(link => {
        const key = link.getAttribute('data-key');
        if (key && strings[key]) {
            link.textContent = strings[key];
        }
        
        const hrefOriginal = link.getAttribute('href'); 
        
        if (hrefOriginal) {
            let targetFile = 'index.html';
            
            if (pageMap[hrefOriginal]) {
                targetFile = pageMap[hrefOriginal][currentLang];
            }
            
            // Si el enlace está desactivado (href="#"), no lo reescribimos
            if (hrefOriginal !== '#') {
                link.href = `/${currentLang}/${targetFile}`;
            }

            if (targetFile === currentPage || (currentPage === '' && targetFile === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });

    langLinks.forEach(link => {
        const targetLang = link.getAttribute('data-lang');
        
        if (targetLang === currentLang) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);

        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem("site_lang", targetLang);
            let destinationPage = 'index.html';
            if (pageMap[currentPage]) {
                destinationPage = pageMap[currentPage][targetLang];
            }
            window.location.href = `/${targetLang}/${destinationPage}`;
        });
    });
};

window.addEventListener('componentsLoaded', initLanguageSwitch);
