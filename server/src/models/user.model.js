const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const User = sequelize.define(
  'Users',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,

    },
   
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      lowercase: true,
    },
    lastName: {
      type: DataTypes.STRING,
      lowercase: true,
   
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      lowercase: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    type : {
      type: DataTypes.STRING,
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
 
module.exports = User;