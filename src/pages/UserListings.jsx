import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_DETAILS } from '../routes/pageUrls';
import { Container } from 'react-bootstrap';
import Header from '../components/Navbar/Navbar';

function UserListings({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isAdmin) {
      navigate(USER_DETAILS + `/${user.uuid}`);
    }
  }, [user, navigate]);

  return (
    <>
      <Header />
      <Container>UserListings</Container>
    </>
  );
}

export default UserListings;
