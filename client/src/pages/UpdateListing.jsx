import {  useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';



export default function CreateListing() {
    const {currentUser} =useSelector(state => state.user);
    const navigate= useNavigate();
    const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormdata] = useState({
        imageUrls: [],
        name:"",
        description:"",
        address:"",
        type: "rent",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setimageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchListing = async () => {
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        setFormdata(data);
        if(data.success === false) {
          console.log(data.message);
          return;
          
        }

      }
      fetchListing();

    }, []);
    
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7 ) {
            setUploading(true);
            setimageUploadError(false);
            const promises = [];

            for (let i = 0; i <files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then ((urls) => {
                setFormdata({...formData, imageUrls: formData.imageUrls.concat(urls)

                });
                setimageUploadError(false);
                setUploading(false);
                
            }).catch((err) => {
                setimageUploadError('image upload failure (2 mb max)');
                setUploading(false);
            });
        }else {
            setimageUploadError(' you can upload max 6 images');
            setUploading(false);
        }
    };
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`upload is ${progress}% done`);
                },
                (error)=> {
                    reject(error);
                },
                ()=> {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormdata({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
    
        if (id === 'sale' || id === 'rent') {
            setFormdata({
                ...formData,
                type: id,
            });
        } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
            setFormdata({
                ...formData,
                [id]: checked,
            });
        } else {
            setFormdata({
                ...formData,
                [id]: value,  // Handles text and number inputs like 'name', 'description', etc.
            });
        }
    };
    

 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.imageUrls.length < 1) return setError("you must upload atleast one image")
                if(+ formData.regularPrice < + formData.discountPrice) return setError("discount price must be lower than regular price")


            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if(data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
            
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Update a Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex flex-col gap-3 flex-1 '>
                <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name}/>
                <input type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description}/>
                <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required onChange={handleChange} value={formData.address}/>
                <div className=' flex gap-20 flex-wrap'>
                     <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5' onChange={handleChange} checked={formData.type ==='sale'}/>
                        <span>Sell</span></div>
                        < div className='flex gap-2'><input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={formData.type ==='rent'} />
                        <span>Rent</span></div>
                        <div  className='flex gap-2'><input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={formData.parking}/>
                        <span>Parking spot</span></div>
                        <div  className='flex gap-2'><input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished}/>
                        <span>Furnished</span></div>
                        <div  className='flex gap-2'><input type="checkbox" id='offer' className='w-5' onChange={handleChange} checked={formData.offer}/>
                        <span>offer</span></div>
                     
                </div>
                <div className=' flex  flex-wrap gap-10'>
                    <div className='flex items-center gap-2'>
                        < input type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.bedrooms} />
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        < input type='number' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-400 rounded-lg' onChange={handleChange} value={formData.bathrooms}/>
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        < input type='number' id='regularPrice' min='50' max='10000000' required className='p-3 border border-gray-400 rounded-lg'onChange={handleChange} value={formData.regularPrice} />
                        <div className='flex flex-col items-center'>
                        <p>Regular price</p>
                        {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
                </div>
                    </div>
                    {formData.offer &&(
                        <div className='flex items-center gap-2'>
                        < input type='number' id='discountPrice' min='0' max='1000000' required className='p-3 border border-gray-400 rounded-lg'onChange={handleChange} value={formData.discountPrice} />
                        <div className='flex flex-col items-center'>
                        <p>Discount price</p>
                        {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                  </div>
                    </div>
                    )}
                    
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold '> Images:<span className='font-normal text-white ml-2'> the first image will be the cover</span></p>
                <div className='flex gap-6'>
                    <input onChange={(e) =>setFiles(e.target.files)  } className='p-3 border border-gray-400 rounded w-full' type='file' id='images' accept='image/*' multiple />
                    <button  type= 'button'
                    disabled={uploading}
                    onClick={handleImageSubmit} className='p-3 text-blue-800 border border-red-700 rounded uppercase hover:shadow-lg disabled:opacity-70'>{uploading ? 'uploading...' : 'Upload'}</button>
                </div>
                <p className="text-red-600 text-sm">{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className="flex justify-between p-3 border items-center">
                        <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />
                        <button  type='button' onClick={() => handleRemoveImage(index)} className="p-3 text-white rounded-lg uppercase hover:opacity-65">Delete</button>
                        </div>
                    ))
                }
            <button disabled={loading || uploading } className='p-3 bg-violet-600 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-80'>{loading ? 'updating....' : 'update listing'}</button>
            {error && <p className="text-white text-sm">{error}</p>}
            </div>
            
        </form>
        </main>
  )
}
