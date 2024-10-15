// ChatBox.js
import React, { useEffect, useState } from 'react';
import { Box, Input, Button, List, ListItem, Text, useColorMode } from '@chakra-ui/react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Ensure this URL matches your server's address

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { colorMode } = useColorMode();

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    
    return () => {
      socket.off('chat message'); // Cleanup on unmount
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <Box 
      position="fixed" 
      bottom="10px" 
      right="20px" 
      width={{ base: '290px', md: '380px' }}
      height={{ base: 'auto', md: '350px' }}
      borderWidth="1px" 
      borderRadius="lg" 
      boxShadow="md" 
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.700'} // Change background color based on color mode
      p={4}
    >
      <Text fontSize="lg" fontWeight="bold" mb={2} color={colorMode === 'light' ? 'black' : 'white'}>Chat</Text>
      <List spacing={2} maxH="300px" overflowY="auto" mb={3}>
        {messages.map((msg, index) => (
          <ListItem 
            key={index} 
            borderBottomWidth="1px" 
            paddingY={1}
            color={colorMode === 'light' ? 'black' : 'white'} // Change text color based on color mode
          >
            {msg}
          </ListItem>
        ))}
      </List>
      <Input 
        placeholder="Type a message..." 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
        mb={2} 
        color={colorMode === 'light' ? 'black' : 'white'} // Change input text color based on color mode
        bg={colorMode === 'light' ? 'gray.100' : 'gray.600'} // Change input background color based on color mode
      />
      <Button colorScheme="teal" onClick={sendMessage}>Send</Button>
    </Box>
  );
};

export default ChatBox;
