import type { FormEvent } from 'react'
import { formatPrice } from '../helpers'
import { useKiosk } from '../hooks/useKiosk'
import { SummaryProduct } from './SummaryProduct'

export const Summary = () => {
  const { order,total,handleSubmitNewOrder } = useKiosk()

const handleSubmit=(event: FormEvent<HTMLFormElement>)=>{
event.preventDefault();


handleSubmitNewOrder();


}  
  return (
    <aside className='w-72 h-screen overflow-y-scroll p-5'>
      <h1 className='text-4xl font-black'>My order</h1>
      <p className='text-lg my-5'>Here you can see a summary of your order</p>

      <div className='py-10'>
        {order.length === 0 ? (
          <p>There are no items in your order yet.</p>
        ) : (
          <>
            <p>There are items in your order </p>

            {order.map(product => (
              <SummaryProduct 
              key={product.id}
              product={product}
              />
            ))}
          </>
        )}

        <p className='text-xl mt-10'>Total: { formatPrice(total)}   </p>

        <form 
        onSubmit={handleSubmit}
        className='w-full'
        
        >
          <div className='mt-5'>
            <input
              type='submit'
              className={` ${order.length===0 ? 'bg-indigo-200 ':'bg-indigo-600 hover:bg-indigo-800 cursor-pointer' }  
              px-5 py-2 rounded uppercase font-bold 
                  text-white text-center w-full cursor-not-allowed `}
              value='confirm order'
              disabled={order.length===0}
              
            />
          </div>
        </form>
      </div>
    </aside>
  )
}
