import { getUser, hasRole } from "../services/auth.service.js";
import { notFoundView, routes } from "./routes.js";

export function renderRouter () {
    const app = document.getElementById('app'); //agarramos el contenedor
    const currentPath = window.location.pathname; //leemos la URL actual

    const route = routes[currentPath] ?? { render: notFoundView }; //busca en el mapa la ruta actual y si no esta esa ruta se va hacia el render de la izq osea notFoundView

    //GUARD

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

    app.innerHTML = route.render(); // pintamos el contenedor con el render segun la ruta
    if (route.setup) route.setup(); //activamos los event listeners
}

export function initRouter () {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-link]');//busca el elemento mas cercano al que se le hizo click que tenga el atributo data-link, esto es para detectar los clicks en los links de la aplicacion, pero no en los links externos o en otros elementos que no sean links.
        if (link) {
            e.preventDefault();//evita que el navegador recargue la pagina al hacer click en un link, porque en una SPA no queremos recargar la pagina, queremos cambiar el contenido dinamicamente
            const path = link.getAttribute('href'); //lee la ruta a la que el usuario quiere ir, que esta guardada en el atributo href del link
            history.pushState({}, "", path); //esto cambia la URL sin recargar la pagina, es como si el usuario hubiera hecho click en un link, pero sin recargar la pagina
            renderRouter();
        }
    });

    window.addEventListener('popstate', renderRouter); //detecta cuando el usuario hace click en el boton de atras o adelante del navegador y renderiza la vista correspondiente
}


