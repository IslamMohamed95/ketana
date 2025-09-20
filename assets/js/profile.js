document.addEventListener("DOMContentLoaded", () => {
  const primaryLis = document.querySelectorAll(".primary-nav ul li");
  const navContainer = document.querySelector(".nav-container");
  const detailsContainer = document.querySelector(".details-nav-container");
  const detailsDivs = detailsContainer ? detailsContainer.children : [];

  function resetPrimary() {
    primaryLis.forEach((li) => {
      li.classList.remove("activePrimaryNav");
      const icon = li.querySelector("i");
      if (icon) icon.classList.remove("activePrimaryNavIcon");
    });
  }

  function resetSecondary(ul) {
    ul.querySelectorAll("li").forEach((li) => {
      li.classList.remove("activeSecondaryNav");
    });
  }

  function activatePrimary(primaryLi) {
    resetPrimary();
    primaryLi.classList.add("activePrimaryNav");

    const icon = primaryLi.querySelector("i");
    if (icon) icon.classList.add("activePrimaryNavIcon");

    const primaryClass = primaryLi.classList[0];

    // Reset secondary and details
    navContainer
      .querySelectorAll("ul")
      .forEach((ul) => (ul.style.display = "none"));
    Array.from(detailsDivs).forEach((div) => (div.style.display = "none"));

    // Check for matching secondary ul
    const matchingUl = navContainer.querySelector(`ul.${primaryClass}`);
    if (matchingUl) {
      matchingUl.style.display = "flex";
      resetSecondary(matchingUl);

      // Auto activate first li in secondary
      const firstLi = matchingUl.querySelector("li");
      if (firstLi) {
        firstLi.classList.add("activeSecondaryNav");

        // Show corresponding details div (direct child only)
        Array.from(detailsDivs).forEach((div) => {
          if (div.classList.contains(firstLi.classList[0])) {
            div.style.display = "flex";
          } else {
            div.style.display = "none";
          }
        });
      }
    } else {
      // If no ul, check direct child divs
      Array.from(detailsDivs).forEach((div) => {
        if (div.classList.contains(primaryClass)) {
          div.style.display = "flex";
        } else {
          div.style.display = "none";
        }
      });
    }
  }

  // Primary click handler
  primaryLis.forEach((primaryLi) => {
    primaryLi.addEventListener("click", () => {
      activatePrimary(primaryLi);
    });
  });

  // Secondary click handler
  navContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const clickedLi = e.target;
      const ul = clickedLi.closest("ul");

      resetSecondary(ul);
      clickedLi.classList.add("activeSecondaryNav");

      const liClass = clickedLi.classList[0];

      Array.from(detailsDivs).forEach((div) => {
        if (div.classList.contains(liClass)) {
          div.style.display = "flex";
        } else {
          div.style.display = "none";
        }
      });
    }
  });

  // Auto activate first primary li by default
  if (primaryLis[0]) {
    activatePrimary(primaryLis[0]);
  }
});
