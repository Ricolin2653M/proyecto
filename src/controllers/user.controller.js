import User from "../models/User";

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
        console.log("UserID:", userID);
        const { username, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { username, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar", error: error.message });
    }
};
