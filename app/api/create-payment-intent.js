import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, payment_method } = req.body;
    
    // Validate input parameters
    if (!amount || !payment_method) {
      return res.status(400).json({ error: 'Amount and Payment Method are required' });
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Ensure the amount is in the smallest currency unit (e.g., cents)
        currency: 'usd', // You can modify this as per your requirements
        payment_method: payment_method,
        confirmation_method: 'manual',
        confirm: true, // Confirms payment intent right away if the method allows it
      });

      // Send the clientSecret to the client for confirming the payment
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      console.error('Stripe Payment Intent Error:', err); // For debugging
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
