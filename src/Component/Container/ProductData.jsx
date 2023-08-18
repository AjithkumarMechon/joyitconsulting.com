import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./product.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import axios from "axios";
import {
  fetchCategoriesSuccess,
  fetchCategoriesRequest,
  fetchCategoriesFailure,
} from "../Redux/Action/action";
import ImageComponent from "./ImageComponent";

const ITEMS_PER_PAGE = 8;
export default function ProductData() {
  const products = useSelector((state) => state.data.products.products);
  const categories = useSelector((state) => state.data.categories);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [filterSearch, setFilterSearch] = useState(products);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    if (inputValue === "") {
      setFilterSearch(products);
    } else {
      const filteredProducts = products.filter(
        (item) =>
          item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.description.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilterSearch(filteredProducts);
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
      console.log(dataCategory);
    } catch (err) {
      dispatch(fetchCategoriesFailure(err.message));
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const filterProductsByCategory = (selectedCategory) => {
    if (selectedCategory === "") {
      setFilterSearch(products);
    } else {
      const filteredProducts = products.filter(
        (item) => item.category === selectedCategory
      );
      setFilterSearch(filteredProducts);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToDisplay = filterSearch.slice(startIndex, endIndex);
  const description =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos ullam harum similique, adipisci eveniet veniam, iusto corporis quidem sequi aliquam veritatis commodi placeat, porro voluptas quis ab cupiditate explicabo culpa.";

  return (
    <>
      <div>
        {/* NavBar */}
        <div>
          <nav
            className="navbar navbar-expand-md navbar-light bg-light justify-content-between p-0"
            style={{ position: "sticky", top: 0, height: "4rem" }}
          >
            <div className="navbar_item mx-4">
              <a className="navbar-brand" href="/">
                <b className="btn Logo">
                  M<span className="inner_logo">oBoo</span>M
                </b>
              </a>
            </div>
            <div className="topnav navbar_item">
              <div className="search-container">
                <input
                  className=" form-control form-control-lg search-bar  "
                  type="text"
                  placeholder="What do You want today...."
                  name="search"
                  value={searchInput}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <nav
              className="navbar navbar-expand-md navbar-light bg-light"
              //
            >
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onMouseEnter={toggleDropdown}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">Store</li>
                  <li className="nav-item">Account</li>
                  <li className="nav-item">Wish List</li>
                  <li className="nav-item">
                    Basket <ShoppingBasketIcon />
                  </li>
                </ul>
              </div>
            </nav>
          </nav>
          {showDropdown && (
            <div className="dropdown_content" onMouseLeave={toggleDropdown}>
              <ul className="nav_list">
                <li>Store</li>
                <li>Account</li>
                <li>Wish List</li>
                <li>
                  Basket
                  <ShoppingBasketIcon />
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Category Data handling */}
        <div>
          <div className="category">
            <div className="category_filters">
              <select
                className="form-select"
                onChange={(e) => filterProductsByCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* "Read More" / "Read Less" Functionality */}
        <div className="lorem-content">
          <h3> Lorem Ipsum</h3>
          <p>
            {showFullText ? `${description}` : `${description.slice(0, 80)}...`}
            <button onClick={toggleText} className="btn ">
              {showFullText ? "Read Less" : "Read More"}
            </button>
          </p>
        </div>

        {/* Implement the data */}
        <div className="grid_data">
          {itemsToDisplay.map((item) => {
            const { id, title, description, price, images } = item;

            return (
              <div key={id} className="content-all">
                <ImageComponent images={images} />
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
          {Array.from(
            { length: Math.ceil(filterSearch.length / ITEMS_PER_PAGE) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}
