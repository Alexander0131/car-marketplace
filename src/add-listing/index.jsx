import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import carDetails from '../Shared/carDetails.json'
import InputField from './components/InputField'
import DropdownField from './components/DropdownField'
import { Separator } from '@/components/ui/separator'
import features from './../Shared/features.json'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import TextAreaField from './components/TextAreaField'
import { db } from '../../configs'
import { CarImages, CarListing } from '../../configs/schema'
import IconField from './components/IconField.jsx'
import UploadImages from './components/UploadImages'
import { BiLoaderAlt } from 'react-icons/bi'
import { toast } from 'sonner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SignIn, useUser } from '@clerk/clerk-react'
import { getDate } from '@/Shared/getDate'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/Service'


function AddListing() {

  const [formData, setFormData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [loader, setLoader] = useState(false);
  const [carInfo, setCarInfo] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {user} = useUser();


  const mode = searchParams.get('mode');
  const recordId = searchParams.get('id');

  useEffect(() => {
    if(mode == 'edit'){
      GetListingDetail();
    }
  }, []);

  const GetListingDetail = async () => {
    const result = await db.select().from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, recordId));

      const resp = Service.FormatResult(result);
      setCarInfo(resp[0]);
      setFormData(resp[0]);
      setFeaturesData(resp[0].features);
  }

  const handleInputChange = (name, value)=> {
      setFormData((prevData) => ({
        ...prevData,
        [name]:value
      }));

  }

  const handleFeatureChange = (name, value) =>{
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]:value
    }));

  } 
  const onSubmit = async (e) =>{
    setLoader(true);
    e.preventDefault();
    toast('Please wait...')
    if(mode == 'edit'){
      const result = await db.update(CarListing).set({
        ...formData,
        features: featuresData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        postedOn: getDate("DD/MM/YYYY")
      }).where(eq(CarListing.id, recordId)).returning({id:CarListing.id});
      console.log(result);
      navigate('/profile')
      setLoader(false);
    }else{
    try{
      const result = await db.insert(CarListing).values({
        ...formData,
        features: featuresData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userImageUrl: user?.imageUrl,
        postedOn: getDate("DD/MM/YYYY")
      }).returning({id:CarListing.id});

      if(result){
        console.log("Data Saved")
        setTriggerUploadImages(result[0]?.id);
        setLoader(false)
      }
    }
    catch (err){
      console.log("Error",err);
      setLoader(false);

    }
    }
  }


  return (
    <div>
      <Header/>
      <div className='px-10 md:px-20 my-10'>
        {user ? 
        <>
        <h2 className='font-bold text-4xl'>Add New Listing</h2>
        <form className='p-10 border rounded-xl mt-10'>
          {/* Car details */}
          <div>
            <h2 className='font-medium text-xl mb-6'>Car Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {carDetails.carDetails.map ((item, index) => (
                <div key={index}>
                  <label className='text-sm flex gap-2 items-center mb-2'>
                    <IconField icon={item.icon}/>
                    {item?.label} {item.required && <span className='text-red-500'>*</span>}</label>
                  {item.fieldType == 'text' || item.fieldType == 'number' 
                  ? <InputField item={item} handleInputChange={handleInputChange} carInfo={carInfo}/>
                  : item.fieldType == 'dropdown' ? <DropdownField item={item} handleInputChange={handleInputChange} carInfo={carInfo}/>
                  : item.fieldType == 'textarea' ? <TextAreaField item={item} handleInputChange={handleInputChange} carInfo={carInfo}/>
                  : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6"/>
          {/* Features list */}
          <div>
            <h2 className='font-medium text-xl my-6'>Features</h2>
            <div className='grid grid-cols-2 md:grid-cols-3'>
              {features.features.map((item, index) => (
                <div key={index} className='flex gap-2 items-center'>
                  <Checkbox onCheckedChange={(value) => handleFeatureChange(item.name, value)}
                    checked={featuresData?.[item.name]}  
                  /> <h2>{item.label}</h2>
                </div>
              ))} 
            </div>
          </div>
          {/* car images */}
          <Separator className="my-6"/>
          <UploadImages triggerUploadImages={triggerUploadImages} 
            setLoader={(v) => {setLoader(v); navigate('/profile')}}
            carInfo={carInfo}
            mode={mode}
          />
          <div className='mt-10 flex justify-end'>
            <Button type="submit" 
              onClick={(e) => onSubmit(e)}
              disabled={loader}  
            >
              {!loader ? 'Submit' : <BiLoaderAlt className='animate-spin text-lg'/> }
              </Button>
          </div>
        </form>
        </>
        : 
          <div className='w-full flex items-center justify-center'>
            <SignIn></SignIn>
          </div>
        }
      </div>
    </div>
  )
}

export default AddListing
