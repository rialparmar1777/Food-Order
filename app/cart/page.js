'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { FaTrash, FaChevronLeft, FaLock } from 'react-icons/fa';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartPage() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    calculateTotal(items);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum.toFixed(2));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: { ...shippingInfo }
      });

      if (error) throw error;

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total * 100,
          payment_method: paymentMethod.id,
          shipping: shippingInfo
        })
      });

      const { clientSecret } = await response.json();
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);

      if (confirmError) throw confirmError;

      localStorage.removeItem('cart');
      router.push('/order-confirmation');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => checkoutStep === 'cart' ? router.push('/menu') : setCheckoutStep('cart')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaChevronLeft className="mr-2" />
            {checkoutStep === 'cart' ? 'Continue Shopping' : 'Back to Cart'}
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <button
              onClick={() => router.push('/menu')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
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
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 w-12 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 flex items-center"
                          >
                            <FaTrash className="mr-2" /> Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-8">
              {checkoutStep === 'cart' ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                      <span>${total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCheckoutStep('payment')}
                    className="w-full bg-indigo-600 text-white py-4 rounded-lg mt-6 hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  >
                    <FaLock className="mr-2" /> Proceed to Checkout
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <div className="border rounded-lg p-3">
                        <CardNumberElement className="w-full" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiration Date</label>
                        <div className="border rounded-lg p-3">
                          <CardExpiryElement className="w-full" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVC</label>
                        <div className="border rounded-lg p-3">
                          <CardCvcElement className="w-full" />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Pay $' + total}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}