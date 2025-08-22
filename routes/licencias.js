const express = require("express");
const router = express.Router();
const {
  getLicencias,
  getLicenciasPorEmpleado,
  createLicencia,
  updateLicencia,
  deleteLicencia
} = require("../controllers/licencias");

// Rutas para licencias
router.get("/", getLicencias);
router.get("/empleado/:empleado", getLicenciasPorEmpleado);
router.post("/", createLicencia);
router.put("/:id", updateLicencia);
router.delete("/:id", deleteLicencia);

module.exports = router;
