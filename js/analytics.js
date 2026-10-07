// ========================================
// KEWA PROJECT DATA TRACKER
// ANALYTICS JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ====================================
    // ELEMENTS
    // ====================================

    const menuBtn =
        document.getElementById("menuBtn");

    const closeBtn =
        document.getElementById("closeBtn");

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("overlay");


    const totalProjects =
        document.getElementById("totalProjects");

    const completedProjects =
        document.getElementById("completedProjects");

    const activeProjects =
        document.getElementById("activeProjects");

    const averageProgress =
        document.getElementById("averageProgress");


    const projectProgressList =
        document.getElementById("projectProgressList");

    const statusChart =
        document.getElementById("statusChart");

    const categoryList =
        document.getElementById("categoryList");

    const technologyList =
        document.getElementById("technologyList");


    const totalFeatures =
        document.getElementById("totalFeatures");

    const totalPages =
        document.getElementById("totalPages");

    const totalTechnologies =
        document.getElementById("totalTechnologies");

    const averageFeatures =
        document.getElementById("averageFeatures");


    // ====================================
    // SIDEBAR
    // ====================================

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


    // ====================================
    // PROJECT DATA CHECK
    // ====================================

    if (
        typeof projects === "undefined" ||
        !Array.isArray(projects)
    ) {

        console.error(
            "Projects data not found."
        );

        return;
    }


    // ====================================
    // BASIC ANALYTICS
    // ====================================

    function calculateBasicStats() {

        const total =
            projects.length;


        const completed =
            projects.filter(
                project =>
                    project.status === "Completed"
            ).length;


        const active =
            projects.filter(
                project =>
                    project.status !== "Completed"
            ).length;


        const progressTotal =
            projects.reduce(
                (sum, project) =>
                    sum + (Number(project.progress) || 0),
                0
            );


        const average =
            total > 0
                ? Math.round(progressTotal / total)
                : 0;


        totalProjects.textContent =
            total;


        completedProjects.textContent =
            completed;


        activeProjects.textContent =
            active;


        averageProgress.textContent =
            `${average}%`;
    }


    // ====================================
    // PROJECT PROGRESS
    // ====================================

    function renderProjectProgress() {

        projectProgressList.innerHTML = "";


        projects.forEach(project => {

            const progress =
                Number(project.progress) || 0;


            const item =
                document.createElement("div");

            item.className =
                "progress-project";


            item.innerHTML = `

                <div class="progress-project-info">

                    <span class="progress-project-name">
                        ${escapeHTML(project.name)}
                    </span>

                    <div class="progress-track">

                        <div
                            class="progress-value"
                            style="width: ${progress}%"
                        ></div>

                    </div>

                </div>


                <span class="progress-number">
                    ${progress}%
                </span>

            `;


            projectProgressList.appendChild(item);
        });
    }


    // ====================================
    // STATUS ANALYTICS
    // ====================================

    function renderStatusAnalytics() {

        statusChart.innerHTML = "";


        const completed =
            projects.filter(
                project =>
                    project.status === "Completed"
            ).length;


        const development =
            projects.filter(
                project =>
                    project.status !== "Completed"
            ).length;


        const statuses = [

            {
                name: "Completed",
                count: completed,
                className: "completed"
            },

            {
                name: "In Development",
                count: development,
                className: "active"
            }

        ];


        statuses.forEach(status => {

            const item =
                document.createElement("div");

            item.className =
                "status-item";


            item.innerHTML = `

                <span
                    class="status-dot ${status.className}"
                ></span>

                <span class="status-name">
                    ${status.name}
                </span>

                <span class="status-count">
                    ${status.count}
                </span>

            `;


            statusChart.appendChild(item);
        });
    }


    // ====================================
    // CATEGORY ANALYTICS
    // ====================================

    function renderCategories() {

        categoryList.innerHTML = "";


        const categoryCounts = {};


        projects.forEach(project => {

            const category =
                project.category || "Other";


            if (!categoryCounts[category]) {

                categoryCounts[category] = 0;
            }


            categoryCounts[category]++;
        });


        const sortedCategories =
            Object.entries(categoryCounts)
                .sort(
                    (a, b) => b[1] - a[1]
                );


        const total =
            projects.length;


        sortedCategories.forEach(
            ([category, count]) => {

                const percentage =
                    total > 0
                        ? Math.round(
                            (count / total) * 100
                        )
                        : 0;


                const item =
                    document.createElement("div");

                item.className =
                    "category-item";


                item.innerHTML = `

                    <span class="category-name">
                        ${escapeHTML(category)}
                    </span>

                    <span class="category-count">
                        ${count}
                    </span>

                    <div class="category-track">

                        <div
                            class="category-fill"
                            style="width: ${percentage}%"
                        ></div>

                    </div>

                `;


                categoryList.appendChild(item);
            }
        );
    }


    // ====================================
    // TECHNOLOGY ANALYTICS
    // ====================================

    function renderTechnologies() {

        technologyList.innerHTML = "";


        const technologyCounts = {};


        projects.forEach(project => {

            if (!Array.isArray(project.technologies)) {
                return;
            }


            project.technologies.forEach(
                technology => {

                    if (
                        !technologyCounts[technology]
                    ) {

                        technologyCounts[technology] = 0;
                    }


                    technologyCounts[technology]++;
                }
            );
        });


        const sortedTechnologies =
            Object.entries(technologyCounts)
                .sort(
                    (a, b) => b[1] - a[1]
                );


        sortedTechnologies.forEach(
            ([technology, count]) => {

                const item =
                    document.createElement("div");

                item.className =
                    "tech-item";


                item.innerHTML = `

                    <span class="tech-name">
                        ${escapeHTML(technology)}
                    </span>

                    <span class="tech-count">
                        ${count}
                    </span>

                `;


                technologyList.appendChild(item);
            }
        );
    }


    // ====================================
    // DEVELOPMENT SUMMARY
    // ====================================

    function renderSummary() {

        let features = 0;

        let pages = 0;


        projects.forEach(project => {

            if (Array.isArray(project.features)) {

                features +=
                    project.features.length;
            }


            if (Array.isArray(project.pages)) {

                pages +=
                    project.pages.length;
            }
        });


        const technologies =
            new Set();


        projects.forEach(project => {

            if (
                Array.isArray(project.technologies)
            ) {

                project.technologies.forEach(
                    technology => {

                        technologies.add(
                            technology
                        );
                    }
                );
            }
        });


        const techCount =
            technologies.size;


        const avgFeatures =
            projects.length > 0
                ? (features / projects.length)
                    .toFixed(1)
                : "0";


        totalFeatures.textContent =
            features;


        totalPages.textContent =
            pages;


        totalTechnologies.textContent =
            techCount;


        averageFeatures.textContent =
            avgFeatures;
    }


    // ====================================
    // ESCAPE HTML
    // ====================================

    function escapeHTML(value) {

        if (
            value === undefined ||
            value === null
        ) {

            return "";
        }


        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );
    }


    // ====================================
    // INITIALIZE ANALYTICS
    // ====================================

    calculateBasicStats();

    renderProjectProgress();

    renderStatusAnalytics();

    renderCategories();

    renderTechnologies();

    renderSummary();

});