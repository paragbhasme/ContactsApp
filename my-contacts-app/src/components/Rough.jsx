import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  resetStatus,
  toggleTheme,
} from "../features/contacts/contactsSlice";
import { Link } from "react-router-dom";
import "./styles/ContactList.css";
import { IoMdContacts } from "react-icons/io";
import {
  MdDarkMode,
  MdOutlineLightMode,
  MdContactPage,
  MdOutlineSortByAlpha,
  MdOutlineInsertPageBreak,
} from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import {
  FaPlus,
  FaMinus,
  FaSortAmountDown,
  FaSortAlphaDown,
} from "react-icons/fa";
import { RiAddLargeLine } from "react-icons/ri";
import Person from "./Person";

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, status, theme } = useSelector((state) => state.contacts);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [sortby, setSortby] = useState("Name");
  const [sortdesc, setSortdesc] = useState(false);

  useEffect(() => {
    dispatch(
      fetchContacts({
        pageNumber: currentPage,
        pageSize: currentPageSize,
        sortby,
        sortdesc,
      })
    );
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch, currentPage, currentPageSize, sortby, sortdesc]);

  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const getThemeIcon = () => {
    return theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />;
  };

  const handlePageSizeChange = (event) => {
    setCurrentPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortByChange = (event) => {
    setSortby(event.target.value);
  };

  const handleSortDescChange = (event) => {
    setSortdesc(event.target.value === "true");
  };

  // Filter contacts based on the search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error loading contacts</p>;
  }

  return (
    <div className="contact-list">
      <h1>
        <IoMdContacts /> All Contacts
      </h1>
      <div className="searchandinput">
        {/* <Link to="/add" className="add-button">Add Contact</Link> */}
        <div className="order-settings">
          <div>
            <label htmlFor="sortby">
              <FaSortAmountDown />
            </label>
            <select id="sortby" value={sortby} onChange={handleSortByChange}>
              <option value="Name">Name</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>

          <div>
            <label htmlFor="sortdesc">
              <MdOutlineSortByAlpha />
            </label>
            <select
              id="sortdesc"
              value={sortdesc}
              onChange={handleSortDescChange}
            >
              <option value="false">Asc</option>
              <option value="true">Des</option>
            </select>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="contact-cards">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <Person contact={contact} key={contact.id} />
          ))
        ) : (
          <p>No contacts found</p>
        )}
        <div>
          <Link to="/add" className="addButton">
            <RiAddLargeLine />
          </Link>
          <button className="themeButton" onClick={handleToggleTheme}>
            {getThemeIcon()}
          </button>
          <Link to="/favourites" className="favouritesButton">
            <FaHeart />
          </Link>
        </div>
      </div>

      <div className="page-settings">
        <div>
          <label htmlFor="page-size">
            <MdOutlineInsertPageBreak />
          </label>
          <select
            id="page-size"
            value={currentPageSize}
            onChange={handlePageSizeChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>

        <div className="">
          <button
            onClick={() =>
              handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
            }
            disabled={currentPage === 1}
          >
            <FaMinus />
          </button>
          <span>
            <MdContactPage /> {currentPage}
          </span>
          <button onClick={() => handlePageChange(currentPage + 1)}>
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
