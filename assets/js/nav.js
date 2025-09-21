/* ========== NAV / login event functions ========== */
function initNavEvents() {
  const sharedNav = document.getElementById("shared-nav");
  if (!sharedNav) return;

  /* --------- Cart Menu Logic --------- */
  const cartMenu = sharedNav.querySelector(".cart-menu");
  const cartIcon = sharedNav.querySelector(".user-cart");
  const cartCloseIcon = cartMenu?.querySelector(".fa-xmark");

  const mobNavContainer = sharedNav.querySelector("#nav-mob-container");
  const mobNavIcon = sharedNav.querySelector(".nav-icon");
  const mobCloseIcon = sharedNav.querySelector(".fa-xmark");

  if (cartMenu) {
    cartMenu.style.transform = "translateX(103%)";
    cartMenu.style.transition = "transform 0.3s ease";

    const closeCart = () => {
      cartMenu.style.transform = "translateX(103%)";
      document.body.style.overflow = "";
    };

    cartIcon?.addEventListener("click", (e) => {
      e.stopPropagation();
      cartMenu.style.transform = "translateX(0)";
      document.body.style.overflow = "hidden";
      if (mobNavContainer) mobNavContainer.style.transform = "translateX(103%)";
    });

    cartCloseIcon?.addEventListener("click", (e) => {
      e.stopPropagation();
      closeCart();
    });

    document.addEventListener("click", closeCart);
    cartMenu.addEventListener("click", (e) => e.stopPropagation());

    cartMenu.addEventListener("click", (e) => {
      if (e.target.classList.contains("view")) {
        if (typeof window.updateBreadcrumb === "function") {
          window.updateBreadcrumb("سلة المشتريات");
        }
        window.location.href = "cartView.html";
      }
      if (e.target.classList.contains("order")) {
        window.location.href = "order.html";
      }
    });
  }

  /* --------- Update Nav by Login Status --------- */
  const updateNavByLoginStatus = () => {
    const navList = sharedNav.querySelector("#nav-container ul");
    if (!navList) return;
    Array.from(navList.children).forEach((el) => (el.style.display = ""));
  };

  /* --------- Responsive / Mobile Nav --------- */
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
  const updateBreadcrumb = (pageName, productName = null) => {
    const holder = document.getElementById("nav-details");
    if (!holder) return;
    holder.innerHTML = "";

    const homeLink = document.createElement("a");
    homeLink.textContent = "الرئيسية";
    homeLink.href = "index.html";
    homeLink.style.color = "rgba(185, 185, 185, 1)";
    homeLink.style.textDecoration = "none";
    holder.appendChild(homeLink);

    if (pageName !== "الرئيسية") {
      const slash = document.createElement("span");
      slash.textContent = " / ";
      slash.style.color = "rgba(185, 185, 185, 1)";
      holder.appendChild(slash);

      if (pageName === "المنتجات") {
        const productsLink = document.createElement("a");
        productsLink.textContent = "المنتجات";
        productsLink.href = "products.html";
        productsLink.style.color = productName
          ? "rgba(185, 185, 185, 1)"
          : "rgba(239, 85, 93, 1)";
        productsLink.style.textDecoration = "none";
        holder.appendChild(productsLink);
      } else {
        const current = document.createElement("span");
        current.textContent = pageName;
        current.style.color = productName
          ? "rgba(185, 185, 185, 1)"
          : "rgba(239, 85, 93, 1)";
        holder.appendChild(current);
      }
    }

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
  };
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
  const checkLoginStatus = () => {
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
      navContainer.style.display = "flex";
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

    if (mobileNavIcon) {
      const screenWidth = window.innerWidth;
      mobileNavIcon.style.display =
        isLoggedIn && screenWidth >= 768 ? "none" : "";
      mobileNavIcon.style.width = "auto";
    }

    const tabletLis = sharedNav.querySelectorAll(".tablet-nav-el ul li");
    const mobLis = mobNavContainer?.querySelectorAll("ul li") || [];

    const clearAllActive = () => {
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
    };

    const activateNav = (pageName) => {
      clearAllActive();
      tabletLis.forEach((li) => {
        if (li.textContent.trim().includes(pageName)) {
          li.classList.add("active", "tablet-active");
          li.style.color = "red";
        }
      });
      mobLis.forEach((li) => {
        if (li.textContent.trim().includes(pageName)) {
          li.classList.add("active");
          li.style.color = "red";
          mobLis.forEach((li) => {
            li.textContent = `- ${li.textContent.replace(/^- /, "")}`;
          });
        }
      });
      updateBreadcrumb(pageName);
    };

    const handleClick = (li, pageName) => {
      localStorage.setItem("activePage", pageName);
      activateNav(pageName);
      const navMap = {
        الرئيسية: "index.html",
        "من نحن": "about.html",
        المنتجات: "products.html",
        العروض: "offer.html",
        "تواصل معنا": "contact.html",
        "متجر البيانات": "database.html",
        "سلة المشتريات": "cartView.html",
        "إتمام الطلب": "order.html",
      };
      if (navMap[pageName]) window.location.href = navMap[pageName];
    };

    tabletLis.forEach((li) =>
      li.addEventListener("click", () =>
        handleClick(li, li.textContent.trim().replace(/^- /, ""))
      )
    );
    mobLis.forEach((li) =>
      li.addEventListener("click", () => {
        handleClick(li, li.textContent.trim().replace(/^- /, ""));
        hideMobileNav();
      })
    );

    const savedPage = localStorage.getItem("activePage") || "الرئيسية";
    activateNav(savedPage);
  };

  checkLoginStatus();
  window.addEventListener("resize", checkLoginStatus);
  updateNavByLoginStatus();

  /* --------- Account Summary Toggle + Profile Logic --------- */
  const userImg = sharedNav.querySelector('img.hover[alt="userImg"]');
  const accountSummarySubNav = sharedNav.querySelector(
    ".account-summary-sub-nav"
  );
  const allowedProfileOps = ["profile-op", "edit-info", "change-password"];

  if (userImg && accountSummarySubNav) {
    userImg.addEventListener("click", (e) => {
      e.stopPropagation();
      accountSummarySubNav.classList.toggle("subNavActive");
    });

    document.addEventListener("click", () =>
      accountSummarySubNav.classList.remove("subNavActive")
    );

    accountSummarySubNav.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (!li) return;
      const matchedOp = Array.from(li.classList).find((cls) =>
        allowedProfileOps.includes(cls)
      );
      if (matchedOp) {
        localStorage.setItem("pendingProfileOp", matchedOp);
        window.location.href = "profile.html";
      }
      e.stopPropagation();
    });
  }
}

/* ========== Load nav.html dynamically and init nav ========== */
document.addEventListener("DOMContentLoaded", () => {
  const navPlaceholder = document.getElementById("shared-nav");
  if (!navPlaceholder) return;

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

      const orderPageBtn = document.getElementById("order");
      if (orderPageBtn)
        orderPageBtn.addEventListener(
          "click",
          () => (window.location.href = "order.html")
        );

      const currentPage = window.location.pathname.split("/").pop();
      const map = {
        "index.html": "الرئيسية",
        "products.html": "المنتجات",
        "about.html": "من نحن",
        "contact.html": "تواصل معنا",
        "offer.html": "العروض",
        "database.html": "متجر البيانات",
        "cartView.html": "سلة المشتريات",
        "order.html": "إتمام الطلب",
      };
      if (map[currentPage] && typeof window.updateBreadcrumb === "function") {
        window.updateBreadcrumb(map[currentPage]);
      }
    })
    .catch((err) => console.error("Error loading nav:", err));
});
