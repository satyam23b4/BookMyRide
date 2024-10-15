import React, { createContext, useContext, useState } from 'react';

// Create Context
const RideContext = createContext();

// Create a provider component
export const RideProvider = ({ children }) => {
  const [rideHistory, setRideHistory] = useState([]);

  const addRide = (ride) => {
    setRideHistory((prev) => [...prev, ride]);
  };

  return (
    <RideContext.Provider value={{ rideHistory, addRide }}>
      {children}
    </RideContext.Provider>
  );
};

// Custom hook to use the RideContext
export const useRide = () => {
  return useContext(RideContext);
};
