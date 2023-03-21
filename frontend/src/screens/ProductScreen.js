import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
//import products from '../products'
import axios from 'axios'

const ProductScreen = ({match}) => {
    const { id } = useParams(); // instead of match.params.id
    const [product, setProduct] = useState([])
    
    useEffect(() => {
      const fetchProduct = async() => {
        const {data} = await axios.get(`/api/products/${id}`)
        setProduct(data)
      }

      fetchProduct()
    }, [])
    // const product = products.find((p) => String(p._id) === id);
    return (
    <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        <Row>
            <Col md ={6}>
                <Image src={product.image} alt ={product.name} fluid/>
            </Col>
            <Col md= {3}>
                <ListGroup variant ='flush'>
                    <ListGroupItem>
                        <h3>
                            {product.name}
                        </h3>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Rating 
                            value ={product.rating} 
                            text = {`${product.numReviews} reviews`}
                            />
                    </ListGroupItem>
                    <ListGroupItem>
                        Price: {product.price}
                    </ListGroupItem>
                    <ListGroupItem>
                        Description: {product.description}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <Row>
                                <Col>Price:</Col>
                                <Col> 
                                    <strong>${product.price}</strong>    
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Status:</Col>
                                <Col> 
                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}   
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button className='btn-block' type ='button' 
                            disabled={product.countInStock === 0}>
                                Add To Cart
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  );
};

export default ProductScreen;
