'use client'

import { userAtom } from "@/stores/user.store"
import withAuth from "@/utills/withAuth"
import { useAtom } from "jotai"
import React, { useEffect } from "react"
import withAccess from "../../utills/withAccess"
import Nav from "@/utills/Nav"
import { Button } from "@nextui-org/button"
import Link from "next/link"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@nextui-org/react"

const Dashboard = () => {
  const [user, setUser] = useAtom(userAtom)


  const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "Product Name", uid: "name", sortable: true},
    {name: "Category", uid: "category", sortable: true},
    {name: "Price", uid: "price", sortable: true},
    {name: "Discount", uid: "discount", sortable: true},
    {name: "Action", uid: "action", sortable: true},
  ];

  const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  }]
useEffect(() => {
  console.log(user);
  
}, [user])

const renderCell = React.useCallback((user, columnKey) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{radius: "lg", src: user.avatar}}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    default:
      return cellValue;
  }}, []);

  return (
    <div>
      <Nav title="Dashboard" />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">

      {/* Cards Container */}
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {/* Manage Order Card */}
        <div className="bg-white shadow-md rounded-lg p-6 w-72 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Order</h2>
          <p className="text-gray-600">
          Create new categories to add products to your store.    </p>
          <Link href="/dashboard/manage-cayegories"><Button className="mt-6" color="primary">
            Manage Category
          </Button> </Link>
        </div>

        {/* Manage Product Card */}
        <div className="bg-white shadow-md rounded-lg p-6 w-72 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Product</h2>
          <p className="text-gray-600">
            Add new products, update existing ones, and manage inventory levels.
          </p>
          <Link href="/dashboard/manage-products"><Button  className="mt-6" color="primary">
            Manage Product
          </Button> </Link>
        </div>
      <div className="w-full md:w-lg">
        <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      // bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      // selectedKeys={selectedKeys}
      selectionMode="multiple"
      // sortDescriptor={sortDescriptor}
      // topContent={topContent}
      topContentPlacement="outside"
      // onSelectionChange={setSelectedKeys}
      // onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
      </div>
    </div>
    </div>  
  )
}

export default withAuth(withAccess(Dashboard, ['seller']))