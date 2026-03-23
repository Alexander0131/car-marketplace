import { Button } from '@/components/ui/button'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

function OwnersDetails({carDetail}) {
  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
        <h2 className='font-medium text-2xl my-3'>Owner/Dealer</h2>
       {carDetail?.userImgUrl ? 
         <img src={carDetail?.userImgUrl ? carDetail?.userImgUrl : '/public/noprofile.jpg'} className='w-17.5 h-17.5 rounded-full'/>
         :
          <div className='w-17.5 h-17.5 rounded-full text-white bg-primary text-6xl flex items-center justify-center'>{carDetail?.userName[0]}</div>
       }
      <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
      <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>
      <Button className='w-full mt-6'>Message owner <FaWhatsapp/></Button>
    </div>
  )
}

export default OwnersDetails
