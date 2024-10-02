import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PrivateRoute({ element, ...rest }) {
  const { currentUser } = useAuth();

  return currentUser ? element : <Navigate to="/" />;
}

export default PrivateRoute;
