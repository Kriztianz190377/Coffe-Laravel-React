import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { CategoriesProps, KioskContextProps, ProductProps } from '../types'
import { toast } from 'react-toastify'

import { clientAxios } from '../config/axios'



export const KioskContext = createContext<KioskContextProps | null>(null)

interface KioskProviderProps {
  children: ReactNode
}

export default function KioskProvider({ children }: KioskProviderProps) {


  const [categories, setCategories] = useState<CategoriesProps[]>([])

  const [currentCategory, setCurrentCategory] = useState<CategoriesProps | null>(null)
  const [modal, setModal] = useState(false)
  const [product, setProduct] = useState<ProductProps | null>(null)
  const [order, setOrder] = useState<ProductProps[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {

    const newTotal = order.reduce((total, product) => (product.price * (product.quantity ?? 1)) + total, 0)
    setTotal(newTotal)
  }, [order])

  const getCategoriesDB = async () => {

    const token = localStorage.getItem('AUTH_TOKEN')
    try {
      const { data } = await clientAxios('/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log(data.data)
      setCategories(data.data);
      setCurrentCategory(data.data[0])

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCategoriesDB();

  }, [])

  const handleClickCategorie = (id: number) => {
    const categorie = categories.filter(cat => cat.id === id)[0]
    setCurrentCategory(categorie)
  }
  const handleClickModal = () => {
    setModal(!modal)
  }
  const handleSetProduct = (product: ProductProps | null) => {
    setProduct(product)
  }
  const handleAddOrder = (produitOrder: ProductProps) => {
    if (order.some(orderState => orderState.id === produitOrder?.id)) {
      const productUpdate = order.map(orderState =>
        orderState.id === product?.id ? produitOrder : orderState
      )
      setOrder(productUpdate)
      toast.success('Saved successfully')
    } else {
      setOrder([...order, produitOrder])
      toast.success('Added to order')
    }
  }

  const handleEditionQuantity = (id: number) => {
    const productUpdate = order.filter(product => product.id === id)[0]
    setProduct(productUpdate)
    setModal(!modal)
  }
  const handleDeletProductOrder = (id: number) => {
    const orderUpdate = order.filter(product => product.id !== id)
    setOrder(orderUpdate)
    toast.success('Removed from order')
  }

  const handleSubmitNewOrder = async () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
      const { data } = await clientAxios.post('api/orders',
        {
          total,
          products: order.map(product => {
            return {
              id: product.id,
              quantity: product.quantity,
            }
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      toast.success(data.message)
      setTimeout(() => {
        setOrder([]);
      }, 1000)

    } catch (error) {
      console.error(error)
    }
  }
  const handelCliclkCompleteOrder = async (id: number) => {

    console.log('completando orden', id)

    const token = localStorage.getItem('AUTH_TOKEN')
    try {
      await clientAxios.put(`api/orders/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    } catch (error) {
      console.error(error)
      throw new Error("Something went wrong")
    }
  }


  const handelCliclkOutOfStock = async (id: number) => {

    console.log('completando orden', id)

    const token = localStorage.getItem('AUTH_TOKEN')
    try {
      await clientAxios.put(`api/products/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    } catch (error) {
      console.error(error)
      throw new Error("Something went wrong")
    }
  } 

  const value: KioskContextProps = {
    categories,
    currentCategory,
    handleClickCategorie,
    modal,
    setModal,
    handleClickModal,
    product,
    handleSetProduct,
    order,
    handleAddOrder,
    handleEditionQuantity,
    handleDeletProductOrder,
    total,
    handleSubmitNewOrder,
    handelCliclkCompleteOrder,
    handelCliclkOutOfStock 
  }

  return <KioskContext.Provider value={value}>{children}</KioskContext.Provider>
}
