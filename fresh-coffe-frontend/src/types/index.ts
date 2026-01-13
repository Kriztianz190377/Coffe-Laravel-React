import type { AxiosError } from "axios"
import type { Dispatch, RefObject, SetStateAction } from "react"

export interface CategoriesProps {
  icon: string
  name: string
  id: number
}

/* =========================
   ✅ Productos / Órdenes (separados)
   ========================= */

// Producto dentro de una orden (relación many-to-many con pivot)
export interface OrderProduct {
  id: number
  name: string
  pivot: {
    quantity: number
  }
}

// Orden que devuelve /api/orders
export interface OrderProps {
  id: number
  user_id: number
  products: OrderProduct[],
  total: number
  user: {
    name: string
  }
}

// Producto del catálogo (lo que usas para listar y agregar al carrito)
export interface ProductProps {
  id: number
  name: string
  price: number
  image: string
  category_id: number
  quantity?: number, // cantidad en el carrito (frontend)
  
}
// Props del componente Product (UI)
export interface ProductComponentProps {
  product: ProductProps
  addButton?: boolean
  availableButton?: boolean
}

/* =========================
   ✅ Context
   ========================= */

export interface KioskContextProps {
  categories: CategoriesProps[]
  currentCategory: CategoriesProps | null
  handleClickCategorie: (arg: number) => void

  modal: boolean
  setModal: Dispatch<SetStateAction<boolean>>
  handleClickModal: () => void

  product: ProductProps | null
  handleSetProduct: (arg: ProductProps) => void

  // Carrito / orden en construcción (frontend)
  order: ProductProps[]
  handleAddOrder: (arg: ProductProps) => void
  handleEditionQuantity: (arg: number) => void
  handleDeletProductOrder: (arg: number) => void
  total: number
  handleSubmitNewOrder: () => void
  handelCliclkCompleteOrder: (arg: number) => void
handelCliclkOutOfStock:(arg: number) => void
}

/* =========================
   ✅ Auth
   ========================= */

export type AuthProps = {
  middleware?: "guest" | "auth" | "admin"
  url?: string
}

export type LoginData = {
  email: string
  password: string
}

export type LoginProps = {
  dataUser: LoginData
  setErrors: Dispatch<React.SetStateAction<string[]>>
  emailRef: RefObject<HTMLInputElement | null>
  passwordRef: RefObject<HTMLInputElement | null>
}

export type LaravelErrors = Record<string, string[]>

export type User = {
  id: number
  name: string
  email: string
  email_verified_at?: string | null
  created_at?: string
  updated_at?: string
  admin: boolean
}

export type AuthResponse = {
  token: string
  user: User
}

export type SwrAuthError =
  | Error
  | AxiosError<{ errors?: LaravelErrors; message?: string }>

export type UseAuthReturn = {
  login: (props: LoginProps) => Promise<void>
  register: (props: RegisterProps) => Promise<void>
  logout: () => void
  user: User | undefined
  error: SwrAuthError | undefined
}

export type RegisterDataProps = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type RegisterProps = {
  dataUser: RegisterDataProps
  setErrors: Dispatch<React.SetStateAction<string[]>>
  nameRef: RefObject<HTMLInputElement | null>
  emailRef: RefObject<HTMLInputElement | null>
  passwordRef: RefObject<HTMLInputElement | null>
  passwordConfirmationRef: RefObject<HTMLInputElement | null>
}

/* =========================
   ✅ Responses
   ========================= */

// Si /api/products devuelve { data: ProductProps[] }
export type ProductsResponse = {
  data: ProductProps[]
}

// Si /api/orders devuelve paginado Laravel: { data: { data: OrderProps[] } }
export type OrdersResponse = {
  data: {
    data: OrderProps[]
  }
}
