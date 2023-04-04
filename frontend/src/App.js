import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import  ShippingScreen  from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
          <Routes>
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
          <Routes>
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
          <Routes>
            <Route path="/order/:id" element={<OrderScreen />} />
          </Routes>
          <Routes>
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
          <Routes>
            <Route path="/cart/:id?" element={<CartScreen />} />
          </Routes>
          <Routes>
            <Route path="/shipping" element={<ShippingScreen />} />
          </Routes>
          <Routes>
            <Route path="/payment" element={<PaymentScreen />} />
          </Routes>
          <Routes>
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
          </Routes>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
