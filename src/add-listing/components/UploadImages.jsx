import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Cloudinary } from "@cloudinary/url-gen";
import { db } from '../../../configs'
import { AdvancedImage } from "@cloudinary/react";
import { CarImages } from "../../../configs/schema";
import { eq } from "drizzle-orm";

function UploadImages({triggerUploadImages, setLoader, carInfo, mode}) {

  const [selectedFileList, setSelectedFileList] = useState([]);
  const [editCarImageList, setEditCarImageList] = useState([]);

  
  useEffect(() => {
      if(mode == 'edit' && carInfo?.images != undefined){
      console.log(carInfo?.images)
      setEditCarImageList([])
      carInfo?.images.forEach((image) => {
        setEditCarImageList(prev=> [...prev, image?.imageUrl]);
      })
    }
  }, [carInfo])

    useEffect(() => {
        if(triggerUploadImages){ 
            UploadImagesToServer();
        }
    }, [triggerUploadImages])
  // Cloudinary Config
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Cloudinary Instance (SDK)
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  const [uploadedPublicIds, setUploadedPublicIds] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Select Files
  const onFileSelected = (event) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setSelectedFileList((prev) => [...prev, ...fileArray]);
  };

  // Remove Image
  const onImageRemove = (image) => {
    setSelectedFileList((prev) => prev.filter((item) => item !== image));
  };

  const onImageRemoveFromDB = async (image, index) => {
    const result = await db.delete(CarImages).where(eq(CarImages.id, carInfo?.images[index].id)).returning({id:CarImages.id});
    const imageList = editCarImageList.filter(item => item != image);
    setEditCarImageList(imageList);
  }

  // Upload Images
  const UploadImagesToServer = async () => {
    setLoader(true);
    if (!selectedFileList.length) return;
    setUploading(true);


    try {
      const publicIds = [];

      for (const file of selectedFileList) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", "car-marketing");
        formData.append("public_id", `${Date.now()}`);


        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`,
          {
            method: "POST",
            body: formData,
          }
        );
        console.log("Uploaded");

        const data = await res.json();
        const dataUrl = data.url;
        console.log({triggerUploadImages})
        if(dataUrl){
             await db.insert(CarImages).values({
                imageUrl: dataUrl,
                carListingId:triggerUploadImages
        })

        }
       
        if (data.public_id) {
          publicIds.push(data.public_id);
        }
      }

      setUploadedPublicIds((prev) => [...prev, ...publicIds]);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      setLoader(false)
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>

      {/* Preview Selected Images */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

        {mode=='edit'&&
          editCarImageList.map((image, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer"
              onClick={() => onImageRemoveFromDB(image, index)}
            />

            <img
              src={image}
              className="w-full h-32.5 object-cover rounded-xl"
              alt="preview"
            />
          </div>
        ))
        }

        {selectedFileList.map((image, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer"
              onClick={() => onImageRemove(image)}
            />

            <img
              src={URL.createObjectURL(image)}
              className="w-full h-32.5 object-cover rounded-xl"
              alt="preview"
            />
          </div>
        ))}

        {/* Upload Box */}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md">
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>

        <input
          type="file"
          multiple
          id="upload-images"
          className="hidden"
          onChange={onFileSelected}
        />
      </div>     
    </div>
  );
}

export default UploadImages;