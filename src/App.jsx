import { useState } from 'react'
import Lcontainer from './components/Lcontainer.jsx'
import Sidebar from './components/Sidebar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Lcontainer />
      <Sidebar />
    </>
  )
}

export default App

