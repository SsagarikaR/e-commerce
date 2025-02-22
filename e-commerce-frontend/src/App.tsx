import './App.css'
import { CartProvider } from './context/cartContext'
import Pages from './routes/Pages'
import { BrowserRouter } from 'react-router-dom'
import ToastNotification from './components/ToastNotification'

function App() {
 

  return (
    <>
    <CartProvider>
      <BrowserRouter>
      <ToastNotification />
      <Pages/>
      </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
