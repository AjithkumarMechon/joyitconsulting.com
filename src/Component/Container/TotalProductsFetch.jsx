import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./product.css";
import {
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
} from "../Redux/Action/action";

import ProductData from "./ProductData";

export default function TotalProductsFetch() {
  // const productsState = useSelector((state) => state);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? <div>Loading...</div> : <div>{<ProductData />}</div>}
    </div>
  );
}
