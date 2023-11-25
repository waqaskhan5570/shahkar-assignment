import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { supabase } from '../../utils/supabase/supabaseClient';
import { LOGIN } from '../../routes/pageUrls';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const SignUp = () => {
  const navigate = useNavigate();
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
    const newErrors = { name: '', email: '', password: '' };

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
        const user = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (user?.error?.message) {
          alert(user?.error.message);
        } else {
          await supabase
            .from('users')
            .insert([{ email: formData.email, uuid: user?.data.user.id }]);

          alert('Account created, please log in');
          navigate(LOGIN);
        }
      } catch (error) {
        alert(`Sign up error: ${error.message}`);
      }
    } else {
      alert('Fill all fields');
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6} style={styles.container}>
            <h2 className="text-center mb-4" style={styles.heading}>
              Sign Up
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mt-4">
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

              <Form.Group controlId="formPassword" className="mt-4">
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

              <Button
                variant="primary"
                type="submit"
                block
                className="mt-4"
                disabled={loading}
              >
                {loading ? 'Signing up' : ' Sign Up'}
              </Button>
            </Form>
            <Row>
              <p>Or</p>
              <Button onClick={() => navigate(LOGIN)} className="mt-4">
                Log In ?
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

export default SignUp;
