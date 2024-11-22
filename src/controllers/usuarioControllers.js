const usuarioModel = require('../models/usuarioModel')


class usuarioControllers {

    constructor() {
        Object.preventExtensions(this);
    }


    fetchUsers = async (req, resp) => {
        let data = await usuarioModel.fetchUsersAll();
        resp.status(200).json(data);
    }

    fetchUserById = async (req, resp) => {
        try {
            const user = await usuarioModel.fetchUserById(req.params.id_usuario);
            if (user) {
                resp.status(200).json(user);
            } else {
                resp.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            resp.status(500).json({ message: 'Error al obtener usuario', error: error.message });
        }
    }


    createUsers = async (req, resp) => {
        
        let record = await usuarioModel.createUsers(req.body);
        resp.status(200).json(record);

    }

    updateUsers = async (req, resp) => {
        try {
            // Lógica para actualizar usuarios
            let record = await usuarioModel.updateUsers(req.params.id_usuario, req.body);
            if (record) {
                resp.status(200).json({ message: 'Usuario actualizado', record });
            } else {
                resp.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            resp.status(500).json({ message: 'Error actualizando usuario', error: error.message });
        }
    };


    deleteUsers = async (req, resp) => {


        let deletedCount = await usuarioModel.deleteUser(req.params.id_usuario);

        resp.status(200).json({
            message: `User with ID ${req.params.id_usuario} deleted successfully`, deletedCount
        });
    }

}

module.exports = {
    usuarioControllers,
    usuarioModel
};
