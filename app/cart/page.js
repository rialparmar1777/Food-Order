'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FaTrash, FaChevronLeft, FaSpinner, FaPlus, FaMinus, FaTruck, FaStore, FaLock } from 'react-icons/fa';
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
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [shippingInfo, setShippingInfo] = useState({ 
    name: '', 
    email: '', 
    address: '', 
    city: '', 
    postalCode: '' 
  });

  const HST_RATE = 0.13;

  const { subtotal, tax, total } = cartItems.reduce(
    (acc, item) => {
      const itemTotal = item.price * item.quantity;
      acc.subtotal += itemTotal;
      acc.tax += itemTotal * HST_RATE;
      acc.total = acc.subtotal + acc.tax;
      return acc;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(items);
    };
    handleStorageChange();
    window.addEventListener('cart-updated', handleStorageChange);
    return () => window.removeEventListener('cart-updated', handleStorageChange);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!shippingInfo.name.trim()) errors.name = 'Name is required';
    if (!shippingInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email required';
    if (!shippingInfo.address.trim()) errors.address = 'Address is required';
    if (!shippingInfo.city.trim()) errors.city = 'City is required';
    if (!shippingInfo.postalCode.match(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)) errors.postalCode = 'Invalid postal code';
    if (!deliveryMethod) errors.deliveryMethod = 'Delivery method required';
    if (!deliveryTime) errors.deliveryTime = 'Delivery time required';
    return errors;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) return setFormErrors(errors);
    
    setLoading(true);
    try {
      // Create payment intent first
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100),
        }),
      });

      if (!response.ok) throw new Error('Payment failed');

      const { clientSecret } = await response.json();

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
          payment_method_data: {
            billing_details: {
              name: shippingInfo.name,
              email: shippingInfo.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
              }
            }
          }
        },
        clientSecret
      });

      if (error) throw error;
    } catch (err) {
      setFormErrors({ message: err.message || 'Payment failed. Please try again.' });
      setLoading(false);
    }
  };

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => checkoutStep === 'cart' ? router.push('/menu') : setCheckoutStep('cart')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
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
            <button
              onClick={() => router.push('/menu')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Menu
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {checkoutStep === 'cart' ? (
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
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold">{item.name}</h4>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-lg font-bold text-indigo-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 bg-indigo-600 rounded-lg text-white mb-2"
                          >
                            <FaPlus />
                          </button>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 bg-red-600 rounded-lg text-white"
                          >
                            <FaMinus />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-6 text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <CheckoutForm
                  handlePayment={handlePayment}
                  loading={loading}
                  formErrors={formErrors}
                  shippingInfo={shippingInfo}
                  setShippingInfo={setShippingInfo}
                  deliveryMethod={deliveryMethod}
                  setDeliveryMethod={setDeliveryMethod}
                  deliveryTime={deliveryTime}
                  setDeliveryTime={setDeliveryTime}
                  total={total}
                />
              )}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm h-fit sticky top-8">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (HST 13%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className="mt-6">
                  <FaLock className="inline-block mr-2 text-gray-600" />
                  <span className="text-sm text-gray-600">Secure SSL Encryption</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CheckoutForm = ({ 
  handlePayment, 
  loading, 
  formErrors, 
  shippingInfo, 
  setShippingInfo,
  deliveryMethod,
  setDeliveryMethod,
  deliveryTime,
  setDeliveryTime,
  total
}) => {
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const start = new Date(now.getTime() + 30 * 60000);
    
    for (let i = 0; i < 8; i++) {
      const time = new Date(start.getTime() + i * 30 * 60000);
      slots.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    return slots;
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Delivery Method</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setDeliveryMethod('delivery')}
            className={`p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
              deliveryMethod === 'delivery' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                : 'border-gray-200 text-gray-600'
            }`}
          >
            <FaTruck className="text-xl" />
            Delivery
          </button>
          <button
            type="button"
            onClick={() => setDeliveryMethod('pickup')}
            className={`p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
              deliveryMethod === 'pickup' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                : 'border-gray-200 text-gray-600'
            }`}
          >
            <FaStore className="text-xl" />
            Pickup
          </button>
        </div>
        {formErrors.deliveryMethod && (
          <p className="text-red-500 text-sm mt-2">{formErrors.deliveryMethod}</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Delivery Time</h3>
        <select
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select a time</option>
          {generateTimeSlots().map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        {formErrors.deliveryTime && (
          <p className="text-red-500 text-sm mt-2">{formErrors.deliveryTime}</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={shippingInfo.name}
            onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
          {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
          {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
            {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              type="text"
              value={shippingInfo.postalCode}
              onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
              className="w-full p-3 border rounded-lg"
              placeholder="A1A 1A1"
            />
            {formErrors.postalCode && <p className="text-red-500 text-sm mt-1">{formErrors.postalCode}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-3">
            <CardNumberElement className="w-full" options={{ style: { base: { fontSize: '16px' } } }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3">
              <CardExpiryElement className="w-full" />
            </div>
            <div className="border rounded-lg p-3">
              <CardCvcElement className="w-full" />
            </div>
          </div>
        </div>
      </div>

      {formErrors.message && (
        <p className="text-red-500 text-center p-4 bg-red-50 rounded-lg">{formErrors.message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {loading ? (
          <FaSpinner className="animate-spin mx-auto" />
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

export default CartPageWrapper;