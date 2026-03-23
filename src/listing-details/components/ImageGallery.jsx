import React from 'react'

function ImageGallery({ carDetail }) {
  return (
    <div>
      {carDetail?.images?.[0]?.imageUrl ? (
        <img
          src={carDetail.images[0].imageUrl}
          className="w-full h-125 object-cover rounded-xl"
        />
      ) : (
        <div className="h-125 bg-slate-200 animate-pulse rounded-xl"></div>
      )}
    </div>
  )
}

export default ImageGallery