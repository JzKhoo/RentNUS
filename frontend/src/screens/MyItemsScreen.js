import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Row, Col, Image, Button, Icon } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
//import { listProducts } from "../actions/productActions";
import { listItems, deleteItem } from "../actions/itemActions";
import { ITEM_DELETE_RESET } from "../constants/itemConstants";

const MyItemsScreen = () => {
  // const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // to check if user is logged in

  //   const orderListMy = useSelector((state) => state.orderListMy)
  //   const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const [message, setMessage] = useState(null);
  const itemList = useSelector((state) => state.itemList); //using productList for now before merge with andre's work
  const { loading, error, items, page, pages } = itemList;

  console.log(itemList);

  const navigate = useNavigate();

  const itemDelete = useSelector((state) => state.itemDelete);
  const { success: successDelete } = itemDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteItem(id)).then(() => dispatch(listItems())); // add this line
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      // if not logged in
    }
    if (successDelete) {
      dispatch({ type: ITEM_DELETE_RESET });
      setMessage("Item deleted successfully");
    }
    dispatch(listItems());
    setMessage(null);
  }, [dispatch, userInfo, successDelete]);

  return (
    <Row>
      <Col>
        <h2>My Items</h2>
        {message && <Message variant="success">{message}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>BRAND</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <Image src={item.image} alt={item.name} fluid />
                  </td>
                  <td>{item.brand}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.pricePerDay}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(item._id)}
                    >
                      <i className="fas fa-trash">Delete</i>
                    </Button>
                  </td>
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
