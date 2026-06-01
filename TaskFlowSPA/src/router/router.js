import { notFoundView, routes } from "./routes.js";

export function renderRouter() {
    const app = document.getElementById('app');
    const currentPath = window.location.pathname;

    const route = routes[currentPath] ?? { render: notFoundView };

    const user = 

    app.innerHTML = route.render();

    if (route.setup) {
        route.setup();
    }
}

export function initRouter() {

    // Detectar botones o links SPA
    document.addEventListener("click", (e) => {
        const link = e.target.closest("[data-link]");

        if (link) {
            e.preventDefault();

            const path = link.getAttribute("href");

            history.pushState({}, "", path);

            renderRouter();
        }
    });

    // Cuando el usuario usa atrás/adelante del navegador
    window.addEventListener("popstate", renderRouter);
}

