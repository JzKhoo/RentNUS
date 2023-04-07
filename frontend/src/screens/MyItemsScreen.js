import React, { useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { Table, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
//import { listProducts } from "../actions/productActions";
import { listItems } from "../actions/itemActions";

const MyItemsScreen = () => {
  // const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // to check if user is logged in

//   const orderListMy = useSelector((state) => state.orderListMy)
//   const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const itemList = useSelector((state) => state.itemList); //using productList for now before merge with andre's work
  const { loading, error, items, page, pages } = itemList; 
  
  console.log(itemList)

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      // if not logged in 
    }
    dispatch(listItems())
  }, [dispatch, userInfo]);

  return (
    <Row>
      <Col>
        <h2>My Items</h2>
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
                <th>BRAND</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>REVIEWS</th>
                <th>RATING</th>
                <th>NUMBER OF REVIEWS</th>
                <th>PRICE</th>
                <th>STOCK COUNT</th>
              </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td><Image src={item.image} alt={item.name} fluid /></td>
                  <td>{item.brand}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.reviews ? item.reviews.map((review)=> (<td>{review}</td>)) : 0}</td>
                  <td>{item.rating}</td>
                  <td>{item.numReviews}</td>
                  <td>{item.price}</td>
                  <td>{item.countInStock}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default MyItemsScreen;
