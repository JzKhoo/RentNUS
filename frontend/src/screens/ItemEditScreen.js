import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listItemDetails, updateItem } from '../actions/itemActions'
import FormContainer from '../components/FormContainer'
import { ITEM_UPDATE_RESET } from '../constants/itemConstants'

const ItemEditScreen = ({ match, history }) => {
  const { id } = useParams()
  const itemId = id

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [pricePerDay, setPricePerDay] = useState(0)

  const dispatch = useDispatch()

  const itemDetails = useSelector((state) => state.itemDetails)
  const { loading, error, item } = itemDetails

  const itemUpdate = useSelector((state) => state.itemUpdate)
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = itemUpdate

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: ITEM_UPDATE_RESET})
      navigate('/admin/itemlist')
    } else {
      if (!item.name || item._id !== itemId) {
        dispatch(listItemDetails(itemId))
      } else {
        setName(item.name)
        setBrand(item.brand)
        setCategory(item.category)
        setDescription(item.description)
        setPricePerDay(item.pricePerDay)
      }
    }
    
  }, [dispatch, history, itemId, item, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateItem({
      _id: itemId,
      name,
      brand,
      category,
      description,
      pricePerDay
    }))
  }

  return (
    <>
      <Link to='/admin/itemlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Item</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='pricePerDay'>
              <Form.Label>Price Per Day</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter pricePerDay'
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ItemEditScreen
