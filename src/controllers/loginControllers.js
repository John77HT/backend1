// loginControllers.js
const loginModel = require('../models/loginModel');

class loginControllers {
    constructor() {
        Object.preventExtensions(this);
    }

    login = async (req, res) => {
        const { email, password } = req.body;
        
        try {
            const user = await loginModel.authenticate(email, password);
            
            if (user) {
                res.status(200).json({
                    message: 'Inicio de sesión exitoso',
                    user: { id: user.id_usuario, nombre: user.nombre }
                });
            } else {
                res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al autenticar el usuario', error: error.message });
        }
    }
}

module.exports = loginControllers; // Exportando la clase
