const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MovimientosEquipos = sequelize.define('MovimientosEquipos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  equipoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'equipos',
      key: 'id'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ubicacionOrigen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ubicacionDestino: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsable: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'movimientos_equipos',
  timestamps: true,
});

module.exports = MovimientosEquipos; 