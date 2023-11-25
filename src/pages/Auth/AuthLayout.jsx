import React, { useEffect } from 'react';
import useUserData from '../../hooks/useUserData';
import { ADMIN_USERS_LISTING, USER_DETAILS } from '../../routes/pageUrls';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children }) {
  const { isAuthorized, token, user } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized && token) {
      if (user.isAdmin) {
        navigate(ADMIN_USERS_LISTING);
      } else {
        navigate(USER_DETAILS + `/${user.uuid}`);
      }
    }
  }, [isAuthorized, token, user, navigate]);

  return <div>{children}</div>;
}

export default AuthLayout;
