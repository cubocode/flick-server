const Evento = require("../models/Eventos");

// Obtener todos los eventos
const getEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (err) {
    console.error("Error al obtener eventos:", err);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener un evento por ID
const getEventoById = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id);

    if (!evento) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    res.json(evento);
  } catch (err) {
    console.error("Error al obtener evento:", err);
    res.status(500).send("Error en el servidor");
  }
};

// Crear un nuevo evento
const createEvento = async (req, res) => {
  try {
    const { title, start, end, descripcion, ubicacion, color } = req.body;

    const nuevoEvento = await Evento.create({
      title,
      start,
      end,
      descripcion,
      ubicacion,
      color,
    });

    res.status(201).json(nuevoEvento);
  } catch (err) {
    console.error("Error al crear evento:", err);
    res.status(500).send("Error en el servidor");
  }
};

// Actualizar un evento por ID
const updateEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start, end, descripcion, ubicacion, color } = req.body;

    const eventoExistente = await Evento.findByPk(id);
    if (!eventoExistente) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    await Evento.update(
      {
        title,
        start,
        end,
        descripcion,
        ubicacion,
        color,
      },
      { where: { id } }
    );

    res.json({ msg: "Evento actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar el evento:", err);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar un evento por ID
const deleteEvento = async (req, res) => {
  try {
    const { id } = req.params;

    const eventoExistente = await Evento.findByPk(id);
    if (!eventoExistente) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    await Evento.destroy({ where: { id } });

    res.json({ msg: "Evento eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar el evento:", err);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  getEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
};
