import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavourites,
  resetStatus,
} from "../features/contacts/contactsSlice";
import { Link } from "react-router-dom";
import "./styles/ContactList.css";
import { MdOutlineArrowBack } from "react-icons/md";
import Person from "./Person";

const FavouritesList = () => {
  const dispatch = useDispatch();
  const { favourites, status,error } = useSelector((state) => state.contacts);
  const theme = useSelector((state) => state.contacts.theme);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(
      fetchFavourites()
    );
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  }, [theme]);

  // Filter contacts based on the search query
  const filteredContacts = favourites.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    console.error("Error loading favourites:", error); 
    return <p>Error loading contacts</p>;
  }

  return (
    <div className="contact-list">
      <h1>Favourites Contacts</h1>
      <div className="searchandinput">
        <Link to="/" className="back-link">
          <MdOutlineArrowBack />
        </Link>
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
      </div>
    </div>
  );
};

export default FavouritesList;
