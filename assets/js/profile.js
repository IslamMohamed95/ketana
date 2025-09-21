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
    ul.querySelectorAll("li").forEach((li) =>
      li.classList.remove("activeSecondaryNav")
    );
  }

  function getMatchClass(li) {
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
      Array.from(detailsDivs).forEach((div) => {
        div.style.display = div.classList.contains(primaryClass)
          ? "flex"
          : "none";
      });
    }
  }

  primaryLis.forEach((li) => {
    li.addEventListener("click", () => activatePrimary(li));
  });

  navContainer.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "li") {
      const clickedLi = e.target;
      const ul = clickedLi.closest("ul");
      if (!ul) return;
      resetSecondary(ul);
      clickedLi.classList.add("activeSecondaryNav");

      const liClasses = Array.from(clickedLi.classList).filter(
        (cls) => cls !== "hover" && cls !== "activeSecondaryNav"
      );

      Array.from(detailsDivs).forEach((div) => {
        div.style.display = liClasses.some((cls) => div.classList.contains(cls))
          ? "flex"
          : "none";
      });
    }
  });

  if (primaryLis[0]) activatePrimary(primaryLis[0]);

  /* ---------- DIV-BASED TABLE DROPDOWN LOGIC ---------- */
  const optionButtons = document.querySelectorAll(
    "#profile-section .manage-dealer .options button"
  );

  optionButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = btn.closest(".options").querySelector(".dropdown");

      // Close other dropdowns
      document
        .querySelectorAll("#profile-section .manage-dealer .dropdown")
        .forEach((ul) => {
          if (ul !== dropdown) ul.classList.remove("open");
        });

      // Toggle current dropdown
      dropdown.classList.toggle("open");
    });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll("#profile-section .manage-dealer .dropdown")
      .forEach((ul) => ul.classList.remove("open"));
  });

  /* ---------- DEALER FORM LOGIC ---------- */
  const dealerForm = document.querySelector(".dealer-form");

  function showDealerFormWithMatchingChild(classes) {
    if (!dealerForm) return;
    dealerForm.style.display = "flex";

    Array.from(dealerForm.children).forEach((child) => {
      const match = classes.some((cls) => child.classList.contains(cls));
      child.style.display = match ? "flex" : "none";
    });
  }

  // Click on table dropdown li
  document.querySelectorAll("#profile-section .dropdown li").forEach((li) => {
    li.addEventListener("click", (e) => {
      const liClasses = Array.from(e.currentTarget.classList).filter(
        (cls) => cls !== "hover"
      );
      showDealerFormWithMatchingChild(liClasses);
    });
  });

  // Click on add-dealer button
  const addDealerBtn = document.getElementById("add-dealer");
  if (addDealerBtn) {
    addDealerBtn.addEventListener("click", () => {
      showDealerFormWithMatchingChild(["add-dealer"]);
    });
  }

  // Close form on X-mark or إلغاء
  if (dealerForm) {
    dealerForm.addEventListener("click", (e) => {
      const visibleChild = Array.from(dealerForm.children).find(
        (child) => child.style.display === "flex"
      );
      if (!visibleChild) return;

      // Close when clicking the X icon
      if (
        e.target.classList.contains("fa-xmark") &&
        visibleChild.contains(e.target)
      ) {
        visibleChild.style.display = "none";
        dealerForm.style.display = "none";
      }

      // Close when clicking إلغاء button inside dealer-delete
      if (
        e.target.tagName.toLowerCase() === "button" &&
        e.target.textContent.trim() === "إلغاء" &&
        visibleChild.classList.contains("dealer-delete")
      ) {
        visibleChild.style.display = "none";
        dealerForm.style.display = "none";
      }
    });
  }

  /* ---------- PROFILE-OP INTEGRATION ---------- */
  const profileOperations = Array.from(
    document.querySelectorAll(".primary-nav ul li")
  ).map((li) => getMatchClass(li));

  window.initProfileOperation = (opClass) => {
    if (!profileOperations.includes(opClass)) return;
    const targetLi = document.querySelector(`.primary-nav ul li.${opClass}`);
    if (targetLi) activatePrimary(targetLi);
  };

  const pendingOp = localStorage.getItem("pendingProfileOp");
  if (pendingOp) {
    window.initProfileOperation(pendingOp);
    localStorage.removeItem("pendingProfileOp");
  }
});
