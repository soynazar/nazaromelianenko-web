/* =========================================
   LÓGICA DE IDIOMAS Y NAVEGACIÓN
   ========================================= */

// Mapa de traducciones de archivos
// NOTA: Usamos 'ensenyanca.html' (con n) para evitar errores de servidor con la 'ç'
const pageMap = {
    // Desde Enseñanza
    'teaching.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyanca.html' },
    'ensenanza.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyanca.html' },
    'ensenyanca.html': { es: 'ensenanza.html', ru: 'ensenanza.html', en: 'teaching.html', ca: 'ensenyanca.html' },
    
    // Desde Desarrollo
    'development.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html', ca: 'desenvolupament.html' },
    'desarrollo.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html', ca: 'desenvolupament.html' },
    'desenvolupament.html': { es: 'desarrollo.html', ru: 'desarrollo.html', en: 'development.html', ca: 'desenvolupament.html' },
    
    // Desde Contacto
    'contact.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    'contacto.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    'contacte.html': { es: 'contacto.html', ru: 'contacto.html', en: 'contact.html', ca: 'contacte.html' },
    
    // Desde Sobre Mí
    'about-me.html': { es: 'sobre-mi.html', ru: 'sobre-mi.html', en: 'about-me.html', ca: 'sobre-mi.html' },
    'sobre-mi.html': { es: 'sobre-mi.html', ru: 'sobre-mi.html', en: 'about-me.html', ca: 'sobre-mi.html' },
    
    // Desde Index y Materiales
    'index.html': { es: 'index.html', ru: 'index.html', en: 'index.html', ca: 'index.html' },
    'materiales.html': { es: 'index.html', ru: 'materiales.html', en: 'index.html', ca: 'index.html' }
};

// Textos de la interfaz (Menú)
const uiStrings = {
    es: { home: "Inicio", teaching: "Enseñanza", dev: "Desarrollo", about: "Sobre mí", contact: "Contacto", materials: "Materiales" },
    en: { home: "Home", teaching: "Teaching", dev: "Development", about: "About me", contact: "Contact", materials: "Materials" },
    ru: { home: "Главная", teaching: "Обучение", dev: "Разработка", about: "Обо мне", contact: "Контакт", materials: "Материалы" },
    ca: { home: "Inici", teaching: "Ensenyança", dev: "Desenvolupament", about: "Sobre mi", contact: "Contacte", materials: "Materials" }
};

const initLanguageSwitch = () => {
    const langLinks = document.querySelectorAll('.lang-switch a');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 1. Detectar idioma actual y página actual desde la URL
    const currentPath = window.location.pathname; // ej: /es/contacto.html
    const pathParts = currentPath.split('/').filter(Boolean); // ["es", "contacto.html"]
    
    // Si estamos en local o estructura simple, prevenir errores
    const currentLang = (pathParts.length > 0 && ['es', 'en', 'ru', 'ca'].includes(pathParts[0])) ? pathParts[0] : 'es';
    const currentPage = pathParts.length > 1 ? pathParts[1] : 'index.html';

    // 2. LÓGICA DE NEGOCIO: Mostrar "Materiales" SOLO en Ruso
    const materialsLink = document.querySelector('.nav-link[data-key="materials"]');
    if (materialsLink) {
        if (currentLang === 'ru') {
            materialsLink.style.display = 'inline-block'; // Visible en RU
        } else {
            materialsLink.style.display = 'none'; // Oculto en el resto
        }
    }

    // 3. Actualizar textos del menú y corregir enlaces
    const strings = uiStrings[currentLang] || uiStrings.es;
    
    navLinks.forEach(link => {
        // Traducir texto visible
        const key = link.getAttribute('data-key');
        if (key && strings[key]) {
            link.textContent = strings[key];
        }
        
        // Corregir href para apuntar al archivo correcto en el idioma actual
        const hrefOriginal = link.getAttribute('href'); 
        // hrefOriginal suele ser el nombre base en inglés o español según tu HTML base
        
        // Buscamos la traducción del archivo destino
        if (hrefOriginal) {
            // Normalizamos: si el link va a "teaching.html", buscamos cómo se llama eso en el idioma actual
            // Pero como hrefOriginal puede variar según dónde copiamos el HTML, usamos el data-key mejor si es navegación general
            // O buscamos en el pageMap las claves.
            
            // Estrategia simple: buscar la clave en el pageMap
            let targetFile = 'index.html';
            
            // Intentamos encontrar la entrada en el mapa
            if (pageMap[hrefOriginal]) {
                targetFile = pageMap[hrefOriginal][currentLang];
            }
            
            link.href = `/${currentLang}/${targetFile}`;

            // Marcar enlace activo (Active State)
            if (targetFile === currentPage || (currentPage === '' && targetFile === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });

    // 4. Configurar botones del selector de idioma
    langLinks.forEach(link => {
        const targetLang = link.getAttribute('data-lang');
        
        // Estado visual activo
        if (targetLang === currentLang) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Evento de clic
        // Clonamos el nodo para eliminar listeners anteriores y evitar duplicados
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);

        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Guardar preferencia del usuario
            localStorage.setItem("site_lang", targetLang);
            
            // Calcular página destino
            // Si estamos en 'sobre-mi.html' (ES) y vamos a EN -> 'about-me.html'
            let destinationPage = 'index.html';
            if (pageMap[currentPage]) {
                destinationPage = pageMap[currentPage][targetLang];
            }

            // Navegar
            window.location.href = `/${targetLang}/${destinationPage}`;
        });
    });
};

// Ejecutar cuando los componentes (header) se hayan cargado
window.addEventListener('componentsLoaded', initLanguageSwitch);
