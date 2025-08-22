const Licencias = require("../models/Licencias");
const { Op } = require('sequelize');

// Obtener todas las licencias
const getLicencias = async (req, res) => {
  try {
    const { mes, anio } = req.query;
    let where = {};
    
    if (mes && anio) {
      const fechaInicio = new Date(anio, mes - 1, 1);
      const fechaFin = new Date(anio, mes, 0);
      where.fecha = {
        [Op.between]: [fechaInicio, fechaFin]
      };
    }

    const licencias = await Licencias.findAll({ where });
    res.json(licencias);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener licencias por empleado
const getLicenciasPorEmpleado = async (req, res) => {
  try {
    const { empleado } = req.params;
    const { mes, anio } = req.query;
    
    let where = { empleado };
    
    if (mes && anio) {
      const fechaInicio = new Date(anio, mes - 1, 1);
      const fechaFin = new Date(anio, mes, 0);
      where.fecha = {
        [Op.between]: [fechaInicio, fechaFin]
      };
    }

    const licencias = await Licencias.findAll({ where });
    res.json(licencias);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Crear una nueva licencia
const createLicencia = async (req, res) => {
  try {
    const { empleado, fecha, tipo, observaciones } = req.body;

    // Ajustar la fecha a mediodía UTC
    const fechaAjustada = new Date(fecha);
    fechaAjustada.setUTCHours(12, 0, 0, 0);

    const nuevaLicencia = await Licencias.create({
      empleado,
      fecha: fechaAjustada,
      tipo,
      observaciones
    });

    res.status(201).json(nuevaLicencia);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Actualizar una licencia
const updateLicencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { empleado, fecha, tipo, observaciones } = req.body;

    const licenciaExistente = await Licencias.findByPk(id);
    if (!licenciaExistente) {
      return res.status(404).json({ msg: "Licencia no encontrada" });
    }

    await Licencias.update(
      {
        empleado,
        fecha,
        tipo,
        observaciones
      },
      { where: { id } }
    );

    res.json({ msg: "Licencia actualizada correctamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar una licencia
const deleteLicencia = async (req, res) => {
  try {
    const { id } = req.params;

    const licenciaExistente = await Licencias.findByPk(id);
    if (!licenciaExistente) {
      return res.status(404).json({ msg: "Licencia no encontrada" });
    }

    await Licencias.destroy({ where: { id } });

    res.json({ msg: "Licencia eliminada correctamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  getLicencias,
  getLicenciasPorEmpleado,
  createLicencia,
  updateLicencia,
  deleteLicencia
};
