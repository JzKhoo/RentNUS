import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'


const ProductScreen = ({match}) => {
    const { id } = useParams();
    const product = products.find((p) => String(p._id) === id);
    return (
    <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
    </>
  )
}

export default ProductScreen