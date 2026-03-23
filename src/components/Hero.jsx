import React from 'react'
import HomeSearch from './HomeSearch'

function Hero() {
  return (
    <div>
        <div className='flex flex-col items-center p-5 py-5 gap-2 w-full bg-[#eef0fc] text-center'>
            <h2 className='text-lg'>Find cars for sale and for rent near you</h2>
            <h2 className='text-[30px] md:text-[60px] font-bold'>Find Your Dream Car</h2>
            <HomeSearch /> 
            <img src='/cars.png' className='mt-5'/>
        </div>
    </div>
  )
}

export default Hero
