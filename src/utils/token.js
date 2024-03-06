//Cargar variables de entorno
import * as dotenv from 'dotenv';
dotenv.config();

// Cargar las dependencias necesarias jwt
import jwt from 'jsonwebtoken';

//Crea la constante SECRET con el valor de la variable de entorno SECRET
const SECRET = process.env.SECRET;

//Crear constante de expiración
const EXPIRATION_TIME = 60 * 1000;

//Crear función para generar token
export const signToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        exp: Date.now() + EXPIRATION_TIME
    }
    return jwt.sign(payload, SECRET);
} 

//Crear función para verificar token
export const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
} 

//Función que verifica la expiración del token
export const validateExpiration = (payload) => {
    if (Date.now() > payload.exp) {
        throw new Error("El token ha expirado");
    }
}