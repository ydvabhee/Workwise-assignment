var jwt = require('jsonwebtoken');


const generateToken = (user) => {
  const payload = {
      id: user.id,
      email: user.email,
      type: user.type
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
}

module.exports = {
  generateToken
}