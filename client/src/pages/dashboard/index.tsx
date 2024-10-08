'use client'

import { userAtom } from "@/stores/user.store"
import withAuth from "@/utills/withAuth"
import { useAtom } from "jotai"
import { useEffect } from "react"
import withAccess from "../../utills/withAccess"
import Nav from "@/utills/Nav"
// import { Button } from "@nextui-org/button"
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, Chip, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure, Input} from "@nextui-org/react";
import { MdDeleteForever } from "react-icons/md";

const Dashboard = () => {
  const [user, setUser] = useAtom(userAtom)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
useEffect(() => {
  console.log(user);
  
}, [user])
  return (
    <div>
      <Nav title="Dashboard" />
      <div className="w-full lg:w-3/4 mx-auto border-4 flex flex-col justify-center items-center">
      <div className="w-full flex gap-2 p-5 justify-center md:justify-end">
        <Button onPress={onOpen}>Add Product</Button>
        
      </div>
      <div className=" m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Top Section: Product Info */}
      <div className="flex justify-between items-start">
        {/* Checkbox */}
        <div className="flex items-center space-x-3">
         
          <h2 className="text-lg font-semibold text-gray-800">Product Name</h2>
        </div>

        {/* Action Icons */}
        <div className="flex space-x-4">
        <MdDeleteForever className="text-red-500 text-2xl cursor-pointer"/>
           
        </div>
      </div>

      {/* Price and Category */}
      <div className="mt-4">
        <p className="text-gray-700">
          <span className="font-semibold">Price:</span> $120
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Category:</span> Electronics
        </p>
      </div>

      {/* Discount Section */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-green-600">Discount:</span> 20% Off
        </p>
      </div>

      {/* cards */}
      
    </div>
     
    </div>


    {/* modal */}
    <>
       
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-slate-800">Add New Product</ModalHeader>
              <ModalBody>
                <Input label="Product Name" placeholder="Product Name" />
                <Input label="Category" placeholder="Category" />
                <Input label="Price" placeholder="Price" />
                <Input label="Discount" placeholder="Discount" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    </div>  
  )
}

export default withAuth(withAccess(Dashboard, ['seller']))