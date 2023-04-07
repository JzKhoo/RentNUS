import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";

const DisplayUserProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { owner } = userDetails;

  const location = useLocation();
  const ownerId = location.state?.owner;
  const navigate = useNavigate();

  useEffect(() => {
    if (ownerId) {
      dispatch(getUserDetails(ownerId));
    }
  }, [dispatch, navigate, ownerId]);

  useEffect(() => {
    if (owner) {
      setName(owner.name);
      setEmail(owner.email);
    }
  }, [owner]);

  return (
    <Container>
      <Row>
        <Col>
          <Link className="btn btn-light my-3" onClick={() => navigate(-1)}>
            Go Back
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Owner Profile</h1>
          <p>Name: {name}</p>
           <p>Email: {email}</p>
          {/* can include other stuff like owner rating */}
        </Col>
      </Row>
    </Container>
  );
};

export default DisplayUserProfileScreen;
