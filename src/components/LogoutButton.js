// LogoutButton.js
import React from 'react';
import { Button } from '@chakra-ui/react';

const LogoutButton = ({ onLogout }) => {
  return (
    <Button
      position="fixed"
      top="10px"
      right="10px"
      colorScheme="red"
      onClick={onLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
