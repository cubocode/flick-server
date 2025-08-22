const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipos = sequelize.define('Equipos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroSerie: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activo',
  },
  ubicacionActual: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaAdquisicion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  especificaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'equipos',
  timestamps: true,
});

module.exports = Equipos;
