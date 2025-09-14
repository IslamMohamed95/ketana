const submit_btn = document.getElementById("submit-btn"),
  formMobInput = document.querySelector(".form-mob-input");

/* Insert Logo Component */
function insertLogo() {
  const logo = document.createElement("img");
  logo.src = "./assets/images/logo/logo.webp"; // your logo path
  logo.alt = "logoImg";

  const container = document.querySelector(".logo-section");
  if (container) container.appendChild(logo);
}
insertLogo();

/* Support Footer */
function supportFooter() {
  const footer = document.getElementById("support-footer");
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
}
supportFooter();

/* Page Location Check for Submit Button */
function checkPageLocation() {
  if (!submit_btn) return; // safeguard

  const currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "verfication.html") return;

  submit_btn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("loc", submit_btn.getAttribute("data-name"));
    sessionStorage.setItem("animatePin", "true");
    window.location.href = "/verfication.html";
  });
}
checkPageLocation();

function login() {}

// /* Insert the Nav */
// function addNav() {
//   const navContainer = document.getElementById("nav-container");
//   if (!navContainer) {
//     console.error("nav-container not found");
//     return;
//   }

//   const mainDiv = document.createElement("div");

//   // First child div with spans
//   const firstChildDiv = document.createElement("div");
//   const innerDiv = document.createElement("div");
//   const span1 = document.createElement("span");
//   const span2 = document.createElement("span");
//   innerDiv.appendChild(span1);
//   innerDiv.appendChild(span2);
//   firstChildDiv.appendChild(innerDiv);

//   // Second child div with icon and button
//   const secondChildDiv = document.createElement("div");
//   const icon = document.createElement("i");
//   icon.className = "fa-solid fa-caret-left";
//   const button = document.createElement("button");
//   button.textContent = "سجل دخول";
//   secondChildDiv.appendChild(icon);
//   secondChildDiv.appendChild(button);

//   mainDiv.appendChild(firstChildDiv);
//   mainDiv.appendChild(secondChildDiv);

//   // Logo image for nav
//   const img = document.createElement("img");
//   img.src = "./assets/images/logo/logo.webp"; // adjusted path
//   img.alt = "logoImg";

//   navContainer.appendChild(mainDiv);
//   navContainer.appendChild(img);
// }

// // Direct call
// addNav();
