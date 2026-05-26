import { renderHome } from "./views/home.js";
import { renderLogin } from "./views/auth/login.js"
import { renderRegister } from "./views/auth/register.js"

const routes = { //
    "/": renderHome,
    "/Login": renderLogin,
    "/Register": renderRegister
}