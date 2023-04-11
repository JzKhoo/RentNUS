import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listItems, deleteItem } from '../actions/itemActions'
import { useNavigate } from 'react-router-dom'

const ItemListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const itemList = useSelector((state) => state.itemList)
  const { loading, error, items } = itemList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const itemDelete = useSelector((state) => state.itemDelete)
  const { success: successDelete } = itemDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listItems())
    } else {
      navigate('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    dispatch(deleteItem(id))
  }

  const createItemHandler = (item) => {
    navigate('/addItem')
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Items</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createItemHandler}>
            <i className='fas fa-plus'></i> Create Item
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>${item.pricePerDay}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>
                  <LinkContainer to={`/admin/item/${item._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ItemListScreen
