const sequelize = require('./config/database');
const Usuarios = require('./models/Usuarios');
const Tareas = require('./models/Tareas');
const Empleados = require('./models/Empleados');
const Eventos = require('./models/Eventos');
const Equipos = require('./models/Equipos');
const MovimientosEquipos = require('./models/MovimientosEquipos');
const Licencias = require('./models/Licencias');
const Oficinas = require('./models/Oficinas');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con éxito.');

    // Sincroniza todos los modelos con la base de datos
    await sequelize.sync(); 
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

syncDatabase();
