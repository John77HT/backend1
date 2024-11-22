// loginModel.js
class loginModel {
    #orientDB;

    constructor() {
        Object.preventExtensions(this);
    }

    defineModel = async (orientDB) => {
        this.#orientDB = await orientDB;
    }

    authenticate = async (email, password) => {
        let session = await this.#orientDB.pool.acquire();

        try {
            // Realiza una consulta para buscar un usuario con el correo y contraseña proporcionados
            const user = await session.select().from('Usuario')
                .where({ email: email, contra: password })
                .one();

            return user;
        } catch (error) {
            throw new Error('Error en la autenticación');
        } finally {
            session.close(); // Cierra la sesión de OrientDB
        }
    }
}

module.exports = new loginModel();
