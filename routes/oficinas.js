const express = require("express");
const router = express.Router();
const {
  getOficinas,
  getOficinaById,
  createOficina,
  updateOficina,
  deleteOficina,
  cargarOficinasMasivamente
} = require("../controllers/oficinas");

// Obtener todas las oficinas
router.get("/", getOficinas);

// Obtener una oficina por ID
router.get("/:id", getOficinaById);

// Crear una nueva oficina
router.post("/", createOficina);

// Actualizar una oficina por ID
router.put("/:id", updateOficina);

// Eliminar una oficina por ID
router.delete("/:id", deleteOficina);

// Cargar oficinas masivamente
router.post("/cargar-masivo", cargarOficinasMasivamente);

module.exports = router;
