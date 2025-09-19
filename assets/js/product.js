// products.js

export function renderProduct(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product";

  productDiv.innerHTML = `
    <div class="layout-offer">
      <div class="category-type">
        ${product.offer ? `<p class="offer">عرض</p>` : ""}
        <p class="category-name">${product.category}</p>
      </div>
      <div>متبقي 01:2:24</div>
    </div>

    <div class="product-details-container">
      <div class="product-details">
        <img src="${product.img}" alt="p-Img">
        <div class="details">
          <h4>${product.detail}</h4>
          <span>${product.number}</span>
        </div>
      </div>
      <div class="category-type category-secondary">
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
        <i class="fa-solid fa-star"></i>
        <span class="eval-number">${product.evaluation}</span>
      </div>
    </div>
    <div class="quantity-price-container">
      <div class="add-product collapsed">
        <i class="fa-solid fa-plus"></i>
        <input type="number" value="1" min="1" />
        <i class="fa-solid fa-minus"></i>
      </div>
      <div class="price">
        <span>${product.price}</span>
        <img src="./assets/images/products/currency.svg" alt="SAR" class="currency-icon" />
      </div>
    </div>
  `;

  // ===== Page-specific logic =====
  const isOfferPage = window.location.pathname.includes("offer.html");

  const layoutOffer = productDiv.querySelector(".layout-offer");

  const quantityPrice = productDiv.querySelector(".quantity-price-container");
  const secondaryCategory = productDiv.querySelector(".category-secondary");

  if (isOfferPage) {
    layoutOffer.style.display = "flex";

    quantityPrice.style.display = "none";
    secondaryCategory.style.display = "none"; // hide the 2nd category
  } else {
    layoutOffer.style.display = "none";

    quantityPrice.style.display = "flex";
    secondaryCategory.style.display = "flex"; // show the 2nd category
  }

  // ===== Product click → go to product view =====
  const h4 = productDiv.querySelector(".details h4");
  if (h4) {
    h4.addEventListener("click", () => {
      sessionStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = `productView.html?product=${encodeURIComponent(
        product.detail
      )}`;
    });
  }

  // ===== Expand / collapse logic =====
  const addProduct = productDiv.querySelector(".add-product");
  if (addProduct) {
    const plusIcon = addProduct.querySelector(".fa-plus");
    const minusIcon = addProduct.querySelector(".fa-minus");
    const inputField = addProduct.querySelector("input");

    plusIcon.addEventListener("click", () => {
      addProduct.classList.add("expanded");
      inputField.focus();
    });

    minusIcon.addEventListener("click", () => {
      addProduct.classList.remove("expanded");
    });
  }

  // ===== Star rating gradient =====
  const starIcon = productDiv.querySelector(".eval .fa-star");
  if (starIcon) {
    const rating = parseFloat(product.evaluation);
    const percent = (Math.max(0, Math.min(5, rating)) / 5) * 100;

    starIcon.style.background = `linear-gradient(to right, rgba(255,148,38,1) ${percent}%, #ccc ${percent}%)`;
    starIcon.style.webkitBackgroundClip = "text";
    starIcon.style.webkitTextFillColor = "transparent";
    starIcon.style.display = "inline-block";
  }

  return productDiv;
}
