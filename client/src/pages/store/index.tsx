import { userAtom } from '@/stores/user.store'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import withAccess from '../../utills/withAccess'
import withAuth from '@/utills/withAuth'
import Nav from '@/utills/Nav'
import { getAllProducts } from '@/services/product.service'
import { Spinner } from '@/utills/Spinner'
import { IoMdCart } from "react-icons/io";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure, Button } from "@nextui-org/react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify'

function index() {

  const [products, setProducts] = React.useState<any>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [originalProducts, setOriginalProducts] = React.useState<any>([])
  const [cartIteams, setCartIteams] = React.useState<any>([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [totalPrice, setTotalPrice] = React.useState(0)


  const fetchProducts = async () => {
    try {
      const response = await getAllProducts()
      if (response.status === 200) {
        setProducts(response.data.products)
        setOriginalProducts(response.data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (text: string) => {

    if (text === '') {
      setProducts(originalProducts)
    }
    const filteredProducts = originalProducts.filter((product: any) => {
      return product.name.toLowerCase().includes(text.toLowerCase()) || product.category.toLowerCase().includes(text.toLowerCase())
    })
    setProducts(filteredProducts)

  }

  const calculateTotalCartAmount = () => {
    let total = 0
    cartIteams.forEach((item: any) => {
      total += item.price * item.quantity
    })
    setTotalPrice(total)
  }

  useEffect(() => {
    calculateTotalCartAmount()
  }, [cartIteams])

  useEffect(() => {
    setIsLoading(true)
    fetchProducts()
    setIsLoading(false)
  }, [])

  const handleAddToCart = (product: any) => {
    const cartObj = {
      ...product,
      quantity: 1
    }

    // find the product in the cart
    const productIndex = cartIteams.findIndex((item: any) => item.id === product.id)

    if (productIndex !== -1) {
      // update the quantity
      const newCart = [...cartIteams]
      newCart[productIndex].quantity += 1
      setCartIteams(newCart)
      toast.success('Quantity updated')
      return
    }

    // add the product to the cart
    setCartIteams([...cartIteams, cartObj])
    toast.success('Product added to cart')

  }

  const handleRemoveProduct = (product: any) => {
    const newCart = cartIteams.filter((item: any) => item.id !== product.id)
    setCartIteams(newCart)
  }

  const handleQuantityChange = (product: any, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveProduct(product)
      return
    }
    const newCart = [...cartIteams]
    const productIndex = newCart.findIndex((item: any) => item.id === product.id)
    newCart[productIndex].quantity = quantity
    setCartIteams(newCart)
  }

  return (
    <Spinner isLoading={isLoading}>
      <div><div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <Nav title="Store" />
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between p-6 w-full md:w-4/5 mx-auto shadow-sm m-2">
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              {/* Search Input for Products */}
              <div className="w-full md:w-2/3 ">
                <label htmlFor="search" className="block text-gray-700 mb-2">Search Products</label>
                <div className='flex justify-between gap-2 items-center'>

                  <input onChange={(e) => handleSearch(e.target.value)} id="search" type="text" placeholder="Example: Books" className="block w-full border text-slate-700 border-gray-300 rounded-md p-2" />
                  <Button color="primary" onClick={() => { setProducts(originalProducts) }} className="">Clear</Button>
                  <Button onPress={onOpen} color="success" startContent={<IoMdCart />} onClick={() => { setProducts(originalProducts) }}>{cartIteams.length}</Button>
                </div>
              </div>
            </div>

            {products.length === 0 && <p className="text-gray-500">No Products Found</p>}

            <div className="w-full flex justify-start gap-6 flex-wrap">
              {
                products.length > 0 && products.map((product: any) => (

                  <div className="w-full md:min-w-[300px] md:w-auto  bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-gray-700 font-semibold text-lg capitalize">{product.name}</h3>
                    <p className="text-gray-500">Category: {product.category}</p>
                    <p className="text-gray-500"> Price: {product.price}</p>
                    <p className="text-gray-500"> Discount: {product.discount}  </p>
                    <Button color="primary" onClick={() => handleAddToCart(product)} className="mt-4">Add to Cart</Button>
                  </div>


                ))
              }
            </div>

          </div>

        </div>
      </div>
      </div>
      <>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-slate-800">Cart</ModalHeader>
                <ModalBody className='overflow-auto max-h-96'>
                  {
                    cartIteams.length === 0 && (<div> No items in the cart</div>)
                  }
                  {
                    cartIteams.length > 0 && cartIteams.map((product: any) => (

                      <div className="p-2 m-2 flex justify-between bg-text-white shadow-md text-slate-800">
                        <div>
                          <p>{product.name}</p>
                          <p>${product.price}</p>
                        </div>
                        <div className='flex flex-col justify-center items-end gap-2'>
                          <MdDeleteForever onClick={() => handleRemoveProduct(product)} className='size-6 cursor-pointer text-red-600' />

                          <form className="max-w-xs mx-auto">
                            <div className="relative flex items-center max-w-[8rem]">
                              <button onClick={() => handleQuantityChange(product, product.quantity - 1)} type="button" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-2 py-1  focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                -
                              </button>
                              <input type="text" readOnly className=" border-gray-300 text-center w-12 outline-none" placeholder={product.quantity} required />
                              <button onClick={() => handleQuantityChange(product, product.quantity + 1)} type="button" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-2 py-1  focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                +
                              </button>
                            </div>
                          </form>


                        </div>

                      </div>
                    ))
                  }
                </ModalBody>
                <ModalFooter>

                  {cartIteams.length > 0 && (
                    <>
                      <Button isDisabled={true} disableRipple={true} variant='light'>
                        Total : ${totalPrice}
                      </Button>
                      <Button color="success" >
                        Checkout
                      </Button>
                    </>
                  )
                  }
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </Spinner>

  )
}

export default withAuth(withAccess(index, ['buyer']))