import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_DETAILS } from '../routes/pageUrls';
import { Button, Card, Container } from 'react-bootstrap';
import Header from '../components/Navbar/Navbar';
import { supabase } from '../utils/supabase/supabaseClient';

function UserListings({ user }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // get users
  const getAllUsersData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('name, email,uuid');

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      setUsers(data);
      setLoading(false);
    } catch (error) {
      alert(`Get all users data error: ${error.message}`);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setDeleteLoading(true);
    try {
      const { error } = await supabase.from('users').delete().eq('uuid', id);

      if (error) {
        alert(error.message);
        setDeleteLoading(false);
        return;
      }
      setDeleteLoading(false);
      await getAllUsersData();
    } catch (error) {
      alert(`Delete user error: ${error.message}`);
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (!user.isAdmin) {
      navigate(USER_DETAILS + `/${user.uuid}`);
    } else {
      getAllUsersData();
    }
  }, [user, navigate]);

  console.log(users);
  return (
    <>
      <Header />
      <Container>
        {loading ? (
          <p>Loading Users...</p>
        ) : users && users?.length > 0 ? (
          users.map((user) => (
            <>
              {' '}
              <Card>
                <Card.Header as="h5">Name: {user?.name || '-'}</Card.Header>
                <Card.Body>
                  <Card.Title>Email:{user?.email || '-'}</Card.Title>
                  <Button
                    variant="primary"
                    onClick={() => navigate(USER_DETAILS + `/${user.uuid}`)}
                    disabled={deleteLoading}
                  >
                    Edit Details
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-4"
                    onClick={() => deleteUser(user.uuid)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? 'Deleting...' : 'Delete User'}
                  </Button>
                </Card.Body>
              </Card>
            </>
          ))
        ) : (
          'No User Found'
        )}
      </Container>
    </>
  );
}

export default UserListings;
