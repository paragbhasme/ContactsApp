import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  toggleFavourite,
  fetchContacts,
  resetStatus
} from "../features/contacts/contactsSlice";
import { FaPhoneAlt, FaStar, FaRegStar } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaMobileRetro } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Person = ({ contact }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.contacts.theme);
  const { contacts, status, error, pageNumber,pageSize,sortby ,sortdesc} = useSelector((state) => state.contacts);
  const handleDelete = (id, name) => {
    
    const confirmDelete = window.confirm(`Are you sure you want to delete contact name ${name}?`);
    
  
    if (confirmDelete) {
      dispatch(deleteContact(id))
        .then(() => {
          dispatch(resetStatus());
          dispatch(fetchContacts({
            pageNumber,
            pageSize,
            sortby,
            sortdesc,
          }));
        })
        .catch((error) => {
          console.error("Failed to delete contact: ", error);
        });
    }
  };
  
  const handleToggleFavourite = () => {
    dispatch(
      toggleFavourite({ id: contact.id, favourites: !contact.favourites })
    )
    .then(()=>{
      dispatch(resetStatus());
    })
    .then(()=>{
      dispatch(fetchContacts({ pageNumber,pageSize,sortby ,sortdesc}));
    })
  };


  return (
    <>
      <div key={contact.id} className={`contact-card ${theme}-theme`}>
        <div className="contact-image-container">
          <img
            src={
              contact.photo ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s"
            }
            alt={contact.name}
            className="contact-photo"
          />
          <button onClick={handleToggleFavourite} className="favourites-button">
            {contact.favourites ?  <IoIosHeart/>: <CiHeart/>}
          </button>
        </div>

        <div className="contact-info">
          <h2>{contact.name}</h2>
          <p>
            <FaMobileRetro />
            <strong>Mobile:</strong> {contact.mobile}
          </p>
          <p>
            <FaPhoneAlt />
            <strong> Phone :</strong> {contact.secMobile}
          </p>
          <p>
            <MdEmail />
            <strong>Email:</strong> {contact.email}
          </p>
          <div className="contact-actions">
            <button
              onClick={() => handleDelete(contact.id, contact.name)}
              className="delete-button"
            >
              Delete
            </button>
            <Link to={`/edit/${contact.id}`} className="edit-button">
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Person;
