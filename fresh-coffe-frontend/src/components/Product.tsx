import { formatPrice } from '../helpers'
import { useKiosk } from '../hooks/useKiosk'
import type { ProductComponentProps } from '../types'




export const Product = ({ product,addButton,availableButton }: ProductComponentProps   ) => {

  //  const addButton = false
  //  const availableButton = true

  const { handleClickModal, handleSetProduct, handelCliclkOutOfStock  } = useKiosk()

  return (
    <div className='m-3 p-3 shadow bg-white'>
      <img
        src={`/src/assets/img/${product.image}.jpg`}
        alt={`imgen${product.name}`}
      />
      <div className='p-5'>
        <h3 className='text-2xl font-bold'> {product.name} </h3>
        <p className='mt-5 font-black text-4xl text-amber-500'>
          {formatPrice(product.price)}
        </p>

        {addButton && (
          <button
            onClick={() => {
              handleClickModal();
              handleSetProduct(product);
            }}
            type='button'
            className='bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer uppercase font-bold w-full mt-5 p-2 
                    text-white rounded-lg'
          >
            Add
          </button>
        )}


        {availableButton && (

          <button
            onClick={()=> handelCliclkOutOfStock(product.id) }
            type='button'
            className='bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer uppercase font-bold w-full mt-5 p-2 
                    text-white rounded-lg'
          >
            out of stock
          </button>
        )}


      </div>



    </div>
  )
}
