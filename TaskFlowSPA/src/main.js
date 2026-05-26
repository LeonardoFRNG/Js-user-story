import "./styles/global.css";
import { renderHome } from "./views/home.js";
import { renderLogin } from "./views/auth/login.js"
import { renderRegister } from "./views/auth/register.js"

const app = document.getElementById('app');

app.innerHTML = renderRegister(); //renderizamos la página de inicio al cargar la aplicación

