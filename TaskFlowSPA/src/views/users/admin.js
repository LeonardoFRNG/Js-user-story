import { obtenerUsuarios } from "../../services/users.service.js";

export function renderAdmin() {
    return `
    <main class="mx-auto max-w-7xl px-6 py-10">
      <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Rol administrador</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight">Panel administrativo</h1>
        <p class="mt-4 max-w-2xl text-blue-50">Gestiona usuarios, roles y permisos del sistema.</p>
      </section>

      <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <h2 class="text-xl font-bold text-slate-900">Acciones rapidas</h2>
          <div class="mt-5 grid gap-4">
            <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100" data-link href="/tasks">Ver todas las tareas</a>
            <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100" data-link href="/dashboard">Volver al dashboard</a>
          </div>
        </article>

        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <h2 class="text-xl font-bold text-slate-900">Usuarios</h2>
          <div class="mt-5 space-y-4" id="users-container">
            <!-- se generan dinamicamente -->
          </div>
        </article>
      </section>
    </main>
    `;
}

export async function setupAdmin() {
    // 1. traer todos los usuarios
    const users = await obtenerUsuarios();

    // 2. pintar cada usuario en el contenedor
    const container = document.getElementById('users-container');

    container.innerHTML = users.map(user => `
        <div class="rounded-2xl bg-blue-50 p-4">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="font-bold text-slate-900">${user.nombre} ${user.apellido}</p>
              <p class="text-sm text-slate-500">${user.email}</p>
            </div>
            <div class="flex gap-2">
              <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">${user.roles?.[0] ?? 'USER'}</span>
            </div>
          </div>
        </div>
    `).join('');
}