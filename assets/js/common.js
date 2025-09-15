// Cache DOM references once
const submitBtn = document.getElementById("submit-btn");
const formMobInput = document.querySelector(".form-mob-input");
const logoSection = document.querySelector(".logo-section");
const footer = document.getElementById("support-footer");

/* Insert Logo Component */
(function insertLogo() {
  if (!logoSection) return;
  logoSection.insertAdjacentHTML(
    "beforeend",
    `<img src="./assets/images/logo/logo.webp" alt="logoImg" />`
  );
})();

/* Support Footer */
(function supportFooter() {
  if (!footer) return;
  footer.innerHTML = `
    <div><button>EN</button></div>
    <div>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12.75 8.10338C12.75 7.8441 ..." stroke="black" stroke-width="1.125"/>
        <path d="M5.25 8.10345C5.25 7.77705 ..." stroke="black" stroke-width="1.125"/>
        <path d="M3.75 6.75C3.75 4.26472 ..." stroke="black" stroke-width="1.125"/>
        <path d="M14.25 12.75V13.35 ..." stroke="black" stroke-width="1.125"/>
      </svg>
      <p class="contact">تواصل معنا</p>
    </div>
  `;
})();

/* Page Location Check for Submit Button */
(function checkPageLocation() {
  if (!submitBtn) return;

  const currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "verfication.html") return;

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("loc", submitBtn.dataset.name || "");
    sessionStorage.setItem("animatePin", "true");
    window.location.href = "/verfication.html";
  });
})();
