import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list, setList] = useState([])

    const fetchList = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/user/list')
            console.log("API Response:", response.data); 
            
            if (response.data.success) {
                setList(response.data.user);
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const removeProduct = async (id) => {
      try {
          const response = await axios.post(backendUrl + '/api/user/remove', {id}, {headers:{ Authorization: token }})        

          if (response.data.success) {
              toast.success(response.data.message)

              await fetchList();
          } else {
              toast.error(response.data.message)
          }

      } catch (error) {
          console.log(error);
          toast.error(error.message)
      }
  }

  useEffect(() => {
      fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All User List</p>
      <div className='flex flex-col gap-2'>

        {/* List Table Title */} 

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
            <b>Profile</b>
            <b>Name</b>
            <b>Staff_Id</b>
            <b>Department</b>
            <b className='text-center'>Delete_User</b>
        </div>

        {/* Product list */}

        {
            list.map((item, index) => (
                <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                    <img className='w-12' src={item.profileImage || "https://via.placeholder.com/50"}  alt="" />
                    <p>{item.fullName}</p>
                    <p>{item.staffID}</p>
                    <p>{item.department}</p>
                    <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
                </div>
            ))
        }
      
      </div>
    </>
  )
}

export default List
