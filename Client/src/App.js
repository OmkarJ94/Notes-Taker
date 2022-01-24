
import React, { createContext, useReducer } from 'react'
// import './App.css';
import Login from './components/Login';
import { reducer } from "./Reducer/reducer"
import { Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup"
import Navbar from './components/Navbar';
import Notitem from './components/Notitem';
import Logout from './components/Logout';
import ChangePassword from './components/ChangePassword';
export const UserContext = createContext()
function App() {
  const [state, dispatch] = useReducer(reducer, false)
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/notes" element={<Notitem />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
