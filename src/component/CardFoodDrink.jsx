import React, { useState } from 'react';
import '../css/CardFoodDrink.css';

export function CardFoodDrink(props) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = () => {
    const newItem = {
      title: props.title,
      price: props.price,
    };

    setCartItems([...cartItems, newItem]);
  };

  return (
    <div className="custom-card drink position-relative shadow-lg">
      <img src={props.img} className="drink-image" alt="Card" />
      <div className="cardbody fs-3 d-flex justify-content-center align-items-center position-absolute w-50 h-100 text-center">
        <div className="index">
          <h5 className="card-title text-success">{props.title}</h5>
          <p className="card-text">{props.price}</p>
          <button className="btn btn-success mt-4" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardFoodDrink;
