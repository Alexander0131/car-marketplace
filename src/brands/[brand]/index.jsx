import { CarImages, CarListing } from './../../../configs/schema';
import { db } from './../../../configs';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import Header from '@/components/Header';
import CardItem from './../../components/CarItem';
import Footer from '@/components/Footer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

function SingleBrand() {
  const { id } = useParams();
  const [carList, setCarList] = useState([]);
  
  useEffect(() => {
    if (id) {
      GetCarDetail();
    }
  }, [id]);

  const GetCarDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.make, id)); // exact brand match

    const resp = Service.FormatResult(result);
    setCarList(resp);

  };

  return (
    <div>
      <Header/>
        <div className='p-10'>
          <Carousel>
            <CarouselContent className={"flex w-full items-center justify-center"}>
                {carList.map((car, index) => (
                    <CarouselItem key={index} className="basis-1/4">
                        <CardItem car={car}/>
                    </CarouselItem>
                ))}
            </CarouselContent>
      </Carousel>
        </div>
      <Footer/>
    </div>
  );
}

export default SingleBrand;