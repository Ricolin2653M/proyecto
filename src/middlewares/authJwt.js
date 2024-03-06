import jwt from "jsonwebtoken";
import User from "../models/User";
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
