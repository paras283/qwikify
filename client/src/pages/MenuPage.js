import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/HungryHub.css';

const MenuPage = () => {
  const [dishes, setDishes] = useState([]);
  const [order, setOrder] = useState([]);

  const [expandedCategories, setExpandedCategories] = useState({});
  const [confirmCategoryChange, setConfirmCategoryChange] = useState(false);
  const [pendingDish, setPendingDish] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');




  const displayModal = async () => {

    setModalMessage('Currently, we are accepting orders exclusively through WhatsApp.');
    setModalType('success');

    setIsModalOpen(true); // Show the modal
  };



  const sendMessage = async () => {
    const botToken = '8090940856:AAGf9lxjAm7opuBnmS0RlwKWEZ2NxkZ7Q9c';
    const chatId = '647639463';
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Generate a unique order ID (timestamp + random number)
    const orderId = `ORD-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;

    // Build the order details message with the unique order ID
    const orderDetails = order
      .map((dish) => `${dish.name} - ₹${dish.price} x ${dish.quantity}`)
      .join('\n');

    const message = `🆔 *Order ID:* ${orderId}\n\n📋 *Order Details:*\n${orderDetails}\n\n💰 *Total Amount:* ₹${totalAmount}\n📞 *Mobile Number:* XXXXXXXXXX\n`;

    const whatsappMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917500048079?text=${whatsappMessage}`;
    window.location.href = whatsappUrl;

    try {
      const response = await axios.post(apiUrl, {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown', // Optional: Use Markdown for formatting
      });

      if (response.data.ok) {
        console.log(`Order saved with ID: ${orderId}`);
      } else {
        console.log(`Failed to place order: ${response.data.description}`);
      }
    } catch (error) {
      console.log('Failed to place order: ' + error.message);
    }

    setIsModalOpen(false);
    setOrder([]);
    localStorage.removeItem('order');
  }

  /*const sendMessage = async () => {
    // Generate a unique order ID (timestamp + random number)
    const orderId = `ORD-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;

    // Build the order details message
    const orderDetails = order
      .map((dish) => `${dish.name} - ₹${dish.price} x ${dish.quantity}`)
      .join('\n');

    const message = `🆔 *Order ID:* ${orderId}\n\n📋 *Order Details:*\n${orderDetails}\n\n💰 *Total Amount:* ₹${totalAmount}\n📞 *Mobile Number:* XXXXXXXXXX\n`;

    try {
      const response = await axios.post('http://192.168.0.102:3000/sendMessage.php', { message });

      if (response.data.status === 'success') {
        console.log(`Order saved with ID: ${orderId}`);
      } else {
        console.log(`Failed to place order: ${response.data.message}`);
      }
    } catch (error) {
      console.log('Failed to place order: ' + error.message);
    }

    setIsModalOpen(false);
    setOrder([]);
    localStorage.removeItem('order');
  };

  */


  useEffect(() => {
    const Dishes = [
      { _id: 1, name: 'Plain Pratha', price: 12.99, category: 'Pratha' },
      { _id: 2, name: 'Aloo Pratha', price: 9.99, category: 'Pratha' },
      { _id: 3, name: 'Aloo Pyaz Pratha', price: 7.99, category: 'Pratha' },
      { _id: 4, name: 'Paneer Pratha', price: 10.99, category: 'Pratha' },
      { _id: 5, name: 'Veg Biryani', price: 15.99, category: 'Biryani' },
      { _id: 6, name: 'Chicken Biryani', price: 19.99, category: 'Biryani' },
    ];

    setDishes(Dishes);
  }, []);

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem('order'));
    if (savedOrder && Array.isArray(savedOrder)) {
      setOrder(savedOrder);
    }
  }, []);

  useEffect(() => {
    if (order.length > 0) {
      localStorage.setItem('order', JSON.stringify(order));
    }
  }, [order]);

  const groupByCategory = (dishes) => {
    return dishes.reduce((categories, dish) => {
      const { category } = dish;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(dish);
      return categories;
    }, {});
  };

  const clearOrder = () => {
    setOrder([]);
    localStorage.removeItem('order');
  };

  const addToOrder = (dish) => {
    const currentCategory = dish.category;
    const differentCategoryExists = order.some((item) => item.category !== currentCategory);

    if (differentCategoryExists) {
      // Save the pending dish and show confirmation modal
      setPendingDish(dish);
      setConfirmCategoryChange(true);
      return;
    }

    finalizeAddToOrder(dish);
  };

  const finalizeAddToOrder = (dish) => {
    const updatedOrder = [...order];
    const existingDishIndex = updatedOrder.findIndex((item) => item._id === dish._id);

    if (existingDishIndex === -1) {
      updatedOrder.push({ ...dish, quantity: 1 });
    } else {
      updatedOrder[existingDishIndex].quantity += 1;
    }

    setOrder(updatedOrder);
    localStorage.setItem('order', JSON.stringify(updatedOrder));
  };

  const handleCategoryChangeConfirm = () => {
    // Clear the order and add the pending dish
    setOrder([{ ...pendingDish, quantity: 1 }]);
    localStorage.setItem('order', JSON.stringify([{ ...pendingDish, quantity: 1 }]));
    setConfirmCategoryChange(false);
    setPendingDish(null);
  };

  const handleCategoryChangeCancel = () => {
    // Close the confirmation modal without clearing the order
    setConfirmCategoryChange(false);
    setPendingDish(null);
  };

  const increaseQuantity = (index) => {
    const updatedOrder = [...order];
    updatedOrder[index].quantity += 1;
    setOrder(updatedOrder);
    localStorage.setItem('order', JSON.stringify(updatedOrder));
  };

  const decreaseQuantity = (index) => {
    const updatedOrder = [...order];
    if (updatedOrder[index].quantity > 1) {
      updatedOrder[index].quantity -= 1;
    } else {
      updatedOrder.splice(index, 1);
    }
    setOrder(updatedOrder);
    localStorage.setItem('order', JSON.stringify(updatedOrder));
  };

  const categorizedDishes = groupByCategory(dishes);
  const totalAmount = order.reduce((total, dish) => total + dish.price * dish.quantity, 0);

  /* const handlePayment = async () => {
     if (!mobileNumber) {
       setMobileError('Please enter your mobile number.');
       return;
     }
 
     const mobileRegex = /^[0-9]{10}$/;
     if (!mobileRegex.test(mobileNumber)) {
       setMobileError('Invalid mobile number. Please enter a 10-digit number.');
       return;
     }
 
     setMobileError('');
     try {
       const { data } = await axios.post('http://192.168.0.113:5000/api/paytm/payment', {
         amount: totalAmount,
         mobileNumber,
       });
       const form = document.createElement('form');
       form.method = 'POST';
       form.action = data.PAYTM_TXN_URL;
 
       Object.keys(data).forEach((key) => {
         if (key !== 'PAYTM_TXN_URL') {
           const input = document.createElement('input');
           input.type = 'hidden';
           input.name = key;
           input.value = data[key];
           form.appendChild(input);
         }
       });
       document.body.appendChild(form);
       form.submit();
 
       setOrder([]);
       localStorage.removeItem('order');
     } catch (error) {
       console.error('Error in payment request:', error);
     }
   };
 */


  const toggleCategory = (category) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div className="menu-page">
      <h1 className="main-heading">Welcome to Hungry Hub</h1>
      <p className="sub-heading">Today's top curated menu is here</p>

      <div className="view-cart" onClick={() => document.querySelector('.order-summary').scrollIntoView({ behavior: 'smooth' })}>
        <i className="cart-icon">🛒</i> View Cart
        <span className="cart-item-count">
          {order.reduce((acc, dish) => acc + dish.quantity, 0)}
        </span>
      </div>


      {Object.keys(categorizedDishes).map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-heading" onClick={() => toggleCategory(category)}>
            {category}
          </h2>
          {expandedCategories[category] && (
            <div className="menu-items">
              {categorizedDishes[category].map((dish) => (
                <div key={dish._id} className="menu-item">
                  <h3>{dish.name}</h3>
                  <p>Price: ₹{dish.price}</p>
                  <button onClick={() => addToOrder(dish)}>Add to Order</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="order-summary">
        <div className="order-summary-header">
          <h2 className="order-summary-title">Your Order:</h2>
          <img
            src={require('../images/delete_bucket.png')}
            alt="Delete Order"
            onClick={clearOrder}
            className="delete-icon"
          />
        </div>
        <ul>
          {order.map((dish, index) => (
            <li key={index} className="order-item">
              <p>{dish.name} - ₹{dish.price} x {dish.quantity}</p>
              <div className="order-item-actions">
                <button onClick={() => decreaseQuantity(index)} className="action-btn">-</button>
                <span className="quantity">{dish.quantity}</span>
                <button onClick={() => increaseQuantity(index)} className="action-btn">+</button>
              </div>
            </li>
          ))}
        </ul>
        <p style={{ margin: '10px 0', fontSize: '18px', }} >Total: ₹{totalAmount}</p>
        <p style={{ margin: '10px 0', fontSize: '16px', color: '#666' }}>
          Delivery Fee: ₹{totalAmount === 0 ? 0 : totalAmount > 200 ? 0 : 40}
        </p>
        <button
          /*onClick={handlePayment} */
          onClick={displayModal}
          className="make-payment"
          style={{ backgroundColor: order.length === 0 ? '#ddd' : '#E8A941', cursor: order.length === 0 ? 'not-allowed' : 'pointer' }}
        >
          Confirm Order ₹{totalAmount + (totalAmount > 200 ? 0 : 40)}
        </button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p
                style={{
                  color: modalType === 'success' ? 'green' : 'red',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  marginBottom: '20px',
                }}
              >
                {modalMessage}
              </p>
              <button
                onClick={sendMessage}
                disabled={order.length === 0}
                style={{
                  padding: '10px 20px',
                  backgroundColor: modalType === 'success' ? '#E8A941' : '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Open Whatsapp
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: modalType === 'success' ? '#BDBFC3' : '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Custom Confirmation Modal */}
      {confirmCategoryChange && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>
              Your current order contains items from another kitchen. Do you want to clear it and start a new order with "{pendingDish.category}"?
            </p>
            <button onClick={handleCategoryChangeConfirm} className="confirm-btn">
              Yes, Clear and Add
            </button>
            <button onClick={handleCategoryChangeCancel} className="cancel-btn">
              No, Keep Existing Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
