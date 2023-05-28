import { Navigate } from 'react-router-dom';

function ProtectedAuthRoute(props) {
  const { isLoggedIn, children } = props;
  return isLoggedIn ? <Navigate to={'/'} replace /> : children;
}

export default ProtectedAuthRoute;
