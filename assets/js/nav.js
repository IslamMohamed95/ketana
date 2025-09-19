/* ========== NAV / login event functions ========== */
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

  /* --------- Breadcrumb Logic --------- */
  function updateBreadcrumb(pageName, productName = null) {
    const holder = document.getElementById("nav-details");
    if (!holder) return;

    holder.innerHTML = "";

    // Home link
    const homeLink = document.createElement("a");
    homeLink.textContent = "الرئيسية";
    homeLink.href = "index.html";
    homeLink.style.color = "rgba(185, 185, 185, 1)";
    homeLink.style.textDecoration = "none";
    holder.appendChild(homeLink);

    // Page name
    if (pageName !== "الرئيسية") {
      const slash = document.createElement("span");
      slash.textContent = " / ";
      slash.style.color = "rgba(185, 185, 185, 1)";
      holder.appendChild(slash);

      if (pageName === "المنتجات") {
        // ✅ Make "المنتجات" clickable
        const productsLink = document.createElement("a");
        productsLink.textContent = "المنتجات";
        productsLink.href = "products.html";
        productsLink.style.color = productName
          ? "rgba(185, 185, 185, 1)"
          : "rgba(239, 85, 93, 1)";
        productsLink.style.textDecoration = "none";
        holder.appendChild(productsLink);
      } else {
        // default non-clickable page name
        const current = document.createElement("span");
        current.textContent = pageName;
        current.style.color = productName
          ? "rgba(185, 185, 185, 1)"
          : "rgba(239, 85, 93, 1)";
        holder.appendChild(current);
      }
    }

    // Product name (if provided → always last → red)
    if (productName) {
      const slash = document.createElement("span");
      slash.textContent = " / ";
      slash.style.color = "rgba(185, 185, 185, 1)";
      holder.appendChild(slash);

      const productSpan = document.createElement("span");
      productSpan.textContent = productName;
      productSpan.style.color = "rgba(239, 85, 93, 1)";
      holder.appendChild(productSpan);
    }
  }
  window.updateBreadcrumb = updateBreadcrumb;

  /* --------- Popup Login --------- */
  const popContainer = document.getElementById("pop-up-container");
  const popNotification = document.getElementById("pop-log-notification");
  const needLogItems = sharedNav.querySelectorAll(".need-log");
  const popClose = document.getElementById("pop-close");
  const popCreate = document.getElementById("pop-create-account");
  const popLogin = document.getElementById("pop-login");
  const loginBtn = sharedNav.querySelector("#login-btn");

  const showPop = () => {
    popContainer?.classList.add("active");
    popNotification?.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const hidePop = () => {
    popContainer?.classList.remove("active");
    popNotification?.classList.remove("active");
    document.body.style.overflow = "";
  };
  const hideMobileNav = () => {
    if (mobNavContainer) mobNavContainer.style.transform = "translateX(103%)";
  };

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

  /* --------- Login Status Check + Tablet/Mobile nav setup --------- */
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const navContainer = sharedNav.querySelector("#nav-container");
    const accountSummary = sharedNav.querySelector("#account-summary");
    const logoIndex = sharedNav.querySelector("#logo-index");
    const tabletLoginImgView = sharedNav.querySelector(
      "#tablet-login-img-view"
    );
    const loginBtnLocal = sharedNav.querySelector("#login-btn");
    const mobileNavIcon = sharedNav.querySelector("#mobile-nav-icon");

    if (loginBtnLocal)
      loginBtnLocal.style.display = isLoggedIn ? "none" : "block";

    if (navContainer) {
      navContainer.style.display = isLoggedIn ? "flex" : "";
      navContainer.style.flexDirection = isLoggedIn ? "row-reverse" : "";
    }

    if (accountSummary)
      accountSummary.style.display = isLoggedIn ? "flex" : "none";
    if (logoIndex) logoIndex.style.display = isLoggedIn ? "none" : "flex";
    if (tabletLoginImgView)
      tabletLoginImgView.style.display = isLoggedIn ? "flex" : "none";

    if (mobNavContainer && logoIndex) {
      mobNavContainer.style.zIndex = isLoggedIn ? "9999" : "5";
      logoIndex.style.zIndex = isLoggedIn ? "1" : "9999";
    }

    // --- Mobile nav icon logic ---
    if (mobileNavIcon) {
      const screenWidth = window.innerWidth;
      if (isLoggedIn && screenWidth >= 768) {
        mobileNavIcon.style.display = "none";
      } else {
        mobileNavIcon.style.display = "";
      }
      mobileNavIcon.style.width = "auto";
    }

    /* Tablet nav */
    const tabletLis = sharedNav.querySelectorAll(".tablet-nav-el ul li");
    /* Mobile nav */
    const mobLis = mobNavContainer?.querySelectorAll("ul li") || [];

    function clearAllActive() {
      tabletLis.forEach((li) => {
        li.classList.remove("active", "tablet-active");
        li.style.color = "";
        li.textContent = li.textContent.replace(/^- /, "");
      });
      mobLis.forEach((li) => {
        li.classList.remove("active");
        li.style.color = "";
        li.textContent = li.textContent.replace(/^- /, "");
      });
    }

    function activateNav(pageName) {
      clearAllActive();

      // Tablet
      tabletLis.forEach((li) => {
        if (li.textContent.trim().includes(pageName)) {
          li.classList.add("active", "tablet-active");
          li.style.color = "red";
        }
      });

      // Mobile
      mobLis.forEach((li) => {
        if (li.textContent.trim().includes(pageName)) {
          li.classList.add("active");
          li.style.color = "red";
          li.textContent = `- ${li.textContent.replace(/^- /, "")}`;
        }
      });

      updateBreadcrumb(pageName);
    }

    function handleClick(li, pageName) {
      localStorage.setItem("activePage", pageName); // ✅ save clicked page
      activateNav(pageName);

      if (pageName.includes("الرئيسية")) window.location.href = "index.html";
      if (pageName.includes("من نحن")) window.location.href = "about.html";
      if (pageName.includes("المنتجات")) window.location.href = "products.html";
      if (pageName.includes("العروض")) window.location.href = "offer.html";
      if (pageName.includes("تواصل معنا"))
        window.location.href = "contact.html";
    }

    tabletLis.forEach((li) => {
      li.addEventListener("click", () => {
        const pageName = li.textContent.trim().replace(/^- /, "");
        handleClick(li, pageName);
      });
    });

    mobLis.forEach((li) => {
      li.addEventListener("click", () => {
        const pageName = li.textContent.trim().replace(/^- /, "");
        handleClick(li, pageName);
        hideMobileNav();
      });
    });

    // ✅ Restore active page from localStorage (or default to الرئيسية)
    const savedPage = localStorage.getItem("activePage") || "الرئيسية";
    activateNav(savedPage);
  }

  checkLoginStatus();
  window.addEventListener("resize", checkLoginStatus);

  // finalize nav visibility based on login
  updateNavByLoginStatus();
}

/* ========== Load nav.html dynamically and init nav ========== */
document.addEventListener("DOMContentLoaded", () => {
  const navPlaceholder = document.getElementById("shared-nav");

  if (navPlaceholder) {
    fetch("../../components/nav.html")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load nav.html");
        return res.text();
      })
      .then((html) => {
        navPlaceholder.innerHTML = html;
        try {
          initNavEvents();
        } catch (err) {
          console.error("initNavEvents error:", err);
        }

        const currentPage = window.location.pathname.split("/").pop();
        const map = {
          "index.html": "الرئيسية",
          "products.html": "المنتجات",
          "about.html": "من نحن",
          "contact.html": "تواصل معنا",
          "offer.html": "العروض",
        };
        if (map[currentPage] && typeof window.updateBreadcrumb === "function") {
          window.updateBreadcrumb(map[currentPage]);
        }
      })
      .catch((err) => {
        console.error("Error loading nav:", err);
      });
  } else {
    console.debug("No #shared-nav placeholder found");
  }
});
