const { Sequelize } = require('sequelize');

require('dotenv').config({ path: './.env' })

const DATABASE = process.env.DB_DATABASE
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST
const DIALECT = process.env.DB_DIALECT
const DB_PORT = process.env.DB_PORT

const DB_URL = process.env.DB_URL



const db_url = DB_URL ? DB_URL : `postgresql://${USERNAME}:${PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}`

console.log(db_url)
const sequelize = new Sequelize(db_url) // Example for postgres



module.exports = sequelize