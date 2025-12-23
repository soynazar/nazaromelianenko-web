async function includeHTML() {
  const headerSlot = document.getElementById("header-slot");
  const footerSlot = document.getElementById("footer-slot");

  // Reservar altura para que no “salte” el layout
  if (headerSlot) headerSlot.style.minHeight = "72px";

  const [headerRes, footerRes] = await Promise.all([
    fetch("/components/header.html", { cache: "no-store" }),
    fetch("/components/footer.html", { cache: "no-store" })
  ]);

  if (headerSlot && headerRes.ok) headerSlot.innerHTML = await headerRes.text();
  if (footerSlot && footerRes.ok) footerSlot.innerHTML = await footerRes.text();

  document.documentElement.classList.remove("is-loading");
}

