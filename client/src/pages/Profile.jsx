import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice.js';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false); 
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Create navigate instance

  // Firebase upload effect
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `uploads/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error("Upload failed:", error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData((prevState) => ({
              ...prevState,
              avatar: downloadURL,
            }));
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false ) {
        dispatch(deleteUserFailure(data.message)); // Handle sign-out failure
        return;
      }
      dispatch(deleteUserSuccess()); // Dispatch sign-out success
      } catch (error) {
      dispatch(deleteUserFailure(data.message)); // Handle error
    }
  }
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      
    } catch (error) {
      setShowListingsError(true);
      
    }

  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        console.log(data.message);
        return;
        
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
      
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData?.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-yellow-500">Error uploading image (image must be less than 2MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-800">Uploading {filePerc}%</span>
          ) : filePerc === 100 ? (
            <span className="text-blue-800">Successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-800 text-white rounded-lg p-3 uppercase hover:opacity-100 disabled:opacity-90"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link className='bg-yellow-500 text-white p-3 rounded-lg uppercase text-center hover:opacity-65' to ={"/createlisting"}>
        Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-violet-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-violet-700 cursor-pointer">Sign Out</span>
      </div>
      <p className='text-red-950 mt-5' >{error ? error : ''} </p> 
      <p className='text-yellow-600'>{updateSuccess ? 'User updated successfully!' : "" }</p>
      <button  onClick={handleShowListings} className='text-green-800 w-full font-bold'>Show Listing</button>
      <p className='text-red-700 mt-5'>{showListingsError ? 'error showing listings': ''}</p>
      {userListings && userListings.length > 0 &&
      <div className='flex flex-col gap-4'> 
      <h1 className='text-center text-2xl font-semibold'>Your Listings</h1>
      {userListings.map((listing) => (
        <div  key={listing._id}className='border rounded-lg p-3 flex justify-between item-center gap-4'> 
        <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain' />
        </Link>
        <Link className='text-slate-800 font-semibold  hover:underline truncate flex-1' to={`/listing/${listing._id}`}>
        <p >{listing.name}</p>
        </Link>
        <div className=' flex flex-col items-center'>
          <button onClick={()=>handleListingDelete(listing._id)} className='text-blue-900 uppercase'>Delete</button>
          <button className='text-yellow-500 uppercase'>Edit</button>

        </div>
        
       
        </div>

      ))}
    </div>}
    </div>
  );
}
