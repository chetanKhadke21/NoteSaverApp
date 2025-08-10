import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ViewNotes from './components/ViewNotes'
import Navbar from './components/Navbar'
import AddNote from './components/AddNote'
import EditNote from './components/EditNote'

function App() {


  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/add' element={<AddNote/>}/>
        <Route path="/notes/:id" element={<ViewNotes />} />
        <Route path="/notes/:id/edit" element={<EditNote />} />
      </Routes>
    </>
  )
}

export default App
