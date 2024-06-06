import User from "../models/User";

// Obtener usuario por ID
export const getUserById = async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await User.findById(userID);

        if (!user){
            return res.status(404).json({ message: ' Usuario no encontrado'});
        }

        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
};

// Editar usuario por ID
export const updateUserById = async (req, res) => {
    try {

        
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
