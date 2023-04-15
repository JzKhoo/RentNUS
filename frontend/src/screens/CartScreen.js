import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
  const { id } = useParams()

  const itemId = id

  const { search } = useLocation()
  const qty = search ? Number(search.split('=')[1]) : 1

  const searchParams = new URLSearchParams(search)
  const totalCost = searchParams.get('totalCost')
    ? Number(searchParams.get('totalCost'))
    : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const { cartItems } = cart
  console.log(cartItems)

  console.log(cartItems)

  const navigate = useNavigate()

  useEffect(() => {
    if (itemId) {
      dispatch(addToCart(itemId, totalCost))
    }
  }, [dispatch, itemId, totalCost])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.item}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <Link to={`/items/${item.item}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  {console.log(item.price)}
                  <Col md={2}></Col>
                  <Col md={4}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.item)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
