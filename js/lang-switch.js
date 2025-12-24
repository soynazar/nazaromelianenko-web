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
async function includeHTML() {
  const headerSlot = document.getElementById("header-slot");
  const footerSlot = document.getElementById("footer-slot");

  // Usamos rutas absolutas para que funcione en cualquier subcarpeta
  const [headerRes, footerRes] = await Promise.all([
    fetch("/components/header.html", { cache: "no-store" }),
    fetch("/components/footer.html", { cache: "no-store" })
  ]);

  if (headerSlot && headerRes.ok) {
    headerSlot.innerHTML = await headerRes.text();
    console.log("Header inyectado correctamente"); // Esto te ayudará a ver si funciona en la consola
  }
  
  if (footerSlot && footerRes.ok) {
    footerSlot.innerHTML = await footerRes.text();
    console.log("Footer inyectado correctamente");
  }

  // Avisar al switch de idioma y quitar el estado de carga
  window.dispatchEvent(new Event('componentsLoaded'));
  document.documentElement.classList.remove("is-loading");
  document.body.classList.remove("is-loading");
}

document.addEventListener("DOMContentLoaded", includeHTML);
// Se activa en cuanto include.js avisa que ha terminado
window.addEventListener('componentsLoaded', initLanguageSwitch);

// Comprobación de seguridad por si el script carga después de los componentes
if (document.getElementById('header-slot')?.innerHTML.trim() !== "") {
    initLanguageSwitch();
}
