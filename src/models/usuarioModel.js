class usuarioModel {

    #orientDB;

    constructor() {
        Object.preventExtensions(this);
    }
    defineModel = async (orientDB) => {
        this.#orientDB = await orientDB;

    }


    fetchUsersAll = async () => {
        let session = await this.#orientDB.pool.acquire();
        let data;
        //if(rid)
        data = await session.select().from('Usuario').all();
      
        session.close();
        return data;


    }

    fetchUserById = async (id_usuario) => {
        let session = await this.#orientDB.pool.acquire();
        try {
            return await session.select().from('Usuario').where({ 'id_usuario': id_usuario }).one();
        } finally {
            session.close();
        }
    }


    createUsers = async (object) => {
        let session = await this.#orientDB.pool.acquire();
        let idRecord = await session.create('Vertex', 'Usuario').set(object).one();
        return idRecord;


    }

    updateUsers = async (id_usuario, object) => {
        let session = await this.#orientDB.pool.acquire();
        try {
            // Realizamos la actualización del usuario con el campo id_usuario
            let result = await session.update('Usuario')
                .set(object)
                .where({ 'id_usuario': id_usuario }) // Usamos id_usuario en lugar de @rid
                .return('AFTER')
                .one();

            return result;
        } catch (error) {
            throw new Error('Error actualizando el usuario');
        } finally {
            session.close(); // Cierra la sesión de OrientDB
        }
    };

    deleteUser = async(id_usuario)=>{
        
        let session = await this.#orientDB.pool.acquire();
        let deletedCount = await session.delete('Vertex', 'Usuario').where({ 'id_usuario': id_usuario }).one();
         return deletedCount; 
    
    };
    


}

module.exports = usuarioModel = new usuarioModel();
