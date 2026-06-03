const URL = "http://localhost:3000/tasks";
//CREATE
export async function createTask(task) {
    const response = await fetch(URL, {
        method: "POST", //le decimos al backend que vamos a crear algo
        headers: {
            "Content-Type": "application/json", //le avisamos que mandamos JSON
        },
        body: JSON.stringify(task) //convierte el objeto JS a texto JSON
    });

    if (!response.ok) {
        throw new Error("Error al crear la tarea"); //si algo falla, entonces lanza el error.
    }

    return await response.json(); //convierte la respuesta JSON a objeto JS

}

//GET: el GET es el mas simple de todos porque no necesita method, headers ni body, solo la URL
export async function getTasks() {
    const response = await fetch(URL); //GET es el metodo por defecto, no necesita opciones.

    if (!response.ok) {
        throw new Error('Error al obtener las tareas');
    }

    return await response.json();
}