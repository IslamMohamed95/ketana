function updateNavByLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navList = document.querySelector("#nav-container ul");
  if (!navList) return;

  const children = Array.from(navList.children); // <li> and <hr> mixed
  let liCount = 0;

  children.forEach((el) => {
    if (isLoggedIn) {
      // Show everything if logged in
      el.style.display = "";
      return;
    }

    if (el.tagName.toLowerCase() === "li") {
      liCount++;
      // Show only the first 2 li
      el.style.display = liCount <= 2 ? "" : "none";
    } else if (el.tagName.toLowerCase() === "hr") {
      // Show only the hr **between first 2 li**
      if (liCount === 1) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    }
  });
}

// Run after DOM is loaded
function handleResponsiveNav() {
  const mobNavContainer = document.getElementById("nav-mob-container");
  const mobNavIcon = document.querySelector(".nav-icon");
  const mobCloseIcon = mobNavContainer.querySelector(".fa-xmark");
  const navLogo = document.getElementById("logo-index"); // updated to your logo ID

  // Ensure nav is hidden initially
  mobNavContainer.style.transform = "translateX(103%)";
  mobNavContainer.style.transition = "transform 0.3s ease";

  // Adjust z-index based on login status
  if (localStorage.getItem("isLoggedIn") === "true") {
    navLogo.style.zIndex = "5"; // bring logo above mobile nav
    mobNavContainer.style.zIndex = "10"; // mobile nav under logo
  } else {
    navLogo.style.zIndex = "10"; // reset
    mobNavContainer.style.zIndex = "5"; // reset
  }

  // Open mobile nav
  if (mobNavIcon) {
    mobNavIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent document click from closing
      mobNavContainer.style.transform = "translateX(0)";
    });
  }

  // Close mobile nav via close icon
  if (mobCloseIcon) {
    mobCloseIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      mobNavContainer.style.transform = "translateX(103%)";
    });
  }

  // Close mobile nav when clicking outside
  document.addEventListener("click", () => {
    mobNavContainer.style.transform = "translateX(103%)";
  });

  // Prevent clicks inside nav from closing
  mobNavContainer.addEventListener("click", (e) => e.stopPropagation());

  // Mobile li active logic
  const mobLis = mobNavContainer.querySelectorAll("ul li");
  if (mobLis.length > 0) {
    mobLis[0].classList.add("active");
    mobLis.forEach((li) => {
      li.addEventListener("click", () => {
        mobLis.forEach((l) => l.classList.remove("active"));
        li.classList.add("active");
      });
    });
  }

  // Tablet / Desktop li active logic
  const tabletLis = document.querySelectorAll(".tablet-nav-el ul li");
  if (tabletLis.length > 0) {
    tabletLis[0].classList.add("active");
    tabletLis.forEach((li) => {
      li.addEventListener("click", () => {
        tabletLis.forEach((l) => l.classList.remove("active"));
        li.classList.add("active");
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", handleResponsiveNav);

//Handle Pop-Up Login Notification
document.addEventListener("DOMContentLoaded", () => {
  const popContainer = document.getElementById("pop-up-container");
  const popNotification = document.getElementById("pop-log-notification");
  const needLogItems = document.querySelectorAll(".need-log");
  const popClose = document.getElementById("pop-close");
  const popCreate = document.getElementById("pop-create-account");
  const popLogin = document.getElementById("pop-login");
  const mobNavContainer = document.getElementById("nav-mob-container");
  const loginBtn = document.getElementById("login-btn");

  // Show pop-up
  function showPop() {
    popContainer.classList.add("active");
    popNotification.classList.add("active");
    document.body.style.overflow = "hidden"; // prevent background scroll
  }

  // Hide pop-up
  function hidePop() {
    popContainer.classList.remove("active");
    popNotification.classList.remove("active");
    document.body.style.overflow = ""; // restore scroll
  }

  // Hide mobile nav
  function hideMobileNav() {
    if (mobNavContainer) {
      mobNavContainer.style.transform = "translateX(100%)";
      mobNavContainer.style.transition = "transform 0.3s ease";
    }
  }

  // Show popup when clicking elements that require login
  needLogItems.forEach((el) =>
    el.addEventListener("click", (e) => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        // User is logged in → do nothing but hide mobile nav
        hideMobileNav();
      } else {
        // User not logged in → show popup
        showPop();
      }
    })
  );

  // Close popup when clicking X
  popClose.addEventListener("click", hidePop);

  // Navigate to register page on "Create Account"
  popCreate.addEventListener("click", () => {
    window.location.href = "register.html";
  });

  // Navigate to login page on "Login"
  popLogin.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  // Navigate directly to login.html when clicking login-btn
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  // Close popup if clicking outside the notification
  popContainer.addEventListener("click", (e) => {
    if (e.target === popContainer) hidePop();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const navContainer = document.getElementById("nav-container");
  const mobileNavIcon = document.getElementById("mobile-nav-icon");
  const tabletLangContainer = document.getElementById("tablet-lang-container");
  const accountSummary = document.getElementById("account-summary");
  const logoIndex = document.getElementById("logo-index");
  const tabletLoginImgView = document.getElementById("tablet-login-img-view");
  const someElement = document.getElementById("some-element"); // Make sure this exists

  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const screenWidth = window.innerWidth;

    // Login button & nav adjustments
    if (isLoggedIn) {
      if (loginBtn) loginBtn.style.display = "none";

      if (navContainer) {
        navContainer.style.display = "flex";
        navContainer.style.flexDirection = "row-reverse";
        navContainer.style.justifyContent = "space-between";
      }
    } else {
      if (loginBtn) loginBtn.style.display = "block";
      if (navContainer) navContainer.style.display = ""; // reset default
    }

    // Mobile nav icon logic
    if (mobileNavIcon) {
      if (screenWidth < 768) {
        mobileNavIcon.style.display = "flex"; // always show on mobile
        mobileNavIcon.style.width = "auto"; // force auto width
      } else {
        if (isLoggedIn) {
          mobileNavIcon.style.display = "none";
        } else {
          mobileNavIcon.style.display = "flex";
          mobileNavIcon.style.width = "auto"; // auto width on tablet+
        }
      }
    }

    // Tablet language container
    if (tabletLangContainer) {
      tabletLangContainer.style.display =
        isLoggedIn && screenWidth >= 768 ? "none" : "";
    }

    // Account summary
    if (accountSummary) {
      accountSummary.style.display = isLoggedIn ? "flex" : "none";
    }

    // Logo swap
    if (tabletLoginImgView)
      tabletLoginImgView.style.display = isLoggedIn ? "block" : "none";
    if (logoIndex) logoIndex.style.display = isLoggedIn ? "none" : "block";

    // Some element toggle
    if (someElement) someElement.style.display = isLoggedIn ? "none" : "flex";

    // ✅ Hide last 2 li + <hr> before them in tablet nav if not logged in
    const tabletLis = document.querySelectorAll(".tablet-nav-el ul li");
    if (tabletLis.length > 2) {
      tabletLis.forEach((li, idx) => {
        const hr = li.previousElementSibling;
        if (!isLoggedIn && idx >= tabletLis.length - 2) {
          li.style.display = "none";
          if (hr && hr.tagName.toLowerCase() === "hr") {
            hr.style.display = "none";
          }
        } else {
          li.style.display = "";
          if (hr && hr.tagName.toLowerCase() === "hr") {
            hr.style.display = "";
          }
        }
      });
    }
  }

  // Initial check
  checkLoginStatus();

  // Update dynamically on resize
  window.addEventListener("resize", checkLoginStatus);
});

//Handle Search Form
document.addEventListener("DOMContentLoaded", () => {
  const selectContainers = document.querySelectorAll(".select-container");

  function closeAll(except = null) {
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
      ul.style.maxHeight = "0";
      ul.style.overflowY = "auto"; // allow vertical scroll
      ul.style.opacity = "0";
      ul.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
    }

    if (icon) icon.style.transition = "transform 0.3s ease";

    inputWrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!ul) return;

      if (container.classList.contains("active")) {
        ul.style.maxHeight = "0";
        ul.style.opacity = "0";
        container.classList.remove("active");
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        closeAll(container);
        ul.style.maxHeight = "92px"; // fixed scrollable height
        ul.style.opacity = "1";
        container.classList.add("active");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });

    if (ul) {
      ul.querySelectorAll("li").forEach((li) => {
        li.addEventListener("click", () => {
          const input = container.querySelector("input");
          if (input) input.value = li.textContent;

          ul.style.maxHeight = "0";
          ul.style.opacity = "0";
          container.classList.remove("active");
          if (icon) icon.style.transform = "rotate(0deg)";
        });
      });
    }
  });

  document.addEventListener("click", () => {
    closeAll();
  });
});

//Handle Pagination Process
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(
    "#services-section .services-brand-container"
  );
  if (!container) return;

  const ul = container.querySelector("ul");
  if (!ul) return;

  const items = Array.from(ul.querySelectorAll("li"));
  if (!items.length) return;

  // Second and third containers
  const categoryContainer = document.querySelector(
    ".service-category-container"
  );
  const factoryContainer = document.querySelector(".service-factory-container");

  // Find the two arrow spans (by icon class)
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

  // fallback: if icons not found, assume order
  if (!arrowRight && arrowSpans[0]) arrowRight = arrowSpans[0];
  if (!arrowLeft && arrowSpans[1]) arrowLeft = arrowSpans[1];

  let activeIndex = 0;

  function normalizeIndex(idx) {
    return ((idx % items.length) + items.length) % items.length;
  }

  // manual scroll centering function
  function scrollToItem(item) {
    const containerWidth = container.clientWidth;
    const itemLeft = item.offsetLeft;
    const itemWidth = item.offsetWidth;

    let target = itemLeft - (containerWidth - itemWidth) / 2;

    const maxScroll = container.scrollWidth - containerWidth;
    if (target < 0) target = 0;
    if (target > maxScroll) target = maxScroll;

    container.scrollTo({
      left: target,
      behavior: "smooth",
    });
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

    // Center the active li inside the scroll container
    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const offset =
      itemRect.left -
      containerRect.left -
      (containerRect.width / 2 - itemRect.width / 2);

    container.scrollBy({ left: offset, behavior: "smooth" });

    // === NEW LOGIC for showing/hiding containers ===
    if (activeItem.textContent.trim() !== "الكل") {
      if (categoryContainer) categoryContainer.classList.add("show");
    } else {
      resetCategoryAndFactory(); // hide + reset everything
    }
  }

  // Default: first li active
  setActive(0);

  // Arrow handlers (wrap-around)
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

  // Click on <li> in brand list
  items.forEach((li, i) => {
    li.addEventListener("click", () => setActive(i));
  });

  // === Handle category clicks (show factory container) ===
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

  // === Handle factory clicks (just apply active class) ===
  if (factoryContainer) {
    const factItems = factoryContainer.querySelectorAll("li");
    factItems.forEach((li) => {
      li.addEventListener("click", () => {
        factItems.forEach((f) => f.classList.remove("active"));
        li.classList.add("active");
      });
    });
  }

  // Optional: keyboard support
  ul.setAttribute("tabindex", "0");
  ul.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") setActive(activeIndex + 1);
    if (e.key === "ArrowLeft") setActive(activeIndex - 1);
  });
});

//Handle rendering the products
document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("services-items-container");
  const paginationContainer = document.querySelector(".pagination-container");

  const SAMPLE_IMG = "./assets/images/products/product.png";
  const FACTORY_IMG = "./assets/images/products/factory.png";

  let allProducts = [];
  let currentPage = 1;

  function getProductsPerPage() {
    const width = window.innerWidth;
    if (width >= 1024) return 9; // Desktop: 9 products
    return 10; // Mobile & Tablet: 10 products
  }

  function randomNumber() {
    const randPart = () => Math.floor(10000 + Math.random() * 90000);
    return `${randPart()}-${randPart()}`;
  }

  function createProductObj() {
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
  }

  function renderStars(value) {
    const percent = (Math.max(0, Math.min(5, value)) / 5) * 100;
    return `
      <div class="star-rating" style="position:relative; display:inline-block; width:14px; height:14px;">
        <i class="fa-solid fa-star" style="position:absolute; top:0; left:0; color:#ccc;"></i>
        <i class="fa-solid fa-star" style="position:absolute; top:0; left:0; color:#ff9426; clip-path:inset(0 ${
          100 - percent
        }% 0 0);"></i>
      </div>
    `;
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
    catEl.style.background =
      product.category === "اصلي" ? "rgba(0, 53, 179, 1)" : "red";
    catEl.style.color = "#fff";

    // ✅ Expand/Collapse Quantity Selector
    const addProduct = productDiv.querySelector(".add-product");
    const plusIcon = addProduct.querySelector(".fa-plus");
    const minusIcon = addProduct.querySelector(".fa-minus");
    const input = addProduct.querySelector("input");

    addProduct.addEventListener("click", () => {
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

  function generateProducts(count = 25) {
    allProducts = [];
    for (let i = 0; i < count; i++) {
      allProducts.push(createProductObj());
    }
    currentPage = 1;
    renderPage(currentPage);
    renderPagination();
  }

  function renderPage(page) {
    productContainer.innerHTML = "";
    const perPage = getProductsPerPage();
    const start = (page - 1) * perPage;
    const end = start + perPage;
    allProducts.slice(start, end).forEach((p) => {
      productContainer.appendChild(renderProduct(p));
    });
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

  window.addEventListener("resize", () => {
    renderPage(currentPage);
    renderPagination();
  });

  generateProducts(25); // Example: 25 products
});

// Function to dynamically generate pagination numbers
function updatePagination() {
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const paginationList = paginationContainer;

  paginationList.innerHTML = "";

  // Previous arrow
  const prevBtn = document.createElement("i");
  prevBtn.className = "fa-solid fa-chevron-left";
  prevBtn.style.cursor = currentPage === 1 ? "not-allowed" : "pointer";
  prevBtn.style.opacity = currentPage === 1 ? "0.5" : "1";
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
      updatePagination(); // refresh pagination
    }
  });
  paginationList.appendChild(prevBtn);

  // Dynamically create page numbers
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.textContent = i;
    li.style.transition = "color 0.3s ease"; // smooth effect
    li.style.color = i === currentPage ? "red" : "black"; // active red, others black

    li.addEventListener("click", () => {
      currentPage = i;
      renderPage(currentPage);
      updatePagination(); // refresh pagination
    });

    paginationList.appendChild(li);
  }

  // Next arrow
  const nextBtn = document.createElement("i");
  nextBtn.className = "fa-solid fa-chevron-right";
  nextBtn.style.cursor = currentPage === totalPages ? "not-allowed" : "pointer";
  nextBtn.style.opacity = currentPage === totalPages ? "0.5" : "1";
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
      updatePagination(); // refresh pagination
    }
  });
  paginationList.appendChild(nextBtn);
}

// Replace your old renderPagination() calls with updatePagination()
