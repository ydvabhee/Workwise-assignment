const uuid = require('uuid')
const { v4: UUIDV4 } = uuid
const User = require("../models/user.model")
const bcrypt = require('bcryptjs')
const {generateToken} = require('../utills/jwt.utill')


const PASSWORD_SALT = 12

 const signin = async (req, res) => {
   try {
   const { email, password } = req.body 
   const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT)

   const user = await User.findOne({where: {email}})

   if( !user || !await bcrypt.compare(password, user.password)){
      return res.status(400).send({message: 'Wrong Credentials'})
   }
   const token = generateToken(user)
   res.status(200).send({
      message: 'User signed in successfully',
      token
   }) }
   catch(err){
      console.log(err.message)
      res.status(400).send({message : 'Something went wrong'})
   }
}

const signup = async (req, res) => {
   try{
      const {firstName, lastName, email, password, confirmPassword, type} = req.body

   const id = UUIDV4()
  
   if(password !== confirmPassword){
      return res.status(400).send('password dont match')
   }
   const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT)
   
   // await User.sync({force: true})
   await User.create({id, firstName, lastName, email, password: hashedPassword, type})

   res.status(201).send({message: 'User created successfully'})
   }
   catch(err){
      console.log(err.message)
      const message = err?.errors?.[0]?.validatorKey  === 'not_unique' ? 'Email already exists' : 'Something went wrong'
      res.status(400).send({message})
   }
   
}

 module.exports = {
    signin, signup
 }
