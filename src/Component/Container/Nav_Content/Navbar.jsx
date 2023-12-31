import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import ".././product.css";
import "./Navbar.css";
import {
  SearchFailure,
  SearchRequest,
  SearchSuccess,
} from "../../Redux/Action/action";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const fetchSearch = async () => {
    dispatch(SearchRequest());
    try {
      dispatch(SearchSuccess(searchInput));
    } catch (err) {
      dispatch(SearchFailure(err.message));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    fetchSearch();
  };

  useEffect(() => {
    if (searchInput) {
      fetchSearch();
    }
  }, [searchInput]);
  const [isMenuActive, setIsMenuActive] = useState(false); // State to manage menu visibility

  const handleMenuToggle = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-md navbar-light bg-light justify-content-between p-0"
        style={{ position: "sticky", top: 0, height: "4rem" }}
      >
        <div
          className={`menu ${isMenuActive ? "active" : ""}`}
          onClick={handleMenuToggle}
        >
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>
        <div className="navbar_item mx-4">
          <a className="navbar-brand" href="/">
            <strong className="btn Logo">
              M<span className="inner_logo">oBoo</span>M
            </strong>
          </a>
        </div>

        <div className="navbar_item mx-4">
          <input
            className="form-control form-control-lg search-bar "
            type="text"
            placeholder="What do You want today...."
            name="search"
            value={searchInput}
            onChange={handleSearch}
            onBlur={fetchSearch}
          />
        </div>

        <div className="navbar_item ">
          <ul
            className="show-menu "
            style={{ display: isMenuActive ? "flex" : "none" }}
          >
            <li>
              <a href="/" className="">
                Store
              </a>
            </li>
            <li>
              <a href="/">Account</a>
            </li>
            <li>
              <a href="/">Wish List</a>
            </li>
            <li>
              <a href="/">
                Basket <ShoppingBasketIcon />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
