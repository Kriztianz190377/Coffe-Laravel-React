
import { Link } from 'react-router-dom'
import LOGO from '../assets/img/logo.svg'
import { useAuth } from '../hooks/useAuth'


export const AdminSidebar = () => {

    const{logout}=useAuth({middleware:'auth'});
    
    return (
        <div className="md:w-72 h-screen ">

            <div className="p-4">
                <div className='p-4'>
                    <img className='w-40' src={LOGO} alt='Image Logo' />
                </div>
                <nav className='flex flex-col gap-4'>
                    <Link to="/admin" className='font-bold text-lg'>Orders</Link>
                    <Link to="/admin/products" className='font-bold text-lg'>Products</Link>
                </nav>

            </div>

            <div className='my-5 px-5'>
                <button
                    onClick={logout}
                    className='bg-red-600 hover:bg-red-800 transition-colors 
           cursor-pointer uppercase font-bold w-full p-3 
                    text-white rounded-lg duration-300 truncate'
                >
                    cancel orden
                </button>


            </div>
        </div>
    )
}
