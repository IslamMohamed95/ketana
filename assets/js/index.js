import { renderProduct } from "./product.js";
import { getProducts } from "./productData.js";
import { paginate } from "./pagination.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("services-items-container");
  const paginationWrapper = document.getElementById("pagination-section");

  if (!container) return;

  // Generate products and paginate
  const products = getProducts(40);
  paginate(products, 8, renderProduct, container, paginationWrapper);

  // Optional: wait for nav to load if you want to highlight breadcrumbs
  const waitNav = setInterval(() => {
    if (typeof window.updateBreadcrumb === "function") {
      window.updateBreadcrumb("المنتجات");
      clearInterval(waitNav);
    }
  }, 100);
});
