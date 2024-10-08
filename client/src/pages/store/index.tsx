import { userAtom } from '@/stores/user.store'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import withAccess from '../../utills/withAccess'
import withAuth from '@/utills/withAuth'
import Nav from '@/utills/Nav'
import { useLogout } from '@/hooks/useLogout'
import { getAllProducts } from '@/services/product.service'
import { Spinner } from '@/utills/Spinner'
import { Button } from '@nextui-org/button'


function index() {

  const [user, setUser] = useAtom(userAtom)
  const logout = useLogout()

  const [products, setProducts] = React.useState<any>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [originalProducts, setOriginalProducts] = React.useState<any>([])

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts()
      if (response.status === 200) {
        setProducts(response.data.products)
        setOriginalProducts(response.data.products)
      }
    } catch (error) {
      console.log(error)
    }}

    const handleSearch = (text : string) => {

      if(text === '') {
        setProducts(originalProducts)
      }
      const filteredProducts = products.filter((product : any) => {
        return product.name.toLowerCase().includes(text.toLowerCase()) || product.category.toLowerCase().includes(text.toLowerCase())
      })
      setProducts(filteredProducts)

    }

    useEffect(() => {
      setIsLoading(true)
      fetchProducts()
      setIsLoading(false)
    }, [])

  return (
    <Spinner isLoading={isLoading}>
   <div><div className="min-h-screen flex flex-col bg-gray-100">
    {/* Navbar */}
   <Nav title="Store" />
    {/* Main Content */}
    <div className="flex flex-col md:flex-row justify-between p-6 w-full md:w-4/5 mx-auto">
      {/* Product Search and Category Section */}
      <div className="w-full md:w-2/3">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          {/* Dropdown to Select Category */}
         
          {/* Search Input for Products */}
          <div className="w-full md:w-2/3">
            <label htmlFor="search" className="block text-gray-700 mb-2">Search Products</label>
            <div className='flex justify-between gap-2 items-center'>
            
            <input onChange={(e) => handleSearch(e.target.value)} id="search" type="text" placeholder="Example: Books" className="block w-full border text-slate-700 border-gray-300 rounded-md p-2" />
            <Button color="primary" onClick={() => {setProducts(originalProducts)}} className="">Clear</Button>
            </div>
          </div>
        </div>

        {products.length ===0 && <p className="text-gray-500">No Products Found</p>}

        {
          products.length > 0 && products.map((product: any) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Card Example */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-gray-700 font-semibold text-lg capitalize">{product.name}</h3>
            <p className="text-gray-500">Category: {product.category}</p>
            <p className="text-gray-500"> Price: {product.price}</p>
            <p className="text-gray-500"> Discount: {product.discount}  </p>

            <Button color="primary" onClick={() => {}} className="mt-4">Add to Cart</Button>
          </div>
          {/* Add more product cards as needed */}
        </div>
          ))
        }

        {/* Products Section */}
        
      </div>
      
    </div>
  </div>
</div> 
</Spinner>

  )
}

export default withAuth(withAccess(index, ['buyer']))