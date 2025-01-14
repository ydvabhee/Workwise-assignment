/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useAtom } from 'jotai'
import {userAtom} from "../stores/user.store";
import {useLogout} from "../hooks/useLogout";
import { Button } from '@nextui-org/button';
function Nav(props: any) {

  const title = props.title || ''
  const [user] = useAtom(userAtom)
  const logout = useLogout()


  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Logo or Branding */}
        <div className="text-2xl font-bold text-gray-700">{title}</div>
        {/* Right Profile and Logout Button */}
        <div className="flex items-center space-x-4 ">
          {/* Profile */}
          <div className="flex items-center gap-2 space-x-2">
            <div className="w-10 h-10 rounded-full border-2 flex justify-center items-center text-slate-800 bg-gray-400"> {user.firstName[0]+user.lastName[0]}</div>
            <span className="text-gray-700 font-medium">{user?.firstName}</span>
          <Button color='danger' onClick={() => logout()} >Logout</Button>
          {/* <button onClick={() => logout()} className=" bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-red-600">Logout</button> */}
          
          </div>
          {/* Logout Button */}
        </div>
      </div>
    </nav>
  )
}

export default Nav