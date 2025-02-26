import './App.css'
import { CartProvider } from './context/cartContext'
import Pages from './routes/Pages'
import { BrowserRouter } from 'react-router-dom'

function App() {
 

  return (
    <>
    <CartProvider>
      <BrowserRouter>
      <Pages/>
      </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
