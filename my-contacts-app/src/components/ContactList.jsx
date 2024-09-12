import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  resetStatus,
  toggleTheme,prevPage,nextPage,setPageSize, sortDesc,sortBy
} from "../features/contacts/contactsSlice";
import { Link, Navigate } from "react-router-dom";
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
import { IoAdd,IoAddOutline  } from "react-icons/io5";
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
  const { contacts, status, theme, error, pageNumber,pageSize,sortby ,sortdesc} = useSelector((state) => state.contacts);

  const [searchQuery, setSearchQuery] = useState("");
  // const [ filteredContacts,setFilteredContacts] = useState("");
 

  // Fetch contacts on component mount and whenever parameters change
  useEffect(() => {
      dispatch(
        fetchContacts({
          pageNumber,
          pageSize,
          sortby,
          sortdesc,
        })
      );
    
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch, pageNumber,pageSize,sortby,sortdesc]);
  
  

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
    dispatch(setPageSize(event.target.value));
  };

  const handlePageDecrement = (newPage) => {
   dispatch(prevPage())
  };
  const handlePageIncrement = (newPage) => {
    dispatch(nextPage())
   };
  const handleSortByChange = (event) => {
    dispatch(sortBy(event.target.value));
  };
  const handleSortDescChange = (event) => {
    dispatch(sortDesc(event.target.value));
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="contact-list">
      <h1>
        <IoMdContacts /> All Contacts 
      </h1>
      <div className="searchandinput">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="settings-container">
          <div className="sort-settings">
            <label htmlFor="sortby">
              <FaSortAmountDown />
            </label>
            <select id="sortby" value={sortby} onChange={(e)=>{handleSortByChange(e)}}>
              <option value="Name">Name</option>
              <option value="Mobile">Mobile</option>
            </select>

            <label htmlFor="sortdesc">
              <MdOutlineSortByAlpha />
            </label>
            <select
              id="sortdesc"
              value={sortdesc}
              onChange={(e)=>{handleSortDescChange(e)}}
            >
              <option value="false">Asc</option>
              <option value="true">Des</option>
            </select>
          </div>
        </div>
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

      <div className="settings-container">
        <div className="page-settings">
          <div className="pagination-settings">
            <label htmlFor="page-size">
              <MdOutlineInsertPageBreak />
            </label>
            <select
              id="page-size"
              value= {pageSize}
              onChange={(e)=>{handlePageSizeChange(e)}}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>

          <div className="pagination-buttons">
            <button
              onClick={() =>
                handlePageDecrement()
              }
              disabled={pageNumber === 1}
            >
              <FaMinus />
            </button>
            <span>
              <MdContactPage /> {pageNumber}
            </span>
            <button onClick={() => handlePageIncrement()}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
