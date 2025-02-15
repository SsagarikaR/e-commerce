import './App.css'
import { CartProvider } from './context/cartContext'
import Home from './routes/Home'
import { BrowserRouter } from 'react-router-dom'

function App() {
 

  return (
    <>
    <CartProvider>
      <BrowserRouter>
      <Home/>
      </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
