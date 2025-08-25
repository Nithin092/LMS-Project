import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import IssuedBooks from './components/Admin/Pages/IssuedBooks';
import MyBooks from './components/Student/MyBooks';
import AllBook from './components/Admin/Pages/AllBook'
import Login from './pages/Login'
import "./App.css";
import Students from './components/Admin/Pages/Students';

function App() {
 

  return (
    <>
  <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/mybooks" element={<MyBooks/>} />
        <Route path="/issuedbooks" element={<IssuedBooks />} />
        <Route path="/allbooks" element={<AllBook/>} />
        <Route path="/students" element={<Students />} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
