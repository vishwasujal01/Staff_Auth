import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'


const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15]'>
      
      <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/add">
        <img src={assets.add_icon} alt="" />
        <p>Add Users</p> 
      </NavLink>

      <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/list">
        <img src={assets.order_icon} alt="" />
        <p>List Users</p> 
      </NavLink>

      {/* <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/orders">
        <img src={assets.order_icon} alt="" />
        <p>Update Users</p> 
      </NavLink> */}

    </div>
    </div>
  )
}

export default Sidebar
