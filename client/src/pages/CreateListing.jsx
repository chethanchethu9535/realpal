import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-8'>
            <div className='flex flex-col gap-3 flex-1 '>
                <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required/>
                <input type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
                <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required/>
                <div className=' flex gap-3 flex-wrap'>
                     <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5'/>
                        <span>sell</span></div>
                        < div className='flex gap-2'><input type="checkbox" id='rent' className='w-5'/>
                        <span>Rent</span></div>
                        <div  className='flex gap-2'><input type="checkbox" id='parking' className='w-5'/>
                        <span>Parking spot</span></div>
                        <div  className='flex gap-2'><input type="checkbox" id='furnished' className='w-5'/>
                        <span>Furnished</span></div>
                        <div  className='flex gap-2'><input type="checkbox" id='offer' className='w-5'/>
                        <span>offer</span></div>
                     
                </div>
                <div className=' flex  flex-wrap gap-3'>
                    <div className='flex items-center gap-2'>
                        < input type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-400 rounded-lg' />
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        < input type='number' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-400 rounded-lg' />
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        < input type='number' id='regular price' min='1' max='10' required className='p-3 border border-gray-400 rounded-lg' />
                        <div className='flex flex-col items-center'>
                        <p>Regular price</p>
                        <span className='text-xs'>($ / month)</span></div>
                    </div>
                    <div className='flex items-center gap-2'>
                        < input type='number' id='discount price' min='1' max='10' required className='p-3 border border-gray-400 rounded-lg' />
                        <div className='flex flex-col items-center'>
                        <p>Discount price</p>
                        <span className='text-xs'>($ / month)</span></div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold '> Images:<span className='font-normal text-white ml-2'> the first image will be the cover</span></p>
                <div className='flex gap-6'>
                    <input className='p-3 border border-gray-400 rounded w-full' type='file' id='images' accept='image/*' multiple />
                    <button className='p-3 text-blue-800 border border-red-700 rounded uppercase hover:shadow-lg disabled:opacity-70'>upload</button>
                </div>
            
            <button className='p-3 bg-gray-950 text-red-700 rounded-lg uppercase hover:opacity-80 disabled:opacity-80'>create listing</button>
            </div>
        </form>
        </main>
  )
}
