import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state) => {
  return updatedObject(state, { purchased: false });
};

const purchaseBurgerStart = (state) => {
  return updatedObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updatedObject(action.orderData, { id: action.orderId });
  return updatedObject(state, {
    ding: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerError = (state) => {
  return updatedObject(state, { loading: false });
};

const fetchOrdersInit = (state) => {
  return updatedObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updatedObject(state, { orders: action.orders, loading: false });
};

const fetchOrdersError = (state) => {
  return updatedObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_ERROR:
      return purchaseBurgerError(state);

    case actionTypes.FETCH_ORDERS_INIT:
      return fetchOrdersInit(state);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_ERROR:
      return fetchOrdersError(state);

    default:
      return state;
  }
};

export default reducer;
