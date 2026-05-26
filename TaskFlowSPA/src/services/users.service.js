async function crearUsuario(usuario) {
    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) {
        throw new Error("Error al crear el usuario");
    }
    return await response.json();
}