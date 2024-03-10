import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role"
//Validar si el token es válido
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(403).json({ message: "No se ha proporcionado ningún Token" });
        console.log(token);

        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        console.log(decoded);

        const user = await User.findById(req.userId, { password: 0 });
        console.log(user);

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token inválido' });
    }
}

export const isModerator = async (req, res, next) => {
    //Buscar el usuario en la base de datos
    const user = await User.findById(req.userId);
    //Buscar los roles del usuario
    const roles = await Role.find({ _id: { $in: user.roles } });
    //console.log(roles);
    // Recorrer los roles del usuario
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Requiere ser administrador" });
}
export const isAdmin = async (req, res, next) => {
    //Buscar el usuario en la base de datos
    const user = await User.findById(req.userId);
    //Buscar los roles del usuario
    const roles = await Role.find({ _id: { $in: user.roles } });
    //console.log(roles);
    // Recorrer los roles del usuario
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Requiere ser administrador" });
}
export const isAdminOrModerator = async (req, res, next) => {
    //Buscar el usuario en la base de datos
    const user = await User.findById(req.userId);
    //Buscar los roles del usuario
    const roles = await Role.find({ _id: { $in: user.roles } });
    //console.log(roles);
    // Recorrer los roles del usuario
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin" || roles[i].name === "moderator") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Requiere ser administrador o moderador" });
}