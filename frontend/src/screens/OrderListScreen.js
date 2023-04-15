import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
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
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
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
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
