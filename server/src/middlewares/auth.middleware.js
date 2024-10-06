


 
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
    const token = req.headers.authorization
    if(!token){
      return res.status(401).send({message: 'Unauthorized'})
    }

    // verify token
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded

    next()
  } catch(err){
    res.status(500).send({message: 'Authentication failed'})
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
    res.status(500).send({message: 'Authorization failed'})
  }}