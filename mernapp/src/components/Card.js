import React, { useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();

  const foodItem = props.foodItem || {
    _id: '1',
    name: 'Test Pizza',
    img: 'https://via.placeholder.com/160'
  };

  const options = props.options || {
    half: 100,
    full: 180
  };

  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || '');

  useEffect(() => {
    if (!size && priceOptions.length > 0) {
      setSize(priceOptions[0]);
    }
  }, [priceOptions, size]);

  const finalPrice = qty * (parseInt(options[size], 10) || 0);

  const handleAddToCart = async () => {
    const existingItemIndex = data.findIndex(
      item => item.id === foodItem._id && item.size === size
    );

    if (existingItemIndex !== -1) {
      await dispatch({
        type: 'UPDATE',
        index: existingItemIndex,
        price: finalPrice,
        qty: qty
      });
    } else {
      await dispatch({
        type: 'ADD',
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: foodItem.img
      });
    }
  };

  return (
    <div className="mt-3 d-flex justify-content-center">
      <div className="card shadow-sm" style={{ width: '16rem', maxHeight: '420px' }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt={foodItem.name}
          style={{ height: '160px', objectFit: 'cover' }}
        />

        <div className="card-body d-flex flex-column justify-content-between p-2">
          <h5 className="card-title text-center">{foodItem.name}</h5>

          <div className="container w-100 p-0">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <select
                className="form-select bg-success text-white w-50 me-2"
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value, 10))}
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                className="form-select bg-success text-white w-50"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="fs-6 fw-bold text-start mb-2">
              Total Price: ₹{finalPrice}/-
            </div>

            <div className="text-center">
              <button className="btn btn-success w-100" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
