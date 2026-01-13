import { useKiosk } from '../hooks/useKiosk'
import type { CategoriesProps } from '../types'

type CategoryItemProps = {
  categorie: CategoriesProps
  handleClickCategorie: (arg:number) => void
}

export default function Categorie ({categorie}: CategoryItemProps) {
  
  const {handleClickCategorie,currentCategory}=useKiosk()
  
  return (
    <div
      className= {`${currentCategory?.id===categorie.id ? "bg-amber-400 ":"bg-gray-50 "}        
        flex items-center hover:bg-amber-400  mx-4 px-4 rounded-xl duration-500 justify-between `}
    >
      <img
        className='w-12'
        src={`/src/assets/img/icon_${categorie.icon}.svg`}
        alt='Image Icon'
      />

      <button
      type='button'
        onClick={()=>handleClickCategorie(categorie.id)}
        className='text-lg font-bold cursor-pointer truncate'
      >
        {categorie.name}
      </button>
    </div>
  )
}
