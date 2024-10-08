const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Product = sequelize.define(
  'Products',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,

    },
    name: {
      type: DataTypes.STRING, 
      unique: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    } 
  },
  {
    // Other model options go here
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
);
 
module.exports = Product;