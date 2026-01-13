import useSWR from "swr"
import { clientAxios } from "../config/axios"
import type { OrderProps, OrdersResponse } from "../types";
import type { AxiosResponse } from "axios";
import { formatPrice } from "../helpers";
import { useKiosk } from "../hooks/useKiosk";


export const Orders = () => {

  const {handelCliclkCompleteOrder}=useKiosk()
  const url = '/api/orders';
  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = (url: string) => clientAxios<OrdersResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { data, isLoading } = useSWR<AxiosResponse<OrdersResponse>>(url,fetcher,
  //  {refreshInterval:1000}
  )


  const dataOrder = (data?.data.data ?? []) as OrderProps[]

  console.log(dataOrder);


  if (isLoading) return "loading........"

  return (

    <div>

      <h1 className='text-4xl font-black'>Orders</h1>
      <p className='text-2xl my-10 '>Manage orders from here</p>


      <div className="grid grid-cols-3 gap-3">

        {dataOrder?.map(order => (
          <div
            key={order.id}
            className="p-5 mx-5 bg-white shadow space-y-2 border-b "
          >
            <p className="text-xl font-bold text-slate-600">Order contents: </p>

            {   //order.products.length > 0 &&
              order.products.map(product => (
                <div
                  key={product.id}
                  className="border-b border-b-slate-600 last-of-type:border-none
              py-4 ">
                  <p className="text-xs">ID: {product.id}</p>
                  <p >{product.name}</p>
                  <p >Quantity: <span className="font-bold">{product.pivot.quantity} </span></p>
                </div>
              ))}
            <p className="text-lg font-bold text-slate-600">Client: {order.user.name}</p>
            <p className="text-lg font-bold text-amber-600">Total to pay: {formatPrice(order.total)}</p>

        
              <button
                type='button'
                className= 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer  px-5 py-2 rounded uppercase font-bold  text-white text-center w-full '
                value='confirm order' 
                onClick={()=>handelCliclkCompleteOrder(order.id)}            

              >complete order </button>
            </div>



         
        ))}

      </div>




    </div>

  )
}
