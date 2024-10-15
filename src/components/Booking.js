import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Select, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import ChatBox from './ChatBox'; // Import the ChatBox component
import axios from 'axios'; // Import axios for making API requests

const Booking = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null); // To store the geocoded pickup coordinates
  const [destinationCoords, setDestinationCoords] = useState(null); // To store the geocoded destination coordinates
  const [rideType, setRideType] = useState('economy');
  const [estimatedFare, setEstimatedFare] = useState(0);
  const navigate = useNavigate();

  // Haversine formula to calculate straight-line distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const calculateFare = () => {
    if (pickupCoords && destinationCoords) {
      const distance = calculateDistance(
        pickupCoords[0], pickupCoords[1],
        destinationCoords[0], destinationCoords[1]
      );

      // Set different base fare and fare per km based on ride type
      const baseFare = rideType === 'premium' ? 15 : 10; // Base fare for premium is higher
      const farePerKm = rideType === 'premium' ? 3 : 2; // Premium fare per km is also higher
      return baseFare + (farePerKm * distance); // Calculate final fare based on distance
    }
    return 0;
  };

  const geocodeLocation = async (location, setCoords) => {
    const mapboxToken = 'pk.eyJ1Ijoic2F0eWFtMjAwNCIsImEiOiJjbTF1aXR6bjMwMWw2MmlzN2Fsc2wzbXBjIn0.I7-KqsZKNdwjExGxU0_WfQ'; // Replace with your Mapbox access token
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxToken}`);
      if (response.data && response.data.features && response.data.features.length > 0) {
        const { center } = response.data.features[0]; // Extract latitude and longitude
        setCoords([center[1], center[0]]); // Set coordinates (lat, lon)
      } else {
        console.error("Location not found");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  // Handle the pickup location change and geocode immediately
  const handlePickupChange = (e) => {
    const location = e.target.value;
    setPickup(location);
    if (location) {
      geocodeLocation(location, setPickupCoords); // Geocode as user types
    } else {
      setPickupCoords(null); // Clear marker if input is cleared
    }
  };

  // Handle the destination location change and geocode immediately
  const handleDestinationChange = (e) => {
    const location = e.target.value;
    setDestination(location);
    if (location) {
      geocodeLocation(location, setDestinationCoords); // Geocode as user types
    } else {
      setDestinationCoords(null); // Clear marker if input is cleared
    }
  };

  const handleBooking = () => {
    const fare = calculateFare(); // Calculate fare
    setEstimatedFare(fare); // Update estimated fare state
    
    // Redirect to payment page with ride details
    navigate('/payment', { state: { fare, pickup, destination, rideType } });
  };

  // Responsive value for Box width
  const boxWidth = useBreakpointValue({ base: '90%', md: '700px' });

  return (
    <Box
      maxW={boxWidth}
      mx="auto"
      mt={10}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg={useColorModeValue('white', 'gray.800')} // Set background color based on mode
    >
      <FormControl>
        <FormLabel>Pickup Location</FormLabel>
        <Input
          value={pickup}
          onChange={handlePickupChange}
          placeholder="Enter pickup location (e.g., New York)"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Destination</FormLabel>
        <Input
          value={destination}
          onChange={handleDestinationChange}
          placeholder="Enter destination (e.g., Los Angeles)"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Ride Type</FormLabel>
        <Select value={rideType} onChange={(e) => setRideType(e.target.value)}>
          <option value="economy">Economy</option>
          <option value="premium">Premium</option>
        </Select>
      </FormControl>

      {/* Map Container */}
      <Box mt={6} position="relative" h={{ base: '300px', md: '400px' }} w="100%">
        <MapContainer style={{ height: '100%', width: '100%' }} center={[51.505, -0.09]} zoom={5}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {/* Add markers for pickup and destination */}
          {pickupCoords && (
            <Marker position={pickupCoords}>
              <Text>Pickup</Text>
            </Marker>
          )}
          {destinationCoords && (
            <Marker position={destinationCoords}>
              <Text>Destination</Text>
            </Marker>
          )}

          {/* Draw a straight line between the two points */}
          {pickupCoords && destinationCoords && (
            <Polyline positions={[pickupCoords, destinationCoords]} color="blue" />
          )}

          {/* Use this to adjust the map's view */}
          <MapAdjuster pickupCoords={pickupCoords} destinationCoords={destinationCoords} />
        </MapContainer>
      </Box>

      {/* Book Ride Button */}
      <Button
        mt={4}
        colorScheme="teal"
        zIndex={1000}
        onClick={handleBooking}
        w="full"
        isDisabled={!pickup || !destination}
      >
        Book Ride
      </Button>

      {/* Display estimated fare */}
      {estimatedFare > 0 && (
        <Text mt={4} color="green.500" fontWeight="bold">
          Estimated Fare: ${estimatedFare.toFixed(2)}
        </Text>
      )}

      {/* ChatBox Component */}
      <ChatBox />
    </Box>
  );
};

// Custom component to adjust the map view
const MapAdjuster = ({ pickupCoords, destinationCoords }) => {
  const map = useMap();

  useEffect(() => {
    if (pickupCoords && destinationCoords) {
      // Create bounds for the two coordinates
      const bounds = [pickupCoords, destinationCoords];
      // Fit the map to the bounds
      map.fitBounds(bounds);
    }
  }, [pickupCoords, destinationCoords, map]);

  return null; // This component does not render anything to the DOM
};

export default Booking;
