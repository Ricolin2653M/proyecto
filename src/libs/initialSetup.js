//Importar modelo de datos Role
import Role from "../models/Role";

//Exportar función para crear roles
export const createRoles = async () => {
    try {
        //Verificar si existen roles en la base de datos
        const count = await Role.estimatedDocumentCount();
        //Si no existen roles, crearlos
        if (count > 0) return;
        //Crear roles por defecto envolviendo en una promesa
        const values = await Promise.all([
            new Role({ name: "operator" }).save(), //view
            new Role({ name: "lider" }).save(), //create and update
            new Role({ name: "admin" }).save() //cretae, update and delete 
        ]);
        console.log(values);
    } catch (error) {
        console.log(error);
    }
}
export default createRoles;