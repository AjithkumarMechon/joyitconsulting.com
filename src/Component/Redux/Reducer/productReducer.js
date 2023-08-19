import ActionTypes from "../Content/action_types";
const initialState = {
  products: [],
  categories: [],
  isLoadingProducts: false,
  isLoadingCategories: false,
  errorProducts: null,
  errorCategories: null,
  loading: false,
};

export const dataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoadingProducts: true,
        errorProducts: null,
      };
    case ActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoadingProducts: false,
        products: payload,
      };
    case ActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoadingProducts: false,
        errorProducts: payload,
      };
    case ActionTypes.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        isLoadingCategories: true,
        errorCategories: null,
      };
    case ActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoadingCategories: false,
        categories: payload,
      };
    case ActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoadingCategories: false,
        errorCategories: payload,
      };

    default:
      return state;
  }
};

const initialSearch = {
  isLoadingSearch: false,
  error: null,
  search: "",
};
export const searchReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SEARCH_REQUEST:
      return {
        isLoadingSearch: true,
        search: payload,
        error: null,
      };
    case ActionTypes.SEARCH_SUCCESS:
      return {
        isLoadingSearch: false,
        search: payload,
      };
    case ActionTypes.SEARCH_FAILURE:
      return {
        isLoadingCategories: false,
        errorCategories: payload,
      };
    default:
      return state;
  }
};
export const searchDataReducer = (state = initialSearch, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_SEARCH_REQUEST:
      return {
        isLoadingSearch: true,
        search: payload,
        error: null,
      };
    case ActionTypes.FETCH_SEARCH_SUCCESS:
      return {
        isLoadingSearch: false,
        search: payload,
      };
    case ActionTypes.FETCH_SEARCH_FAILURE:
      return {
        isLoadingCategories: false,
        errorCategories: payload,
      };
    default:
      return state;
  }
};
