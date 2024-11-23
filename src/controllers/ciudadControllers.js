class CiudadControllers {
    fetchCiudades = (req, res) => {
        const message = "Has presionado la función fetchCiudades 🚀";
        res.status(200).json({ message });
    };

    fetchCiudadById = (req, res) => {
        const { id } = req.params;
        const message = `Has solicitado la ciudad con ID: ${id} 🌎`;
        res.status(200).json({ message });
    };

    createCiudad = (req, res) => {
        const message = "Has presionado la función createCiudad 🏙️";
        res.status(200).json({ message });
    };

    updateCiudad = (req, res) => {
        const { id } = req.params;
        const message = `Has actualizado la ciudad con ID: ${id} 🔄`;
        res.status(200).json({ message });
    };

    deleteCiudad = (req, res) => {
        const { id } = req.params;
        const message = `Has eliminado la ciudad con ID: ${id} 🗑️`;
        res.status(200).json({ message });
    };
}

// Exporta la clase para instanciarla en otros archivos
module.exports = CiudadControllers;
