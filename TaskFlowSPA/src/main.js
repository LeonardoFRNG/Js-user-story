 import "./styles/global.css";
 import { renderLogin } from "./views/auth/login.js"



const app = document.getElementById('app');

app.innerHTML = renderRegister(); //renderizamos la página de inicio al cargar la aplicación

