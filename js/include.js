async function includeHTML() {
  const headerSlot = document.getElementById("header-slot");
  const footerSlot = document.getElementById("footer-slot");

  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch("/components/header.html", { cache: "no-store" }),
      fetch("/components/footer.html", { cache: "no-store" })
    ]);

    if (headerSlot && headerRes.ok) {
      headerSlot.innerHTML = await headerRes.text();
    }
    
    if (footerSlot && footerRes.ok) {
      footerSlot.innerHTML = await footerRes.text();
    }
  } catch (err) {
    console.error("Error cargando componentes:", err);
  } finally {
    // ESTO ES LO MÁS IMPORTANTE: 
    // Quita el estado de carga SIEMPRE, incluso si hay error, para que la página no sea invisible
    document.documentElement.classList.remove("is-loading");
    document.body.classList.remove("is-loading");
    window.dispatchEvent(new Event('componentsLoaded'));
  }
}

document.addEventListener("DOMContentLoaded", includeHTML);
