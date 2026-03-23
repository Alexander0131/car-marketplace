import IconField from '@/add-listing/components/IconField'
import CarSpecification from '@/Shared/CarSpecification'
import { index } from 'drizzle-orm/gel-core'
import React from 'react'

function Specification({carDetail}) {
  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>
        <h2 className='text-2xl font-medium'>Specifications</h2>
        {carDetail ?  CarSpecification.map((item, index) => (
            <div key={index} className='mt-5 flex items-center justify-between'>
                <h2 className='flex gap-2'>
                    <IconField icon={item.icon}/>
                    {item.label}
                </h2>
                <h2>{carDetail?.[item?.name]}</h2>
            </div>
        ))
      :
      <div className='w-full bg-slate-200 h-125 animate-pulse rounded-xl mt-7'>

      </div>

      }
  
    </div>
  )
}

export default Specification
