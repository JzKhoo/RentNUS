import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
// import Loader from "../components/Loader";
import FormContainer from '../components/FormContainer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addItem } from '../actions/itemActions'
import { useDropzone } from 'react-dropzone'

const MyDropzone = ({ onFileSelect }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onFileSelect(acceptedFiles[0])
    },
  })

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>
        Drag 'n' drop some files here, or click to select files (.jpg or .png
        only)
      </p>
      <ul>{files}</ul>
      <style jsx='true'>{`
        .dropzone {
          border: 2px dashed #ccc;
          border-radius: 5px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .dropzone p {
          margin: 0;
          font-size: 16px;
          font-weight: bold;
          color: #555;
        }
        .dropzone ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .dropzone li {
          margin-top: 10px;
          font-size: 14px;
          color: #555;
        }
      `}</style>
    </div>
  )
}

const AddItemScreen = () => {
  const navigate = useNavigate()
  const [owner, setOwner] = useState('')
  const [name, setName] = useState('')
  // const [image, setImage] = useState("");
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showMessage, setShowMessage] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const itemAdd = useSelector((state) => state.itemAdd)
  const { error } = itemAdd
  const { userInfo } = userLogin

  // modified: location in RRD v6 must be used this way
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // modified:this is to check if userInfo is empty object, it will redirect if userInfo is empty
  // or is this redundant?
  useEffect(() => {
    if (Object.keys(userInfo).length <= 0) {
      navigate(redirect)
      console.log('user not signed in')
    }
  }, [navigate, userInfo, redirect])

  // Set the owner state to the user's _id value
  useEffect(() => {
    if (userInfo) {
      setOwner(userInfo._id)
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('owner', owner)
    formData.append('name', name)
    formData.append('image', selectedFile, selectedFile.name) // Updated line
    formData.append('brand', brand)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('pricePerDay', pricePerDay)
    formData.append('startDate', startDate)
    formData.append('endDate', endDate)
    dispatch(addItem(formData))
    console.log('item dispatched')
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
      navigate('/')
    }, 3000)
  }

  return (
    <FormContainer>
      <h1>Add an Item</h1>
      {showMessage && (
        <Alert
          variant='success'
          onClose={() => setShowMessage(false)}
          dismissible
        >
          Item added successfully
        </Alert>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {/* {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name of Item</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name of Item'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
          {/* <MyDropzone /> */}
          <MyDropzone onFileSelect={setSelectedFile} /> {/* Updated */}
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label>Name of Brand</Form.Label>
          <Form.Control
            type='brand'
            placeholder='Enter Brand of Item'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category of Item</Form.Label>
          <Form.Control
            type='category'
            placeholder='Enter Category of Item'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description of Item</Form.Label>
          <Form.Control
            type='description'
            placeholder='Enter Description of Item'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='pricePerDay'>
          <Form.Label>Price Per Day</Form.Label>
          <Form.Control
            type='pricePerDay'
            placeholder='Enter Daily Price of Item'
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='startDate'>
          <Form.Label>Start Date of Item availability</Form.Label>
          <br />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Form.Group>

        <Form.Group controlId='endDate'>
          <Form.Label>End Date of Item availability</Form.Label>
          <br />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Add Item
        </Button>
      </Form>
    </FormContainer>
  )
}

export default AddItemScreen
