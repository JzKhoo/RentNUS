import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <Form className='d-flex' onSubmit={handleSubmit}>
      <Form.Control
        type='text'
        name='q'
        placeholder='Search Item...'
        className='mr-sm-2 ml-sm-5'
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button variant='outline-success' type='submit' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBar
