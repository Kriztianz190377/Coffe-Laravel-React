// import { products  as data} from '../db/dabase'
import useSWR from 'swr'
import { Product } from '../components/Product'

import { useKiosk } from '../hooks/useKiosk'
import { clientAxios } from '../config/axios';
import type { ProductProps, ProductsResponse } from '../types';




export default function Home() {
  const { currentCategory } = useKiosk()

  const url = "/api/products"
  const token = localStorage.getItem("AUTH_TOKEN")

  const fetcher = (url: string) => {
    if (!token) {
      // ⚠️ Sin token no pedimos productos (evita 401)
      throw new Error("No auth token")
    }

    return clientAxios
      .get<ProductsResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
  }

  // ✅ Si no hay token, no disparamos SWR
  const { data, error, isLoading } = useSWR<ProductsResponse>(
    token ? url : null,
    fetcher
  )

  if (!token) return <p>Debes iniciar sesión</p>
  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error cargando productos</p>
  console.log(data?.data)
  const allProducts: ProductProps[] = data?.data ?? []

  const products = currentCategory
    ? allProducts.filter(
        (product) => product.category_id === currentCategory.id
      )
    : allProducts


  return (
    <>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {products?.map(product => (
          <Product
            key={product.id}
            product={product}
            addButton={true}
          />
        ))}
      </div>
    </>
  )
}
