document.addEventListener("DOMContentLoaded", async function () {

  // 🔹 Load header/footer
  const includeTargets = document.querySelectorAll("[data-include]");

  for (const target of includeTargets) {
    const source = target.getAttribute("data-include");
    if (!source) continue;

    try {
      const response = await fetch(source);
      if (!response.ok) throw new Error("Failed to load " + source);

      target.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
      target.innerHTML = "";
    }
  }

  // 🔹 Active menu (after header loads)
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".site-nav > a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");

    // ignore phone/external links
    if (!href || href.startsWith("tel:") || href.startsWith("http")) return;

    const fileName = href.split("/").pop();

    if (fileName === currentPage) {
      link.classList.add("active");
    }
  });

  // 🔹 INIT Scroll To Top AFTER header is loaded
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

});


document.addEventListener("DOMContentLoaded", function () {

  const cards = document.querySelectorAll(".expert-card");
  const cardsPerPage = 8;
  let currentPage = 1;

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const pageNumbersContainer = document.getElementById("pageNumbers");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function showPage(page) {
    currentPage = page;

    cards.forEach((card, index) => {
      card.style.display = "none";
      if (index >= (page - 1) * cardsPerPage && index < page * cardsPerPage) {
        card.style.display = "block";
      }
    });

    updatePaginationUI();
  }

  function updatePaginationUI() {
    pageNumbersContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const span = document.createElement("span");
      span.textContent = i;

      if (i === currentPage) {
        span.classList.add("active");
      }

      span.addEventListener("click", () => showPage(i));
      pageNumbersContainer.appendChild(span);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) showPage(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) showPage(currentPage + 1);
  });

  // Init
  showPage(1);
});



document.addEventListener("DOMContentLoaded", function () {
  const toggleIcons = document.querySelectorAll(".toggle-password");

  toggleIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      const input = this.previousElementSibling;

      if (input.type === "password") {
        input.type = "text";
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
      }
    });
  });
});

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", function () {
    const item = this.parentElement;

    // Close others (optional)
    document.querySelectorAll(".accordion-item").forEach((el) => {
      if (el !== item) el.classList.remove("active");
    });

    // Toggle current
    item.classList.toggle("active");
  });
});


document.addEventListener("DOMContentLoaded", function () {

  const menuItems = document.querySelectorAll(".nav-item.has-submenu");

  menuItems.forEach(item => {
    const arrow = item.querySelector(".nav-arrow");
    const submenu = item.querySelector(".submenu");

    arrow.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = item.classList.contains("active");

        // Close all menus first
        document.querySelectorAll(".nav-item.has-submenu").forEach(i => {
          i.classList.remove("active");
          i.querySelector(".submenu").style.maxHeight = null;
        });

        // If it was NOT active → open it
        if (!isActive) {
          item.classList.add("active");
          submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
        // If it WAS active → do nothing (already closed above)
      }
    });
  });

});

// Scroll to top button
