document.addEventListener("DOMContentLoaded", () => {

  const navToggleButton = document.getElementById("navToggle");
  const navbarMenu = document.getElementById("navbarMenu");

  if (navToggleButton && navbarMenu) {
    navToggleButton.addEventListener("click", () => {
      navbarMenu.classList.toggle("show");

      const isOpen = navbarMenu.classList.contains("show");
      navToggleButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.product || "Item";
      const productPrice = button.dataset.price || "";

      alert(`Added to cart: ${productName} ${productPrice}`.trim());
    });
  });

 
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});

