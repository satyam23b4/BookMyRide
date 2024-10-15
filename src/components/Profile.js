import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const Profile = () => {
  const [name, setName] = useState('Satyam Bhattacharjee');
  const [email, setEmail] = useState('stuartbin4002@gmail.com');

  const handleUpdate = () => {
    console.log('Profile updated:', { name, email });
  };

  return (
    <Box maxW={{ base: '90%', md: 'sm' }} mx="auto" mt={10} p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <Button mt={6} colorScheme="teal" width="100%" onClick={handleUpdate}>
        Update Profile
      </Button>
    </Box>
  );
};

export default Profile;
