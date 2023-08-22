import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import ".././product.css";

import SearchOffTwoToneIcon from "@mui/icons-material/SearchOffTwoTone";
export default function ContentProduct() {
  const productsInitial = useSelector((state) => state.data.products.products);
  const loading = useSelector((state) => state.searchdata.loading);
  const categories = useSelector((state) => state.data.categories);
  const searchTerm = useSelector((state) => state.search.search);
  const productsFromSearch = useSelector(
    (state) => state.searchdata?.search?.products || []
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  const productsToShow =
    productsFromSearch.length === 0 ? productsInitial : productsFromSearch;

  const filteredProductsBySearch = searchTerm
    ? productsToShow.filter(
        (product) =>
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productsToShow;

  const filteredProducts = selectedCategory
    ? filteredProductsBySearch.filter(
        (product) => product.category === selectedCategory
      )
    : filteredProductsBySearch;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const pagesToShow = [];
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pagesToShow.push(i);
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <div className="category">
        <div className="category_filters">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category, id) => (
              <option key={id} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid_data">
        {currentProducts.length !== 0 ? (
          currentProducts.map((product) => {
            const { id, title, description, price, images } = product;
            return (
              <div key={id} className="content-all">
                <img
                  src={images[selectedImageIndex]}
                  alt="Image loading.."
                  width={"200rem"}
                  height={"200rem"}
                />
                <h2>
                  <b>{title}</b>
                </h2>
                <p>{description}</p>
                <h2>$ {price}</h2>
              </div>
            );
          })
        ) : (
          <div>
            <h1
              style={{
                color: "red",
                fontSize: "3rem",
              }}
            >
              Data not found
            </h1>
          </div>
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pagesToShow.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
