import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";

// Middleware para verificar si el token es válido
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']; // Obtener el token de los encabezados de la solicitud
        if (!token) return res.status(403).json({ message: "No se ha proporcionado ningún Token" }); // Enviar un mensaje de error si no se proporciona ningún token

        const decoded = jwt.verify(token, process.env.SECRET); // Verificar el token utilizando la clave secreta
        req.userId = decoded.id; // Establecer el ID del usuario decodificado en el objeto de solicitud
        const user = await User.findById(req.userId, { password: 0 }); // Buscar al usuario en la base de datos y excluir la contraseña de la respuesta

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" }); // Enviar un mensaje de error si el usuario no se encuentra

        next(); // Llamar al siguiente middleware si el token es válido y el usuario existe
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token inválido' }); // Enviar un mensaje de error si el token es inválido
    }
}

// Middleware para verificar si el usuario es un moderador
export const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId); // Buscar al usuario en la base de datos
        const roles = await Role.find({ _id: { $in: user.roles } }); // Buscar los roles del usuario
        for (let i = 0; i < roles.length; i++) { // Recorrer los roles del usuario
            if (roles[i].name === "moderator") { // Si el usuario tiene el rol de moderador, llamar al siguiente middleware
                next();
                return;
            }
        }
        return res.status(403).json({ message: "Requiere ser moderador" }); // Enviar un mensaje de error si el usuario no es moderador
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" }); // Enviar un mensaje de error si ocurre un error interno del servidor
    }
}

// Middleware para verificar si el usuario es un administrador
export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId); // Buscar al usuario en la base de datos
        const roles = await Role.find({ _id: { $in: user.roles } }); // Buscar los roles del usuario
        for (let i = 0; i < roles.length; i++) { // Recorrer los roles del usuario
            if (roles[i].name === "admin") { // Si el usuario tiene el rol de administrador, llamar al siguiente middleware
                next();
                return;
            }
        }
        return res.status(403).json({ message: "Requiere ser administrador" }); // Enviar un mensaje de error si el usuario no es administrador
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" }); // Enviar un mensaje de error si ocurre un error interno del servidor
    }
}

// Middleware para verificar si el usuario es un administrador o un moderador
export const isAdminOrModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId); // Buscar al usuario en la base de datos
        const roles = await Role.find({ _id: { $in: user.roles } }); // Buscar los roles del usuario
        for (let i = 0; i < roles.length; i++) { // Recorrer los roles del usuario
            if (roles[i].name === "admin" || roles[i].name === "moderator") { // Si el usuario tiene el rol de administrador o moderador, llamar al siguiente middleware
                next();
                return;
            }
        }
        return res.status(403).json({ message: "Requiere ser administrador o moderador" }); // Enviar un mensaje de error si el usuario no es administrador o moderador
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" }); // Enviar un mensaje de error si ocurre un error interno del servidor
    }
}
