const URL = "http://localhost:3000/tasks";

// traemos todas las tareas

export async function getTasks() {
    const response = await fetch (URL);
    const data = await response.json();
    return data;
}
