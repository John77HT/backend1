// Dependencias
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Importaciones de los archivos
const Router = require('../routes/router.js');

// Estos son mis modelos simulados (datos simulados)
const usuarioModel = require('../models/usuarioModel.js');
const ciudadModel = require('../models/ciudadModel.js');


// Estos son los Controladores
const UsuarioControllers = require('../controllers/usuarioControllers.js'); // Corregido
const CiudadControllers = require('../controllers/ciudadControllers.js'); // Corregido


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
    }

    prepareService = async () => {
        // Configura CORS
        this.#appExpress.use(cors({
            origin: 'https://fron-4szv.onrender.com', // Cambia a tu dominio permitido
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
            credentials: true // Si deseas permitir credenciales (como cookies)
        }));

        this.#appExpress.use(express.json()); // Analiza cuerpos JSON
        this.#appExpress.use(bodyParser.urlencoded({ extended: true })); // Analiza cuerpos URL encoded
        this.#appExpress.use(morgan('dev')); // Registra solicitudes

        await this.#prepareRouting();  // No es necesario preparar la base de datos
    }

    #prepareRouting = async () => {
        const oRouter = new Router();
        const oUsuarioControllers = new UsuarioControllers(); // Corregido
        const oCiudadControllers = new CiudadControllers(); // Instanciado correctamente
        

        oRouter.attachControllers(oUsuarioControllers, oCiudadControllers); // Adjunta los controladores
        await oRouter.prepareRouting();  // Prepara las rutas
        this.#appExpress.use('/api', oRouter.getRouter());  // Usa el enrutador preparado
    }

    /*runService = async () => {
        const thisServicePort = 3000; // O usa otro puerto si lo deseas
        await this.#appExpress.listen(thisServicePort, () => {
            console.log(`AppManager is ready on ${thisServicePort}`);
        });
    }*/

    runService = async () => {
        const thisServicePort = process.env.PORT || 3000; // Usa el puerto asignado por Render o el puerto 3000 como fallback
        await this.#appExpress.listen(thisServicePort, () => {
            console.log(`AppManager is ready on port ${thisServicePort}`);
        });
    }
    

    // Middleware de manejo de errores
    setupErrorHandling = () => {
        this.#appExpress.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Algo salió mal!');
        });
    }
}

// Exporta la clase AppManager
module.exports = AppManager;
