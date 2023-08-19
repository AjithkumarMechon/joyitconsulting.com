import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import ".././product.css";

export default function ContentProduct() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const productsInitial = useSelector((state) => state.data.products.products);
  const productsFromSearch = useSelector(
    (state) => state.searchdata?.search?.products || []
  );
  const loading = useSelector((state) => state.searchdata.loading);
  const categories = useSelector((state) => state.data.categories);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const productsToShow =
    productsFromSearch.length === 0 ? productsInitial : productsFromSearch;

  const filteredProducts = selectedCategory
    ? productsToShow.filter((product) => product.category === selectedCategory)
    : productsToShow;

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

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

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
        {currentProducts.map((product) => {
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
        })}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
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
