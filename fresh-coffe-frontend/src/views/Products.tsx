
import useSWR from "swr"
import { clientAxios } from "../config/axios"
import type { ProductsResponse } from "../types";

import { Product } from "../components/Product";


export const Products = () => {

  const url = '/api/products';
  const token = localStorage.getItem('AUTH_TOKEN');
  console.log('AUTH_TOKEN');

  const fetcher = (url: string) => clientAxios.get<ProductsResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data)

  const { data, error, isLoading } = useSWR<ProductsResponse>(url, fetcher )

  console.log(data?.data)
  const responseProduct=data?.data;
  if (isLoading) return "loading..."
  if (error) return "error"


  return (


    <div>
      <h1 className='text-4xl font-black'>Products</h1>
      <p className='text-2xl my-10 '>Manage availability from here</p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
              {responseProduct?.map(product => (
                <Product 
                key={product.id} 
                product={product} 
                availableButton={true}

                
                />
              ))}
            </div>





    </div>
  )
}
