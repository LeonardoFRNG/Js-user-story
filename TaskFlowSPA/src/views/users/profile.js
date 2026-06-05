import { getUser } from "../../services/auth.service.js";
import { actualizarUsuario } from "../../services/users.service.js";
import { logout } from "../../services/auth.service.js";

export function renderProfile() {
    return `
        <main class="mx-auto max-w-5xl px-6 py-10">
  <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
    <aside class="rounded-[2rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Cuenta</p>
      <h1 class="mt-3 text-4xl font-black tracking-tight">Mi perfil</h1>
      <p class="mt-4 text-blue-50">Actualiza tus datos personales.</p>
    </aside>

    <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
      <form id="profile-form" class="grid gap-5">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-nombre">Nombre</label>
          <input id="profile-nombre" type="text"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-apellido">Apellido</label>
          <input id="profile-apellido" type="text"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-email">Correo</label>
          <input id="profile-email" type="email"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
        </div>
        <div class="flex flex-col gap-3 pt-2 sm:flex-row">
          <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
            Guardar cambios
          </button>
          <button type="button" id="btn-logout" class="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-700 hover:bg-red-50">
            Cerrar sesion
          </button>
        </div>
      </form>
    </section>
  </section>
</main>
    `;
}

export function setupProfile() {
    // 1. leer el usuario del localStorage
    const user = getUser();

    // 2. rellenar el formulario con los datos actuales
    document.getElementById('profile-nombre').value = user.nombre;
    document.getElementById('profile-apellido').value = user.apellido;
    document.getElementById('profile-email').value = user.email;

    // 3. guardar cambios
    const form = document.getElementById('profile-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedUser = {
            ...user, // mantiene id, password, roles
            nombre: document.getElementById('profile-nombre').value.trim(),
            apellido: document.getElementById('profile-apellido').value.trim(),
            email: document.getElementById('profile-email').value.trim(),
        };

        try {
            await actualizarUsuario(user.id, updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser)); // actualiza localStorage
            alert('Perfil actualizado correctamente');
        } catch (error) {
            alert('Error al actualizar el perfil');
        }
    });

    // 4. cerrar sesion
    document.getElementById('btn-logout').addEventListener('click', () => {
        logout();
    });
}