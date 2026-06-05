const URL = "http://localhost:3000/tasks";

// CREATE: crea una tarea nueva en la base de datos
export async function createTask(task) {
    const response = await fetch(URL, {
        method: "POST", // le decimos al backend que vamos a crear algo
        headers: {
            "Content-Type": "application/json", // le avisamos que mandamos JSON
        },
        body: JSON.stringify(task) // convierte el objeto JS a texto JSON
    });

    if (!response.ok) {
        throw new Error("Error al crear la tarea"); // si algo falla, lanza el error
    }

    return await response.json(); // devuelve la tarea creada con su id generado
}

// READ - todas: trae todas las tareas de la base de datos
export async function getTasks() {
    const response = await fetch(URL); // GET es el metodo por defecto, no necesita opciones

    if (!response.ok) {
        throw new Error("Error al obtener las tareas");
    }

    return await response.json(); // devuelve un array con todas las tareas
}

// READ - una sola: trae una tarea especifica por su id
export async function getTaskById(id) {
    const response = await fetch(`${URL}/${id}`); // el id va en la URL: /tasks/3

    if (!response.ok) {
        throw new Error("Error al obtener la tarea");
    }

    return await response.json(); // devuelve UN objeto: { id, title, description, status, date }
}

// UPDATE: reemplaza una tarea existente con nuevos datos
export async function updateTask(id, task) {
    const response = await fetch(`${URL}/${id}`, { // el id va en la URL para saber cual actualizar
        method: "PUT", // PUT reemplaza toda la tarea con los nuevos datos
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task) // igual que el CREATE, mandamos los datos nuevos
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
    }

    return await response.json(); // devuelve la tarea actualizada
}

// DELETE: elimina una tarea por su id
export async function deleteTask(id) {
    const response = await fetch(`${URL}/${id}`, { // el id va en la URL para saber cual eliminar
        method: "DELETE", // DELETE no necesita headers ni body, solo el id en la URL
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la tarea");
    }
    // DELETE no devuelve nada, solo confirma que se elimino
}