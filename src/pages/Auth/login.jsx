// LoginForm.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { supabase } from '../../utils/supabase/supabaseClient';
import { useDispatch } from 'react-redux';
import { login } from '../../utils/store/reducers/authSlice';
import { ADMIN_EMAIL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import {
  ADMIN_USERS_LISTING,
  SIGNUP,
  USER_DETAILS,
} from '../../routes/pageUrls';
import AuthLayout from './AuthLayout';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message when the user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (formData.email === '') {
      newErrors.email = 'Please enter your email.';
      valid = false;
    }

    if (formData.password === '') {
      newErrors.password = 'Please enter your password.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword(
          formData
        );

        if (error) {
          alert(`Login Error: ${error.message}`);
          setLoading(false);
          return;
        }

        dispatch(
          login({
            user: {
              uuid: data.user.id,
              email: data.user.email,
              isAdmin: data.user.email === ADMIN_EMAIL,
            },
            token: data?.session?.access_token,
          })
        );

        // if is admin navigate to admin page
        if (data.user.email === ADMIN_EMAIL) {
          navigate(ADMIN_USERS_LISTING);
        } else {
          navigate(USER_DETAILS + `/${data.user.id}`);
        }
      } catch (error) {
        alert(`Login error:, ${error.message}`);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6} style={styles.container}>
            <h2 className="text-center mb-4" style={styles.heading}>
              Login
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              </Form.Group>

              <Button type="submit" block disabled={loading} className="mt-4">
                {loading ? 'Logging In.... ' : 'Login'}
              </Button>
            </Form>
            <Row>
              <p>Or</p>
              <Button onClick={() => navigate(SIGNUP)} className="mt-4">
                Sign Up ?
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </AuthLayout>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#007bff',
  },
};

export default LoginForm;
