import { getTasks } from "../../services/task.service.js";

export function renderDashboard() {
    return `
    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Dashboard principal</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight" id="dashboard-welcome">Bienvenido.</h1>
        <p class="mt-4 max-w-2xl text-blue-50">Resumen general del trabajo del usuario, accesos rapidos y estado actual de productividad.</p>
      </section>

      <section class="mt-8 grid gap-4 md:grid-cols-3">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">Tareas activas</p>
          <p class="mt-3 text-4xl font-black text-blue-700" id="count-activas">...</p>
        </article>
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">Completadas</p>
          <p class="mt-3 text-4xl font-black text-blue-700" id="count-completadas">...</p>
        </article>
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">Pendientes</p>
          <p class="mt-3 text-4xl font-black text-blue-700" id="count-pendientes">...</p>
        </article>
      </section>

      <section class="mt-8">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-slate-900">Accesos rapidos</h2>
            <a class="text-sm font-semibold text-blue-700 hover:text-blue-600" data-link href="/tasks">Ver tareas</a>
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" data-link href="/task-form">
              <p class="text-sm font-semibold text-blue-600">Crear</p>
              <h3 class="mt-2 text-lg font-bold text-slate-900">Nueva tarea</h3>
            </a>
            <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" data-link href="/profile">
              <p class="text-sm font-semibold text-blue-600">Cuenta</p>
              <h3 class="mt-2 text-lg font-bold text-slate-900">Editar perfil</h3>
            </a>
          </div>
        </article>
      </section>
    </main>
    `;
}

export async function setupDashboard() {
    // 1. leer el usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // 2. mostrar el nombre en el saludo
    document.getElementById('dashboard-welcome').textContent = `Bienvenido, ${user.nombre}.`;

    // 3. traer todas las tareas
    const tasks = await getTasks();

    // 4. calcular los conteos filtrando por status
    const activas = tasks.filter(t => t.status === 'En progreso').length;
    const completadas = tasks.filter(t => t.status === 'Completada').length;
    const pendientes = tasks.filter(t => t.status === 'Pendiente').length;

    // 5. pintar los conteos en los elementos
    document.getElementById('count-activas').textContent = activas;
    document.getElementById('count-completadas').textContent = completadas;
    document.getElementById('count-pendientes').textContent = pendientes;
}