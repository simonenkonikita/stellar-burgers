import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (onlyUnAuth && isAuthChecked) {
    // Если только для неавторизованных, но пользователь авторизован — редирект на главную
    return <Navigate replace to='/profile' />;
  }

  if (!onlyUnAuth && !isAuthChecked) {
    // Если защищённый маршрут и пользователь не авторизован — редирект на логин
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
