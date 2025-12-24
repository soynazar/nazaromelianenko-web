const initLanguageSwitch = () => {
    const langLinks = document.querySelectorAll('.lang-switch a');
    
    // Si no hay enlaces, el header aún no se ha inyectado; salimos
    if (langLinks.length === 0) return;

    const currentPath = window.location.pathname;
    const currentLang = currentPath.split('/')[1] || 'es';

    langLinks.forEach(link => {
        const targetLang = link.getAttribute('data-lang');
        
        // Marcar el idioma activo
        if (targetLang === currentLang) {
            link.classList.add('active');
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = currentPath.split('/').pop() || 'index.html';
            window.location.href = `/${targetLang}/${pageName}`;
        });
    });
};

// Escuchar el aviso de include.js para activarse
window.addEventListener('componentsLoaded', initLanguageSwitch);

// Por si acaso los componentes ya estaban cargados
if (document.getElementById('header-slot')?.innerHTML.trim() !== "") {
    initLanguageSwitch();
}
