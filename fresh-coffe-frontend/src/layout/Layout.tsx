import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Summary } from '../components/Summary'
import { useKiosk } from '../hooks/useKiosk'
import Modal from 'react-modal'
import ModalProduct from '../components/ModalProduct'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useAuth } from '../hooks/useAuth'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export default function Layout() {

  useAuth({ middleware: 'auth' })
  const { modal } = useKiosk()

  return (
    <>
      <div className='flex '>
        <Sidebar />

        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100'>
          <Outlet />
        </main>

        <Summary />
      </div>

      <Modal
        isOpen={modal}
        style={customStyles}
      // ariaHideApp={false}
      // onRequestClose={handleClickModal}
      >
        <ModalProduct />
      </Modal>

      <ToastContainer />

    </>
  )
}
