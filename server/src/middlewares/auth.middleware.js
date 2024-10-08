
const jwt = require('jsonwebtoken')

 
/**
 * Authenticate user from Authorization header.
 * 
 * @function authenticate
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 * @returns {undefined}
 */
const authenticate = (req, res, next) => {
  try{
   
    const token = req.headers.authorization.split('Bearer ').pop()
    if(!token){
    throw new Error('No token provided')
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    next()
  } catch(err){
    console.log(err)
    res.status(401).send({message: 'Authentication failed'})
  }
}

const authorize = (accessRights = []) => (req, res, next) => {
  try{
     const user = req.user
     if(!user){
       return res.status(401).send({message: 'Unauthorized'})
     }

     // check access rights
    if(!accessRights.includes(user.type)){
      return res.status(403).send({message: 'Forbidden'})
    }

    next()
  } catch(err){
    console.log(err)
    res.status(403).send({message: 'Authorization failed'})
  }}

  module.exports = {
    authenticate,
    authorize
  }