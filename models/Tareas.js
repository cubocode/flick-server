const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tareas = sequelize.define('Tareas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  solicitado_por: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  oficina: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  tarea: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nro_sistema: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nro_admin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asignado_a: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente',
  },
}, {
  tableName: 'tareas',
  timestamps: false,
});

module.exports = Tareas;
