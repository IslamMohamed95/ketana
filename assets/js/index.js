document.addEventListener("DOMContentLoaded", () => {
  /* ====== NAVIGATION: Desktop + Mobile ====== */
  const navList = document.querySelector("#nav-container ul");
  const mobNavContainer = document.getElementById("nav-mob-container");
  const mobNavIcon = document.querySelector(".nav-icon");
  const mobCloseIcon = mobNavContainer?.querySelector(".fa-xmark");
  const navLogo = document.getElementById("logo-index");

  function updateNavByLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!navList) return;

    let liCount = 0;
    Array.from(navList.children).forEach((el) => {
      if (isLoggedIn) {
        el.style.display = "";
      } else if (el.tagName === "LI") {
        liCount++;
        el.style.display = liCount <= 2 ? "" : "none";
      } else if (el.tagName === "HR") {
        el.style.display = liCount === 1 ? "" : "none";
      }
    });
  }

  function handleResponsiveNav() {
    if (!mobNavContainer) return;

    mobNavContainer.style.transform = "translateX(103%)";
    mobNavContainer.style.transition = "transform 0.3s ease";

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (navLogo) {
      navLogo.style.zIndex = isLoggedIn ? "5" : "10";
    }
    mobNavContainer.style.zIndex = isLoggedIn ? "10" : "5";

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

    // Active LI logic (shared for mobile & tablet)
    const setActiveLi = (lis) => {
      if (lis.length > 0) {
        lis[0].classList.add("active");
        lis.forEach((li) =>
          li.addEventListener("click", () => {
            lis.forEach((l) => l.classList.remove("active"));
            li.classList.add("active");
          })
        );
      }
    };

    setActiveLi(mobNavContainer.querySelectorAll("ul li"));
    setActiveLi(document.querySelectorAll(".tablet-nav-el ul li"));
  }

  updateNavByLoginStatus();
  handleResponsiveNav();

  /* ====== POPUP: Login Required ====== */
  const popContainer = document.getElementById("pop-up-container");
  const popNotification = document.getElementById("pop-log-notification");
  const needLogItems = document.querySelectorAll(".need-log");
  const popClose = document.getElementById("pop-close");
  const popCreate = document.getElementById("pop-create-account");
  const popLogin = document.getElementById("pop-login");
  const loginBtn = document.getElementById("login-btn");

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
    if (mobNavContainer) mobNavContainer.style.transform = "translateX(100%)";
  };

  needLogItems.forEach((el) =>
    el.addEventListener("click", (e) => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        hideMobileNav();
      } else {
        showPop();
      }
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

  /* ====== NAV LOGIN STATUS ADJUSTMENTS ====== */
  const navContainer = document.getElementById("nav-container");
  const mobileNavIcon = document.getElementById("mobile-nav-icon");
  const tabletLangContainer = document.getElementById("tablet-lang-container");
  const accountSummary = document.getElementById("account-summary");
  const tabletLoginImgView = document.getElementById("tablet-login-img-view");
  const someElement = document.getElementById("some-element");

  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const screenWidth = window.innerWidth;

    loginBtn && (loginBtn.style.display = isLoggedIn ? "none" : "block");

    if (navContainer) {
      navContainer.style.display = isLoggedIn ? "flex" : "";
      if (isLoggedIn) {
        navContainer.style.flexDirection = "row-reverse";
        navContainer.style.justifyContent = "space-between";
      }
    }

    if (mobileNavIcon) {
      if (screenWidth < 768) {
        mobileNavIcon.style.display = "flex";
        mobileNavIcon.style.width = "auto";
      } else {
        mobileNavIcon.style.display = isLoggedIn ? "none" : "flex";
      }
    }

    tabletLangContainer &&
      (tabletLangContainer.style.display =
        isLoggedIn && screenWidth >= 768 ? "none" : "");

    accountSummary &&
      (accountSummary.style.display = isLoggedIn ? "flex" : "none");

    if (tabletLoginImgView)
      tabletLoginImgView.style.display = isLoggedIn ? "block" : "none";
    if (navLogo) navLogo.style.display = isLoggedIn ? "none" : "block";
    if (someElement) someElement.style.display = isLoggedIn ? "none" : "flex";
  }

  checkLoginStatus();
  window.addEventListener("resize", checkLoginStatus);

  /* ====== SELECT FORM (Dropdowns) ====== */
  const selectContainers = document.querySelectorAll(".select-container");

  function closeAll(except = null) {
    selectContainers.forEach((container) => {
      if (container === except) return;
      const ul = container.querySelector("ul");
      const icon = container.querySelector(".form-icon-action");
      ul && (ul.style.maxHeight = ul.style.opacity = "0");
      container.classList.remove("active");
      icon && (icon.style.transform = "rotate(0deg)");
    });
  }

  selectContainers.forEach((container) => {
    const inputWrapper = container.querySelector(".input-value");
    const ul = container.querySelector("ul");
    const icon = container.querySelector(".form-icon-action");

    if (ul) {
      ul.style.maxHeight = "0";
      ul.style.opacity = "0";
      ul.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
      ul.style.overflowY = "auto";
    }

    inputWrapper?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!ul) return;
      if (container.classList.contains("active")) {
        closeAll();
      } else {
        closeAll(container);
        ul.style.maxHeight = "92px";
        ul.style.opacity = "1";
        container.classList.add("active");
        icon && (icon.style.transform = "rotate(180deg)");
      }
    });

    ul?.querySelectorAll("li").forEach((li) =>
      li.addEventListener("click", () => {
        const input = container.querySelector("input");
        if (input) input.value = li.textContent;
        closeAll();
      })
    );
  });

  document.addEventListener("click", () => closeAll());

  /* ====== PAGINATION & PRODUCTS ====== */
  const productContainer = document.getElementById("services-items-container");
  const paginationContainer = document.querySelector(".pagination-container");
  const SAMPLE_IMG = "./assets/images/products/product.png";
  const FACTORY_IMG = "./assets/images/products/factory.png";

  let allProducts = [];
  let currentPage = 1;

  const getProductsPerPage = () => (window.innerWidth >= 1024 ? 9 : 10);

  const randomNumber = () =>
    `${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;

  const createProductObj = () => {
    const categories = ["اصلي", "تجاري"];
    const category = categories[Math.floor(Math.random() * categories.length)];
    return {
      img: SAMPLE_IMG,
      detail: `تفاصيل المنتج ${Math.floor(Math.random() * 100)}`,
      number: randomNumber(),
      offer: Math.random() > 0.5,
      category,
      factoryImg: FACTORY_IMG,
      evaluation: (Math.random() * 5).toFixed(1),
    };
  };

  const renderStars = (value) => {
    const percent = (Math.max(0, Math.min(5, value)) / 5) * 100;
    return `
      <div class="star-rating" style="position:relative;width:14px;height:14px;">
        <i class="fa-solid fa-star" style="color:#ccc;position:absolute;top:0;left:0;"></i>
        <i class="fa-solid fa-star" style="color:#ff9426;position:absolute;top:0;left:0;clip-path:inset(0 ${
          100 - percent
        }% 0 0);"></i>
      </div>
    `;
  };

  const renderProduct = (product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div class="product-details-container">
        <div class="product-details">
          <img src="${product.img}" alt="p-Img">
          <div class="details">
            <h4>${product.detail}</h4>
            <span>${product.number}</span>
          </div>
        </div>
        <div class="category-type">
          ${product.offer ? `<p class="offer">عرض</p>` : ""}
          <p class="category-name" style="background:${
            product.category === "اصلي" ? "rgba(0, 53, 179, 1)" : "red"
          };color:#fff;">${product.category}</p>
        </div>
      </div>
      <div class="product-evaluation">
        <div class="factory">
          <img src="${product.factoryImg}" alt="factory-img"><p>ياباني</p>
        </div>
        <div class="eval">
          <span>${product.evaluation}</span>${renderStars(product.evaluation)}
        </div>
      </div>
    `;
    return div;
  };

  const renderPage = (page) => {
    productContainer.innerHTML = "";
    const perPage = getProductsPerPage();
    allProducts
      .slice((page - 1) * perPage, page * perPage)
      .forEach((p) => productContainer.appendChild(renderProduct(p)));
  };

  const updatePagination = () => {
    paginationContainer.innerHTML = "";
    const perPage = getProductsPerPage();
    const totalPages = Math.ceil(allProducts.length / perPage);

    const createBtn = (icon, disabled, onClick) => {
      const btn = document.createElement("i");
      btn.className = `fa-solid fa-chevron-${icon}`;
      btn.style.cursor = disabled ? "not-allowed" : "pointer";
      btn.style.opacity = disabled ? "0.5" : "1";
      !disabled && btn.addEventListener("click", onClick);
      return btn;
    };

    paginationContainer.appendChild(
      createBtn("right", currentPage === 1, () => {
        currentPage--;
        renderPage(currentPage);
        updatePagination();
      })
    );

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.textContent = i;
      li.style.color = i === currentPage ? "red" : "black";
      li.style.background =
        i === currentPage ? "rgba(230, 44, 54, 0.1)" : "transparent";
      li.addEventListener("click", () => {
        currentPage = i;
        renderPage(currentPage);
        updatePagination();
      });
      paginationContainer.appendChild(li);
    }

    paginationContainer.appendChild(
      createBtn("left", currentPage === totalPages, () => {
        currentPage++;
        renderPage(currentPage);
        updatePagination();
      })
    );
  };

  const generateProducts = (count = 25) => {
    allProducts = Array.from({ length: count }, createProductObj);
    currentPage = 1;
    renderPage(currentPage);
    updatePagination();
  };

  window.addEventListener("resize", () => {
    renderPage(currentPage);
    updatePagination();
  });

  generateProducts(25);
});
