import { createTask, getTaskById, updateTask } from "../../services/task.service.js"; //importamos la funcion que crea tareas del servicio, para usarla en el form

export function renderTaskForm() {
  return `
    <main class="mx-auto max-w-5xl px-6 py-10">
      <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Formulario</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-900">Crear tarea</h1>
        <p class="mt-4 max-w-2xl text-slate-600">Registra una nueva tarea para el proyecto.</p>

        <form id="task-form" class="mt-8 grid gap-5">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="title">Titulo</label>
            <input id="title" name="title" type="text" placeholder="Ej. Preparar proyecto final" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="description">Descripcion</label>
            <textarea id="description" name="description" rows="5" placeholder="Describe la tarea..." class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"></textarea>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="status">Estado</label>
              <select id="status" name="status" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="date">Fecha limite</label>
              <input id="date" name="date" type="date" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
          </div>

          <div class="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Guardar tarea</button>
            <a class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" data-link href="/tasks">Cancelar</a>
          </div>
        </form>
      </section>
    </main>
    `}

export function setupTaskForm() {
  const form = document.getElementById('task-form'); //busca el form que renderTaskForm ya pinto en el dom

  if (!form) return; //si no encontro el form simplemente no devuelve nada

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); //evita que el navegador recargue la pagina al hacer submit

    //1. ahora leemos los valores del formulario:
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const status = document.getElementById('status').value;
    const date = document.getElementById('date').value;

    //2. validamos que los campos que son obligatorios no esten vacios
    if (!title || !description) {
      alert('El titulo y la descripcion son obligatorios. ');
      return; //detiene la ejecucion si falta algo
    }

    //3. armamos el objeto con los datos de la tarea 
    const newTask = { title, description, status, date };

    //4. Intenta crear la tarea
    try {
      await createTask(newTask); //await. espera aque el fetch termine antes de continuar

      history.pushState({}, "", "/tasks"); //esto cambia la URL sin recargar la pagina, es como si el usuario hubiera hecho click en un link, pero sin recargar la pagina
      window.dispatchEvent(new Event("popstate")); //esto le dice a la aplicacion que cambie de vista, es como si el usuario hubiera hecho click en un link, pero sin recargar la pagina
    } catch (error) {
      console.log('No se pudo crear la tarea, intenta de nuevo.');
    }
  });
}
