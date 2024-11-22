class ciudadModel {

    #orientDB;

    constructor() {
        Object.preventExtensions(this);
    }
    defineModel = async (orientDB) => {
        this.#orientDB = await orientDB;

    }


    fetchCiudad = async () => {
        let session = await this.#orientDB.pool.acquire();
        let data;
        //if(rid)
        data = await session.select().from('Ciudad').all();

        session.close();
        return data;


    }

    fetchCiudadById = async (id_ciudad) => {
        let session = await this.#orientDB.pool.acquire();
        try {
            return await session.select().from('Ciudad').where({ 'id_ciudad': id_ciudad }).one();
        } finally {
            session.close();
        }
    }


    createCiudad = async (object) => {
        let session = await this.#orientDB.pool.acquire();
        let idRecord = await session.create('Vertex', 'Ciudad').set(object).one();
        return idRecord;


    }

    updateCiudad = async (id_ciudad, object) => {
        let session = await this.#orientDB.pool.acquire();
        try {
            // Realizamos la actualización del registro con el campo id_ciudad
            let result = await session.update('Ciudad')
                .set(object)
                .where({ 'id_ciudad': id_ciudad }) // Usamos id_ciudad en lugar de @rid
                .return('AFTER')
                .one();

            return result;
        } catch (error) {
            throw new Error('Error actualizando el registro');
        } finally {
            session.close(); // Cierra la sesión de OrientDB
        }
    };

    deleteCiudad = async (id_ciudad) => {

        let session = await this.#orientDB.pool.acquire();
        let deletedCount = await session.delete('Vertex', 'Ciudad').where({ 'id_ciudad': id_ciudad }).one();
        return deletedCount;

    };








}

module.exports = ciudadModel = new ciudadModel();
