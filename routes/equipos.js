const express = require("express");
const router = express.Router();
const { 
  getEquipos, 
  getEquipoById, 
  buscarEquipoPorSerie,
  createEquipo, 
  updateEquipo, 
  deleteEquipo,
  registrarMovimiento,
  getMovimientosEquipo
} = require("../controllers/equipos");

// Rutas para equipos
router.get("/", getEquipos);
router.get("/:id", getEquipoById);
router.get("/buscar/:numeroSerie", buscarEquipoPorSerie);
router.post("/", createEquipo);
router.put("/:id", updateEquipo);
router.delete("/:id", deleteEquipo);

// Rutas para movimientos de equipos
router.post("/:equipoId/movimientos", registrarMovimiento);
router.get("/:equipoId/movimientos", getMovimientosEquipo);

module.exports = router;
