// Optimized + Fixed JavaScript (preserves original behaviour and transitions)
// Merged DOMContentLoaded handlers, cached selectors, kept original transition/order

document.addEventListener("DOMContentLoaded", () => {
  // --- Cached DOM selectors ---
  const body = document.body;

  // Pop-up / login
  const popContainer = document.getElementById("pop-up-container");
  const popNotification = document.getElementById("pop-log-notification");
  const needLogItems = document.querySelectorAll(".need-log");
  const popClose = document.getElementById("pop-close");
  const popCreate = document.getElementById("pop-create-account");
  const popLogin = document.getElementById("pop-login");
  const mobNavContainer = document.getElementById("nav-mob-container");
  const loginBtn = document.getElementById("login-btn");

  // Nav / header
  const navContainer = document.getElementById("nav-container");
  const mobileNavIcon = document.getElementById("mobile-nav-icon");
  const tabletLangContainer = document.getElementById("tablet-lang-container");
  const accountSummary = document.getElementById("account-summary");
  const logoIndex = document.getElementById("logo-index");
  const tabletLoginImgView = document.getElementById("tablet-login-img-view");
  const someElement = document.getElementById("some-element");

  // Search select controls
  const selectContainers = document.querySelectorAll(".select-container");

  // Services / pagination
  const servicesBrandContainer = document.querySelector(
    "#services-section .services-brand-container"
  );

  // Products
  const productContainer = document.getElementById("services-items-container");
  const paginationContainer = document.querySelector(".pagination-container");

  // --- Utility helpers ---
  const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";
  const lockBodyScroll = (lock) => (body.style.overflow = lock ? "hidden" : "");

  // --- Pop-up handlers ---
  function showPop() {
    if (!popContainer || !popNotification) return;
    popContainer.classList.add("active");
    popNotification.classList.add("active");
    lockBodyScroll(true);
  }

  function hidePop() {
    if (!popContainer || !popNotification) return;
    popContainer.classList.remove("active");
    popNotification.classList.remove("active");
    lockBodyScroll(false);
  }

  function hideMobileNav() {
    if (!mobNavContainer) return;
    // keep original animation method (inline transform + transition)
    mobNavContainer.style.transform = "translateX(100%)";
    mobNavContainer.style.transition = "transform 0.3s ease";
  }

  // Attach listeners to elements that require login
  if (needLogItems && needLogItems.length) {
    needLogItems.forEach((el) =>
      el.addEventListener("click", (e) => {
        const logged = isLoggedIn();
        if (logged) {
          // preserve original behaviour → hide mobile nav only
          hideMobileNav();
        } else {
          showPop();
        }
      })
    );
  }

  popClose && popClose.addEventListener("click", hidePop);
  popCreate &&
    popCreate.addEventListener(
      "click",
      () => (window.location.href = "register.html")
    );
  popLogin &&
    popLogin.addEventListener(
      "click",
      () => (window.location.href = "login.html")
    );
  loginBtn &&
    loginBtn.addEventListener(
      "click",
      () => (window.location.href = "login.html")
    );

  popContainer &&
    popContainer.addEventListener("click", (e) => {
      if (e.target === popContainer) hidePop();
    });

  // --- Header / Login status adjustments ---
  function checkLoginStatus() {
    const logged = isLoggedIn();
    const screenWidth = window.innerWidth;

    // Login button & nav adjustments
    if (loginBtn) loginBtn.style.display = logged ? "none" : "block";

    if (navContainer) {
      if (logged) {
        navContainer.style.display = "flex";
        navContainer.style.flexDirection = "row-reverse";
        navContainer.style.justifyContent = "space-between";
      } else {
        navContainer.style.display = ""; // reset
        navContainer.style.flexDirection = "";
        navContainer.style.justifyContent = "";
      }
    }

    // Mobile nav icon logic (preserve original width settings)
    if (mobileNavIcon) {
      if (screenWidth < 768) {
        mobileNavIcon.style.display = "flex";
        mobileNavIcon.style.width = "auto";
      } else {
        mobileNavIcon.style.display = logged ? "none" : "flex";
        mobileNavIcon.style.width = "auto";
      }
    }

    // Tablet language container
    if (tabletLangContainer) {
      tabletLangContainer.style.display =
        logged && screenWidth >= 768 ? "none" : "";
    }

    if (accountSummary) accountSummary.style.display = logged ? "flex" : "none";
    if (tabletLoginImgView)
      tabletLoginImgView.style.display = logged ? "block" : "none";
    if (logoIndex) logoIndex.style.display = logged ? "none" : "block";
    if (someElement) someElement.style.display = logged ? "none" : "flex";

    // Hide last 2 li + preceding <hr> in tablet nav if not logged in (preserve original guard)
    const tabletLis = document.querySelectorAll(".tablet-nav-el ul li");
    if (tabletLis.length > 2) {
      tabletLis.forEach((li, idx) => {
        const hr = li.previousElementSibling;
        if (!logged && idx >= tabletLis.length - 2) {
          li.style.display = "none";
          if (hr && hr.tagName.toLowerCase() === "hr")
            hr.style.display = "none";
        } else {
          li.style.display = "";
          if (hr && hr.tagName.toLowerCase() === "hr") hr.style.display = "";
        }
      });
    }
  }

  // run once initially
  checkLoginStatus();

  // debounce resize updates using rAF (keeps original behaviour but reduces calls)
  let rafResize = null;
  window.addEventListener("resize", () => {
    if (rafResize) cancelAnimationFrame(rafResize);
    rafResize = requestAnimationFrame(() => {
      checkLoginStatus();
    });
  });

  // --- Search form "select" controls ---
  function closeAllSelects(except = null) {
    selectContainers.forEach((container) => {
      if (container === except) return;
      const ul = container.querySelector("ul");
      const icon = container.querySelector(".form-icon-action");
      if (ul) {
        ul.style.maxHeight = "0";
        ul.style.opacity = "0";
      }
      container.classList.remove("active");
      if (icon) icon.style.transform = "rotate(0deg)";
    });
  }

  selectContainers.forEach((container) => {
    const inputWrapper = container.querySelector(".input-value");
    const ul = container.querySelector("ul");
    const icon = container.querySelector(".form-icon-action");

    if (ul) {
      ul.style.maxHeight = "0"; // collapsed initially (keeps CSS transition)
      ul.style.overflowY = "auto"; // allow vertical scroll
      ul.style.opacity = "0";
      ul.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
    }

    if (icon) icon.style.transition = "transform 0.3s ease";

    inputWrapper &&
      inputWrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!ul) return;

        if (container.classList.contains("active")) {
          // collapse
          ul.style.maxHeight = "0";
          ul.style.opacity = "0";
          container.classList.remove("active");
          if (icon) icon.style.transform = "rotate(0deg)";
        } else {
          // first close others (IMPORTANT: original order)
          closeAllSelects(container);

          // then open this one
          ul.style.maxHeight = "92px"; // fixed scrollable height
          ul.style.opacity = "1";
          container.classList.add("active");
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      });

    // clicking a <li>
    if (ul) {
      ul.querySelectorAll("li").forEach((li) => {
        li.addEventListener("click", () => {
          const input = container.querySelector("input");
          if (input) input.value = li.textContent;

          // collapse after selection
          ul.style.maxHeight = "0";
          ul.style.opacity = "0";
          container.classList.remove("active");
          if (icon) icon.style.transform = "rotate(0deg)";
        });
      });
    }
  });

  document.addEventListener("click", () => {
    closeAllSelects();
  });

  // --- Services pagination (brand list) ---
  if (servicesBrandContainer) {
    const ul = servicesBrandContainer.querySelector("ul");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("li"));
      if (items.length) {
        const categoryContainer = document.querySelector(
          ".service-category-container"
        );
        const factoryContainer = document.querySelector(
          ".service-factory-container"
        );

        const arrowSpans = Array.from(
          document.querySelectorAll(
            "#services-section .services-pagination-holder span"
          )
        );
        let arrowRight = null;
        let arrowLeft = null;

        arrowSpans.forEach((span) => {
          const icon = span.querySelector("i");
          if (!icon) return;
          if (icon.classList.contains("fa-chevron-left")) arrowRight = span;
          if (icon.classList.contains("fa-chevron-right")) arrowLeft = span;
        });

        if (!arrowRight && arrowSpans[0]) arrowRight = arrowSpans[0];
        if (!arrowLeft && arrowSpans[1]) arrowLeft = arrowSpans[1];

        let activeIndex = 0;

        function normalizeIndex(idx) {
          return ((idx % items.length) + items.length) % items.length;
        }

        function resetCategoryAndFactory() {
          if (categoryContainer) {
            categoryContainer.classList.remove("show");
            categoryContainer
              .querySelectorAll("li")
              .forEach((c) => c.classList.remove("active"));
          }
          if (factoryContainer) {
            factoryContainer.classList.remove("show");
            factoryContainer
              .querySelectorAll("li")
              .forEach((f) => f.classList.remove("active"));
          }
        }

        function setActive(index) {
          index = normalizeIndex(index);
          items.forEach((li, i) => li.classList.toggle("active", i === index));
          activeIndex = index;

          const activeItem = items[activeIndex];
          // center the active li inside the scroll container (original smooth behaviour)
          const containerRect = servicesBrandContainer.getBoundingClientRect();
          const itemRect = activeItem.getBoundingClientRect();
          const offset =
            itemRect.left -
            containerRect.left -
            (containerRect.width / 2 - itemRect.width / 2);

          servicesBrandContainer.scrollBy({ left: offset, behavior: "smooth" });

          if (activeItem.textContent.trim() !== "الكل") {
            if (categoryContainer) categoryContainer.classList.add("show");
          } else {
            resetCategoryAndFactory();
          }
        }

        // default
        setActive(0);

        // arrows
        if (arrowRight) {
          arrowRight.addEventListener("click", (e) => {
            e.preventDefault();
            setActive(activeIndex + 1);
          });
        }

        if (arrowLeft) {
          arrowLeft.addEventListener("click", (e) => {
            e.preventDefault();
            setActive(activeIndex - 1);
          });
        }

        // clicking brand items
        items.forEach((li, i) =>
          li.addEventListener("click", () => setActive(i))
        );

        // category -> factory
        if (categoryContainer) {
          const catItems = categoryContainer.querySelectorAll("li");
          catItems.forEach((li) => {
            li.addEventListener("click", () => {
              catItems.forEach((c) => c.classList.remove("active"));
              li.classList.add("active");
              if (factoryContainer) factoryContainer.classList.add("show");
            });
          });
        }

        // factory click
        if (factoryContainer) {
          const factItems = factoryContainer.querySelectorAll("li");
          factItems.forEach((li) => {
            li.addEventListener("click", () => {
              factItems.forEach((f) => f.classList.remove("active"));
              li.classList.add("active");
            });
          });
        }

        // keyboard support
        ul.setAttribute("tabindex", "0");
        ul.addEventListener("keydown", (e) => {
          if (e.key === "ArrowRight") setActive(activeIndex + 1);
          if (e.key === "ArrowLeft") setActive(activeIndex - 1);
        });
      }
    }
  }

  // --- Products rendering & pagination ---
  if (productContainer && paginationContainer) {
    const SAMPLE_IMG = "./assets/images/products/product.png";
    const FACTORY_IMG = "./assets/images/products/factory.png";

    let allProducts = [];
    let currentPage = 1;

    function getProductsPerPage() {
      const width = window.innerWidth;
      return width >= 1024 ? 9 : 10;
    }

    function randomNumber() {
      const randPart = () => Math.floor(10000 + Math.random() * 90000);
      return `${randPart()}-${randPart()}`;
    }

    function createProductObj() {
      const categories = ["اصلي", "تجاري"];
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      return {
        img: SAMPLE_IMG,
        detail: `تفاصيل المنتج ${Math.floor(Math.random() * 100)}`,
        number: randomNumber(),
        offer: Math.random() > 0.5,
        category,
        factoryImg: FACTORY_IMG,
        evaluation: (Math.random() * 5).toFixed(1),
      };
    }

    function renderStars(value) {
      const percent = (Math.max(0, Math.min(5, value)) / 5) * 100;
      return `\n      <div class="star-rating" style="position:relative; display:inline-block; width:14px; height:14px;">\n        <i class="fa-solid fa-star" style="position:absolute; top:0; left:0; color:#ccc;"></i>\n        <i class="fa-solid fa-star" style="position:absolute; top:0; left:0; color:#ff9426; clip-path:inset(0 ${
        100 - percent
      }% 0 0);"></i>\n      </div>\n    `;
    }

    function renderProduct(product) {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
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
        <p class="category-name">${product.category}</p>
      </div>
    </div>
    <div class="product-evaluation">
      <div class="factory">
        <img src="${product.factoryImg}" alt="factory-img">
        <p>ياباني</p>
      </div>
      <div class="eval">
        <span>${product.evaluation}</span>
        ${renderStars(product.evaluation)}
      </div>
    </div>

    <!-- Quantity Selector -->
    <div class="add-product collapsed">
      <i class="fa-solid fa-plus"></i>
      <input type="number" value="1" min="1" />
      <i class="fa-solid fa-minus"></i>
    </div>
  `;

      const catEl = productDiv.querySelector(".category-name");
      if (catEl) {
        catEl.style.background =
          product.category === "اصلي" ? "rgba(0, 53, 179, 1)" : "red";
        catEl.style.color = "#fff";
      }

      const addProduct = productDiv.querySelector(".add-product");
      const plusIcon = addProduct.querySelector(".fa-plus");
      const minusIcon = addProduct.querySelector(".fa-minus");
      const input = addProduct.querySelector("input");

      plusIcon.addEventListener("click", () => {
        if (addProduct.classList.contains("collapsed")) {
          addProduct.classList.remove("collapsed");
          addProduct.classList.add("expanded");
        } else {
          input.value = parseInt(input.value) + 1;
        }
      });

      minusIcon.addEventListener("click", () => {
        if (parseInt(input.value) > 1) {
          input.value = parseInt(input.value) - 1;
        } else {
          addProduct.classList.remove("expanded");
          addProduct.classList.add("collapsed");
        }
      });

      return productDiv;
    }

    function renderPage(page) {
      productContainer.innerHTML = "";
      const perPage = getProductsPerPage();
      const start = (page - 1) * perPage;
      const end = start + perPage;
      allProducts
        .slice(start, end)
        .forEach((p) => productContainer.appendChild(renderProduct(p)));
    }

    function renderPagination() {
      paginationContainer.innerHTML = "";
      const perPage = getProductsPerPage();
      const totalPages = Math.ceil(allProducts.length / perPage);

      const prevBtn = document.createElement("i");
      prevBtn.className = "fa-solid fa-chevron-right";
      prevBtn.style.cursor = currentPage === 1 ? "not-allowed" : "pointer";
      prevBtn.style.opacity = currentPage === 1 ? "0.5" : "1";
      prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage);
          renderPagination();
        }
      });
      paginationContainer.appendChild(prevBtn);

      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.textContent = i;
        li.style.transition = "color 0.3s ease";
        li.style.color = i === currentPage ? "red" : "black";
        li.style.background =
          i === currentPage ? "rgba(230, 44, 54, 0.1)" : "transparent";
        li.addEventListener("click", () => {
          currentPage = i;
          renderPage(currentPage);
          renderPagination();
        });
        paginationContainer.appendChild(li);
      }

      const nextBtn = document.createElement("i");
      nextBtn.className = "fa-solid fa-chevron-left";
      nextBtn.style.cursor =
        currentPage === totalPages ? "not-allowed" : "pointer";
      nextBtn.style.opacity = currentPage === totalPages ? "0.5" : "1";
      nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderPage(currentPage);
          renderPagination();
        }
      });
      paginationContainer.appendChild(nextBtn);
    }

    function generateProducts(count = 25) {
      allProducts = [];
      for (let i = 0; i < count; i++) allProducts.push(createProductObj());
      currentPage = 1;
      renderPage(currentPage);
      renderPagination();
    }

    window.addEventListener("resize", () => {
      // keep behaviour but reduce calls
      if (rafResize) cancelAnimationFrame(rafResize);
      rafResize = requestAnimationFrame(() => {
        renderPage(currentPage);
        renderPagination();
      });
    });

    generateProducts(25);
  }

  // End DOMContentLoaded
});
