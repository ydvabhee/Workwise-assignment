const uuid = require('uuid')
const { v4: UUIDV4 } = uuid
const User = require("../models/user.model")
const bcrypt = require('bcryptjs')
const {generateToken} = require('../utills/jwt.utill')


const PASSWORD_SALT = 12

 const getUser = async (req, res) => {
   try {
   
   const userId = req.user.id

   const user = await User.findOne({where: {id: userId}, attributes: ['id', 'firstName', 'lastName', 'email', 'type']})

   if(!user){
      return res.status(404).send({message: 'User not found'})
   }

   res.status(200).send({
      message: 'User found successfully',
      user
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
    getUser
 }
