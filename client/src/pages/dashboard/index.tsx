'use client'

import { userAtom } from "@/stores/user.store"
import withAuth from "@/utills/withAuth"
import { useAtom } from "jotai"
import { FormEvent, useEffect, useState } from "react"
import withAccess from "../../utills/withAccess"
import Nav from "@/utills/Nav"
import { createProduct, CreateProductPayload, defautProductValue, deleteProduct, getAllProducts, getSellerProducts } from "@/services/product.service"
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Chip, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure, Input } from "@nextui-org/react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify"
import { Spinner } from "@/utills/Spinner"


type ProductWithId = {
    id: string
    name: string
    price: number
    discount: number,
    category: string

}
type productList = [
  ProductWithId
]

const Dashboard = () => {
  const [user, setUser] = useAtom(userAtom)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [productList, setProductList] = useState<[ProductWithId] | any>([])

  const [addProductObj, setAddProductObj] = useState<CreateProductPayload>(defautProductValue)

  const fetchProducts = async() => {
    try {
      const response = await getSellerProducts()
      if(response.status === 200) {
        if(response?.data?.products ) {
          // toast.success('Products fetched successfully')
          setProductList([...productList, ...response.data.products as [ProductWithId]] ) 
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchProducts()
    setIsLoading(false)
  }, [])

  const handleAddProduct = (e : FormEvent) => {
    e.preventDefault()
    setIsButtonLoading(true)
    const resp = createProduct(addProductObj)
    toast.promise(resp, { 
      pending: 'Adding product...', 
      success: {
        
        render({ data: resp }) {
          setIsButtonLoading(false)
          if(resp.status === 201) {
            if(resp?.data?.product) {
          setProductList([...productList, resp.data.product as ProductWithId] ) 
        }
          setAddProductObj(defautProductValue)
          return 'Product added successfully'
        }
      }
      }, 
      error: {
        render({ data: err } : any) {
          setIsButtonLoading(false)
          return err?.response?.data?.message ||err?.response?.data?.error || 'Something went wrong'
        } 
      } })

  }

  const handleDeleteProduct = async(id : string) => {
    const resp = deleteProduct(id)
    toast.promise(resp, { 
      pending: 'Deleting product...', 
      success: {
        render({ data: resp }) {  
          if(resp.status === 200) {
          setProductList(productList.filter((product: ProductWithId) => product.id !== id))
          return 'Product deleted successfully'
        }
      }
      }, 
      error: {}
      })
  }

  return (
    <Spinner isLoading={isLoading}>
    <div className="bg-gray-100 min-h-screen">
      <Nav title="Dashboard" />
      <div className="w-full lg:w-3/4 mx-auto ">
        <div className="w-full flex gap-2 p-5 justify-center md:justify-end">
          <Button color="primary" onPress={onOpen}>Add Product</Button>
        </div>

        { productList?.length === 0 && 
        (
          <div className="flex justify-center items-center h-96">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )
        }


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {
          productList?.length > 0 && productList?.map((product: ProductWithId) => {
            return (
              <div className=" m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          {/* Top Section: Product Info */}
          <div className="flex justify-between items-start">
            {/* Checkbox */}
            <div className="flex items-center space-x-3">

              <h2 className="text-lg font-semibold text-gray-800 capitalize">{product.name}</h2>
            </div>

            {/* Action Icons */}
            <div className="flex space-x-4">
              <MdDeleteForever onClick={() => handleDeleteProduct(product.id)} className="text-red-500 text-2xl cursor-pointer" />

            </div>
          </div>

          {/* Price and Category */}
          <div className="mt-4">
            <p className="text-gray-700">
              <span className="font-semibold ">Price:</span> ${product.price}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
          </div>

          {/* Discount Section */}
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-green-600">Discount:</span> {product.discount}% Off
            </p>
          </div>

          {/* cards */}

        </div>
            )
        })}
        </div>

      </div>


      {/* modal */}
      <>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
              <form onSubmit={handleAddProduct}>
                <ModalHeader className="flex flex-col gap-1 text-slate-800">Add New Product</ModalHeader>
                <ModalBody>
                  <Input isRequired required autoFocus label="Product Name" value={addProductObj.name} onChange={(e) => setAddProductObj({ ...addProductObj, name: e.target.value })} placeholder="Product Name" />
                  <Input isRequired required  label="Category" placeholder="Category" value={addProductObj.category} onChange={(e) => setAddProductObj({ ...addProductObj, category: e.target.value })} />
                  <Input type="number" label="Price" placeholder="Price" value={String(addProductObj.price)} onChange={(e) => setAddProductObj({ ...addProductObj, price: Number(e.target.value) })} />
                  <Input type="number" label="Discount in %" max={100} maxLength={3} placeholder="Discount" value={String(addProductObj.discount)} onChange={(e) => Number(e.target.value)<= 100 && setAddProductObj({ ...addProductObj, discount: Number(e.target.value) })} />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button isLoading={isButtonLoading} type="submit"  color="primary" >
                    Add Product
                  </Button>
                </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div> </Spinner>
  )
}

export default withAuth(withAccess(Dashboard, ['seller']))