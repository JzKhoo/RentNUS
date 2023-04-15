import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listItemDetails, createItemReview } from '../actions/itemActions'
import { ITEM_CREATE_REVIEW_RESET } from '../constants/itemConstants'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const ItemScreen = ({ history, match }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  console.log(rating)
  console.log(comment)

  const dispatch = useDispatch()

  const itemDetails = useSelector((state) => state.itemDetails)
  const { loading, error, item } = itemDetails

  const itemReviewCreate = useSelector((state) => state.itemReviewCreate)
  const { success: successItemReview, error: errorItemReview } =
    itemReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const navigate = useNavigate()
  const { id } = useParams()

  //const for date selection
  const [rentalStartDate, setRentalStartDate] = useState(null)
  const [rentalEndDate, setRentalEndDate] = useState(null)
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    if (successItemReview) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({ type: ITEM_CREATE_REVIEW_RESET })
    }
    dispatch(listItemDetails(id))
  }, [dispatch, id, successItemReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?totalCost=${totalCost}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createItemReview(id, {rating:rating, comment:comment}
      )
    )
  }

  const calculateTotalCost = (start, end, pricePerDay) => {
    if (start && end) {
      const duration = moment.duration(end.diff(start))
      const days = duration.asDays() + 1
      return days * pricePerDay
    }
    return 0
  }

  const viewOwner = () => {
    navigate(`/displayuserprofile/${item.owner}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <ListGroup variant='flush'>
                {item ? (
                  <>
                    <ListGroupItem>
                      <h3>{item.name}</h3>
                    </ListGroupItem>
                    <ListGroupItem>
                      Price/Day: $ {item.pricePerDay}
                    </ListGroupItem>
                    <ListGroupItem>
                      Description: {item.description}
                    </ListGroupItem>
                    <ListGroupItem>
                      <h5>Select rental dates:</h5>
                      <DatePicker
                        selected={rentalStartDate}
                        onChange={(date) => setRentalStartDate(date)}
                        selectsStart
                        rentalStartDate={rentalStartDate}
                        rentalEndDate={rentalEndDate}
                        minDate={
                          new Date(
                            Math.max(new Date(item.startDate), new Date())
                          )
                        }
                        maxDate={new Date(item.endDate)}
                        dateFormat='MMM d'
                      />
                      {' - '}
                      <DatePicker
                        selected={rentalEndDate}
                        onChange={(date) => {
                          setRentalEndDate(date)
                          setTotalCost(
                            parseFloat(
                              calculateTotalCost(
                                moment(rentalStartDate),
                                moment(date),
                                item.pricePerDay
                              ).toFixed(2)
                            )
                          )
                        }}
                        selectsEnd
                        rentalStartDate={rentalStartDate}
                        rentalEndDate={rentalEndDate}
                        minDate={rentalStartDate || new Date(item.startDate)}
                        maxDate={new Date(item.endDate)}
                        dateFormat='MMM d'
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      Total Cost: ${totalCost.toFixed(2)}
                    </ListGroupItem>
                    {item && item.owner && (
                      // <Link
                      //   className="btn btn-light my-3"
                      //   // to={{
                      //   //   pathname: "/displayuserprofile",
                      //   //   state: { owner: item.owner },
                      //   // }}
                      //   to= {"/displayuserprofile"}
                      //   state= {{owner: item.owner}}
                      // >
                      //   View Owner
                      // </Link>
                      <Button
                        onClick={viewOwner}
                        className='btn btn-light my-3'
                        type='button'
                        style={{ fontSize: '1.5rem', padding: '1rem' }}
                      >
                        View Owner
                      </Button>
                    )}
                  </>
                ) : (
                  <Message variant='danger'>Item not found</Message>
                )}
              </ListGroup>
            </Col>
            <Col>
              {item && (
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroupItem className='d-flex justify-content-center'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        className='my-3'
                        style={{ width: '100%', maxWidth: '500px' }}
                      />
                    </ListGroupItem>
                    <ListGroupItem>
                      <Button
                        onClick={addToCartHandler}
                        className='btn-block btn-primary'
                        type='button'
                        style={{ fontSize: '1.5rem', padding: '1rem' }}
                        disabled={!rentalStartDate || !rentalEndDate}
                      >
                        Add To Cart
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup variant='flush'>
                <h5>Reviews</h5>
                {item.numReviews === 0 && <Message>No Reviews</Message>}
                {item.numReviews > 0 &&
                  item.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h5>Write a Customer Review</h5>
                  {errorItemReview && (
                    <Message variant='danger'>{errorItemReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows='3'
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ItemScreen
