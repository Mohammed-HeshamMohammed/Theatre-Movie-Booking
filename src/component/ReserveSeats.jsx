import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import '../css/reserveSeats.css'

function ReserveSeats() {
  const [seats, setSeats] = useState(() => {
    const savedSeats = localStorage.getItem('seats');
    if (savedSeats) {
      return JSON.parse(savedSeats);
    } else {
      const initialSeats = Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        isBooked: false,
        price: 10, // Each seat costs $10
      }));
      return initialSeats;
    }
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const handleAddToCartClick = (itemPrice) => {
    // Simulate adding to cart (replace with actual logic)
    setCartTotal((prevTotal) => prevTotal + itemPrice);

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 7000);
  };

  const handleSeatClick = (id) => {
    const updatedSeats = seats.map((seat) => {
      if (seat.id === id) {
        // Toggle the booking status
        if (!seat.isBooked) {
          handleAddToCartClick(10); // Add a fixed seat price of 10 dollars when booking
        }
        return { ...seat, isBooked: !seat.isBooked };
      }
      return seat;
    });
    setSeats(updatedSeats);
  };
  useEffect(() => {
    localStorage.setItem('seats', JSON.stringify(seats));
  }, [seats]);

  return (
    <div className="theatre-container">
      <div className="info d-flex justify-content-center mt-3 gap-4">
        <div>
          booked
          <FontAwesomeIcon className="booked mx-2 " icon={faCouch} />
        </div>
        <div>
          not booked
          <FontAwesomeIcon className="mx-2 text-white" icon={faCouch} />
        </div>
      </div>
      <div className="screen"></div>

      <div className="row">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`seat${seat.isBooked ? ' booked' : ''}`}
            onClick={() => handleSeatClick(seat.id, seat.price)}
          >
            <FontAwesomeIcon icon={faCouch} />
          </div>
        ))}
      </div>

      <NavLink to="/home/cart">
      <button>
        Go to Cart
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </NavLink>

      {showSuccessMessage && (
        <div className="success-message-container">
          <div className="success-message">
            Item added to cart! Cart total: ${cartTotal}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReserveSeats;
