const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empleados = sequelize.define('Empleados', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tarea: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  domicilio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_personal: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  email_oficial: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true, // Puede ser null si no se carga una foto
  },
}, {
  tableName: 'empleados',
  timestamps: false,
});

module.exports = Empleados;
