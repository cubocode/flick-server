const express = require("express");
const router = express.Router();
const { getUsuarios, createUsuario, loginUsuario, logoutUsuario } = require("../controllers/usuarios");

// Definir rutas
router.get("/", getUsuarios);
router.post("/", createUsuario);
router.post("/login", loginUsuario);
router.post("/logout", logoutUsuario)

//ruta hola mundo
router.get("/hola-mundo", (req, res) => {
  res.send("Hola Mundo");
});

module.exports = router;
