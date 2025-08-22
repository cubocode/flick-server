const Equipos = require("../models/Equipos");
const MovimientosEquipos = require("../models/MovimientosEquipos");
const { Op } = require("sequelize");

// Obtener todos los equipos
const getEquipos = async (req, res) => {
  try {
    const equipos = await Equipos.findAll();
    res.json(equipos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener un equipo por ID
const getEquipoById = async (req, res) => {
  try {
    const { id } = req.params;
    const equipo = await Equipos.findByPk(id, {
      include: [{
        model: MovimientosEquipos,
        as: 'movimientos',
        order: [['fecha', 'DESC']]
      }]
    });

    if (!equipo) {
      return res.status(404).json({ msg: "Equipo no encontrado" });
    }

    res.json(equipo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Buscar equipo por número de serie
const buscarEquipoPorSerie = async (req, res) => {
  try {
    const { numeroSerie } = req.params;
    const equipo = await Equipos.findOne({
      where: { numeroSerie },
      include: [{
        model: MovimientosEquipos,
        as: 'movimientos',
        order: [['fecha', 'DESC']]
      }]
    });

    if (!equipo) {
      return res.status(404).json({ msg: "Equipo no encontrado" });
    }

    res.json(equipo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Crear un nuevo equipo
const createEquipo = async (req, res) => {
  try {
    const { 
      tipo, 
      marca, 
      modelo, 
      numeroSerie, 
      estado, 
      ubicacionActual, 
      fechaAdquisicion, 
      especificaciones, 
      observaciones 
    } = req.body;

    const nuevoEquipo = await Equipos.create({
      tipo,
      marca,
      modelo,
      numeroSerie,
      estado,
      ubicacionActual,
      fechaAdquisicion,
      especificaciones,
      observaciones
    });

    res.status(201).json(nuevoEquipo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Actualizar un equipo
const updateEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      tipo, 
      marca, 
      modelo, 
      numeroSerie, 
      estado, 
      ubicacionActual, 
      fechaAdquisicion, 
      especificaciones, 
      observaciones 
    } = req.body;

    const equipoExistente = await Equipos.findByPk(id);
    if (!equipoExistente) {
      return res.status(404).json({ msg: "Equipo no encontrado" });
    }

    await Equipos.update(
      {
        tipo,
        marca,
        modelo,
        numeroSerie,
        estado,
        ubicacionActual,
        fechaAdquisicion,
        especificaciones,
        observaciones
      },
      { where: { id } }
    );

    res.json({ msg: "Equipo actualizado correctamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar un equipo
const deleteEquipo = async (req, res) => {
  try {
    const { id } = req.params;

    const equipoExistente = await Equipos.findByPk(id);
    if (!equipoExistente) {
      return res.status(404).json({ msg: "Equipo no encontrado" });
    }

    await Equipos.destroy({ where: { id } });

    res.json({ msg: "Equipo eliminado correctamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Registrar un movimiento de equipo
const registrarMovimiento = async (req, res) => {
  try {
    const { equipoId } = req.params;
    const { fecha, ubicacionOrigen, ubicacionDestino, motivo, responsable } = req.body;

    const equipo = await Equipos.findByPk(equipoId);
    if (!equipo) {
      return res.status(404).json({ msg: "Equipo no encontrado" });
    }

    // Crear el movimiento
    const nuevoMovimiento = await MovimientosEquipos.create({
      equipoId,
      fecha,
      ubicacionOrigen,
      ubicacionDestino,
      motivo,
      responsable
    });

    // Actualizar la ubicación actual del equipo
    await Equipos.update(
      { ubicacionActual: ubicacionDestino },
      { where: { id: equipoId } }
    );

    res.status(201).json(nuevoMovimiento);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener movimientos de un equipo
const getMovimientosEquipo = async (req, res) => {
  try {
    const { equipoId } = req.params;
    
    const movimientos = await MovimientosEquipos.findAll({
      where: { equipoId },
      order: [['fecha', 'DESC']]
    });

    res.json(movimientos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Exportar las funciones
module.exports = {
  getEquipos,
  getEquipoById,
  buscarEquipoPorSerie,
  createEquipo,
  updateEquipo,
  deleteEquipo,
  registrarMovimiento,
  getMovimientosEquipo
};
