import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>If you have any queries, please call us at 6789 6789</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer