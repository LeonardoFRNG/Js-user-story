import { renderHome } from "../views/home.js";
import { renderLogin, setupLogin } from "../views/auth/login.js";
import { renderRegister, setupRegister } from "../views/auth/register.js";
import { renderDashboard, setupDashboard } from "../views/app/dashboard.js";
import { renderAdmin, setupAdmin } from "../views/users/admin.js";
import { renderTasks, setupTasks } from "../views/tasks/tasks.js";
import { renderTaskForm, setupTaskForm } from "../views/tasks/task-form.js";
import { renderProfile, setupProfile } from "../views/users/profile.js";
import { renderNotFound } from "../views/auth/not-found.js";

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
    "/tasks": {
        render: renderTasks,
        setup: setupTasks,
        isAuthorized: true, // Esta ruta requiere autenticación
    },
    "/task-form": {
        render: renderTaskForm,
        setup: setupTaskForm,
        isAuthorized: true, // Esta ruta requiere autenticación
    },
    "/profile": {
        render: renderProfile,
        setup: setupProfile,
        isAuthorized: true, // Esta ruta requiere autenticación
    },
    "*": {
        render: renderNotFound,
    }

}

export const notFoundView = renderNotFound; // Exportamos la vista de "Not Found" para usarla en el router
export { routes };