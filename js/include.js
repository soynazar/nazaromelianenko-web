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
