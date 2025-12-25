/* DICCIONARIO DE RUTAS: Para traducir los enlaces del menú automáticamente */
const siteRoutes = {
    es: {
        home: 'index.html',
        teaching: 'ensenanza.html',
        dev: 'desarrollo.html',
        materials: 'materiales.html', // Crea este archivo si no existe en ES
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
        teaching: 'ensenanza.html', // Ojo: Revisa si en la carpeta RU se llaman así
        dev: 'desarrollo.html',
        materials: 'materiales.html',
        about: 'sobre-mi.html',
        contact: 'contacto.html'
    }
};

function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('/es/')) return 'es';
    if (path.includes('/en/')) return 'en';
    if (path.includes('/ca/')) return 'ca';
    if (path.includes('/ru/')) return 'ru';
    return 'es'; // Idioma por defecto
}

async function includeHTML() {
    const headerSlot = document.getElementById("header-slot");
    const footerSlot = document.getElementById("footer-slot");
    const currentLang = getCurrentLanguage();

    try {
        // Cargar HTML
        const [headerRes, footerRes] = await Promise.all([
            fetch("/components/header.html", { cache: "no-store" }),
            fetch("/components/footer.html", { cache: "no-store" })
        ]);

        if (headerSlot && headerRes.ok) {
            headerSlot.innerHTML = await headerRes.text();
            
            // --- CORRECCIÓN DE ENLACES (MAGIA) ---
            const navLinks = headerSlot.querySelectorAll('.nav-link');
            const routes = siteRoutes[currentLang];
            
            navLinks.forEach(link => {
                const key = link.dataset.key; // lee data-key="teaching"
                if (routes[key]) {
                    link.href = routes[key]; // asigna "ensenanza.html"
                    
                    // Marcar activo si coincide con la URL actual
                    const currentFile = window.location.pathname.split("/").pop();
                    if(routes[key] === currentFile) {
                        link.classList.add('active');
                    }
                }
            });

            // Configurar Logo para que vaya al index del idioma actual
            const logoLink = headerSlot.querySelector('#logo-link');
            if(logoLink) logoLink.href = "index.html"; 
            
            // Configurar Switcher de Idiomas (lang-switch.js debería encargarse, 
            // pero esto asegura que los links se vean bien)
            const langLinks = headerSlot.querySelectorAll('.lang-switch a');
            langLinks.forEach(l => {
                if(l.dataset.lang === currentLang) l.classList.add('active');
            });
        }
        
        if (footerSlot && footerRes.ok) {
            footerSlot.innerHTML = await footerRes.text();
        }

    } catch (err) {
        console.error("Error cargando componentes:", err);
    } finally {
        document.documentElement.classList.remove("is-loading");
        document.body.classList.remove("is-loading");
    }
}

document.addEventListener("DOMContentLoaded", includeHTML);
