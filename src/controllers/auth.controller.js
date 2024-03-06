import Role from "../models/Role";
import User from "../models/User";
// Cargar las dependencias necesarias jwt
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    // Guardar el usuario en la base de datos de mongo
    //const savedUser = await newUser.save();

    // Crear el token (cambiar)
    //const token = signToken(savedUser);

    // Responder con el token
    //res.status(200).json({ token });

    //Condicional para asignar roles, en caso de que no se envíen roles,
    //se asigna el rol de usuario
    if (req.body.roles){
      const foundRoles = await Role.find({ name: { $in: roles }});
      newUser.roles = foundRoles.map(role => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }
    //Guardar el usuario en la base de datos
    const saveUser = await newUser.save();
    console.log(saveUser);
    res.status(200).json("si");
  } catch (error) {
    // Responder con los errores
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const SignIn = async (req, res) => {
  //Buscar usuario por correo
  const userFound = await User.findOne({ email: req.body.email }).populate("roles");
  //Si no se encuentra elusuario, enviar mensaje de error
  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
  
  //Verificar contraseña
  const matchPassword = await User.comparePassword(req.body.password, userFound.password);
  //Si la contraseña no coincide, enviar mensaje de error
  if (!matchPassword) return res.status(401).json({ token: null, message: "Contraseña inválida"});

  //Generar token
  const token = jwt.sign({ id: userFound._id}, process.env.SECRET, {
    expiresIn: 2000
  });
  //Mostrar usuario encontrado
  console.log(userFound);
  //JSON de prueba en caso de que se encuentre el usuario
  res.status(200).json({token});
};
