import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Edit from './Edit'
import Preview from './Preview'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  )
}

export default App

