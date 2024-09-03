import { FaSearch } from 'react-icons/fa'; 
import { Link } from  'react-router-dom';
export default function Header() {
  return (
    <header className='bg-blue-400 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
            <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-green-600'>Nandi</span>
            <span className='text-orange-600'>Enclave</span>
        </h1>
        </Link>
        <form className='bg-slate-200 p-4 rounded-lg flex items-center'>
            <input type='text' placeholder="search..." className='bg-transparent focus:outline-none w-25 sm:w-64' />
            <FaSearch className='text-white'/>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li className='hidden sm:inline text-yellow-500 hover:underline'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-yellow-500 hover:underline'>About</li>
            </Link>
            <Link to='/signin'>
            <li className='text-yellow-500 hover:underline'>SignIn</li>
            </Link>
        </ul>
        </div>
    </header>
  );
}
