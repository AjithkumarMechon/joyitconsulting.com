import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchSearchFailure,
  fetchSearchRequest,
  fetchSearchSuccess,
} from "../../Redux/Action/action";

import ContentProduct from "../Content/ContentProduct";
import ErrorBoundary from "../Error_Boundary/ErrorBoundary";
import { CircularProgress } from "@mui/material";

export default function TotalProductsFetch() {
  const search = useSelector((state) => state.search.search);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    dispatch(fetchProductsRequest());
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const dataProduct = response.data;
      dispatch(fetchProductsSuccess(dataProduct));
    } catch (err) {
      dispatch(fetchProductsFailure(err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategory = async () => {
    dispatch(fetchCategoriesRequest());
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      const dataCategory = response.data;
      dispatch(fetchCategoriesSuccess(dataCategory));
    } catch (err) {
      dispatch(fetchCategoriesFailure(err.message));
    }
  };

  const fetchSearch = async (searchInput) => {
    dispatch(fetchSearchRequest());
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${searchInput}`
      );
      const dataSearch = response.data;
      dispatch(fetchSearchSuccess(dataSearch));
    } catch (err) {
      dispatch(fetchSearchFailure(err.message));
    }
  };

  // const user = data.results.find((result) => result.name === username);

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);
  useEffect(() => {
    fetchSearch(search);
  }, [search]);

  return (
    <div>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <>
          <ErrorBoundary>
            <ContentProduct />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
}
