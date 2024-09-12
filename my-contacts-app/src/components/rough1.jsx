.contact-list {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.contact-list h1 {
  text-align: center;
  margin-bottom: 20px;
}

.add-button {
  display: block;
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
  position: sticky; 
  z-index: 100; 
}



.contact-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.contact-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 5px 5px 5px rgb(170, 188, 194);
  overflow: hidden;
  width: 200px;
  text-align: center;
  transition: transform 0.3s;
  padding: 10px;
  position: relative; 
  /* z-index: -1;  */
}

.contact-card img {
  height: 70px;
  width: 70px;
  border-radius: 20%;
}

.contact-card:hover {
  transform: translateY(-3px);
  
}

.contact-image-container {
  position: relative;
}

.contact-photo {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.contact-info {
  padding: 8px;
}

.contact-info h2 {
  font-size: 14px;
  margin: 8px 0;
}

.contact-info p {
  font-size: 12px;
  margin: 3px 0;
}

.contact-actions {
  margin-top: 8px;
}

.delete-button,
.edit-button {
  padding: 6px 10px;
  border: none;
  color: white;
  border-radius: 4px;
  margin: 3px 3px 0 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  text-decoration: none;
}

.delete-button {
  background-color: #dc3545;
}

.edit-button {
  background-color: #28a745;
}

.delete-button:hover {
  background-color: #c82333;
}

.edit-button:hover {
  background-color: #218838;
}

.search-input {
  border: 2px solid #1471e3;
  height: 30px;
  border-radius: 20px;
}

.searchandinput {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  position: sticky;
  top: 0;
}

.themeButton {
  position: fixed;
  bottom: 20px;
  right: 15px;
  /* z-index: 1000;    */
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.addButton {
  position: fixed;
  bottom: 140px;
  right: 15px;
  /* z-index: 1000;    */
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.favouritesButton {
  position: fixed;
  bottom: 80px;
  right: 15px;
  /* z-index: 1000;    */
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.favourites-button {
  position: absolute;
  top: 10px; /* Adjust as needed */
  right: 10px; /* Adjust as needed */
  background-color: #e5ce4b; /* Gold color for the star */
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.favourites-button:hover {
  background-color: #e5c100; /* Slightly darker gold */
}
