import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../utils/store/reducers/authSlice';

const useUserData = () => {
  const dispatch = useDispatch();
  const { token, user, isAuthorized } = useSelector((state) => state.auth);

  const setUser = (user) => {
    dispatch(updateUser(user));
  };

  return {
    token,
    user,
    isAuthorized,
    setUser,
  };
};

export default useUserData;
