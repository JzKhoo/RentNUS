import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Table, Form, Button, Row, Col, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listMyOrders } from '../actions/orderActions'
import {
  setIsBorrowedBorrowerConfirmed,
  setIsReturnedBorrowerConfirmed,
} from '../actions/orderActions'

const MyOrdersScreen = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  // to check if user is logged in

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
  console.log(orders)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
      // if not logged in
    } else {
      dispatch(listMyOrders())
    }
  }, [dispatch, navigate, userInfo])

  const confirmItemBorrowedHandler = (order, orderItemId) => {
    dispatch(setIsBorrowedBorrowerConfirmed(order, orderItemId))
    navigate('/myOrders')
  }

  const confirmItemReturnedHandler = (order, orderItemId) => {
    dispatch(setIsReturnedBorrowerConfirmed(order, orderItemId))
    navigate('/myOrders')
  }

  return (
    <Row>
      <Col>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>DATE</th>
                <th>PRICE</th>
                <th>PAID DATE</th>
                <th>BORROW STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) =>
                  order.orderItems.map((orderItem) => (
                    <tr key={orderItem._id}>
                      <td>{orderItem.name}</td>
                      <td>
                        <Image
                          src={orderItem.image}
                          alt={'Unable to load photo'}
                          fluid
                        />
                      </td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{orderItem.price}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {orderItem.isBorrowed.lenderConfirmation
                          ? orderItem.isBorrowed.borrowerConfirmation
                            ? orderItem.isReturned.borrowerConfirmation
                              ? orderItem.isReturned.lenderConfirmation
                                ? 'RETURNED'
                                : 'AWAITING RETURN CONFIRMATION FROM LENDER'
                              : 'ON LOAN'
                            : 'AWAITING BORROW CONFIRMATION FROM BORROWER'
                          : 'AWAITING BORROW CONFIRMATION FROM LENDER'}
                      </td>
                      <td>
                        <Row>
                          {orderItem.isBorrowed.lenderConfirmation ? (
                            orderItem.isBorrowed.borrowerConfirmation ? (
                              orderItem.isReturned.borrowerConfirmation ? (
                                orderItem.isReturned.lenderConfirmation ? (
                                  ''
                                ) : (
                                  ''
                                )
                              ) : (
                                <Button
                                  className='btn-sm'
                                  variant='light'
                                  onClick={() =>
                                    confirmItemReturnedHandler(
                                      order,
                                      orderItem._id
                                    )
                                  }
                                >
                                  Return item
                                </Button>
                              )
                            ) : (
                              <Button
                                className='btn-sm'
                                variant='light'
                                onClick={() =>
                                  confirmItemBorrowedHandler(
                                    order,
                                    orderItem._id
                                  )
                                }
                              >
                                Confirm Item Borrowed
                              </Button>
                            )
                          ) : (
                            ''
                          )}
                        </Row>
                        <br />
                        <Row>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>
                              Details
                            </Button>
                          </LinkContainer>
                        </Row>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <td colSpan={8}>"No items ordered"</td>
              )}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default MyOrdersScreen
