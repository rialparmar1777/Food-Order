import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ 
      error: 'Method Not Allowed',
      message: 'Only POST requests are accepted' 
    });
  }

  try {
    // Validate input parameters
    const { amount, payment_method } = req.body;
    
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        error: 'Invalid Amount',
        message: 'A valid positive amount is required'
      });
    }

    if (!payment_method || typeof payment_method !== 'string') {
      return res.status(400).json({
        error: 'Invalid Payment Method',
        message: 'A valid payment method is required'
      });
    }

    // Create payment intent with additional security parameters
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure integer value
      currency: 'cad', // For Canadian HST
      payment_method,
      confirmation_method: 'manual',
      capture_method: 'automatic',
      metadata: {
        integration_check: 'accept_a_payment',
        hst_rate: '0.13', // Ontario HST rate
        system: 'food-delivery-app'
      },
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['CA']
      }
    });

    // Secure response handling
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });

  } catch (err) {
    // Enhanced error logging
    console.error(`Stripe Error [${err.type}]:`, err.raw?.message || err.message);
    
    // Security: Don't expose Stripe error details to client
    const serverError = err.raw || err;
    return res.status(500).json({
      error: 'Payment Processing Error',
      message: 'Could not process payment. Please try again.'
    });
  }
}