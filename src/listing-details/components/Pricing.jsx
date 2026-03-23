import { Button } from '@/components/ui/button'
import React from 'react'
import { MdOutlineLocalOffer } from 'react-icons/md'

function Pricing({carDetail}) {

  return (
    <div className={carDetail ? 'p-10 rounded-xl border shadow-md' : 'h-40 w-full bg-slate-200 animate-pulse rounded-xl'}>
      {carDetail &&
      <div>
        <h2>Our Price</h2>
        <h2 className='font-bold text-4xl'>${carDetail?.sellingPrice}</h2>

        <Button className="w-full mt-7" size='lg'> <MdOutlineLocalOffer className='text-lg mr-2'/> Make an offer price</Button>
      </div>
      }
    </div>
  )
}

export default Pricing
