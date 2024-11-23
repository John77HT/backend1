class UsuarioControllers {
    constructor() {
        Object.preventExtensions(this);
    }

    fetchUsers = async (req, resp) => {
        const data = "Acabas De Precionar La Función Fetch 😏";
        resp.status(200).json({ message: data });
    }

    fetchUsersById = (req, res) => {
        const { id } = req.params;
        const message = `Has solicitado el usuario con ID: ${id} 🌎`;
        res.status(200).json({ message });
    };

    createUsers = async (req, resp) => {
        const data = "Acabas De Precionar La Función Create 😢";
        resp.status(200).json({ message: data });
    }

    updateUsers = async (req, resp) => {
        const data = "Acabas De Precionar La Función Update 😒";
        resp.status(200).json({ message: data });
    }

    deleteUsers = async (req, resp) => {
        const data = "Acabas De Precionar La Función Delete 💀";
        resp.status(200).json({ message: data });
    }
}

// Asegúrate de exportar la clase correctamente
module.exports = UsuarioControllers;
