// App.jsx
import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import FavouritesList from './components/FavouritesList';
import './components/styles/styles.css'; // Import your CSS file

const App = () => {
    
    return (      
            <Router>
               
                <Routes>
                    <Route path="/" element={<ContactList />} />
                    <Route path="/add" element={<ContactForm />} />
                    <Route path="/edit/:id" element={<ContactForm />} />
                    <Route path="/favourites" element={<FavouritesList />} />
                </Routes>
            </Router>
        
    );
};

export default App;





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ContactList from './components/ContactList';
// import ContactForm from './components/ContactForm';

// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<ContactList />} />
//                 <Route path="/add" element={<ContactForm />} />
//                 <Route path="/edit/:id" element={<ContactForm />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;
