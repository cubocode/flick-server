const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Oficinas = sequelize.define('Oficinas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
}, {
  tableName: 'Oficinas',
  timestamps: false,
});

module.exports = Oficinas;
