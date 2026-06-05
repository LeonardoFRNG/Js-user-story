import { getTasks, deleteTask } from "../../services/task.service.js";

export function renderTasks() {
  return `
        <main class="mx-auto max-w-6xl px-6 py-10">
          <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
              <h1 class="mt-3 text-4xl font-black tracking-tight">Mis tareas</h1>
              <p class="mt-4 max-w-2xl text-blue-50">Vista principal para listar, editar y eliminar las tareas del usuario autenticado.</p>
            </div>
            <a class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" data-link href="/task-form">
              Crear tarea
            </a>
          </section>

          <section class="mt-8 grid gap-4" id="tasks-container">
            <!-- Las tarjetas se generan dinámicamente en setupTasks() -->
          </section>
        </main>
    `
}

export async function setupTasks() {
  // placeholder for tasks setup
  
  //1 pedimos las tareas al backend
  const tasks = await getTasks();

  //2. Buscamos el contenedor donde van las tarjetas
  const container = document.getElementById('tasks-container');

  //3. Por cada tarea, generamos una tarea y la metemos en el contenedor
  container.innerHTML = tasks.map(task => `
              <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${task.status}</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">${task.title}</h2>
              <p class="mt-3 max-w-2xl text-slate-600">${task.description}</p>
            </div>
            <div class="flex gap-3">
              <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" data-link href="/task-form/${task.id}">Editar</a>
              <button class="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50" data-id="${task.id}">Eliminar</button>
            </div>
          </div>
        </article>
    `).join(""); //.map devuelve un array de strings, join("") los une en un solo string
    
    setupDeleteButtons(); //despues de pintar las tareas, setupDeleteButtons busca los botones de eliminar y les pone el evento
}

function setupDeleteButtons() {
  //1. buscamos todos los botones que tengan data-id
  const buttons = document.querySelectorAll("[data-id]");

  //2. A cada boton le agrega un evento click
  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      //3. lee el id guardado en el boton 
      const id = button.getAttribute('data-id');
      //4. pide confirmacion antes de eliminar
      const confirmed = confirm("Estás seguro de eliminar esta tarea?");

      if (!confirmed) return; //si el usuario cancela, no hace nada

      //5. llama al servicio para eliminar la tarea
      try {
        await deleteTask(id); //espera a que el fetch termine antes de continuar
        await setupTasks(); //vuelve a cargar las tareas para actualizar la vista
      } catch (error) {
        console.log("No se pudo eliminar la tarea, intenta de nuevo.");
      }
    })
  })
}
