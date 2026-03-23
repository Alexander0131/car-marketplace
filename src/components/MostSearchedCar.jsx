import FakeData from '@/Shared/FakeData'
import React, { useEffect, useState } from 'react'
import CardItem from './CarItem';
import { db } from '../../configs'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarImages, CarListing } from '../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import Service from '@/Shared/Service';


function MostSearchedCar() {

  const [carList, setCarList] = useState([]);
  useEffect(() => {
    getPopularCarList();
  }, [])

  const getPopularCarList = async () =>{
    const result = await db.select().from(CarListing)
    .leftJoin(CarImages,eq(CarListing.id, CarImages.carListingId))
    .orderBy(desc(CarListing.id))
    .limit(10)

    const resp = Service.FormatResult(result);
    setCarList(resp);
  }
  return (
    <div className='mx-5 md:mx-24'>
      <h2 className='font-bold text-3xl text-center my-16'> Most Searched Car </h2>

      <Carousel>
        <CarouselContent>
            {carList.map((car, index) => (
                <CarouselItem key={index}  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <CardItem car={car}/>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
    </div>
  )
}

export default MostSearchedCar
