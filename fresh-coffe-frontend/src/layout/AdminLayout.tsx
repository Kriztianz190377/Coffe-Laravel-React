import { Outlet } from "react-router-dom"
import { AdminSidebar } from "./AdminSidebar"
import { useAuth } from "../hooks/useAuth"





export const AdminLayout = () => {


 useAuth({ middleware: 'admin' })


  return (
    <div className='flex '>
        <AdminSidebar />

        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100'>
          <Outlet />
        </main>

     
      </div>
  )
}
