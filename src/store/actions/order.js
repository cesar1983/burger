import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  console.log('[purchaseBurgerSuccess] id', id);
  console.log('[purchaseBurgerSuccess] orderData', id);
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerError = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_ERROR,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then((response) => {
        console.log('[response.data]', response.data);
        console.log('[orderData]', orderData);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        console.log(error);
        dispatch(purchaseBurgerError(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersError = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_ERROR,
    error: error,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersInit());
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('/orders.json' + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersError(err));
      });
  };
};
