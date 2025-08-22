const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuarios");

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  try {
    const { usuario, contraseña, nivel } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { usuario } });
    if (usuarioExistente) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const newUsuario = await Usuario.create({
      usuario,
      contraseña: hashedPassword,
      nivel,
    });

    res.json(newUsuario);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

// Iniciar sesión
const loginUsuario = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    const user = await Usuario.findOne({ where: { usuario } });

    if (!user) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const payload = {
      user: {
        id: user.id,
        usuario: user.usuario,
        nivel: user.nivel,
      },
    };

    const token = jwt.sign(payload, "yourSecretKey", { expiresIn: "1h" });

    res.json({
      token,
      user: {
        id: user.id,
        usuario: user.usuario,
        nivel: user.nivel,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};
const logoutUsuario = async (req, res) => {
  try {
    // Aquí puedes agregar lógica adicional como invalidar el token en el servidor
    // o limpiar sesiones si las estás usando
    
    res.json({ message: 'Logout exitoso' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error del servidor')
  }
}
// Exportar los controladores
module.exports = {
  getUsuarios,
  createUsuario,
  loginUsuario,
  logoutUsuario,
};
