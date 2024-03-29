import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  //   deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  //   ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({}) => {
  const { id } = useParams()
  const orderId = id

  const [sdkReady, setSdkReady] = useState(false)
  //creating a state and setting it to false

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  // get currentstate

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay
  // get orderpay state
  //rename as lloadingpay

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price, 0)
    )
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      console.log(order.user.name)

      const { data: clientId } = await axios.get('/api/config/paypal')
      // fetch clientid from backend using axios.get
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        // if script doesnt exist
        addPayPalScript()
      } else {
        setSdkReady(true) // else set it to be ready
      }
    }
  }, [dispatch, orderId, successPay, order])

  //   const orderDeliver = useSelector((state) => state.orderDeliver)
  //   const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  //   const userLogin = useSelector((state) => state.userLogin)
  //   const { userInfo } = userLogin

  //   useEffect(() => {
  //     if (!userInfo) {
  //       history.push('/login')
  //     }

  //     const addPayPalScript = async () => {
  //       const { data: clientId } = await axios.get('/api/config/paypal')
  //       const script = document.createElement('script')
  //       script.type = 'text/javascript'
  //       script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
  //       script.async = true
  //       script.onload = () => {
  //         setSdkReady(true)
  //       }
  //       document.body.appendChild(script)
  //     }

  //     if (!order || successPay || successDeliver || order._id !== orderId) {
  //       dispatch({ type: ORDER_PAY_RESET })
  //       dispatch({ type: ORDER_DELIVER_RESET })
  //       dispatch(getOrderDetails(orderId))
  //     } else if (!order.isPaid) {
  //       if (!window.paypal) {
  //         addPayPalScript()
  //       } else {
  //         setSdkReady(true)
  //       }
  //     }
  //   }, [dispatch, orderId, successPay, successDeliver, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  //   const deliverHandler = () => {
  //     dispatch(deliverOrder(order))
  //   }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <p>Shipping</p>
            <ListGroupItem>Name: {order.user.name}</ListGroupItem>
            <ListGroupItem>
              <strong>Email: </strong>{' '}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </ListGroupItem>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant='success'>
                Returned on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant='danger'>Not Returned</Message>
            )}

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/item/${item.item}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          1 x ${item.price} = ${item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {/* {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )} } */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
