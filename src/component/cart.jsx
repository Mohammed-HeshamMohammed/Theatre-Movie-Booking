import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/cart.css";

function Cart() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [cartSeats, setCartSeats] = useState([]);
  const [cartVisible, setCartVisible] = useState(true);
  const [paymentMethodsVisible, setPaymentMethodsVisible] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState("");
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreditCardFormVisible, setCreditCardFormVisible] = useState(false);
  const [isPayPalFormVisible, setPayPalFormVisible] = useState(false);
  const [cartItemPrice, setCartItemPrice] = useState(0);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePayNowClick = () => {
    // Handle PayPal payment here using the collected email and password
    setPaymentSuccessMessage('Processing PayPal payment with email:');
  };

  // Access the price passed via location state
  const { state } = location;
  const price = state ? state.price : null;

  const handlePayment = () => {
    // Display payment methods
    setPaymentMethodsVisible(!paymentMethodsVisible);
  };
  const togglePayPalForm = () => {
    setPayPalFormVisible(!isPayPalFormVisible);
    setCreditCardFormVisible(false);  // Hide Credit Card form when toggling PayPal
  };
  
  // Function to toggle Credit Card form visibility
  const toggleCreditCardForm = () => {
    setCreditCardFormVisible(!isCreditCardFormVisible);
    setPayPalFormVisible(false);  // Hide PayPal form when toggling Credit Card
  };

  const handlePayWithPayPal = () => {
    // Display success message for PayPal payment
    setPaymentSuccessMessage("Payment Successful via PayPal! Redirecting to the homepage in 5 seconds...");

    // Redirect to the homepage after 5 seconds
    setTimeout(() => {
      window.location.href = "/home";
    }, 5000);
  };

  const handlePayWithCreditCard = () => {
    // Display success message for credit card payment
    setPaymentSuccessMessage("Payment Successful via Credit Card! Redirecting to the homepage in 5 seconds...");

    // Redirect to the homepage after 5 seconds
    setTimeout(() => {
      window.location.href = "/home";
    }, 5000);
  };

  const handleCreditCardInputChange = (event) => {
    const { name, value } = event.target;
    setCreditCardDetails({ ...creditCardDetails, [name]: value });
  };

  useEffect(() => {
    // Retrieve the item price from local storage
    const itemPrice = parseInt(localStorage.getItem('cartItemPrice'), 10);
    if (!isNaN(itemPrice)) {
      setCartItemPrice(itemPrice);
    }
  }, []);

  
  return (
    <>
      {cartVisible && (
        <div className="cart-container">
          <div className="cart-details">
            <h2>Cart</h2>
            <p>Seats added: {cartSeats.length}</p>
            <p>Items added: {cartItems.length}</p>
            <p>Item Price: ${cartItemPrice}</p>

            {/* Display cart contents */}
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  Product: {item.name}, Price: ${item.price}
                </li>
              ))}
            </ul>
  
            {/* Total */}
            <p>
              Total: $
              {cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </p>
          </div>
  
          <button className="proceed-button" onClick={handlePayment}>
  {paymentMethodsVisible ? 'Hide Payment Methods' : 'Proceed to Payment'}
</button>

  
          {paymentMethodsVisible && (
            <div className="payment-methods">
              <div className="payment-method">
                <button className="payment-method-button" onClick={togglePayPalForm}>
                  Pay with PayPal
                </button>
                {isPayPalFormVisible && (
                  <div className="paypal-form">
                    <h3>PayPal Payment Form</h3>
                    <form>
                      <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={handleEmailChange} />
                      </div>
                      <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                      </div>
                      <button type="button" onClick={handlePayNowClick}>
                        Pay Now with PayPal
                      </button>
                    </form>
                  </div>
                )}
              </div>
  
              <div className="payment-method">
                <button className="payment-method-button" onClick={toggleCreditCardForm}>
                  Pay with Credit Card
                </button>
            {/* Credit Card Form */}
            {isCreditCardFormVisible && (
              <div className="credit-card-form">
                <h3>Pay with Credit Card</h3>
                <form>
                  <div className="form-group">
                    <label>Card Number:</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={creditCardDetails.cardNumber}
                      onChange={handleCreditCardInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Card Holder:</label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={creditCardDetails.cardHolder}
                      onChange={handleCreditCardInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Expiry Date:</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={creditCardDetails.expiryDate}
                      onChange={handleCreditCardInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV:</label>
                    <input
                      type="text"
                      name="cvv"
                      value={creditCardDetails.cvv}
                      onChange={handleCreditCardInputChange}
                    />
                  </div>
                  </form>
                  <button onClick={handlePayWithCreditCard}>Pay with Credit Card</button>
                </div>
              )}
            </div>
          </div>
        )}

        {paymentSuccessMessage && (
          <div className="success-message-container">
            <div className="success-message">{paymentSuccessMessage}</div>
          </div>
        )}
      </div>
    )}
  </>
);

}

export default Cart;
