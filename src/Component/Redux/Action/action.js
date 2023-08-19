import ActionTypes from "../Content/action_types";
// Product
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

//Category
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

//search data
export const fetchSearchRequest = () => ({
  type: ActionTypes.FETCH_SEARCH_REQUEST,
});

export const fetchSearchSuccess = (search) => ({
  type: ActionTypes.FETCH_SEARCH_SUCCESS,
  payload: search,
});

export const fetchSearchFailure = (error) => ({
  type: ActionTypes.FETCH_SEARCH_FAILURE,
  payload: error,
});

//search
export const SearchFailure = (error) => ({
  type: ActionTypes.SEARCH_FAILURE,
  payload: error,
});
export const SearchRequest = () => ({
  type: ActionTypes.SEARCH_REQUEST,
});

export const SearchSuccess = (search) => ({
  type: ActionTypes.SEARCH_SUCCESS,
  payload: search,
});
