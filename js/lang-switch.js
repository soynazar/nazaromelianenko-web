document.addEventListener('DOMContentLoaded', () => {
    const langLinks = document.querySelectorAll('.lang-switch a');
    
    // Mapa de equivalencias entre archivos para evitar el error null/undefined
    const pageMap = {
        "index.html": "index.html",
        "sobre-mi.html": { "en": "about-me.html", "es": "sobre-mi.html", "ca": "sobre-mi.html", "ru": "sobre-mi.html" },
        "about-me.html": { "en": "about-me.html", "es": "sobre-mi.html", "ca": "sobre-mi.html", "ru": "sobre-mi.html" },
        "ensenanza.html": { "en": "teaching.html", "es": "ensenanza.html", "ca": "ensenyança.html", "ru": "ensenanza.html" },
        "teaching.html": { "en": "teaching.html", "es": "ensenanza.html", "ca": "ensenyança.html", "ru": "ensenanza.html" },
        "ensenyança.html": { "en": "teaching.html", "es": "ensenanza.html", "ca": "ensenyança.html", "ru": "ensenanza.html" },
        "desarrollo.html": { "en": "development.html", "es": "desarrollo.html", "ca": "desenvolupament.html", "ru": "desarrollo.html" },
        "development.html": { "en": "development.html", "es": "desarrollo.html", "ca": "desenvolupament.html", "ru": "desarrollo.html" },
        "desenvolupament.html": { "en": "development.html", "es": "desarrollo.html", "ca": "desenvolupament.html", "ru": "desarrollo.html" },
        "contacto.html": { "en": "contact.html", "es": "contacto.html", "ca": "contacte.html", "ru": "contacto.html" },
        "contact.html": { "en": "contact.html", "es": "contacto.html", "ca": "contacte.html", "ru": "contacto.html" },
        "contacte.html": { "en": "contact.html", "es": "contacto.html", "ca": "contacte.html", "ru": "contacto.html" }
    };

    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetLang = link.getAttribute('href').split('/')[1]; // Extrae es, en, ru o ca
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            
            let targetPage = "index.html";
            
            if (pageMap[currentPage]) {
                targetPage = typeof pageMap[currentPage] === 'string' 
                    ? pageMap[currentPage] 
                    : (pageMap[currentPage][targetLang] || "index.html");
            }

            // Redirección final sin nulls
            window.location.href = `/${targetLang}/${targetPage}`;
        });
    });
});
