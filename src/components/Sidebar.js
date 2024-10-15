import React from 'react';
import { Box, VStack, Link, IconButton, Drawer, DrawerContent, DrawerOverlay, useDisclosure, useColorMode } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle component

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  // Adjust background and text color for dark mode
  const sidebarBgColor = colorMode === 'light' ? '#4A5568' : 'gray.700'; // Match chatbox background color for dark mode
  const sidebarTextColor = colorMode === 'light' ? 'white' : 'white'; // Match text color for dark mode

  return (
    <>
      {/* Hamburger Menu for smaller screens */}
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Menu"
        display={{ base: 'block', md: 'none' }}
        position="fixed"
        top="10px"
        left="10px"
        zIndex={1000}
        onClick={onOpen}
      />

      {/* Sidebar for larger screens */}
      <Box
        as="nav"
        w="250px"
        h="100vh"
        bg={sidebarBgColor} // Use the dynamic background color
        color={sidebarTextColor} // Set text color dynamically
        p={5}
        position="fixed"
        left={0}
        top={0}
        display={{ base: 'none', md: 'block' }} // Hide on small screens
      >
        <VStack align="start" spacing={4}>
          <Link
            as={NavLink}
            to="/booking"
            _hover={{ textDecoration: 'none', color: colorMode === 'light' ? 'teal.300' : 'teal.500' }} // Change hover color for dark mode
            _activeLink={{ fontWeight: 'bold', color: 'teal.300' }}
          >
            Book a Ride
          </Link>
          <Link
            as={NavLink}
            to="/profile"
            _hover={{ textDecoration: 'none', color: colorMode === 'light' ? 'teal.300' : 'teal.500' }} // Change hover color for dark mode
            _activeLink={{ fontWeight: 'bold', color: 'teal.300' }}
          >
            Profile
          </Link>
          <Link
            as={NavLink}
            to="/ride-history"
            _hover={{ textDecoration: 'none', color: colorMode === 'light' ? 'teal.300' : 'teal.500' }} // Change hover color for dark mode
            _activeLink={{ fontWeight: 'bold', color: 'teal.300' }}
          >
            Ride History
          </Link>
          <Link
            as={NavLink}
            to="/payment"
            _hover={{ textDecoration: 'none', color: colorMode === 'light' ? 'teal.300' : 'teal.500' }} // Change hover color for dark mode
            _activeLink={{ fontWeight: 'bold', color: 'teal.300' }}
          >
            Payment
          </Link>
          {/* Dark/Light Mode Toggle */}
          <ThemeToggle />
        </VStack>
      </Box>

      {/* Drawer for mobile sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <Box as="nav" w="250px" h="100vh" bg={sidebarBgColor} color={sidebarTextColor} p={5}>
              <VStack align="start" spacing={4}>
                <Link
                  as={NavLink}
                  to="/booking"
                  onClick={onClose} // Close drawer when link is clicked
                  _hover={{ textDecoration: 'none', color: colorMode === 'light' ? 'teal.300' : 'teal.500' }} // Change hover color for dark mode
                  _activeLink={{ fontWeight: 'bold', color: 'teal.600' }}
                >
                  Book a Ride
                </Link>
                <Link
                  as={NavLink}
                  to="/profile"
                  onClick={onClose}
                  _hover={{ textDecoration: 'none', color: colorMode === 'light' ? 'teal.300' : 'teal.500' }} // Change hover color for dark mode
                  _activeLink={{ fontWeight: 'bold', color: 'teal.600' }}
                >
                  Profile
                </Link>
                <Link
                  as={NavLink}
                  to="/ride-history"
                  onClick={onClose}
                  _hover={{ textDecoration: 'none', color: colorMode === 'light' ? 'teal.300' : 'teal.500' }} // Change hover color for dark mode
                  _activeLink={{ fontWeight: 'bold', color: 'teal.600' }}
                >
                  Ride History
                </Link>
                <Link
                  as={NavLink}
                  to="/payment"
                  onClick={onClose}
                  _hover={{ textDecoration: 'none', color: colorMode === 'light' ? 'teal.300' : 'teal.500' }} // Change hover color for dark mode
                  _activeLink={{ fontWeight: 'bold', color: 'teal.600' }}
                >
                  Payment
                </Link>
                {/* Dark/Light Mode Toggle for mobile */}
                <ThemeToggle />
              </VStack>
            </Box>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Sidebar;
