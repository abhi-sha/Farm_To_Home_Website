import logo from './logo.svg';
import './App.css';
import Home from './screens/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AboutUs from './screens/AboutUs';
import Login from './screens/Login';
import Register from './screens/Register';
import { createContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './screens/Cart';
import MyOrders from './screens/MyOrders';
const appContext = createContext()

function App() {
  const [mode, setMode] = useState(localStorage.getItem("mode")==="true"?"LIGHT":"DARK")
  const [login, setLogin] = useState(localStorage.getItem("loggedIn")==="true"?"true":"false")
  const [cart,setCart]=useState(localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):{})

  return (
    <appContext.Provider value={{ mode, setMode, login, setLogin,cart,setCart }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path='/'></Route>
          <Route element={<AboutUs />} path='/aboutme'></Route>
          <Route element={<Login />} path='/login'></Route>
          <Route element={<Register />} path='/register'></Route>
          <Route element={<Cart />} path='/cart'></Route>
          <Route element={<MyOrders />} path='/myorders'></Route>


        </Routes>
      </BrowserRouter>
    </appContext.Provider>


  );
}
export { appContext };
export default App;
