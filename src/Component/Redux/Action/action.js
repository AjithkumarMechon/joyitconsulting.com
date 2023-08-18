import ActionTypes from "../Content/action_types";

export const fetchProductsRequest = () => ({
  type: ActionTypes.FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: ActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchCategoriesRequest = () => ({
  type: ActionTypes.FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: ActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: ActionTypes.FETCH_CATEGORIES_FAILURE,
  payload: error,
});
