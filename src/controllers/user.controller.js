import User from "../models/User";
import Role from "../models/Role";

// Obtener usuario por ID
export const getUserById = async (req, res) => {
    try {
        const userID = req.params.userID;
        console.log("UserID:", userID);
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
};

// Editar usuario por ID
export const updateUserById = async (req, res) => {
    try {
        const userID = req.params.userID;
        const { username, email, password, roles } = req.body;

        const updateData = {};

        if (username) {
            updateData.username = username;
        }

        if (email) {
            updateData.email = email;
        }

        if (password) {
            updateData.password = await User.encryptPassword(password);
        }

        if (roles) {
            // Convertir roles a ObjectId
            const rolesFound = await Role.find({ name: { $in: roles } });
            updateData.roles = rolesFound.map(role => role._id);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar", error: error.message });
    }
};