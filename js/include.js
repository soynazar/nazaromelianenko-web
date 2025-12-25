/* =============================================================
   CONFIGURACIÓN DE RUTAS (DICCIONARIO)
   Aquí definimos cómo se llama cada página en cada idioma
   ============================================================= */
const siteRoutes = {
    es: {
        home: 'index.html',
        teaching: 'ensenanza.html',
        dev: 'desarrollo.html',
        materials: 'materiales.html',
        about: 'sobre-mi.html',
        contact: 'contacto.html'
    },
    en: {
        home: 'index.html',
        teaching: 'teaching.html',
        dev: 'development.html',
        materials: 'materials.html',
        about: 'about-me.html',
        contact: 'contact.html'
    },
    ca: {
        home: 'index.html',
        teaching: 'ensenyanca.html',
        dev: 'desenvolupament.html',
        materials: 'materials.html',
        about: 'sobre-mi.html',
        contact: 'contacte.html'
    },
    ru: {
        home: 'index.html',
        teaching: 'ensenanza.html', // Asegúrate que estos nombres coincidan con tus archivos en /ru/
        dev: 'desarrollo.html',
        materials: 'materiales.html',
        about: 'sobre-mi.html',
        contact: 'contacto.html'
    }
};

/* =============================================================
   LÓGICA PRINCIPAL
   ============================================================= */

// 1. Detectar idioma actual basado en la URL
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('/es/')) return 'es';
    if (path.includes('/en/')) return 'en';
    if (path.includes('/ca/')) return 'ca';
    if (path.includes('/ru/')) return 'ru';
    return 'es'; // Idioma por defecto si estamos en la raíz
}

// 2. Encontrar qué página ("Key") estamos viendo actualmente
// Ejemplo: si estoy en "teaching.html" (en), la key es "teaching"
function getCurrentPageKey(currentLang) {
    const path = window.location.pathname;
    const currentFile = path.split("/").pop() || 'index.html'; // Si es carpeta raíz, asume index.html
    
    const routes = siteRoutes[currentLang];
    
    // Buscamos el nombre del archivo en el objeto del idioma actual
    for (const [key, file] of Object.entries(routes)) {
        if (file === currentFile) {
            return key;
        }
    }
    return 'home'; // Si no encuentra la página (ej: 404), manda al home
}

// 3. Inyectar HTML y Configurar Enlaces
async function includeHTML() {
    const headerSlot = document.getElementById("header-slot");
    const footerSlot = document.getElementById("footer-slot");
    const currentLang = getCurrentLanguage();

    try {
        // Cargar Header y Footer
        const [headerRes, footerRes] = await Promise.all([
            fetch("/components/header.html", { cache: "no-store" }),
            fetch("/components/footer.html", { cache: "no-store" })
        ]);

        // --- PROCESAR HEADER ---
        if (headerSlot && headerRes.ok) {
            headerSlot.innerHTML = await headerRes.text();
            
            // A) Configurar Menú de Navegación (Pone href correcto y clase active)
            const navLinks = headerSlot.querySelectorAll('.nav-link');
            const routes = siteRoutes[currentLang];
            const currentPageKey = getCurrentPageKey(currentLang);
            
            navLinks.forEach(link => {
                const key = link.dataset.key; 
                if (routes[key]) {
                    // Construye ruta: /es/ensenanza.html
                    link.href = `/${currentLang}/${routes[key]}`; 
                    
                    // Marcar activo
                    if(key === currentPageKey) {
                        link.classList.add('active');
                    }
                }
            });

            // B) Configurar Logo
            const logoLink = headerSlot.querySelector('#logo-link');
            if(logoLink) logoLink.href = `/${currentLang}/index.html`; 

            // C) Configurar Selector de Idioma (LA PARTE CRÍTICA)
            setupLanguageSwitcher(currentLang, currentPageKey);
        }
        
        // --- PROCESAR FOOTER ---
        if (footerSlot && footerRes.ok) {
            footerSlot.innerHTML = await footerRes.text();
        }

    } catch (err) {
        consol
