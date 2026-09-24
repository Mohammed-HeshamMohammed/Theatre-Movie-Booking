import React, { useState } from "react";
import { useMovies } from "../context/MoviesContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../css/cart.css";

function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function Cart() {
  const { items, seatsByMovie, removeItem, itemsTotal, seatsTotal, grandTotal, clearCart, seatPrice } =
    useCart();
  const { movies } = useMovies();
  const navigate = useNavigate();

  const [paymentMethodsVisible, setPaymentMethodsVisible] = useState(false);
  const [activeMethod, setActiveMethod] = useState(null); // "card" | "paypal"
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [paypalEmail, setPaypalEmail] = useState("");

  const seatEntries = Object.entries(seatsByMovie).filter(([, seats]) => seats.length > 0);
  const hasSeats = seatEntries.length > 0;
  const isEmpty = items.length === 0 && !hasSeats;

  const handleCardInputChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "cardNumber" ? formatCardNumber(value) : value;
    setCardDetails((prev) => ({ ...prev, [name]: nextValue }));
  };

  const confirmPayment = (method) => {
    setPaymentSuccessMessage(
      `Payment simulated via ${method}! This is a demo checkout - no card or account details are sent or stored. Redirecting to the homepage...`
    );
    setCardDetails({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" });
    setPaypalEmail("");
    clearCart();
    setTimeout(() => navigate("/home"), 4000);
  };

  if (isEmpty && !paymentSuccessMessage) {
    return (
      <div className="cart-container">
        <div className="cart-details">
          <h2>Your Cart</h2>
          <p>Your cart is empty. Go grab some snacks or reserve a seat!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {!paymentSuccessMessage && (
        <>
          <div className="cart-details">
            <h2>Your Cart</h2>

            {items.length > 0 && (
              <>
                <h3 className="cart-subheading">Food &amp; Drinks</h3>
                <ul className="cart-list">
                  {items.map((item) => (
                    <li key={`${item.category}-${item.id}`} className="cart-list-item">
                      <span>
                        {item.title} x{item.qty}
                      </span>
                      <span>${(item.price * item.qty).toFixed(2)}</span>
                      <button
                        className="remove-item-btn"
                        onClick={() => removeItem(item.id, item.category)}
                        aria-label={`Remove ${item.title}`}
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {hasSeats && (
              <>
                <h3 className="cart-subheading">Reserved Seats</h3>
                <ul className="cart-list">
                  {seatEntries.map(([movieId, seats]) => {
                    const movie = movies.find((m) => String(m.id) === movieId);
                    return (
                      <li key={movieId} className="cart-list-item">
                        <span>
                          {movie ? movie.title : "Movie"} - {seats.length} seat(s)
                        </span>
                        <span>${(seats.length * seatPrice).toFixed(2)}</span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            <p className="cart-total">
              Total: ${grandTotal.toFixed(2)}
              <span className="cart-total-breakdown">
                {" "}
                (Snacks ${itemsTotal.toFixed(2)} + Seats ${seatsTotal.toFixed(2)})
              </span>
            </p>
          </div>

          <button
            className="proceed-button"
            onClick={() => setPaymentMethodsVisible(!paymentMethodsVisible)}
          >
            {paymentMethodsVisible ? "Hide Payment Methods" : "Proceed to Payment"}
          </button>

          {paymentMethodsVisible && (
            <div className="payment-methods">
              <p className="payment-demo-notice">
                Demo checkout only - this project has no real payment backend. Do not enter real
                card numbers or account credentials.
              </p>
              <div className="payment-method">
                <button
                  className="payment-method-button"
                  onClick={() => setActiveMethod(activeMethod === "paypal" ? null : "paypal")}
                >
                  Pay with PayPal
                </button>
                {activeMethod === "paypal" && (
                  <div className="paypal-form">
                    <h3>PayPal (Simulated)</h3>
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        autoComplete="off"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary-accent"
                      onClick={() => confirmPayment("PayPal")}
                    >
                      Pay Now with PayPal
                    </button>
                  </div>
                )}
              </div>

              <div className="payment-method">
                <button
                  className="payment-method-button"
                  onClick={() => setActiveMethod(activeMethod === "card" ? null : "card")}
                >
                  Pay with Credit Card
                </button>
                {activeMethod === "card" && (
                  <div className="credit-card-form">
                    <h3>Pay with Credit Card (Simulated)</h3>
                    <div className="form-group">
                      <label>Card Number:</label>
                      <input
                        type="text"
                        name="cardNumber"
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="0000 0000 0000 0000"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Card Holder:</label>
                      <input
                        type="text"
                        name="cardHolder"
                        autoComplete="off"
                        value={cardDetails.cardHolder}
                        onChange={handleCardInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Expiry Date:</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        autoComplete="off"
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV:</label>
                      <input
                        type="password"
                        name="cvv"
                        inputMode="numeric"
                        maxLength={4}
                        autoComplete="off"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary-accent"
                      onClick={() => confirmPayment("Credit Card")}
                    >
                      Pay with Credit Card
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {paymentSuccessMessage && (
        <div className="success-message-container">
          <div className="success-message">{paymentSuccessMessage}</div>
        </div>
      )}
    </div>
  );
}

export default Cart;
