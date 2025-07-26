import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

const images = [
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&h=700&q=80",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&h=700&q=80",
  "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&h=700&q=80"
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setFoodItem(data[0]);   // Array of items
      setFoodCat(data[1]);    // Array of categories
    } catch (error) {
      console.error('❌ Failed to fetch food data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Carousel Section */}
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ objectFit: 'contain' }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: '10' }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </div>
          </div>

          {images.map((imgSrc, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={index}
            >
              <img
                src={imgSrc}
                className="d-block w-100"
                style={{ height: '250px', objectFit: 'cover', filter: 'brightness(30%)' }}
                alt={`slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Food Categories & Items */}
      <div className="container mt-4">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="mb-4">
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              <div className="row">
                {foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <div
                      key={item._id}
                      className="col-12 col-md-6 col-lg-3 mb-3"
                    >
                      <Card
                        foodItem={item}
                        options={item.options[0]} // Ensure this is an object like {small: 100, large: 150}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">🔄 Loading categories...</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
