import { CarImages, CarListing } from './../../configs/schema';
import { db } from './../../configs';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { eq, ilike, or } from 'drizzle-orm';
import Service from '@/Shared/Service';
import Header from '@/components/Header';
import Search from '@/components/HomeSearch';
import CarItem from '@/components/CarItem';
import Footer from '@/components/Footer';
import MostSearchedCar from '@/components/MostSearchedCar';

function SearchByOptions() {
    const [searchParams] = useSearchParams();
    const [carList, setCarList] = useState([]);
    const searchValue = searchParams.get('q');
 
    console.log({searchValue})
    useEffect(() => {
    if (searchValue) {
        GetCarList();
    }
    }, [searchValue]);

    const GetCarList = async () => {
    if (!searchValue) return;

    const result = await db.select().from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(
            or(
                ilike(CarListing.listingTitle, `%${searchValue}%`),
                ilike(CarListing.make, `%${searchValue}%`),
                ilike(CarListing.model, `%${searchValue}%`)
            )
        );

    const resp = Service.FormatResult(result);
    setCarList(resp);
};

    
  return (
    <div>
      <Header/>
      <div className='md:p-16 flex justify-center '>
        <Search/>
      </div>
      {searchValue && 
        <div className='p-10'>
          <h2 className='font-bold text-4xl p-10 md:px-20'>Search Result</h2>
          {/* List of category */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>

            {carList?.length > 0 ? carList.map((item, index) => (
              <div key={index}>
                  <CarItem car={item} />
              </div>
            ) ): 
              [1,2,3,4,5,6].map((item, index) => (
                <div key={index} className='h-[370px] rounded-xl bg-slate-200 animate-pulse'>

                </div>
              ))
            }
          </div>
        </div>
      }
      <MostSearchedCar/>
      <Footer/>
    </div>

  )
}

export default SearchByOptions
