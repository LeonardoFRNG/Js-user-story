import { obtenerUsuariosPorEmail } from "../../services/users.service.js";

export function renderLogin () {
    return `
        <main class="grid min-h-screen lg:grid-cols-[1fr_0.95fr]">
  <section class="flex items-center justify-center px-6 py-10">
    <div class="w-full max-w-xl rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/70">
      <div class="flex items-center justify-between">
        <a class="text-xl font-black tracking-tight text-blue-900" data-link href="/">TaskFlowSPA</a>
        <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          data-link href="/register">Registrarse</a>
      </div>

      <div class="mt-8">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Inicio de sesion</p>
        <h1 class="mt-2 text-4xl font-black tracking-tight text-slate-900">Bienvenido de nuevo</h1>
        <p class="mt-4 text-slate-600">Ingresa a tu espacio de trabajo y continua organizando tus tareas.</p>
      </div>

      <form class="mt-8 grid gap-5">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="email">Correo</label>
          <input id="email" type="email" placeholder="usuario@taskflow.com"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="password">Contrasena</label>
          <input id="password" type="password" placeholder="Ingresa tu contrasena"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
        </div>
        <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
          Entrar al dashboard
        </button>
      </form>
    </div>
  </section>

  <section class="hidden bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-center">
    <div class="mx-auto max-w-lg">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">TaskFlowSPA</p>
      <h2 class="mt-4 text-5xl font-black tracking-tight">Una experiencia limpia para aprender una primera SPA.</h2>
      <ul class="mt-8 space-y-4 text-lg leading-8 text-blue-50">
        <li>Autenticacion simplificada con localStorage.</li>
        <li>Gestion de tareas con enfoque claro y visual.</li>
        <li>Roles y permisos entendibles desde el primer recorrido.</li>
      </ul>
    </div>
  </section>
</main>
    `
}

export function setupLogin() {
  const form = document.querySelector("form");

  if (!form) return;
  
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //1. leemos los valores del formulario
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    //2. validamos que no esten vacios
    if (!email || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      //3. buscamos el usuario por email
      const usuario = await obtenerUsuariosPorEmail(email); 

      //4. si no existe el usuario o la contrasena no coincide, mostramos un error
      if (!usuario || usuario.password !== password) {
        alert("Email o contrasena incorrectos");
        return;
      }

      //5. si todo es correcto, guardamos el usuario en localStorage y redirigimos al dashboard
      localStorage.setItem("user", JSON.stringify(usuario));
      history.pushState({}, "", "/dashboard");
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
      alert("Ocurrio un error al iniciar sesion. Intenta nuevamente.");
    }
  })
}