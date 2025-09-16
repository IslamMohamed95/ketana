const submit_btn = document.getElementById("submit-btn"),
  formMobInput = document.querySelector(".form-mob-input");

document.addEventListener("DOMContentLoaded", () => {
  const navPlaceholder = document.getElementById("shared-nav");
  const footerPlaceholder = document.getElementById("footer-section");

  // ✅ Load navigation
  fetch("../../components/nav.html")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load nav.html");
      return res.text();
    })
    .then((html) => {
      navPlaceholder.innerHTML = html;
      initNavEvents(); // initialize nav logic after insertion
    })
    .catch((err) => console.error("Error loading nav:", err));

  // ✅ Load footer
  fetch("../../components/footer.html")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load footer.html");
      return res.text();
    })
    .then((html) => {
      footerPlaceholder.innerHTML = html;
    })
    .catch((err) => console.error("Error loading footer:", err));
});

/* ===========================
   INIT NAV & LOGIN EVENTS
   =========================== */
function initNavEvents() {
  const sharedNav = document.getElementById("shared-nav");
  if (!sharedNav) return;

  /* --------- Update Nav by Login Status --------- */
  function updateNavByLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const navList = sharedNav.querySelector("#nav-container ul");
    if (!navList) return;

    let liCount = 0;
    Array.from(navList.children).forEach((el) => {
      if (isLoggedIn) {
        el.style.display = "";
        return;
      }
      if (el.tagName.toLowerCase() === "li") {
        liCount++;
        el.style.display = liCount <= 2 ? "" : "none";
      } else if (el.tagName.toLowerCase() === "hr") {
        el.style.display = liCount === 1 ? "" : "none";
      }
    });
  }

  /* --------- Responsive / Mobile Nav --------- */
  const mobNavContainer = sharedNav.querySelector("#nav-mob-container");
  const mobNavIcon = sharedNav.querySelector(".nav-icon");
  const mobCloseIcon = sharedNav.querySelector(".fa-xmark");
  const navLogo = sharedNav.querySelector("#logo-index");

  if (mobNavContainer) {
    mobNavContainer.style.transform = "translateX(103%)";
    mobNavContainer.style.transition = "transform 0.3s ease";

    mobNavIcon?.addEventListener("click", (e) => {
      e.stopPropagation();
      mobNavContainer.style.transform = "translateX(0)";
    });

    mobCloseIcon?.addEventListener("click", (e) => {
      e.stopPropagation();
      mobNavContainer.style.transform = "translateX(103%)";
    });

    document.addEventListener("click", () => {
      mobNavContainer.style.transform = "translateX(103%)";
    });

    mobNavContainer.addEventListener("click", (e) => e.stopPropagation());
  }

  /* --------- Popup Login --------- */
  const popContainer = document.getElementById("pop-up-container");
  const popNotification = document.getElementById("pop-log-notification");
  const needLogItems = sharedNav.querySelectorAll(".need-log");
  const popClose = document.getElementById("pop-close");
  const popCreate = document.getElementById("pop-create-account");
  const popLogin = document.getElementById("pop-login");
  const loginBtn = sharedNav.querySelector("#login-btn");

  function showPop() {
    popContainer?.classList.add("active");
    popNotification?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function hidePop() {
    popContainer?.classList.remove("active");
    popNotification?.classList.remove("active");
    document.body.style.overflow = "";
  }

  function hideMobileNav() {
    if (mobNavContainer) {
      mobNavContainer.style.transform = "translateX(103%)";
    }
  }

  needLogItems.forEach((el) =>
    el.addEventListener("click", () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) hideMobileNav();
      else showPop();
    })
  );

  popClose?.addEventListener("click", hidePop);
  popCreate?.addEventListener(
    "click",
    () => (window.location.href = "register.html")
  );
  popLogin?.addEventListener(
    "click",
    () => (window.location.href = "login.html")
  );
  loginBtn?.addEventListener(
    "click",
    () => (window.location.href = "login.html")
  );
  popContainer?.addEventListener("click", (e) => {
    if (e.target === popContainer) hidePop();
  });

  /* --------- Login Status Check --------- */
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const navContainer = sharedNav.querySelector("#nav-container");
    const mobileNavIcon = sharedNav.querySelector("#mobile-nav-icon");
    const tabletLangContainer = sharedNav.querySelector(
      "#tablet-lang-container"
    );
    const accountSummary = sharedNav.querySelector("#account-summary");
    const logoIndex = sharedNav.querySelector("#logo-index");
    const tabletLoginImgView = sharedNav.querySelector(
      "#tablet-login-img-view"
    );
    const mobNavContainer = sharedNav.querySelector("#nav-mob-container");

    if (loginBtn) loginBtn.style.display = isLoggedIn ? "none" : "block";

    if (navContainer) {
      if (isLoggedIn) {
        navContainer.style.display = "flex";
        navContainer.style.flexDirection = "row-reverse"; // reverse order for logged-in users
      } else {
        navContainer.style.display = "";
        navContainer.style.flexDirection = ""; // reset to default
      }
    }

    if (accountSummary)
      accountSummary.style.display = isLoggedIn ? "flex" : "none";
    if (logoIndex) logoIndex.style.display = isLoggedIn ? "none" : "flex";
    if (tabletLoginImgView)
      tabletLoginImgView.style.display = isLoggedIn ? "flex" : "none";

    // ✅ Adjust z-index
    if (mobNavContainer && logoIndex) {
      if (isLoggedIn) {
        mobNavContainer.style.zIndex = "9999";
        logoIndex.style.zIndex = "1";
      } else {
        mobNavContainer.style.zIndex = "5";
        logoIndex.style.zIndex = "9999";
      }
    }

    // ✅ Show hamburger only on mobile (<768px), hide on tablet & desktop
    if (mobileNavIcon) {
      if (window.innerWidth < 768) {
        mobileNavIcon.style.display = "flex";
      } else {
        mobileNavIcon.style.display = "none";
      }
    }

    if (tabletLangContainer)
      tabletLangContainer.style.display = isLoggedIn ? "none" : "";

    /* ---- Tablet nav: highlight + click logic ---- */
    const tabletLis = sharedNav.querySelectorAll(".tablet-nav-el ul li");
    if (tabletLis.length > 0) {
      tabletLis.forEach((li) => {
        li.classList.remove("active", "tablet-active");
        li.style.color = "";
        li.textContent = li.textContent.replace(/^- /, "");
        li.addEventListener("click", () => {
          tabletLis.forEach((inner) => {
            inner.classList.remove("active", "tablet-active");
            inner.style.color = "";
            inner.textContent = inner.textContent.replace(/^- /, "");
          });
          li.classList.add("active", "tablet-active");
          li.style.color = "red";

          if (li.textContent.trim().includes("من نحن")) {
            window.location.href = "about.html";
          }
        });
      });
      tabletLis[0].classList.add("active", "tablet-active");
      tabletLis[0].style.color = "red";
    }

    /* ---- Mobile nav: highlight + click logic ---- */
    const mobLis = mobNavContainer?.querySelectorAll("ul li") || [];
    if (mobLis.length > 0) {
      mobLis.forEach((li) => {
        li.classList.remove("active");
        li.style.color = "";
        li.textContent = li.textContent.replace(/^- /, "");

        li.addEventListener("click", () => {
          mobLis.forEach((inner) => {
            inner.classList.remove("active");
            inner.style.color = "";
            inner.textContent = inner.textContent.replace(/^- /, "");
          });
          li.classList.add("active");
          li.style.color = "red";
          li.textContent = `- ${li.textContent}`;

          if (li.textContent.trim().includes("من نحن")) {
            window.location.href = "about.html";
          }

          hideMobileNav();
        });
      });
      mobLis[0].classList.add("active");
      mobLis[0].style.color = "red";
      mobLis[0].textContent = `- ${mobLis[0].textContent}`;
    }
  }

  checkLoginStatus();
  window.addEventListener("resize", checkLoginStatus);

  /* --------- Finally Update Nav --------- */
  updateNavByLoginStatus();
}

/* Insert Logo Component */
function insertLogo() {
  const logo = document.createElement("img");
  logo.src = "./assets/images/logo/logo.webp";
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
  if (!submit_btn) return;

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
