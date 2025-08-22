const express = require("express");
const router = express.Router();
const { getUsuarios, createUsuario, loginUsuario, logoutUsuario } = require("../controllers/usuarios");

// Definir rutas
router.get("/", getUsuarios);
router.post("/", createUsuario);
router.post("/login", loginUsuario);
router.post("/logout", logoutUsuario)

module.exports = router;
