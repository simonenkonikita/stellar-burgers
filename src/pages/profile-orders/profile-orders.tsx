import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import {
  getErrorState,
  getOrdersList,
  getOrdersState,
  getOrdesLoadingsState
} from '../../services/slices/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(getOrdersState);
  const isLoading = useSelector(getOrdesLoadingsState);
  const error = useSelector(getErrorState);

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  console.log('Orders:', orders); // Что приходит?
  console.log('Loading:', isLoading);
  console.log('Error:', error);

  if (isLoading) {
    return (
      <>
        <Preloader />
        <div>Загрузка истории заказов...</div>
      </>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
