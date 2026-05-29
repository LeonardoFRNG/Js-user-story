import { renderHome } from "./views/home.js";
import { renderLogin } from "./views/auth/login.js"
import { renderRegister } from "./views/auth/register.js"

const routes = { //
    "/":  {
        render: renderHome,
    },
    "/login": {
        render: renderLogin,
        setup: setupLogin,
        isAuthorized: false, // Esta ruta no requiere autenticación
    },
    "/register": {
        render: renderRegister,
        setup: setupRegister,
        isAuthorized: false, // Esta ruta no requiere autenticación
    },
    "/dashboard": {
        render: renderDashboard,
        setup: setupDashboard,
        isAuthorized: true, // Esta ruta requiere autenticación
    },
    "/admin": {
        render: renderAdmin,
        setup: setupAdmin,
        isAuthorized: true, // Esta ruta requiere autenticación
        requiredRole: "ADMIN", // Solo accesible para usuarios con rol ADMIN
    },

}