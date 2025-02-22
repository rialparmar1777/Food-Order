'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FaTrash, FaChevronLeft, FaLock, FaSpinner, FaPlus, FaMinus, FaTruck, FaStore } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CartPageWrapper = () => (
  <Elements stripe={stripePromise}>
    <CartPage />
  </Elements>
);

const CartPage = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [deliveryTime, setDeliveryTime] = useState(''); 
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    instructions: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const HST_RATE = 0.13; // 13% HST rate for Ontario

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    calculateTotal(items);
    
    const handleStorageChange = () => {
      const updatedItems = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    };
    
    window.addEventListener('cart-updated', handleStorageChange);
    return () => window.removeEventListener('cart-updated', handleStorageChange);
  }, []);

  const calculateTotal = (items) => {
    const subtotalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxAmount = subtotalAmount * HST_RATE;
    const totalAmount = subtotalAmount + taxAmount;
    
    setSubtotal(subtotalAmount.toFixed(2));
    setTax(taxAmount.toFixed(2));
    setTotal(totalAmount.toFixed(2));
  };

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  const handleCheckout = async () => {
    if (!stripe || !elements) return; // Stripe.js has not yet loaded
    
    // Make sure all fields are validated
    if (
      !shippingInfo.name ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.postalCode ||
      !deliveryMethod ||
      !deliveryTime
    ) {
      setFormErrors({ message: 'Please fill all the required fields!' });
      return;
    }
  
    // Create payment method with Stripe Elements
    setLoading(true);
    try {
      const cardNumber = elements.getElement(CardNumberElement);
      const cardExpiry = elements.getElement(CardExpiryElement);
      const cardCvc = elements.getElement(CardCvcElement);
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber,
      });
  
      if (error) {
        setFormErrors({ message: error.message });
        setLoading(false);
        return;
      }
  
      // Send payment method info to the backend for further processing (e.g., creating payment intent)
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method: paymentMethod.id,
          total,
          shippingInfo,
          deliveryMethod,
          deliveryTime,
        }),
      });
  
      const { clientSecret } = await response.json();
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
  
      if (stripeError) {
        setFormErrors({ message: stripeError.message });
        setLoading(false);
      } else {
        // Successful payment
        setLoading(false);
        router.push('/order-confirmation'); // Redirect to order confirmation page
      }
    } catch (error) {
      setFormErrors({ message: 'An error occurred while processing your payment.' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => checkoutStep === 'cart' ? router.push('/menu') : setCheckoutStep('cart')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8 transition-colors"
        >
          <FaChevronLeft className="mr-2" />
          {checkoutStep === 'cart' ? 'Continue Shopping' : 'Back to Cart'}
        </button>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some delicious meals to get started!</p>
            <button
              onClick={() => router.push('/menu')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105"
            >
              Browse Menu
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Method and Time Selection */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Choose Delivery Method</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`flex-1 p-4 rounded-lg border-2 ${deliveryMethod === 'delivery' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
                  >
                    <FaTruck className="mx-auto mb-2" />
                    <span>Delivery</span>
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`flex-1 p-4 rounded-lg border-2 ${deliveryMethod === 'pickup' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
                  >
                    <FaStore className="mx-auto mb-2" />
                    <span>Pickup</span>
                  </button>
                </div>
              </div>

              {/* Time Selection */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Select {deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'} Time</h3>
                <select 
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select a time</option>
                  <option value="asap">As soon as possible</option>
                  <option value="30min">In 30 minutes</option>
                  <option value="1hour">In 1 hour</option>
                  <option value="2hours">In 2 hours</option>
                </select>
              </div>

              {/* Cart Items */}
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-6 rounded-xl shadow-sm"
                  >
                    <div className="flex items-start gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-gray-600 mt-2">${item.price} each</p>
                        
                        <div className="flex items-center gap-6 mt-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <FaMinus />
                            </button>
                            <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <FaPlus />
                            </button>
                          </div>
                          

                          <p className="text-lg font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between font-bold">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Tax (HST)</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className={`w-full bg-indigo-600 text-white py-4 rounded-xl mt-6 ${loading ? 'opacity-50' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="inline animate-spin mr-2" />
                ) : (
                  <FaLock className="inline mr-2" />
                )}
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              {formErrors.message && (
                <div className="text-red-600 mt-4">{formErrors.message}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPageWrapper;
