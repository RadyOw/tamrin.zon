const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");
const menuOverlay = document.getElementById("menu-overlay");

const searchOpenBtn = document.getElementById("search-open-btn");
const searchBox = document.querySelector(".search-box");

const supportBtn = document.getElementById("support-btn");
const supportPanel = document.getElementById("support-panel");
const supportClose = document.getElementById("support-close");


/* ==================================================
   باز و بسته کردن منوی کناری
================================================== */

if (menuBtn && sideMenu) {

    menuBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        sideMenu.classList.toggle("menu-open");

        if (menuOverlay) {

            menuOverlay.classList.toggle("overlay-active");

        }

    });

}


/* ==================================================
   جلوگیری از بسته شدن منو با کلیک داخل خودش
================================================== */

if (sideMenu) {

    sideMenu.addEventListener("click", function (event) {

        event.stopPropagation();

    });

}


/* ==================================================
   باز و بسته کردن سرچ
================================================== */

if (searchOpenBtn && searchBox) {

    searchOpenBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        searchBox.classList.toggle("active");

        if (searchBox.classList.contains("active")) {

            const searchInput = searchBox.querySelector("input");

            if (searchInput) {

                searchInput.focus();

            }

        }

    });

}


/* ==================================================
   جلوگیری از بسته شدن سرچ با کلیک داخل آن
================================================== */

if (searchBox) {

    searchBox.addEventListener("click", function (event) {

        event.stopPropagation();

    });

}


/* ==================================================
   ویجت پشتیبانی (باز/بسته شدن)
================================================== */

if (supportBtn && supportPanel) {

    supportBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        supportPanel.classList.toggle("open");

    });

}

if (supportPanel) {

    supportPanel.addEventListener("click", function (event) {

        event.stopPropagation();

    });

}

if (supportClose && supportPanel) {

    supportClose.addEventListener("click", function (event) {

        event.stopPropagation();

        supportPanel.classList.remove("open");

    });

}


/* نمایش دکمه‌ی شناور پشتیبانی بعد از کمی اسکرول */

function updateSupportBtnVisibility() {

    if (!supportBtn) {

        return;

    }

    if (window.scrollY > 150) {

        supportBtn.classList.add("visible");

    } else {

        supportBtn.classList.remove("visible");

    }

}

window.addEventListener("scroll", updateSupportBtnVisibility);
updateSupportBtnVisibility();


/* ==================================================
   کلیک روی هر جای صفحه
================================================== */

document.addEventListener("click", function () {

    if (sideMenu) {

        sideMenu.classList.remove("menu-open");

    }

    if (menuOverlay) {

        menuOverlay.classList.remove("overlay-active");

    }

    if (searchBox) {

        searchBox.classList.remove("active");

    }

    if (supportPanel) {
        supportPanel.classList.remove("open");
    }

});


/* ==================================================
   منوی دسته بندی
================================================== */

const categoryItems = document.querySelectorAll(".category-item");

categoryItems.forEach(function (item) {

    const dropdownLinks = item.querySelectorAll(".dropdown-item");

    dropdownLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const selectedCategory = link.querySelector("span");

            if (selectedCategory) {

                console.log(
                    "دسته انتخاب شده:",
                    selectedCategory.textContent
                );

            }

        });

    });

});


/* ==================================================
   لایت‌باکس گالری تصاویر (صفحه اختصاصی هر بازی)
   با کلیک روی هر عکس گالری، عکس بزرگ‌شده نمایش داده میشه
================================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryImages = document.querySelectorAll(".gallery-item img");


function openLightbox(imgEl) {

    if (!lightbox || !lightboxImg) {

        return;

    }

    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt;

    lightbox.classList.add("active");

}


function closeLightbox() {

    if (!lightbox) {

        return;

    }

    lightbox.classList.remove("active");

}


if (galleryImages.length > 0) {

    galleryImages.forEach(function (img) {

        img.addEventListener("click", function (event) {

            event.stopPropagation();

            openLightbox(img);

        });

    });

}


if (lightbox) {

    /* کلیک روی پس‌زمینه‌ی تیره لایت‌باکس، اون رو می‌بنده */

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


/* بستن لایت‌باکس با کلید Escape */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* ==================================================
   صفحه جدول: جستجو و فیلتر کردن بازی‌ها
================================================== */

const tableSearchInput = document.getElementById("table-search");
const gamesTable = document.getElementById("games-table");
const tableFilters = document.getElementById("table-filters");
const tableEmptyMsg = document.getElementById("table-empty-msg");

let activeTableFilter = "all";

function rowMatchesFilter(row, filter) {

    if (filter === "all") {

        return true;

    }

    if (filter === "free" || filter === "paid") {

        return row.getAttribute("data-price") === filter;

    }

    if (filter === "online" || filter === "update") {

        return row.getAttribute("data-status") === filter;

    }

    return true;

}

function applyTableFilters() {

    if (!gamesTable) {

        return;

    }

    const searchValue = tableSearchInput
        ? tableSearchInput.value.trim().toLowerCase()
        : "";

    const rows = gamesTable.querySelectorAll("tr[data-name]");

    let visibleCount = 0;

    rows.forEach(function (row) {

        const name = row.getAttribute("data-name") || "";

        const matchesSearch = name.includes(searchValue);
        const matchesFilter = rowMatchesFilter(row, activeTableFilter);

        if (matchesSearch && matchesFilter) {

            row.style.display = "";
            visibleCount++;

        } else {

            row.style.display = "none";

        }

    });

    if (tableEmptyMsg) {

        tableEmptyMsg.style.display = visibleCount === 0 ? "block" : "none";

    }

}

if (tableSearchInput) {

    tableSearchInput.addEventListener("input", applyTableFilters);

    tableSearchInput.addEventListener("click", function (event) {

        event.stopPropagation();

    });

}

if (tableFilters) {

    const chips = tableFilters.querySelectorAll(".table-filter-chip");

    chips.forEach(function (chip) {

        chip.addEventListener("click", function (event) {

            event.stopPropagation();

            chips.forEach(function (c) {
                c.classList.remove("active");
            });

            chip.classList.add("active");

            activeTableFilter = chip.getAttribute("data-filter") || "all";

            applyTableFilters();

        });

    });

}