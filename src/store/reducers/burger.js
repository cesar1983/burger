import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utility";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredients = updatedObject(
        state.ingredients,
        updatedIngredient
      );

      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
      };
      return updatedObject(state, updatedState);

    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngredient2 = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      };
      const updatedIngredients2 = updatedObject(
        state.ingredients,
        updatedIngredient2
      );

      const updatedState2 = {
        ingredients: updatedIngredients2,
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
      };
      return updatedObject(state, updatedState2);

    case actionTypes.SET_INGREDIENTS:
      return updatedObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: initialState.totalPrice,
      });

    case actionTypes.INIT_INGREDIENTS_FAILED:
      return updatedObject(state, {
        error: true,
      });

    default:
      return state;
  }
};

export default reducer;
