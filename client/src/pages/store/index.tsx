import { userAtom } from '@/stores/user.store'
import { useAtom } from 'jotai'
import React from 'react'
import withAccess from '../../utills/withAccess'
import withAuth from '@/utills/withAuth'
import Nav from '@/utills/Nav'
import { useLogout } from '@/hooks/useLogout'


function index() {

  const [user, setUser] = useAtom(userAtom)
  const logout = useLogout()

  return (
   <div><div className="min-h-screen flex flex-col bg-gray-100">
    {/* Navbar */}
   <Nav title="Store" />
    {/* Main Content */}
    <div className="flex flex-col md:flex-row justify-between p-6">
      {/* Product Search and Category Section */}
      <div className="w-full md:w-2/3">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          {/* Dropdown to Select Category */}
          <div className="w-full md:w-1/3">
            <label htmlFor="category" className="block text-gray-700 mb-2">Select Category</label>
            <select id="category" className="block w-full border border-gray-300 rounded-md p-2 bg-white">
              {/* <option value>All Categories</option> */}
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
              {/* Add more options as needed */}
            </select>
          </div>
          {/* Search Input for Products */}
          <div className="w-full md:w-2/3">
            <label htmlFor="search" className="block text-gray-700 mb-2">Search Products</label>
            <input id="search" type="text" placeholder="Search products..." className="block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>
        {/* Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Card Example */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="https://via.placeholder.com/150" alt="Product Image" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-gray-700 font-semibold text-lg">Product Name</h3>
            <p className="text-gray-500">$99.99</p>
          </div>
          {/* Add more product cards as needed */}
        </div>
      </div>
      
    </div>
  </div>
</div>

  )
}

export default withAuth(withAccess(index, ['buyer']))