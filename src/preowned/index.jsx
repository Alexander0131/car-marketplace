import Header from '@/components/Header';
import Search from '@/components/HomeSearch';
import { db } from './../../configs';
import { CarImages, CarListing } from './../../configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Service from '@/Shared/Service';
import CarItem from '@/components/CarItem';
import Footer from '@/components/Footer';
import MostSearchedCar from '@/components/MostSearchedCar';

function Preowned() {

    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetCarList();
    }, [])

    const GetCarList = async () => {
        setLoading(true);

        const result = await db.select().from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.condition, "Used"));

        const resp = Service.FormatResult(result);
        setCarList(resp);

        setLoading(false); 
    }

  return (
    <div>
      <Header/>
      <div className='p-10'>
        <h2 className='font-bold text-4xl'>Preowned</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>

          {loading ? (
            [1,2,3,4,5,6].map((item, index) => (
              <div key={index} className='h-[370px] rounded-xl bg-slate-200 animate-pulse'></div>
            ))
          ) : carList?.length > 0 ? (
            carList.map((item, index) => (
              <div key={index}>
                <CarItem car={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No preowned cars available.
            </div>
          )}

        </div>
      </div>
      <MostSearchedCar/>
      <Footer/>
    </div>
  )
}

export default Preowned;