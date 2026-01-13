import { useEffect, useState } from 'react'
import { useKiosk } from '../hooks/useKiosk'
import { formatPrice } from '../helpers'

export default function ModalProduct () {
  const { product, order,handleClickModal,handleAddOrder } = useKiosk()
  const [quantity, setQuantity] = useState<number>(1)
  const [edition, setEdition] = useState(false)

  useEffect(() => {
    if(order.some(orderState=>orderState.id=== product?.id)){
      const productEdition=order.filter(orderState => orderState.id=== product?.id)[0]
      setEdition(true)
      setQuantity(productEdition.quantity ?? 1)
      
    }

  }, [product,order])
  

  if (!product) return null
  return (
    <div className='md:flex gap-10'>
      <div className='w-1/3'>
        <img
          src={`src/assets/img/${product?.image}.jpg`}
          alt={`Image product ${product?.name}`}
        />
      </div>

      <div className='w-2/3'>
        <div className='flex justify-end'>
          <button onClick={handleClickModal}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          </button>
        </div>

        <h1 className='text-2xl font-bold mt-5'> {product?.name} </h1>
        <p className='mt-5 font-black text-5xl text-amber-500'>
          {formatPrice(product?.price)}
        </p>

        <div className='flex gap-5 mt-5'>
          <button onClick={() => {
            if(quantity <=1 ) return ;
            setQuantity(quantity - 1)
            }} type='button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          </button>
          <p>{quantity}</p>
          <button onClick={() => {
            if(quantity >=5 ) return ;
            setQuantity(quantity + 1)
            }} 
            type='button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          </button>
        </div>
        <button
        onClick={()=>{
          handleAddOrder({...product, quantity})
        handleClickModal();
        }}
          type='button'
          className='bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer uppercase font-bold w-full mt-5 p-2 
                    text-white rounded-lg'
        >
          {edition ? 'save to chages': 'Add to order'}
        </button>
      </div>
    </div>
  )
}
