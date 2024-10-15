import React, { useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import { useRide } from '../context/RideContext'; // Import the context

const Payment = () => {
  const location = useLocation();
  const { fare, pickup, destination, rideType } = location.state || { fare: 0 };
  const stripe = useStripe();
  const elements = useElements();
  const { addRide } = useRide(); // Use the context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }

    setLoading(true);
    setError('');

    const cardElement = elements.getElement(CardElement);

    // Create payment intent on the server
    try {
      const { error } = await stripe.confirmCardPayment('YOUR_CLIENT_SECRET', {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        // Add the ride to the history
        addRide({ date: new Date().toLocaleDateString(), fare: `$${fare.toFixed(2)}`, driver: 'N/A', pickup, destination, rideType });
        alert('Payment processed! Ride added to history.');
        // Optionally redirect or perform other actions
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW={{ base: '90%', md: 'md' }} mx="auto" mt={10} p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">Estimated Fare: ${fare.toFixed(2)}</Text>
      <Box mt={4} borderWidth="1px" borderRadius="md" p={3}>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </Box>
      {error && <Text color="red.500" mt={2}>{error}</Text>}
      <Button 
        mt={4} 
        colorScheme="teal" 
        onClick={handlePayment} 
        isLoading={loading}
        isDisabled={!stripe}
        width="100%" // Full-width button on mobile
      >
        Pay Now
      </Button>
    </Box>
  );
};

export default Payment;
