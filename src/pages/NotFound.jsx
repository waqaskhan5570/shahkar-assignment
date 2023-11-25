// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const styles = {
    container: {
      backgroundColor: '#f8f9fa',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '4em',
      color: '#dc3545',
      marginBottom: '10px',
    },
    subHeading: {
      fontSize: '2em',
      color: '#495057',
      marginBottom: '20px',
    },
    text: {
      fontSize: '1.2em',
      color: '#495057',
      marginBottom: '20px',
    },
  };
  

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center text-center">
        <Col md={6} style={styles.container}>
          <h1 style={styles.heading}>404</h1>
          <h2 style={styles.subHeading}>Oops! Page not found</h2>
          <p style={styles.text}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button variant="primary">Go to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};


export default NotFound;
