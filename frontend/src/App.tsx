import './App.css'
import { Routes, Route } from 'react-router-dom'

// components
import TopNavBar from './components/TopNavBar/TopNavBar'

// pages
import Home from './pages/Home/Home'
import Add from './pages/Add/Add'
import View from './pages/View/View'

function App() {
  return (
    <>
      <TopNavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:sheetName" element={<View />} />
        <Route path="/add/:sheetName" element={<Add />} />
      </Routes>
    </>
  )
}

export default App