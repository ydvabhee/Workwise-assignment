const uuid = require('uuid')
const { v4: UUIDV4 } = uuid
const Product = require("../models/product.model")



const getProdcutAll = async (req, res) => {
   try {
      const products = await Product.findAll()
      res.status(200).send({products})
   } catch (error) {
      res.status(400).send({message: 'Something went wrong'})
   }
}

const getProductById = async (req, res) => {
   try {
      const {id} = req.params
      const product = await Product.findOne({where: {id}})
      res.status(200).send({product})
   } catch (error) {
      console.log(error);
      res.status(400).send({message: 'Something went wrong'})
   }
}

const createProduct = async (req, res) => {
   try {
      const {name, price, discount, category} = req.body
      const id = UUIDV4()
      
      const product = await Product.create({id, name, price, discount, category})
      res.status(201).send({message: 'Product created successfully', product})
   } catch (err) {
      const message = err?.errors?.[0]?.validatorKey  === 'not_unique' ? 'Product name already exists' : 'Something went wrong'
      res.status(400).send({message})
     
   }
}


 module.exports = {
   getProdcutAll,
   createProduct,
   getProductById
 }
