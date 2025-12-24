const initLanguageSwitch = () => {
    const langLinks = document.querySelectorAll('.lang-switch a');
    
    // Si no encuentra los enlaces en el HTML inyectado, sale para no dar error
    if (langLinks.length === 0) return;

    const currentPath = window.location.pathname;
    const currentLang = currentPath.split('/')[1] || 'es';

    langLinks.forEach(link => {
        const targetLang = link.getAttribute('data-lang');
        
        // Marca visualmente el idioma en el que estamos
        if (targetLang === currentLang) {
            link.classList.add('active');
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Mantiene al usuario en la misma página pero cambia la carpeta de idioma
            const pageName = currentPath.split('/').pop() || 'index.html';
            window.location.href = `/${targetLang}/${pageName}`;
        });
    });
};

// Se activa en cuanto include.js avisa que ha terminado
window.addEventListener('componentsLoaded', initLanguageSwitch);

// Comprobación de seguridad por si el script carga después de los componentes
if (document.getElementById('header-slot')?.innerHTML.trim() !== "") {
    initLanguageSwitch();
}
