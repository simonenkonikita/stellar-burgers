import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getFeedsList,
  getFeedsState,
  getOrdersState
} from '../../services/slices/feedSlice';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersState);

  useEffect(() => {
    dispatch(getFeedsList());
  }, [dispatch]);

  if (!orders.length) return <Preloader />;

  const handleGetFeeds = () => {
    dispatch(getFeedsList());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
