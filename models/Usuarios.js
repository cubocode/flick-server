const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuarios = sequelize.define('Usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Para asegurar que el nombre de usuario sea único
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[1, 2, 3]], 
    },
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = Usuarios;
