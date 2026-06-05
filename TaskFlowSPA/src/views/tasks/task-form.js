import { createTask, getTaskById, updateTask } from "../../services/task.service.js";

export function renderTaskForm() {
    return `
    <main class="mx-auto max-w-5xl px-6 py-10">
      <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Formulario</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-900" id="form-title">Crear tarea</h1>

        <form id="task-form" class="mt-8 grid gap-5">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="title">Titulo</label>
            <input id="title" type="text" placeholder="Ej. Preparar proyecto final" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="description">Descripcion</label>
            <textarea id="description" rows="5" placeholder="Describe la tarea..." class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"></textarea>
          </div>
          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="status">Estado</label>
              <select id="status" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="date">Fecha limite</label>
              <input id="date" type="date" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
          </div>
          <div class="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Guardar tarea</button>
            <a class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" data-link href="/tasks">Cancelar</a>
          </div>
        </form>
      </section>
    </main>
    `;
}

export async function setupTaskForm(params = {}) {
    const form = document.getElementById('task-form');
    if (!form) return;

    const id = params.id; // si hay id es edicion, si no es creacion

    // si hay id, cargamos los datos de la tarea en el formulario
    if (id) {
        document.getElementById('form-title').textContent = "Editar tarea";

        const task = await getTaskById(id);

        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        document.getElementById('status').value = task.status;
        document.getElementById('date').value = task.date;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const status = document.getElementById('status').value;
        const date = document.getElementById('date').value;

        if (!title || !description) {
            alert('El titulo y la descripcion son obligatorios.');
            return;
        }

        const taskData = { title, description, status, date };

        try {
            if (id) {
                await updateTask(id, taskData); // editar
            } else {
                await createTask(taskData); // crear
            }

            history.pushState({}, "", "/tasks");
            window.dispatchEvent(new PopStateEvent("popstate"));
        } catch (error) {
            alert('No se pudo guardar la tarea, intenta de nuevo.');
        }
    });
}