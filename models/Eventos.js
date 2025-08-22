const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Evento = sequelize.define(
  "Evento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "#3174ad",
    },
  },
  {
    tableName: "eventos",
    timestamps: false,
  }
);

module.exports = Evento;
