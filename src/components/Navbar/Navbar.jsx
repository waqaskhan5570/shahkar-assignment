import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../../utils/store/reducers/authSlice';
import { useDispatch } from 'react-redux';
import { supabase } from '../../utils/supabase/supabaseClient';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function Header() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    dispatch(logout());
    setLoading(false);
  };
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Signed IN</Navbar.Brand>
        <Navbar.Toggle />
        <Button disabled={loading} onClick={() => handleLogout()}>
          {loading ? 'loggin Out...' : 'Log out'}
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
