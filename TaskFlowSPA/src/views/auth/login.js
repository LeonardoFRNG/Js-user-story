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
  const form = document.querySelector('form') // obtnemos el formulario de login

  if (!form) return; // si no existe el formulario, salimos de la funcion para evitar errores

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevenimos el comportamiento por defecto del formulario (osea recargar la pagina)

    const email = document.getElementById('email').value.trim(); // obtenemos el valor del input de email
    const password = document.getElementById('password').value.trim(); // obtenemos el valor del input de password

    if (!email || !password) {
      alert('Por favor Ingresa tu correo y contra para iniciar sesion.')
      return;
    }


    //PETICION A LA FAKE API
    
    try {
      const res = await fetch('http://localhost:3000/users') // hacemos una peticion GET a la ruta /users para obtener la lista de usuarios registrados (en este caso, el array de usuarios en database.json)

      const users = await res.json(); // convertimos la respuesta a JSON para obtener el array de usuarios

      const user = users.find(u => u.email === email && u.password === password); // buscamos en el array de usuarios un usuario que tenga el mismo email y password que los ingresados en el formulario

      if (!user) {
        alert('Credenciales incorrectas. Por favor verifica tu correo y contrasena e intenta de nuevo.')
        return;
      }

      //GUARDAR CON LOCAL STORAGE!!!
      
      localStorage.setItem('user', JSON.stringify(user)); // guardamos en localStorage el usuario encontrado (en este caso, el objeto con email y password) para simular una sesion iniciada. Lo convertimos a string con JSON.stringify porque localStorage solo puede guardar strings.
      console.log('Login exitoso: ', user);

      //REDIRECCIONAMOS AL DASHBOARD (SPA)!!!
      history.pushState({}, "", "/dashboard"); //cambiamos la URL a /dashboard sin recargar la pagina
      window.dispatchEvent(new PopStateEvent('popstate')); // disparamos un evento de popstate para que el router detecte el cambio de URL y renderice la vista del dashboard
      
    } catch (error) {
      console.error('Error en login:', error);
      alert('Ocurrió un error al intentar iniciar sesion. Por favor intenta de nuevo.');
    }
  });
}