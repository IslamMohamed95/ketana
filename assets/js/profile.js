document.addEventListener("DOMContentLoaded", () => {
  /* ---------- NAVIGATION LOGIC ---------- */
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

  function getMatchClass(li) {
    // ignore generic classes like hover/active
    return Array.from(li.classList).find(
      (cls) => cls !== "hover" && cls !== "activePrimaryNav"
    );
  }

  function activatePrimary(primaryLi) {
    resetPrimary();
    primaryLi.classList.add("activePrimaryNav");

    const icon = primaryLi.querySelector("i");
    if (icon) icon.classList.add("activePrimaryNavIcon");

    const primaryClass = getMatchClass(primaryLi);

    // Hide all secondaries + details
    navContainer.querySelectorAll("ul").forEach((ul) => {
      ul.style.display = "none";
      resetSecondary(ul);
    });
    Array.from(detailsDivs).forEach((div) => (div.style.display = "none"));

    // Matching secondary nav
    const matchingUl = navContainer.querySelector(`ul.${primaryClass}`);
    if (matchingUl) {
      matchingUl.style.display = "flex";
      const firstLi = matchingUl.querySelector("li");
      if (firstLi) {
        firstLi.classList.add("activeSecondaryNav");
        const secClass = getMatchClass(firstLi);

        Array.from(detailsDivs).forEach((div) => {
          div.style.display = div.classList.contains(secClass)
            ? "flex"
            : "none";
        });
      }
    } else {
      // No secondary → match direct details
      Array.from(detailsDivs).forEach((div) => {
        div.style.display = div.classList.contains(primaryClass)
          ? "flex"
          : "none";
      });
    }
  }

  // Primary click
  primaryLis.forEach((primaryLi) => {
    primaryLi.addEventListener("click", () => {
      activatePrimary(primaryLi);
    });
  });

  // Secondary click
  navContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const clickedLi = e.target;
      const ul = clickedLi.closest("ul");

      resetSecondary(ul);
      clickedLi.classList.add("activeSecondaryNav");

      const liClass = getMatchClass(clickedLi);

      Array.from(detailsDivs).forEach((div) => {
        div.style.display = div.classList.contains(liClass) ? "flex" : "none";
      });
    }
  });

  // Default: activate first primary li
  if (primaryLis[0]) {
    activatePrimary(primaryLis[0]);
  }

  /* ---------- TABLE DROPDOWN MENU LOGIC ---------- */
  const optionButtons = document.querySelectorAll(
    "#profile-section .manage-dealer .options button"
  );

  optionButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const currentOption = btn.closest(".options");

      // Close other menus
      document
        .querySelectorAll("#profile-section .manage-dealer .options")
        .forEach((opt) => {
          if (opt !== currentOption) opt.classList.remove("open");
        });

      // Toggle current
      currentOption.classList.toggle("open");
    });
  });

  // Close dropdowns on outside click
  document.addEventListener("click", () => {
    document
      .querySelectorAll("#profile-section .manage-dealer .options")
      .forEach((opt) => opt.classList.remove("open"));
  });
});
