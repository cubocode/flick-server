const Tareas = require("../models/Tareas");

// Obtener todas las tareas
const getTareas = async (req, res) => {
  try {
    const tareas = await Tareas.findAll();
    res.json(tareas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener una tarea por ID
const getTareaById = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tareas.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    res.json(tarea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};


const createTarea = async (req, res) => {
  try {
    const { fecha, solicitado_por, oficina, tarea, nro_sistema, nro_admin, asignado_a, observacion, estado } = req.body;

    const nuevaTarea = await Tareas.create({
      fecha,
      solicitado_por,  
      oficina,      
      tarea,
      nro_sistema,
      nro_admin,
      asignado_a,
      observacion,
      estado,
    });

    res.status(201).json(nuevaTarea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

const updateTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, solicitado_por, oficina, tarea, nro_sistema, nro_admin, asignado_a, observacion, estado } = req.body;

    const tareaExistente = await Tareas.findByPk(id);
    if (!tareaExistente) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    await Tareas.update(
      {
        fecha,
        solicitado_por,  
        oficina,        
        tarea,
        nro_sistema,
        nro_admin,
        asignado_a,
        observacion,
        estado,
      },
      { where: { id } }
    );

    res.json({ msg: "Tarea actualizada correctamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar una tarea por ID
const deleteTarea = async (req, res) => {
  try {
    const { id } = req.params;

    const tareaExistente = await Tareas.findByPk(id);
    if (!tareaExistente) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    await Tareas.destroy({ where: { id } });

    res.json({ msg: "Tarea eliminada correctamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Exportar las funciones
module.exports = {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
};
