// 1) Funcio qie simula una peticion asincronica (como fetch a una api)

function obtenerUsuarioPorId(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const usuarios = [
                { id: 1, nombre: 'Maria', rol:"Aprendiz" },
                { id: 2, nombre: 'Luis', rol:"Instructor" },
                { id: 3, nombre: 'Pedro', rol:"Administrador" }
            ];
            const usuario = usuarios.find(u => u.id === id);
            if (usuario) {
                resolve(usuario);
            } else {
                reject(new Error('Usuario no encontrado'));
            }
        }, 3000);
    });
}

async function mostrarUsuario(id) {
    try {
        console.log("Buscando usuario con ID:", id);
        const usuario = await obtenerUsuarioPorId(id);
        console.log("Resolve => Usuario encontrado:", usuario);
    } catch (error) {
        console.error("Reject => Error al obtener el usuario:", error.message);
    }
    finally{
        console.log("Proceso de búsqueda finalizado.");
    }

}

mostrarUsuario(2); // Prueba con un ID válido
mostrarUsuario(5); // Prueba con un ID no válido