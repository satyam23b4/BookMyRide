import React, { useState } from 'react';
import { Input, Button, Box, FormControl, FormLabel, Text, Flex, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Replace with your actual authentication logic
    if (username === 'admin' && password === 'password123') {
      console.log('User authenticated:', { username });
      onLogin('your-auth-token'); // Call onLogin with a token or other value
      navigate('/booking'); // Redirect to '/booking' after successful login
    } else {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  // Responsive value for Box width
  const boxWidth = useBreakpointValue({ base: '90%', md: '400px' });

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')} p={4}>
      <Box w={boxWidth} bg={useColorModeValue('white', 'gray.700')} p={6} rounded="md" shadow="md">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            bg={useColorModeValue('white', 'gray.600')} // Input background based on color mode
            color={useColorModeValue('black', 'white')} // Input text color based on color mode
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            bg={useColorModeValue('white', 'gray.600')} // Input background based on color mode
            color={useColorModeValue('black', 'white')} // Input text color based on color mode
          />
        </FormControl>

        {errorMessage && (
          <Text color="red.500" mt={4}>
            {errorMessage}
          </Text>
        )}

        <Button mt={6} colorScheme="teal" onClick={handleLogin} w="full">
          Login
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
