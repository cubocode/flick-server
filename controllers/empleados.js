const Empleados = require("../models/Empleados");
const fs = require("fs");
const path = require("path");

// Obtener todos los empleados
const getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleados.findAll();
    res.json(empleados);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener un empleado por ID
const getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await Empleados.findByPk(id);

    if (!empleado) {
      return res.status(404).json({ msg: "Empleado no encontrado" });
    }

    res.json(empleado);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Crear un nuevo empleado (incluye subida de imagen)
const createEmpleado = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      fecha_nacimiento,
      cargo,
      tarea,
      domicilio,
      telefono,
      email_personal,
      email_oficial,
      observaciones,
    } = req.body;

    const foto = req.file ? `/uploads/${req.file.filename}` : null;

    const nuevoEmpleado = await Empleados.create({
      nombre,
      apellido,
      fecha_nacimiento,
      cargo,
      tarea,
      domicilio,
      telefono,
      email_personal,
      email_oficial,
      observaciones,
      foto,
    });

    res.status(201).json(nuevoEmpleado);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Actualizar un empleado por ID (incluye actualización de imagen)
const updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      fecha_nacimiento,
      cargo,
      tarea,
      domicilio,
      telefono,
      email_personal,
      email_oficial,
      observaciones,
      foto_actual
    } = req.body;

    const empleadoExistente = await Empleados.findByPk(id);
    if (!empleadoExistente) {
      return res.status(404).json({ msg: "Empleado no encontrado" });
    }

    let nuevaFoto = foto_actual || empleadoExistente.foto; // Usar foto actual o mantener la existente

    // Si se sube una nueva imagen
    if (req.file) {
      // Si hay una foto anterior y no es la default, intentar eliminarla
      if (empleadoExistente.foto && empleadoExistente.foto !== '/uploads/default.png') {
        try {
          const rutaImagenAnterior = path.join(__dirname, '..', empleadoExistente.foto);
          if (fs.existsSync(rutaImagenAnterior)) {
            fs.unlinkSync(rutaImagenAnterior);
          }
        } catch (error) {
          console.error('Error al eliminar la imagen anterior:', error);
          // Continuar con la actualización aunque falle la eliminación
        }
      }
      nuevaFoto = `/uploads/${req.file.filename}`;
    }

    // Actualizar los datos en la base de datos
    const empleadoActualizado = await Empleados.update(
      {
        nombre,
        apellido,
        fecha_nacimiento,
        cargo,
        tarea,
        domicilio,
        telefono,
        email_personal,
        email_oficial,
        observaciones,
        foto: nuevaFoto,
      },
      { 
        where: { id },
        returning: true
      }
    );

    // Obtener el empleado actualizado para enviarlo en la respuesta
    const empleadoActualizadoData = await Empleados.findByPk(id);

    res.json({
      msg: "Empleado actualizado correctamente",
      empleado: empleadoActualizadoData
    });
  } catch (err) {
    console.error("Error al actualizar el empleado:", err);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar un empleado por ID
const deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const empleadoExistente = await Empleados.findByPk(id);
    if (!empleadoExistente) {
      return res.status(404).json({ msg: "Empleado no encontrado" });
    }

    await Empleados.destroy({ where: { id } });

    res.json({ msg: "Empleado eliminado correctamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Exportar las funciones
module.exports = {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
};
