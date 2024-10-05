const express = require('express')

const authRoutes = require('./routes/v1/auth.routes')

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/v1/auth', authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})