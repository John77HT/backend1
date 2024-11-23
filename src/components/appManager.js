// Dependencias
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Importaciones de los archivos
const Router = require('../routes/router.js'); // Ajusta la ruta según tu estructura
const UsuarioControllers = require('../controllers/usuarioControllers.js'); // Ajusta la ruta según tu estructura
const CiudadControllers = require('../controllers/ciudadControllers.js'); // Ahora importa la clase correctamente

class AppManager {
    #appExpress;
    #runningConfType;

    constructor() {
        this.#init();
        Object.preventExtensions(this);
    }

    #init = async () => {
        this.#runningConfType = {}; // Configuración vacía ya que no usaremos la BD
        this.#appExpress = express();
    };

    prepareService = async () => {
        // Configura CORS
        this.#appExpress.use(
            cors({
                origin: 'https://frontend-hz67.onrender.com', // Cambia a tu dominio permitido
                methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
                credentials: true, // Si deseas permitir credenciales (como cookies)
            })
        );

        this.#appExpress.use(express.json()); // Analiza cuerpos JSON
        this.#appExpress.use(bodyParser.urlencoded({ extended: true })); // Analiza cuerpos URL encoded
        this.#appExpress.use(morgan('dev')); // Registra solicitudes

        await this.#prepareRouting(); // No es necesario preparar la base de datos
    };

    #prepareRouting = async () => {
        const oRouter = new Router();
        const oUsuarioControllers = new UsuarioControllers(); // Instancia del controlador de usuarios
        const oCiudadControllers = new CiudadControllers(); // Instancia del controlador de ciudades

        oRouter.attachControllers(oUsuarioControllers, oCiudadControllers); // Adjunta los controladores
        await oRouter.prepareRouting(); // Prepara las rutas
        this.#appExpress.use('/api', oRouter.getRouter()); // Usa el enrutador preparado
    };

    runService = async () => {
        const thisServicePort = process.env.PORT || 3000; // Usa el puerto asignado por Render o el puerto 3000 como fallback
        await this.#appExpress.listen(thisServicePort, () => {
            console.log(`AppManager is ready on port ${thisServicePort}`);
        });
    };

    // Middleware de manejo de errores
    setupErrorHandling = () => {
        this.#appExpress.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Algo salió mal!');
        });
    };
}

// Exporta la clase AppManager
module.exports = AppManager;
