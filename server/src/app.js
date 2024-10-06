const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/v1/auth.routes')
const helmet = require('helmet')
const sequelize = require('./db')
const app = express()
const port = process.env.PORT || 5000

// security
app.use(helmet())

// body parser
app.use(express.json())

// urlencoded
app.use(express.urlencoded({ extended: true }))

// cors
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// routes
app.use('/v1/auth', authRoutes)

// database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    app.listen(port, () => {
      console.log(`app listening on port ${port}`)
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })


