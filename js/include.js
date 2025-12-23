async function includeHTML() {
  const headerSlot = document.getElementById("header-slot");
  const footerSlot = document.getElementById("footer-slot");

  if (headerSlot) headerSlot.style.minHeight = "72px";

  // Usamos rutas absolutas con "/" al principio
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

  // IMPORTANTE: Avisar al switch de idioma que ya puede trabajar
  window.dispatchEvent(new Event('componentsLoaded'));

  document.documentElement.classList.remove("is-loading");
}

document.addEventListener("DOMContentLoaded", includeHTML);
