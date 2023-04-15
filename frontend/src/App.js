import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
//import ProductScreen from "./screens/ProductScreen";
import ItemScreen from './screens/ItemScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import AddItemScreen from './screens/AddItemScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import DisplayUserProfileScreen from './screens/DisplayUserProfileScreen'
import OrderScreen from './screens/OrderScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import MyItemsScreen from './screens/MyItemsScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import MyOrdersScreen from './screens/MyOrdersScreen'
import ItemListScreen from './screens/ItemListScreen'
import ItemEditScreen from './screens/ItemEditScreen'
import UpdateItemScreen from './screens/UpdateItemScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/items/:id' element={<ItemScreen />} />
          </Routes>
          <Routes>
            <Route path='/addItem' element={<AddItemScreen />} />
          </Routes>
          {/* <Routes>
            <Route path="/displayuserprofile" element={<DisplayUserProfileScreen/>} />
          </Routes> */}
          <Routes>
            <Route
              path='/displayuserprofile/:owner'
              element={<DisplayUserProfileScreen />}
            />
          </Routes>
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
          </Routes>
          <Routes>
            <Route path='/register' element={<RegisterScreen />} />
          </Routes>
          <Routes>
            <Route path='/profile' element={<ProfileScreen />} />
          </Routes>
          <Routes>
            <Route path='/order/:id' element={<OrderScreen />} />
          </Routes>
          {/* <Routes>
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes> */}
          <Routes>
            <Route path='/cart/:id?' element={<CartScreen />} />
          </Routes>
          <Routes>
            <Route path='/shipping' element={<ShippingScreen />} />
          </Routes>
          <Routes>
            <Route path='/payment' element={<PaymentScreen />} />
          </Routes>
          <Routes>
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
          </Routes>
          <Routes>
            <Route path='/search/:keyword' element={<HomeScreen />} exact />
          </Routes>
          <Routes>
            <Route path='/myOrders' element={<MyOrdersScreen />} />
          </Routes>
          <Routes>
            <Route path='/myItems' element={<MyItemsScreen />} />
          </Routes>
          <Routes>
            <Route path='/updateitem/:itemId' element={<UpdateItemScreen />} />
          </Routes>
          <Routes>
            <Route path='/page/:pageNumber' element={<HomeScreen />} exact />
          </Routes>
          <Routes>
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreen />}
              exact
            />
          </Routes>
          <Routes>
            <Route path='/admin/userlist' element={<UserListScreen />} exact />
          </Routes>
          <Routes>
            <Route
              path='/admin/user/:id/edit'
              element={<UserEditScreen />}
              exact
            />
          </Routes>
          <Routes>
            <Route path='/admin/itemlist' element={<ItemListScreen />} exact />
          </Routes>
          <Routes>
            <Route
              path='/admin/item/:id/edit'
              element={<ItemEditScreen />}
              exact
            />
          </Routes>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
