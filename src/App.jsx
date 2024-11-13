import { useState } from 'react'
import './App.css'
import ProductSelect from './components/ProductSelect'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login/>
    <ProductSelect/>
    </>
  )
}

export default App
