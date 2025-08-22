const express = require("express");
const router = express.Router();
const {
  getEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
} = require("../controllers/eventos");

// Definir rutas
router.get("/", getEventos);
router.get("/:id", getEventoById);
router.post("/", createEvento);
router.put("/:id", updateEvento);
router.delete("/:id", deleteEvento);

module.exports = router;
