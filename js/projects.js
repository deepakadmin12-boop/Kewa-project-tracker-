/* =========================================
   KEWA PROJECT DATA TRACKER
   PROJECTS PAGE JAVASCRIPT
========================================= */


/* ---------- ELEMENTS ---------- */

const projectsGrid =
    document.getElementById("projectsGrid");

const searchInput =
    document.getElementById("searchInput");

const projectCount =
    document.getElementById("projectCount");

const emptyState =
    document.getElementById("emptyState");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const menuBtn =
    document.getElementById("menuBtn");

const closeBtn =
    document.getElementById("closeBtn");

const sidebar =
    document.getElementById("sidebar");

const overlay =
    document.getElementById("overlay");


/* ---------- STATE ---------- */

let currentFilter = "All";

let currentSearch = "";


/* ---------- SIDEBAR ---------- */

function openSidebar() {

    if (!sidebar || !overlay) {
        return;
    }

    sidebar.classList.add("active");

    overlay.classList.add("active");

}


function closeSidebar() {

    if (!sidebar || !overlay) {
        return;
    }

    sidebar.classList.remove("active");

    overlay.classList.remove("active");

}


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        openSidebar
    );

}


if (closeBtn) {

    closeBtn.addEventListener(
        "click",
        closeSidebar
    );

}


if (overlay) {

    overlay.addEventListener(
        "click",
        closeSidebar
    );

}


/* ---------- ICON ---------- */

function getProjectIcon(category) {

    const icons = {

        "Fintech": "📈",

        "Finance": "💰",

        "E-Commerce": "🛒",

        "Artificial Intelligence": "🤖",

        "Web Development": "🌐",

        "Security": "🔐"

    };


    return icons[category] || "📁";

}


/* ---------- STATUS CLASS ---------- */

function getStatusClass(status) {

    return status === "Completed"
        ? ""
        : "active";

}


/* ---------- PROJECT CARD ---------- */

function createProjectCard(project) {

    const card =
        document.createElement("article");


    card.className =
        "project-card";


    const technologiesHTML =
        (project.technologies || [])
            .slice(0, 5)
            .map(
                tech =>
                    `<span class="tag">${tech}</span>`
            )
            .join("");


    const progress =
        Number(project.progress) || 0;


    card.innerHTML = `

        <div class="project-top">

            <div class="project-icon">
                ${getProjectIcon(project.category)}
            </div>

            <span class="status ${getStatusClass(project.status)}">
                ${project.status}
            </span>

        </div>


        <span class="project-category">
            ${project.category || "Project"}
        </span>


        <h3>
            ${project.name}
        </h3>


        <p>
            ${project.shortDescription}
        </p>


        <div class="tags">
            ${technologiesHTML}
        </div>


        <div class="progress-wrap">

            <div class="progress-info">

                <span>
                    Progress
                </span>

                <span>
                    ${progress}%
                </span>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width: ${progress}%"
                ></div>

            </div>

        </div>


        <a
            href="details.html?id=${encodeURIComponent(project.id)}"
            class="project-link"
        >
            View Project Details →
        </a>

    `;


    return card;

}


/* ---------- FILTER PROJECTS ---------- */

function getFilteredProjects() {

    if (!Array.isArray(projects)) {

        return [];

    }


    return projects.filter(project => {

        /* Status filter */

        const matchesFilter =
            currentFilter === "All" ||
            project.status === currentFilter;


        /* Search filter */

        const searchText = [

            project.name,

            project.category,

            project.shortDescription,

            project.description,

            ...(project.technologies || [])

        ]
        .join(" ")
        .toLowerCase();


        const matchesSearch =
            searchText.includes(
                currentSearch.toLowerCase()
            );


        return (
            matchesFilter &&
            matchesSearch
        );

    });

}


/* ---------- RENDER PROJECTS ---------- */

function renderProjects() {

    if (!projectsGrid) {
        return;
    }


    const filteredProjects =
        getFilteredProjects();


    projectsGrid.innerHTML = "";


    /* Count */

    if (projectCount) {

        projectCount.textContent =
            filteredProjects.length;

    }


    /* Empty */

    if (filteredProjects.length === 0) {

        if (emptyState) {

            emptyState.hidden = false;

        }

        return;

    }


    if (emptyState) {

        emptyState.hidden = true;

    }


    /* Cards */

    filteredProjects.forEach(project => {

        const card =
            createProjectCard(project);

        projectsGrid.appendChild(card);

    });

}


/* ---------- SEARCH ---------- */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            currentSearch =
                event.target.value.trim();

            renderProjects();

        }
    );

}


/* ---------- FILTER BUTTONS ---------- */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            /* Remove active */

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            /* Add active */

            button.classList.add("active");


            /* Update filter */

            currentFilter =
                button.dataset.filter;


            renderProjects();

        }
    );

});


/* ---------- INITIALIZE ---------- */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderProjects();

    }
);