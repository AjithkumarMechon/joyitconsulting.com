import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ".././product.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {
  SearchFailure,
  SearchRequest,
  SearchSuccess,
} from "../../Redux/Action/action";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  // const [showDropdown, setShowDropdown] = useState(false);

  const fetchSearch = async () => {
    dispatch(SearchRequest());
    try {
      dispatch(SearchSuccess(searchInput));
    } catch (err) {
      dispatch(SearchFailure(err.message));
    }
  };

  useEffect(() => {
    if (searchInput) {
      fetchSearch();
    }
  }, [searchInput]);

  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    fetchSearch();
  };

  return (
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
              className="form-control form-control-lg search-bar"
              type="text"
              placeholder="What do You want today...."
              name="search"
              value={searchInput}
              onChange={handleSearch}
              onBlur={fetchSearch}
            />
          </div>
        </div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="navbar">
            <button>
              <div className="navbar-click"></div>
            </button>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="" href="">
                  Store
                </a>
              </li>
              <li className="nav-item">
                <a href="">Account</a>
              </li>
              <li className="nav-item">
                <a href="">Wish List</a>
              </li>
              <li className="nav-item">
                <a href="">
                  Basket <ShoppingBasketIcon />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </nav>
      {/* {showDropdown && (
        <div className="dropdown_content" onMouseLeave={toggleDropdown}>
          <ul className="nav_list">
            <li>Store</li>
            <li>Account</li>
            <li>Wish List</li>
            <li>
              Basket <ShoppingBasketIcon />
            </li>
          </ul>
        </div>
      )} */}
    </div>
  );
}
