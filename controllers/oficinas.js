const Oficinas = require("../models/Oficinas");

// Obtener todas las oficinas
const getOficinas = async (req, res) => {
  try {
    const oficinas = await Oficinas.findAll();
    res.json(oficinas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener una oficina por ID
const getOficinaById = async (req, res) => {
  try {
    const { id } = req.params;
    const oficina = await Oficinas.findByPk(id);

    if (!oficina) {
      return res.status(404).json({ msg: "Oficina no encontrada" });
    }

    res.json(oficina);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Crear una nueva oficina
const createOficina = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nuevaOficina = await Oficinas.create({ nombre });

    res.status(201).json(nuevaOficina);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Actualizar una oficina por ID
const updateOficina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const oficinaExistente = await Oficinas.findByPk(id);
    if (!oficinaExistente) {
      return res.status(404).json({ msg: "Oficina no encontrada" });
    }

    await Oficinas.update({ nombre }, { where: { id } });

    const oficinaActualizada = await Oficinas.findByPk(id);

    res.json({
      msg: "Oficina actualizada correctamente",
      oficina: oficinaActualizada
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar una oficina por ID
const deleteOficina = async (req, res) => {
  try {
    const { id } = req.params;

    const oficinaExistente = await Oficinas.findByPk(id);
    if (!oficinaExistente) {
      return res.status(404).json({ msg: "Oficina no encontrada" });
    }

    await Oficinas.destroy({ where: { id } });

    res.json({ msg: "Oficina eliminada correctamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Cargar oficinas masivamente
const cargarOficinasMasivamente = async (req, res) => {
  try {
    const oficinas = require('../../client/src/data/oficinas.json');
    
    // Primero eliminamos todas las oficinas existentes
    await Oficinas.destroy({ where: {} });
    
    // Luego insertamos todas las nuevas oficinas
    await Oficinas.bulkCreate(oficinas);
    
    res.json({ msg: 'Oficinas cargadas correctamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al cargar las oficinas");
  }
};

module.exports = {
  getOficinas,
  getOficinaById,
  createOficina,
  updateOficina,
  deleteOficina,
  cargarOficinasMasivamente
};
