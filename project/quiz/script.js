document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.page !== "usage-guide") {
        return;
    }

    const tabs = document.querySelectorAll(".guide-tab");
    const panels = document.querySelectorAll(".guide-panel");

    function activatePanel(targetId) {
        tabs.forEach((tab) => {
            tab.classList.toggle("active", tab.dataset.target === targetId);
        });

        panels.forEach((panel) => {
            panel.classList.toggle("active", panel.id === targetId);
        });
    }

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            activatePanel(tab.dataset.target);
        });
    });
});
