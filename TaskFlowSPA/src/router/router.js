import { notFoundView, routes } from "./routes.js";

export function renderRouter() {
    const app = document.getElementById('app');
    const currentPath = window.location.pathname;
    const route = routes[currentPath] ?? { render: notFoundView }; // Si no se encuentra la ruta, renderizamos la vista de "Not Found"

    app.innerHTML = route.render(); // Renderizamos la vista correspondiente a la ruta actual

    if (route.setup) {
        route.setup(); // Si la ruta tiene una función de setup, la ejecutamos para agregar interactividad
    }

} 

export function initRouter() {
    
}