export const getCredentials = (req) =>{
    //Extraer headers de autorización
    const { authorization } = req.headers;
    //Validar si existe autorización
    if(!authorization){
        throw new Error('No se han proporcionado headers de autorización');
    }

//Basic
const [type, credentials] = authorization.split(" ");
 if (type !== "Basic") {
   throw new Error("El tipo de autorización debe ser Basic");

}

//Decodificar credenciales base64
const [username, password] = Buffer.from(credentials, "base64")
   .toString()
   .split(":");
   
    return { username, password };
};


export const getToken = (req) => {
    //Extraer headers de autorizaión
    const { authorization } = req.headers;
    //Validar si existe autorización
    if (!authorization) {
        throw new Error('No se han proporcionado headers de autorización');
    }
    //Bearer
    const [type, token] = authorization.split(' ');
    //Validar si el tipode autorización es correcto
    if (type !== 'Bearer') {
        throw new Error('El tipo de autorizacion es incorrecto');
    }
    return token;
}