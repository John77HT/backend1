const ciudadModel = require('../models/ciudadModel')


class ciudadControllers {

    constructor() {
        Object.preventExtensions(this);
    }


    fetchCiudad = async (req, resp) => {
        let data = await ciudadModel.fetchCiudad();
        resp.status(200).json(data);
    }

    fetchCiudadById = async (req, resp) => {
        try {
            const user = await ciudadModel.fetchCiudadById(req.params.id_ciudad);
            if (user) {
                resp.status(200).json(user);
            } else {
                resp.status(404).json({ message: 'Registro no encontrado' });
            }
        } catch (error) {
            resp.status(500).json({ message: 'Error al obtener Registro', error: error.message });
        }
    }


    createCiudad = async (req, resp) => {

        let record = await ciudadModel.createCiudad(req.body);
        resp.status(200).json(record);

    }

    updateCiudad = async (req, resp) => {
        try {
            // Lógica para actualizar registros
            let record = await ciudadModel.updateCiudad(req.params.id_ciudad, req.body);
            if (record) {
                resp.status(200).json({ message: 'registro actualizado', record });
            } else {
                resp.status(404).json({ message: 'registro no encontrado' });
            }
        } catch (error) {
            resp.status(500).json({ message: 'Error actualizando registro', error: error.message });
        }
    };



    deleteCiudad = async (req, resp) => {


        let deletedCount = await ciudadModel.deleteCiudad(req.params.id_ciudad);

        resp.status(200).json({
            message: `User with ID ${req.params.id_ciudad} deleted successfully`, deletedCount
        });
    }









}

module.exports = {
    ciudadControllers,
    ciudadModel
};
