const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/v1/auth.routes')
const helmet = require('helmet')
const app = express()
const port = 5000

// security
app.use(helmet())

// body parser
app.use(express.json())

// cors
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// routes
app.use('/v1/auth', authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})