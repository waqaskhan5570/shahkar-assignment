import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { supabase } from '../utils/supabase/supabaseClient';
import useUserData from '../hooks/useUserData';
import { useParams } from 'react-router-dom';
import Header from '../components/Navbar/Navbar';

const UserDetails = () => {
  // Use the useParams hook to get the id parameter from the URL
  const { id } = useParams();
  const { user } = useUserData();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    telephone: '',
    next_of_kin: '',
    age: '',
    illness: '',
    last_address: '',
    recomm_source: '',
    recomm_address: '',
  });

  const getUserDetails = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uuid', id);

      if (error) {
        alert(`Error getting user details: ${error.message}`);
        return;
      }

      // 'data' will contain an array of user data (since 'eq' may match multiple records)
      // In most cases, you might expect only one user with a given ID
      const userData = data ? data[0] : null;
      setFormData(userData);
    } catch (error) {
      alert(`Get user data error: ${error.messages} `);
    }
  }, [id]);

  useEffect(() => {
    if (id && user.uuid) {
      if (user?.isAdmin || user.uuid === id) {
        getUserDetails();
      } else {
        alert('different user');
      }
    }
  }, [user, id, getUserDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .update(formData)
        .eq('uuid', id);

      if (error) {
        alert(`Form error: ${error.message}`);
        setLoading(false);
        return;
      }

      alert('User data updated successfully');
      setLoading(false);
    } catch (error) {
      alert(`Form error: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h2 className="text-center mb-4">User Information Form</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  required
                  disabled
                  aria-disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="formDob" className="mt-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter your date of birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTelephone" className="mt-3">
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your telephone number"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formNextOfKin" className="mt-3">
                <Form.Label>Next of Kin</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your next of kin"
                  name="next_of_kin"
                  value={formData.next_of_kin}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAge" className="mt-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formIllness" className="mt-3">
                <Form.Label>Illness</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the illness"
                  name="illness"
                  value={formData.illness}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastAddress" className="mt-3">
                <Form.Label>Last Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your last address"
                  name="last_address"
                  value={formData.last_address}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formRecommendedSource" className="mt-3">
                <Form.Label>Recommended Source</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the recommended source"
                  name="recomm_source"
                  value={formData.recomm_source}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formRecommendedAddress" className="mt-3">
                <Form.Label>Recommended Source Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the recommended Source Address"
                  name="recomm_address"
                  value={formData.recomm_address}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                block
                className="mt-4"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDetails;
