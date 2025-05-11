import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, query, orderBy} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './menuStyle.css';
import Navbar from './Navbar';
import { CartContext } from './CartContext';
import { ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

function Menu() {
  // State variables for menu categories and selected category
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Access the cart context to add items to the cart
  const { addToCart } = useContext(CartContext);

  // Fetch menu data from Firestore when the component mounts
  useEffect(() => {
    const fetchMenu = async () => {
      try {
      const querySnapshot = await getDocs(query(collection(db, "menu"), orderBy("category", "asc")));
      const menuData = {};


        // Process each document in the Firestore collection
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          menuData[data.category] = {
            id: doc.id,
            items: data.items
          };
        });

        // Set the fetched menu data and default selected category
        setCategories(menuData);
        setSelectedCategory(Object.keys(menuData)[0]);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };

    fetchMenu();
  }, []);

  // Function to handle adding an item to the cart
  const handleAddToCart = (item) => {
    addToCart(item);
  };

  // Display a loading message if the menu data is not yet available
  if (!selectedCategory || !categories[selectedCategory]) {
    return <div style={{ padding: "100px", textAlign: "center" }}>Loading menu...</div>;
  }

  return (
    <>
      {/* Navbar Section */}
      <Navbar />
      <ToastContainer /> {/* Toast notifications for feedback */}

      {/* Sidebar Menu Section */}
      <div className="menu_section">
        <div className="menu2" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>MENU</div>
        {/* List of categories */}
        {Object.keys(categories).map((category, index) => (
          <div
            key={index}
            className={"category " + (selectedCategory === category ? "active highlighted" : "")}
            onClick={() => setSelectedCategory(category)} // Change selected category on click
          >
            {category}
          </div>
        ))}
      </div>

      {/* Food Items Section */}
      <div className="food-section">
        {/* Display the title of the selected category */}
        <h1 className="category-title">{selectedCategory}</h1>
        <div className="food-grid">
          {/* Display food items in the selected category */}
          {categories[selectedCategory]?.items?.map((item, index) => (
            <div key={index} className="food-box">
              {/* Food item image */}
              <img src={item.image || "path/to/placeholder.jpg"} alt={item.name} className="food-image" />
              <div className="food-info">
                {/* Food item name and price */}
                <span className="food-name">{item.name}</span>
                <span className="food-price">${item.price}</span>
              </div>
              {/* Add to Cart button */}
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart({ name: item.name, price: item.price, image: item.image })}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

export default Menu;