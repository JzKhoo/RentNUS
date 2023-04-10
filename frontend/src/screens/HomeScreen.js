import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listItems } from "../actions/itemActions";
import Item from "../components/Item";
// import Product from "../components/Product";
// import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.itemList); // 2. grab the products from the state and pull out what we want from it
  const { loading, error, items, page, pages } = itemList; 
  console.log(itemList)

  useEffect(() => {
    dispatch(listItems(keyword, pageNumber)); // 1. fire off action to get products
  }, [dispatch, keyword, pageNumber]);

  return (
    //3. display in output
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <Row>
          {items.map((item) => (
            // check if isOrderPlaced is true
              // if it's true, don't display the item
              // otherwise, display the item
            !item.isOrderPlaced && (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <Item item={item} />
            </Col>)
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>
      )}
    </>
  );
};

export default HomeScreen;
