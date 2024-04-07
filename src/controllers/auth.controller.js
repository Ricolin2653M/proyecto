import Role from "../models/Role";
import User from "../models/User";
// Importar la dependencia jwt necesaria para la autenticación
import jwt from 'jsonwebtoken';

// Función para registrar un nuevo usuario
export const signUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    //Valida si existe el correo
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "El correo electrónico ya está en uso" });
    }

    //Valida si existe el nombre de usuario
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
    }

    // Crear un nuevo usuario con los datos proporcionados
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password), // Encriptar la contraseña antes de guardarla
    });

    // Condicional para asignar roles al nuevo usuario
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } }); // Buscar los roles en la base de datos
      newUser.roles = foundRoles.map(role => role._id); // Asignar los roles encontrados al usuario
    } else {
      const role = await Role.findOne({ name: "operator" }); // Si no se envían roles, asignar el rol de usuario por defecto
      newUser.roles = [role._id];
    }

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();
    //console.log(savedUser);
    res.status(200).json("Usuario registrado exitosamente");
  } catch (error) {
    // Enviar un mensaje de error si ocurre algún problema durante el registro
    //console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Función para iniciar sesión de un usuario
export const SignIn = async (req, res) => {
  try {
    // Buscar el usuario por su correo electrónico en la base de datos
    const userFound = await User.findOne({ email: req.body.email }).populate("roles");
    // Si no se encuentra el usuario, enviar un mensaje de error
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    // Verificar si la contraseña proporcionada coincide con la contraseña almacenada
    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    // Si la contraseña no coincide, enviar un mensaje de error
    if (!matchPassword) return res.status(401).json({ token: null, message: "Contraseña inválida" });

    // Generar un token de autenticación para el usuario encontrado
    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
      expiresIn: 1200 // Definir la expiración del token (20 minutos)
    });

    // Responder con el token generado
    res.status(200).json({ message: "Sesión iniciada con éxito ",token });
  } catch (error) {
    // Enviar un mensaje de error si ocurre algún problema durante la autenticación
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
