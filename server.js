const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const usuariosRoutes = require("./routes/usuarios"); // Importar rutas de usuarios
const tareasRoutes = require("./routes/tareas"); // Importar rutas de tareas
const empleadosRoutes = require("./routes/empleados"); // Importar rutas de empleados
const eventosRoutes = require("./routes/eventos"); // Importar rutas de eventos
const equiposRoutes = require("./routes/equipos"); // Importar rutas de equipos
const licenciasRoutes = require("./routes/licencias"); // Importar rutas de licencias
const oficinasRoutes = require("./routes/oficinas"); // Importar rutas de oficinas
const app = express();
const ping = require('ping');

// Asegurar que existe el directorio uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Directorio uploads creado exitosamente');
}

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.71:3000", "http://localhost:3002"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar las rutas de usuarios
app.use("/usuarios", usuariosRoutes);
app.use("/tareas", tareasRoutes);
app.use("/empleados", empleadosRoutes);
app.use("/eventos", eventosRoutes);
app.use("/equipos", equiposRoutes);
app.use("/licencias", licenciasRoutes);
app.use("/oficinas", oficinasRoutes); 
app.get('/ping', async (req, res) => {
  const { host } = req.query;
  try {
      const result = await ping.promise.probe(host);
      res.json({ 
          success: result.alive,
          time: result.time,
          host: result.host
      });
  } catch (error) {
      res.json({ 
          success: false,
          error: error.message
      });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
