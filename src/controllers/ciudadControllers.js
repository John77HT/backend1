class CiudadControllers {
    constructor() {
        Object.preventExtensions(this);
    }

    // Obtener todas las ciudades
    fetchCiudad = async (req, resp) => {
        const data = "Acabas de presionar la función Fetch para Ciudad 😏";
        resp.status(200).json({ message: data });
    }

    // Crear una nueva ciudad
    createCiudad = async (req, resp) => {
        const data = "Acabas de presionar la función Create para Ciudad 😢";
        resp.status(200).json({ message: data });
    }

    // Actualizar una ciudad
    updateCiudad = async (req, resp) => {
        const data = "Acabas de presionar la función Update para Ciudad 😒";
        resp.status(200).json({ message: data });
    }

    // Eliminar una ciudad
    deleteCiudad = async (req, resp) => {
        const data = "Acabas de presionar la función Delete para Ciudad 💀";
        resp.status(200).json({ message: data });
    }
}

// Asegúrate de exportar correctamente la clase
module.exports = CiudadControllers;
