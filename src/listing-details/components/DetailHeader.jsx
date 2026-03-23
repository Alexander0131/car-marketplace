import React from 'react'
import { HiCalendarDays } from "react-icons/hi2"
import { BsSpeedometer2 } from "react-icons/bs"
import { TbManualGearbox } from "react-icons/tb"
import { FaGasPump } from 'react-icons/fa'

function DetailHeader({carDetail}) {
  return (
    <div>
        {carDetail?.listingTitle ? 
        <div>
            <h2 className='font-bold text-3xl'>{carDetail?.listingTitle}</h2>
            <p className='text-sm'>{carDetail?.tagline}</p>

            <div className='flex gap-2 md:mt-3 flex-wrap'>
                <div className='flex gap-2 items-center bg-sky-50 rounded-full p-2 md:px-3'>
                    <HiCalendarDays className='h-7 w-7 text-primary'/>
                    <h2 className='text-primary text-sm'>{carDetail?.year}</h2>
                </div>
                <div className='flex gap-2 items-center bg-sky-50 rounded-full p-2 md:px-3'>
                    <BsSpeedometer2 className='h-7 w-7 text-primary'/>
                    <h2 className='text-primary text-sm'>{carDetail?.mileage}</h2>
                </div>
                <div className='flex gap-2 items-center bg-sky-50 rounded-full p-2 md:px-3'>
                    <TbManualGearbox className='h-7 w-7 text-primary'/>
                    <h2 className='text-primary text-sm'>{carDetail?.transmission}</h2>
                </div>
                <div className='flex gap-2 items-center bg-sky-50 rounded-full p-2 md:px-3'>
                    <FaGasPump className='h-7 w-7 text-primary'/>
                    <h2 className='text-primary text-sm'>{carDetail?.transmission}</h2>
                </div>
            </div>
        </div>
        :
        <div className='w-full h-25 rounded-xl bg-slate-200 animate-pulse'>

        </div>
        }
    </div>

  )
}

export default DetailHeader
