import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listItemDetails } from "../actions/itemActions";

const ItemScreen = () => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(listItemDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={3}>
            <ListGroup variant="flush">
              {item ? (
                <>
                  <ListGroupItem>
                    <h3>{item.name}</h3>
                  </ListGroupItem>
                  <ListGroupItem>Price/Day: $ {item.pricePerDay}</ListGroupItem>
                  <ListGroupItem>Description: {item.description}</ListGroupItem>
                  {item && item.owner && (
                    <Link
                      className="btn btn-light my-3"
                      to={{
                        pathname: "/displayuserprofile",
                        state: { owner: item.owner },
                      }}
                    >
                      View Owner
                    </Link>
                  )}
                </>
              ) : (
                <Message variant="danger">Item not found</Message>
              )}
            </ListGroup>
          </Col>
          <Col>
            {item && (
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem className="d-flex justify-content-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="my-3"
                      style={{ width: "100%", maxWidth: "500px" }}
                    />
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block btn-primary"
                      type="button"
                      style={{ fontSize: "1.5rem", padding: "1rem" }}
                    >
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ItemScreen;
