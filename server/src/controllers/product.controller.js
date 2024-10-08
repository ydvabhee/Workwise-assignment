const uuid = require('uuid')
const { v4: UUIDV4 } = uuid
const Product = require("../models/product.model")



const getProdcuts = async (req, res) => {
   try {
      const products = await Product.findAll()
      res.status(200).send({products})
   } catch (error) {
      res.status(400).send({message: 'Something went wrong'})
   }
}

const getSellerProdcuts = async (req, res) => {
   try {
      const user = req.user
      const products = await Product.findAll({where: {seller_id: user.id}})
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
      const user = req.user
      const {name, price, discount, category} = req.body
      const id = UUIDV4()

      // Product.sync({force: true})
      const product = await Product.create({id, name, price, discount, category, seller_id: user.id})
      res.status(201).send({message: 'Product created successfully', product})
   } catch (err) {
      console.log(err);
      const message = err?.errors?.[0]?.validatorKey  === 'not_unique' ? 'Product name already exists' : 'Something went wrong'
      res.status(400).send({message})
     
   }
}

const deleteProduct = async (req, res) => {
   try {
      const {id} = req.params
      await Product.destroy({where: {id}})
      res.status(200).send({message: 'Product deleted successfully'})
   } catch (error) {
      console.log(error);
      res.status(400).send({message: 'Something went wrong'})
   }
}


 module.exports = {
   getProdcuts,
   getSellerProdcuts,
   createProduct,
   getProductById,
   deleteProduct
 }
