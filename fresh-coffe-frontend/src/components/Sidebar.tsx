
import LOGO from '../assets/img/logo.svg'
import { useAuth } from '../hooks/useAuth';
import { useKiosk } from '../hooks/useKiosk'
import Categorie from './Categorie'

export const Sidebar = () => {

  const { categories, handleClickCategorie } = useKiosk();
  
  const { logout, user } = useAuth({middleware:'auth'});
  
  
  return (
    <aside className='md:w-72  border-2 min-h-screen'>
      <div className='p-4'>
        <img className='w-40' src={LOGO} alt='Image Logo' />
      </div>


  <p className='text-2xl text-center py-3 truncate' 
  >Hello: {user?.name}</p>

      <div
        className='flex flex-col 
        w-full gap-4 cursor-pointer
        '
      >
        {categories.map(categorie => (
          <Categorie
            key={categorie.id}
            categorie={categorie}
            handleClickCategorie={handleClickCategorie}
          />
        ))}
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
    </aside>
  )
}
