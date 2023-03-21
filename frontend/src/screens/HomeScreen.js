import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
      const fetchProducts = async() => {
        const {data} = await axios.get('/api/products')
        setProducts(data)
      }

      fetchProducts()
    }, [])
    return (
      <>
          <h1>Latest Products</h1>
          <Row>
              {products.map( (product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product = {product}/>
                  </Col> 
              ))}
          </Row>
      </>
    )
}

  const productList = useSelector((state) => state.productList); // 2. grab the products from the state and pull out what we want from it
  const { loading, error, products } = productList; 

  useEffect(() => {
    dispatch(listProducts()); // 1. fire off action to get products
  }, [dispatch]);

  return (  //3. display in output
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
