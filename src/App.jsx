import { useState } from 'react'
import './App.css'
import ProductSelect from './components/ProductSelect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProductSelect/>
    </>
  )
}

export default App
