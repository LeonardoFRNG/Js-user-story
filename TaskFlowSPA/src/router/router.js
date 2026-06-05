import { getUser, hasRole } from "../services/auth.service.js";
import { notFoundView, routes } from "./routes.js";

function getRoute(path) {
    // primero busca la ruta exacta
    if (routes[path]) return { route: routes[path], params: {} };

    // si no, busca rutas con parámetros como /task-form/:id
    for (const key in routes) {
        const routeParts = key.split("/");
        const pathParts = path.split("/");

        if (routeParts.length !== pathParts.length) continue;

        const params = {};
        const match = routeParts.every((part, i) => {
            if (part.startsWith(":")) {
                params[part.slice(1)] = pathParts[i]; // extrae el id
                return true;
            }
            return part === pathParts[i];
        });

        if (match) return { route: routes[key], params };
    }

    return { route: { render: notFoundView }, params: {} };
}

export function renderRouter() {
    const app = document.getElementById('app');
    const currentPath = window.location.pathname;

    const { route, params } = getRoute(currentPath);

    if (route.isAuthorized) {
        const user = getUser();

        if (!user) {
            history.pushState({}, "", "/login");
            return renderRouter();
        }

        if (route.requiredRole && !hasRole(route.requiredRole)) {
            history.pushState({}, "", "/dashboard");
            return renderRouter();
        }
    }

    app.innerHTML = route.render();
    if (route.setup) route.setup(params); // le pasa el id al setup
}

export function initRouter() {
    document.addEventListener("click", (e) => {
        const link = e.target.closest("[data-link]");
        if (link) {
            e.preventDefault();
            const path = link.getAttribute("href");
            history.pushState({}, "", path);
            renderRouter();
        }
    });

    window.addEventListener("popstate", renderRouter);
}