import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  updateContact,
  fetchContacts,
} from "../features/contacts/contactsSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Alert } from "@mui/material";
import "./styles/ContactForm.css";
import { MdOutlineArrowBack } from "react-icons/md";

const ContactForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts.contacts);
  const { pageNumber,pageSize,sortby ,sortdesc} = useSelector((state)=> state.contacts);
  const contact = contacts.find((contact) => contact.id === parseInt(id));

  // State for contact form
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    secMobile: "",
    email: "",
    photo: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);


  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        mobile: contact.mobile,
        secMobile: contact.secMobile,
        email: contact.email,
        photo: contact.photo,
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Please fill this field";
    if (!formData.mobile) newErrors.mobile = "Please fill this field";
    if (!formData.email) newErrors.email = "Please fill this field";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const action = contact
      ? updateContact({ id: contact.id, contact: formData })
      : addContact(formData);
  
    dispatch(action)
      .then(() => {
        dispatch(fetchContacts({ pageNumber,pageSize,sortby ,sortdesc})).then(() => {
          setAlert({
            type: 'success',
            message: contact
              ? 'Contact successfully updated!'
              : 'Contact successfully added!',
          });
          setTimeout(() => {
            setAlert(null);
            dispatch(fetchContacts())
            navigate('/');
          }, 2000);
        });
      })
      .catch((error) => {
        setAlert({
          type: 'error',
          message: 'An error occurred. Please try again.',
        });
      });
  };
  

  return (
    <>
      <Link to="/" className="back-link">
        <MdOutlineArrowBack />
      </Link>
      <div className="contact-form-container">
        <h1>{contact ? "Edit Contact" : "Add Contact"}</h1>
        {alert && (
          <Alert variant="outlined" severity={alert.type}>
            {alert.message}
          </Alert>
        )}
        {!alert && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
              />
              {errors.mobile && <p className="error-text">{errors.mobile}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="secMobile"
                value={formData.secMobile}
                onChange={handleChange}
                placeholder="Secondary Mobile Number"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                placeholder="Photo URL"
              />
            </div>
            <button type="submit">
              {contact ? "Update Contact" : "Add Contact"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ContactForm;
