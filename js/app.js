/* =================================
   KEWA PROJECT DATA TRACKER
   DASHBOARD JAVASCRIPT
================================= */


/* ---------- ELEMENTS ---------- */

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const recentProjects =
    document.getElementById("recentProjects");

const totalProjects =
    document.getElementById("totalProjects");

const completedProjects =
    document.getElementById("completedProjects");

const activeProjects =
    document.getElementById("activeProjects");

const technologies =
    document.getElementById("technologies");


/* ---------- SIDEBAR ---------- */

function openSidebar() {

    sidebar.classList.add("active");

    overlay.classList.add("active");

}


function closeSidebar() {

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


/* ---------- PROJECT STATS ---------- */

function loadStats() {

    if (!Array.isArray(projects)) {
        return;
    }


    /* Total */

    if (totalProjects) {

        totalProjects.textContent =
            projects.length;

    }


    /* Completed */

    const completed =
        projects.filter(
            project =>
                project.status === "Completed"
        ).length;


    if (completedProjects) {

        completedProjects.textContent =
            completed;

    }


    /* Active / Development */

    const active =
        projects.filter(
            project =>
                project.status !== "Completed"
        ).length;


    if (activeProjects) {

        activeProjects.textContent =
            active;

    }


    /* Unique Technologies */

    const techSet = new Set();


    projects.forEach(project => {

        if (!Array.isArray(project.technologies)) {
            return;
        }


        project.technologies.forEach(tech => {

            techSet.add(tech);

        });

    });


    if (technologies) {

        technologies.textContent =
            techSet.size;

    }

}


/* ---------- PROJECT ICON ---------- */

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

    if (status === "Completed") {

        return "";

    }


    return "active";

}


/* ---------- PROJECT CARD ---------- */

function createProjectCard(project) {

    const card =
        document.createElement("article");


    card.className =
        "project-card";


    const technologiesHTML =
        project.technologies
            .slice(0, 4)
            .map(
                tech =>
                    `<span class="tag">${tech}</span>`
            )
            .join("");


    card.innerHTML = `

        <div class="project-top">

            <div class="project-icon">
                ${getProjectIcon(project.category)}
            </div>

            <span class="status ${getStatusClass(project.status)}">
                ${project.status}
            </span>

        </div>


        <h3>
            ${project.name}
        </h3>


        <p>
            ${project.shortDescription}
        </p>


        <div class="tags">
            ${technologiesHTML}
        </div>


        <a
            href="details.html?id=${encodeURIComponent(project.id)}"
            class="project-link"
        >
            View Details →
        </a>

    `;


    return card;

}


/* ---------- LOAD RECENT PROJECTS ---------- */

function loadRecentProjects() {

    if (!recentProjects) {
        return;
    }


    recentProjects.innerHTML = "";


    if (!Array.isArray(projects) ||
        projects.length === 0) {

        recentProjects.innerHTML = `
            <p>
                No projects available.
            </p>
        `;

        return;

    }


    /*
        Show the first 3 projects
        on the dashboard.
    */

    const recent =
        projects.slice(0, 3);


    recent.forEach(project => {

        const card =
            createProjectCard(project);

        recentProjects.appendChild(card);

    });

}


/* ---------- INITIALIZE ---------- */

function initializeDashboard() {

    loadStats();

    loadRecentProjects();

}


/* ---------- START ---------- */

document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);