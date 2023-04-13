import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { Table, Row, Col, Image, ListGroupItem, Button, Icon } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
//import { listProducts } from "../actions/productActions";
import { deleteItem, listMyItems } from "../actions/itemActions";
import { ITEM_DELETE_RESET } from "../constants/itemConstants";
import { listMyItemOrders, setIsBorrowedLenderConfirmed, setIsReturnedLenderConfirmed } from "../actions/orderActions";

const MyItemsScreen = () => {
  // const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("userinfo" + !userInfo)
  // to check if user is logged in

  //   const orderListMy = useSelector((state) => state.orderListMy)
  //   const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const [message, setMessage] = useState(null);
  const itemList = useSelector((state) => state.itemMyList);
  const { loading1, error1, items } = itemList;

  const orderItemList = useSelector((state) => state.orderItemList);
  const { loading2, error2, orders } = orderItemList;
  console.log("sup" + orders)

  if (itemList) {
    console.log(itemList);
  } else {
    console.log("some thing is wrong");
  }

  const navigate = useNavigate();

  const itemDelete = useSelector((state) => state.itemDelete);
  const { success: successDelete } = itemDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteItem(id)).then(() => dispatch(listMyItems(userInfo._id))); // add this line
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      // if not logged in
    } else {
      dispatch(listMyItems(userInfo._id)); // Execute the action creator
      dispatch(listMyItemOrders(userInfo._id))
      setMessage(null);
    }
    if (successDelete) {
      dispatch({ type: ITEM_DELETE_RESET });
      setMessage("Item deleted successfully");
    }
  }, [dispatch, userInfo, successDelete, navigate]);

  const createItemhandler = () => {
    navigate('/addItem')
  }

  const confirmItemBorrowedHandler = (order, orderItemId) => {
    dispatch(setIsBorrowedLenderConfirmed(order, orderItemId));
    navigate("/myItems")
  }

  const confirmItemReturnedHandler = (order, orderItemId) => {
    dispatch(setIsReturnedLenderConfirmed(order, orderItemId));
    navigate("/myItems")
  }

  return (
    <Col>
      <Row>
        <h2>Items placed on order</h2>
        {message && <Message variant="success">{message}</Message>}
        {loading2 ? (
          <Loader />
        ) : error2 ? (
          <Message variant="danger">{error2}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>PRICE</th>
                <th>USER</th>
                <th>PAYMENT STATUS</th>
                <th>BORROW STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders&& orders.map((order) => (order.orderItems.map((orderItem)=> (
                orderItem.owner == userInfo._id && (
                  <tr key={orderItem._id}>
                    <td>{orderItem.name}</td>
                    <td>
                      <Image src={orderItem.image} alt={orderItem.name} fluid />
                    </td>
                    <td>{orderItem.price}</td>
                    <td>{order.user}</td>
                    <td>{order.isPaid ? "PAYMENT DONE" : "PAYMENT NOT DONE"}</td>
                    <td>
                    {
                      orderItem.isBorrowed.lenderConfirmation ? (
                        orderItem.isBorrowed.borrowerConfirmation ? (
                          orderItem.isReturned.borrowerConfirmation ? (
                            orderItem.isReturned.lenderConfirmation ? (
                              "RETURNED"
                            ) : (
                              "AWAITING RETURN CONFIRMATION FROM LENDER"
                            ) 
                            ) : (
                                "ON LOAN"
                            )
                        ) : (
                            "AWAITING BORROW CONFIRMATION FROM BORROWER"
                        )
                    ) : (
                        "AWAITING BORROW CONFIRMATION FROM LENDER"
                    )
                    }
                    </td>
                    <td>
                      {
                        orderItem.isBorrowed.lenderConfirmation ? (
                          orderItem.isBorrowed.borrowerConfirmation ? (
                            orderItem.isReturned.borrowerConfirmation ? (
                              orderItem.isReturned.lenderConfirmation ? (
                                ""
                              ) : (
                                <Button className='btn-sm' variant='light' onClick={() => confirmItemReturnedHandler(order, orderItem._id)}>
                                  Confirm item returned
                                </Button>
                              ) 
                              ) : (
                                  ""
                              )
                          ) : (
                              ""
                          )
                      ) : (
                        <Button className='btn-sm' variant='light' onClick={() => confirmItemBorrowedHandler(order, orderItem._id)}>
                          Lend item
                        </Button>
                      )
                    }
                    </td>
                  </tr>
                )
              ))))}
            </tbody>
          </Table>
        )}
      </Row>
      <Row>
      <h2>My Items</h2>
        {message && <Message variant="success">{message}</Message>}
        <Col>
          <ListGroupItem>
            <Button
              onClick={createItemhandler}
              className="btn-block"
              type="button"
            >
              Add an Item
            </Button>
          </ListGroupItem>
        </Col>
        {loading1 ? (
          <Loader />
        ) : error1 ? (
          <Message variant="danger">{error1}</Message>
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
                {/* <th>BORROW STATUS</th> */}
                {/* <th>ACTIONS</th> */}
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
                  <td>{
                      !item.isOrderPlaced &&
                      <Button
                      variant="danger"
                      onClick={() => deleteHandler(item._id)}
                      >
                      <i className="fas fa-trash">Delete</i>
                      </Button>
                    }
                  </td>
                  {/* <td>
                  {item.isOrderPlaced ? (
                    item.isBorrowed.borrowerConfirmation ? (
                      item.isBorrowed.lenderConfirmation ? (
                        item.isReturned.borrowerConfirmation ? (
                          item.isReturned.lenderConfirmation && 
                              "RETURNED"
                          ) : (
                              "AWAITING RETURNED CONFIRMATION FROM LENDER"
                          )
                      ) : (
                          "ON LOAN"
                      )
                  ) : (
                      "AWAITING BORROW CONFIRMATION FROM BORROWER"
                  )
                  ) : (
                    "NOT ON LOAN"
                  )
                    
                  }
                  </td> */}
                  {/* <td>
                  {item.isOrderPlaced ? (
                    item.isBorrowed.borrowerConfirmation ? (
                      item.isBorrowed.lenderConfirmation ? (
                        item.isReturned.borrowerConfirmation ? (
                          item.isReturned.lenderConfirmation && 
                              ""
                          ) : (
                            <Button className='btn-sm' variant='light'>
                              Confirm Item Returned
                            </Button>
                          )
                      ) : (
                          ""
                      )
                  ) : (
                      ""
                  )
                  ) : (
                    <Button className='btn-sm' variant='light' >
                      Lend Item
                    </Button>
                  )
                  }
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </Col>
  );
};

export default MyItemsScreen;
