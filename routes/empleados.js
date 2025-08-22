const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { getEmpleados, getEmpleadoById, createEmpleado, updateEmpleado, deleteEmpleado } = require("../controllers/empleados");

// Verifica si la carpeta 'uploads/' existe, si no, la crea
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Guardar imágenes en la carpeta `uploads`
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para evitar colisiones
    },
});

const upload = multer({ storage });

// Definir rutas
router.get("/", getEmpleados);
router.get("/:id", getEmpleadoById);
router.post("/", upload.single("foto"), createEmpleado);
router.put("/:id", upload.single("foto"), updateEmpleado);
router.delete("/:id", deleteEmpleado);

module.exports = router;
