import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import FormContainer from "../components/FormContainer";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listItemDetails, updateItem } from '../actions/itemActions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ onFileSelect }) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        onFileSelect(acceptedFiles[0]);
      },
    });
  
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    return (
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>
          Drag 'n' drop some files here, or click to select files (.jpg or .png
          only)
        </p>
        <ul>{files}</ul>
        <style jsx="true">{`
          .dropzone {
            border: 2px dashed #ccc;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
          }
          .dropzone p {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
            color: #555;
          }
          .dropzone ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          .dropzone li {
            margin-top: 10px;
            font-size: 14px;
            color: #555;
          }
        `}</style>
      </div>
    );
  };

const UpdateItemScreen = () => {
    const { itemId } = useParams();
    console.log("Update item screen: " + itemId)

    const [name, setName] = useState("");
    // const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const itemDetails = useSelector((state) => state.itemDetails)
    const { loading, error, item } = itemDetails
    console.log(item)

    // const itemList = useSelector((state) => state.itemMyList);
    // const { loading, error, items } = itemList;

    // var itemToUpdateVar = itemToUpdate;
    // if (items) {
    //     items.map((item)=>(item._id == itemToUpdate._id?))
    // }

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // to check if user is logged in

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
        navigate("/login");
        // if not logged in 
        } else {
        if (item._id !== itemId) {
            dispatch(listItemDetails(itemId))
          } else {
            setName(item.name);
            setBrand(item.brand);
            setCategory(item.category);
            setDescription(item.description);
            setPricePerDay(item.pricePerDay);
            setStartDate(item.startDate);
            setEndDate(item.endDate);
            setSelectedFile(item.selectedFile)
        }
        }
    }, [dispatch, navigate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        // const updatedItem = {
        //     name: name,
        //     brand = brand;
        //     catgeory = category;
        //     description = description;
        //     pricePerDay = pricePerDay;
        // item.startDate = startDate;
        // item.endDate = endDate;
        // }
        // const formData = new FormData();
        // formData.append("name", name);
        // formData.append("brand", brand);
        // formData.append("category", category);
        // formData.append("description", description);
        // formData.append("pricePerDay", pricePerDay);
        // formData.append("startDate", startDate);
        // formData.append("endDate", endDate);
        item.name = name;
        item.brand = brand;
        item.catgeory = category;
        item.description = description;
        item.pricePerDay = pricePerDay;
        item.startDate = startDate;
        item.endDate = endDate;
        dispatch(updateItem(itemId, item));
        console.log("item dispatched");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/myItems");
        }, 3000);
      };

    return (
        <>
      <Link to='/admin/itemlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit {item.name} details</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='pricePerDay'>
              <Form.Label>Price Per Day</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter pricePerDay'
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
    );
};

export default UpdateItemScreen;
