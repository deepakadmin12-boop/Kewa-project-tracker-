// ========================================
// KEWA PROJECT DATA TRACKER
// Project Details JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------
    // Elements
    // ----------------------------------------

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    const projectHero = document.getElementById("projectHero");
    const heroIcon = document.getElementById("heroIcon");
    const heroCategory = document.getElementById("heroCategory");
    const heroStatus = document.getElementById("heroStatus");
    const projectName = document.getElementById("projectName");
    const projectDescription = document.getElementById("projectDescription");
    const projectVersion = document.getElementById("projectVersion");

    const progressPercent = document.getElementById("progressPercent");
    const progressFill = document.getElementById("progressFill");

    const technologiesList = document.getElementById("technologiesList");
    const featuresList = document.getElementById("featuresList");
    const pagesList = document.getElementById("pagesList");

    const fileTree = document.getElementById("fileTree");
    const expandAllBtn = document.getElementById("expandAll");
    const collapseAllBtn = document.getElementById("collapseAll");

    const projectLinks = document.getElementById("projectLinks");
    const projectNotes = document.getElementById("projectNotes");

    const notFound = document.getElementById("notFound");


    // ----------------------------------------
    // Sidebar
    // ----------------------------------------

    function openSidebar() {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", openSidebar);
    }

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }


    // ----------------------------------------
    // Get Project ID from URL
    // ----------------------------------------

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");

    const project = projects.find(item => item.id === projectId);


    // ----------------------------------------
    // Show Not Found
    // ----------------------------------------

    function showNotFound() {
        const sections = document.querySelectorAll(
            "main > .back-link, main > .project-hero, main > .card"
        );

        sections.forEach(section => {
            section.style.display = "none";
        });

        if (notFound) {
            notFound.hidden = false;
        }

        document.title = "Project Not Found | Kewa";
    }


    // ----------------------------------------
    // Show Project Content
    // ----------------------------------------

    function showProjectContent() {
        const sections = document.querySelectorAll(
            "main > .back-link, main > .project-hero, main > .card"
        );

        sections.forEach(section => {
            section.style.display = "";
        });

        if (notFound) {
            notFound.hidden = true;
        }
    }


    // ----------------------------------------
    // Project Icon
    // ----------------------------------------

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


    // ----------------------------------------
    // Status Class
    // ----------------------------------------

    function getStatusClass(status) {
        return status === "Completed" ? "" : "active";
    }


    // ----------------------------------------
    // Escape HTML
    // ----------------------------------------

    function escapeHTML(value) {
        if (value === undefined || value === null) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    // ----------------------------------------
    // Load Project Information
    // ----------------------------------------

    function loadProject() {

        if (!project) {
            showNotFound();
            return;
        }

        showProjectContent();

        document.title = `${project.name} | Kewa Project Data Tracker`;

        // Hero
        heroIcon.textContent = getProjectIcon(project.category);

        heroCategory.textContent = project.category;

        heroStatus.textContent = project.status;
        heroStatus.className = "status-badge " + getStatusClass(project.status);

        projectName.textContent = project.name;

        projectDescription.textContent = project.description;

        projectVersion.textContent = project.version;


        // ----------------------------------------
        // Progress
        // ----------------------------------------

        const progress = Number(project.progress) || 0;

        progressPercent.textContent = `${progress}%`;

        progressFill.style.width = `${progress}%`;


        // ----------------------------------------
        // Technologies
        // ----------------------------------------

        technologiesList.innerHTML = "";

        project.technologies.forEach(technology => {

            const chip = document.createElement("span");

            chip.className = "chip";

            chip.textContent = technology;

            technologiesList.appendChild(chip);
        });


        // ----------------------------------------
        // Features
        // ----------------------------------------

        featuresList.innerHTML = "";

        project.features.forEach(feature => {

            const li = document.createElement("li");

            li.textContent = feature;

            featuresList.appendChild(li);
        });


        // ----------------------------------------
        // Pages
        // ----------------------------------------

        pagesList.innerHTML = "";

        project.pages.forEach(page => {

            const pageItem = document.createElement("div");

            pageItem.className = "page-item";

            pageItem.innerHTML = `
                <span class="page-icon">📄</span>
                <span>${escapeHTML(page)}</span>
            `;

            pagesList.appendChild(pageItem);
        });


        // ----------------------------------------
        // File Structure
        // ----------------------------------------

        renderFileTree(project.files);


        // ----------------------------------------
        // Project Links
        // ----------------------------------------

        renderProjectLinks();


        // ----------------------------------------
        // Notes
        // ----------------------------------------

        projectNotes.textContent =
            project.notes || "No additional notes available.";
    }


    // ========================================
    // FILE TREE
    // ========================================

    function renderFileTree(files) {

        fileTree.innerHTML = "";

        if (!files || files.length === 0) {

            fileTree.innerHTML = `
                <div class="empty-tree">
                    No file structure available.
                </div>
            `;

            return;
        }

        files.forEach(item => {

            const treeItem = createTreeItem(item);

            fileTree.appendChild(treeItem);
        });
    }


    // ----------------------------------------
    // Create Tree Item
    // ----------------------------------------

    function createTreeItem(item) {

        const wrapper = document.createElement("div");

        wrapper.className = "tree-item";


        // ----------------------------------------
        // Folder
        // ----------------------------------------

        if (item.type === "folder") {

            const row = document.createElement("div");

            row.className = "tree-row folder";

            row.setAttribute("data-folder-toggle", "true");

            row.setAttribute("aria-expanded", "true");


            const arrow = document.createElement("span");

            arrow.className = "tree-arrow";

            arrow.textContent = "▼";


            const icon = document.createElement("span");

            icon.className = "tree-icon";

            icon.textContent = "📁";


            const name = document.createElement("span");

            name.className = "tree-name";

            name.textContent = item.name;


            row.appendChild(arrow);
            row.appendChild(icon);
            row.appendChild(name);


            // Children container
            const children = document.createElement("div");

            children.className = "tree-children";


            if (item.children && item.children.length > 0) {

                item.children.forEach(child => {

                    const childItem = createTreeItem(child);

                    children.appendChild(childItem);
                });

            }


            // Folder open / close
            row.addEventListener("click", () => {

                const isCollapsed =
                    children.classList.toggle("collapsed");

                if (isCollapsed) {

                    arrow.textContent = "▶";

                    row.setAttribute("aria-expanded", "false");

                } else {

                    arrow.textContent = "▼";

                    row.setAttribute("aria-expanded", "true");
                }
            });


            wrapper.appendChild(row);
            wrapper.appendChild(children);

        }


        // ----------------------------------------
        // File
        // ----------------------------------------

        else {

            const row = document.createElement("div");

            row.className = "tree-row file";


            const arrow = document.createElement("span");

            arrow.className = "tree-arrow";

            arrow.textContent = "";


            const icon = document.createElement("span");

            icon.className = "tree-icon";

            icon.textContent = "📄";


            const name = document.createElement("span");

            name.className = "tree-name";

            name.textContent = item.name;


            row.appendChild(arrow);
            row.appendChild(icon);
            row.appendChild(name);

            wrapper.appendChild(row);
        }


        return wrapper;
    }


    // ========================================
    // EXPAND ALL
    // ========================================

    if (expandAllBtn) {

        expandAllBtn.addEventListener("click", () => {

            const folders =
                fileTree.querySelectorAll(".tree-row.folder");

            const children =
                fileTree.querySelectorAll(".tree-children");


            children.forEach(container => {

                container.classList.remove("collapsed");
            });


            folders.forEach(folder => {

                const arrow =
                    folder.querySelector(".tree-arrow");

                if (arrow) {
                    arrow.textContent = "▼";
                }

                folder.setAttribute("aria-expanded", "true");
            });
        });
    }


    // ========================================
    // COLLAPSE ALL
    // ========================================

    if (collapseAllBtn) {

        collapseAllBtn.addEventListener("click", () => {

            const folders =
                fileTree.querySelectorAll(".tree-row.folder");

            const children =
                fileTree.querySelectorAll(".tree-children");


            children.forEach(container => {

                container.classList.add("collapsed");
            });


            folders.forEach(folder => {

                const arrow =
                    folder.querySelector(".tree-arrow");

                if (arrow) {
                    arrow.textContent = "▶";
                }

                folder.setAttribute("aria-expanded", "false");
            });
        });
    }


    // ========================================
    // PROJECT LINKS
    // ========================================

    function renderProjectLinks() {

        projectLinks.innerHTML = "";

        const liveLink = project.links?.live;
        const githubLink = project.links?.github;


        // Live Demo
        if (liveLink && liveLink !== "#") {

            const live = document.createElement("a");

            live.className = "project-link-btn";

            live.href = liveLink;

            live.target = "_blank";

            live.rel = "noopener noreferrer";

            live.textContent = "🌐 Live Demo";

            projectLinks.appendChild(live);
        }


        // GitHub
        if (githubLink && githubLink !== "#") {

            const github = document.createElement("a");

            github.className = "project-link-btn";

            github.href = githubLink;

            github.target = "_blank";

            github.rel = "noopener noreferrer";

            github.textContent = "💻 GitHub";

            projectLinks.appendChild(github);
        }


        // No links
        if (projectLinks.children.length === 0) {

            const message = document.createElement("p");

            message.className = "no-links";

            message.textContent =
                "No external links added for this project yet.";

            projectLinks.appendChild(message);
        }
    }


    // ========================================
    // START
    // ========================================

    loadProject();
});