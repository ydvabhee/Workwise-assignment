const { Sequelize } = require('sequelize');

require('dotenv').config({ path: './.env' })

const DATABASE = process.env.DB_DATABASE
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST
const DIALECT = process.env.DB_DIALECT


const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
});

module.exports = sequelize