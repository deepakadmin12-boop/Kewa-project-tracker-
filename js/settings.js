/* =========================
   KEWA SETTINGS
========================= */

const defaultSettings = {
    accent: "purple",
    compactMode: false,
    notifications: true,
    confirmActions: true
};

const settingsKey = "kewaTrackerSettings";


/* =========================
   GET SETTINGS
========================= */

function getSettings() {

    const saved = localStorage.getItem(settingsKey);

    if (!saved) {
        return { ...defaultSettings };
    }

    try {
        return {
            ...defaultSettings,
            ...JSON.parse(saved)
        };
    } catch (error) {
        return { ...defaultSettings };
    }
}


/* =========================
   SAVE SETTINGS
========================= */

function saveSettings(settings) {

    localStorage.setItem(
        settingsKey,
        JSON.stringify(settings)
    );

}


/* =========================
   APPLY ACCENT
========================= */

function applyAccent(accent) {

    const root = document.documentElement;

    const colors = {

        purple: {
            primary: "#8b5cf6",
            secondary: "#3b82f6"
        },

        blue: {
            primary: "#3b82f6",
            secondary: "#6366f1"
        },

        cyan: {
            primary: "#06b6d4",
            secondary: "#3b82f6"
        }

    };

    const selected = colors[accent] || colors.purple;

    root.style.setProperty(
        "--accent",
        selected.primary
    );

    root.style.setProperty(
        "--accent-2",
        selected.secondary
    );

}


/* =========================
   APPLY SETTINGS
========================= */

function applySettings(settings) {

    applyAccent(settings.accent);

    document.body.classList.toggle(
        "compact",
        settings.compactMode
    );

    document.getElementById("compactMode").checked =
        settings.compactMode;

    document.getElementById("notifications").checked =
        settings.notifications;

    document.getElementById("confirmActions").checked =
        settings.confirmActions;


    document.querySelectorAll(".accent-btn").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.accent === settings.accent
        );

    });

}


/* =========================
   SIDEBAR
========================= */

function setupSidebar() {

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");


    function openSidebar() {

        sidebar.classList.add("open");
        overlay.classList.add("show");

    }


    function closeSidebar() {

        sidebar.classList.remove("open");
        overlay.classList.remove("show");

    }


    menuBtn.addEventListener(
        "click",
        openSidebar
    );

    closeBtn.addEventListener(
        "click",
        closeSidebar
    );

    overlay.addEventListener(
        "click",
        closeSidebar
    );


    document.querySelectorAll(".sidebar a").forEach(link => {

        link.addEventListener("click", () => {

            closeSidebar();

        });

    });

}


/* =========================
   ACCENT BUTTONS
========================= */

function setupAccentButtons() {

    document.querySelectorAll(".accent-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const settings = getSettings();

                settings.accent =
                    button.dataset.accent;

                saveSettings(settings);

                applySettings(settings);

            });

        });

}


/* =========================
   TOGGLES
========================= */

function setupToggles() {

    const compactMode =
        document.getElementById("compactMode");

    const notifications =
        document.getElementById("notifications");

    const confirmActions =
        document.getElementById("confirmActions");


    compactMode.addEventListener(
        "change",
        () => {

            const settings = getSettings();

            settings.compactMode =
                compactMode.checked;

            saveSettings(settings);

            applySettings(settings);

        }
    );


    notifications.addEventListener(
        "change",
        () => {

            const settings = getSettings();

            settings.notifications =
                notifications.checked;

            saveSettings(settings);

        }
    );


    confirmActions.addEventListener(
        "change",
        () => {

            const settings = getSettings();

            settings.confirmActions =
                confirmActions.checked;

            saveSettings(settings);

        }
    );

}


/* =========================
   CLEAR SETTINGS
========================= */

function clearSettings() {

    const settings =
        getSettings();

    const message =
        settings.confirmActions
            ? "Clear all saved Kewa settings?"
            : null;


    if (message && !confirm(message)) {
        return;
    }


    localStorage.removeItem(settingsKey);

    applySettings(defaultSettings);

    alert("Saved settings cleared.");

}


/* =========================
   RESET SETTINGS
========================= */

function resetSettings() {

    const settings =
        getSettings();


    if (
        settings.confirmActions &&
        !confirm("Reset all settings to default?")
    ) {
        return;
    }


    saveSettings(defaultSettings);

    applySettings(defaultSettings);

    alert("Settings restored to default.");

}


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const settings =
            getSettings();

        applySettings(settings);

        setupSidebar();

        setupAccentButtons();

        setupToggles();


        document
            .getElementById("clearSettings")
            .addEventListener(
                "click",
                clearSettings
            );


        document
            .getElementById("resetSettings")
            .addEventListener(
                "click",
                resetSettings
            );

    }
);