const express = require('express');

class Router {
    #router;
    #usuarioControllers;
    #ciudadControllers; // Agregar propiedad para ciudadControllers
    #loginControllers;
    

    constructor() {
        this.#router = express.Router();
        Object.preventExtensions(this);
    }

    attachControllers = async (ousuarioControllers, ociudadControllers, ologinControllers, ografoControllers) => {
        this.#usuarioControllers = ousuarioControllers;
        this.#ciudadControllers = ociudadControllers; // Asignar ciudadControllers
        this.#loginControllers = ologinControllers;
        
    }

    prepareRouting = async () => {
        this.#router.post('/login', this.#loginControllers.login);
        // Rutas para usuarios
        this.#router.get('/usuarios', this.#usuarioControllers.fetchUsers);
        this.#router.get('/usuarios/:id_usuario', this.#usuarioControllers.fetchUserById); // Nueva ruta
        this.#router.post('/usuarios', this.#usuarioControllers.createUsers);
        this.#router.put('/usuarios/:id_usuario', this.#usuarioControllers.updateUsers);
        this.#router.delete('/usuarios/:id_usuario', this.#usuarioControllers.deleteUsers);

        // Rutas para ciudades
        this.#router.get('/ciudad', this.#ciudadControllers.fetchCiudad);
        this.#router.get('/ciudad/:id_ciudad', this.#ciudadControllers.fetchCiudadById); // Nueva ruta
        this.#router.post('/ciudad', this.#ciudadControllers.createCiudad);
        this.#router.put('/ciudad/:id_ciudad', this.#ciudadControllers.updateCiudad);
        this.#router.delete('/ciudad/:id_ciudad', this.#ciudadControllers.deleteCiudad);

        
    }

    getRouter = () => {
        return this.#router;
    }
}

module.exports = Router;
