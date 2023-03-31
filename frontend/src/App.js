import React from "react";
import Header from './components/Header'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' 
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  return (
    <Router>
    <Header/>
    <main className="py-3">
      <Container>
        <Routes>
          <Route path='/login' element={<LoginScreen/>} exact/> 
        </Routes>
        <Routes>
          <Route path='/' element={<HomeScreen/>} exact/> 
        </Routes>
        <Routes>
          <Route path='/register' element={<RegisterScreen/>} exact/> 
        </Routes>
        <Routes>
          <Route path='/product/:id' element={<ProductScreen/>}/>  
        </Routes>
        <Routes>
          <Route path='/cart/:id?' element={<CartScreen/>}/>  
        </Routes>
      </Container>     
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
