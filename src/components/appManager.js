// Dependencias
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');




// Importaciones de los archivos
const conf = require('../config/configbd.json'); // Configuración de la BD
const DBManager = require('./DBManager'); // Administrador de BD

const Router = require('../routes/router.js');

// Estos son mis modelos
const usuarioModel = require('../models/usuarioModel.js');
const ciudadModel= require('../models/ciudadModel.js');
const loginModel=require('../models/loginModel.js');

// Estos son los Controladores
const { usuarioControllers } = require('../controllers/usuarioControllers.js');
const { ciudadControllers } = require('../controllers/ciudadControllers.js');
//const { loginControllers } = require('../controllers/loginControllers.js');

const loginControllers = require('../controllers/loginControllers.js');


class AppManager {
    #appExpress;
    #runningConfType;

    constructor() {
        this.#init();
        Object.preventExtensions(this);
    }

    #init = async () => {
        this.#runningConfType = conf.DevConfig;
        this.#appExpress = express();
    }

    prepareService = async () => {
        // Configura CORS
        this.#appExpress.use(cors({
            origin: 'http://localhost:4200', // Cambia a tu dominio permitido
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
            credentials: true // Si deseas permitir credenciales (como cookies)
        }));

        this.#appExpress.use(express.json()); // Analiza cuerpos JSON
        this.#appExpress.use(bodyParser.urlencoded({ extended: true })); // Analiza cuerpos URL encoded
        this.#appExpress.use(morgan('dev')); // Registra solicitudes

        await this.#prepareDataBase(this.#runningConfType.db);
        await this.#prepareRouting();

        
    }

    #prepareDataBase = async (dbConfig) => {
        const oDBMan = new DBManager();
        await oDBMan.prepareDataBase(dbConfig);
        await usuarioModel.defineModel(oDBMan.getConnection());
        await ciudadModel.defineModel(oDBMan.getConnection());
        await loginModel.defineModel(oDBMan.getConnection());
    }

    #prepareRouting = async () => {
        const oRouter = new Router();
        const oUsuarioControllers = new usuarioControllers();
        const oCiudadControllers = new ciudadControllers();//instanciar controlador de ciudad
        const oLoginControllers = new loginControllers();

        

        oRouter.attachControllers(oUsuarioControllers,oCiudadControllers,oLoginControllers); // Adjunta los controladores
        await oRouter.prepareRouting();  // Prepara las rutas
        this.#appExpress.use('/api', oRouter.getRouter());  // Usa el enrutador preparado
    }

    runService = async () => {
        const thisServicePort = this.#runningConfType.service.port;
        await this.#appExpress.listen(thisServicePort, () => {
            console.log(`AppManager is ready on ${thisServicePort}`);
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
