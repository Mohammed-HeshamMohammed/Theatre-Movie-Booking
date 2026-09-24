import React, { useState } from "react";
import "../css/CardFoodDrink.css";
import { useCart } from "../context/CartContext";

export function CardFoodDrink({ id, img, title, price, category }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const numericPrice = parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;

  const handleAddToCart = () => {
    addItem({ id, title, price: numericPrice, category, img });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="custom-card drink position-relative shadow-lg">
      <img src={img} className="drink-image" alt={title} />
      <div className="cardbody fs-3 d-flex justify-content-center align-items-center position-absolute w-50 h-100 text-center">
        <div className="index">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{price}</p>
          <button className="btn btn-primary-accent mt-4" onClick={handleAddToCart}>
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardFoodDrink;
