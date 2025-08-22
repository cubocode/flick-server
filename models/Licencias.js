const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Licencias = sequelize.define('Licencias', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  empleado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('TT', 'LE', 'TR', 'CF', 'RE', 'LES'),
    allowNull: false,
    comment: 'TT: Turno tarde, LE: Licencia Enfermedad, TR: Trabajo Remoto, CF: Compensatorio Feria, RE: Retiro Enfermedad, LES: Licencia Especial'
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'licencias',
  timestamps: false,
});

module.exports = Licencias;
