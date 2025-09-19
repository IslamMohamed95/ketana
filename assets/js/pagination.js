export function paginate(
  allItems,
  perPage,
  renderFn,
  container,
  paginationWrapper
) {
  let currentPage = 1;

  function renderPage(page) {
    container.innerHTML = "";
    const start = (page - 1) * perPage;
    const end = start + perPage;
    allItems
      .slice(start, end)
      .forEach((item) => container.appendChild(renderFn(item)));
  }

  function renderPagination() {
    paginationWrapper.innerHTML = "";
    const totalPages = Math.ceil(allItems.length / perPage);
    const ul = document.createElement("ul");
    ul.className = "pagination-container";

    // RIGHT ARROW VISUALLY ON LEFT -> GOES TO PREVIOUS PAGE
    const right = document.createElement("i");
    right.className = "fa-solid fa-chevron-right hover";
    right.style.cursor = currentPage === 1 ? "not-allowed" : "pointer";
    right.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
        renderPagination();
      }
    });
    ul.appendChild(right);

    // PAGE NUMBERS WITH COLLAPSE LOGIC
    const visiblePages = [];
    if (totalPages <= 5) {
      // Show all pages if small number
      for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
    } else {
      // Always show first 3
      visiblePages.push(1, 2, 3);

      // Add ... if current page > 4
      if (currentPage > 4 && currentPage < totalPages - 2) {
        visiblePages.push("...");
        visiblePages.push(currentPage - 1, currentPage, currentPage + 1);
        visiblePages.push("...");
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) visiblePages.push(i);
      } else {
        visiblePages.push("...");
        visiblePages.push(totalPages);
      }
    }

    // Render the pages
    visiblePages.forEach((p) => {
      if (p === "...") {
        const li = document.createElement("li");
        li.textContent = "...";
        li.className = "dots";
        ul.appendChild(li);
      } else {
        const li = document.createElement("li");
        li.textContent = p;
        li.className = "hover";
        if (p === currentPage) li.classList.add("active-page");
        li.addEventListener("click", () => {
          currentPage = p;
          renderPage(currentPage);
          renderPagination();
        });
        ul.appendChild(li);
      }
    });

    // LEFT ARROW VISUALLY ON RIGHT -> GOES TO NEXT PAGE
    const left = document.createElement("i");
    left.className = "fa-solid fa-chevron-left hover";
    left.style.cursor = currentPage === totalPages ? "not-allowed" : "pointer";
    left.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
        renderPagination();
      }
    });
    ul.appendChild(left);

    paginationWrapper.appendChild(ul);
  }

  renderPage(currentPage);
  renderPagination();
}
