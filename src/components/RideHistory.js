import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

const RideHistory = () => {
  const rideData = [
    { date: '2023-09-01', fare: '$15', driver: 'John Doe' },
    { date: '2023-09-03', fare: '$20', driver: 'Jane Smith' },
  ];

  return (
    <Box maxW={{ base: '90%', md: 'md' }} mx="auto" mt={10}>
      <TableContainer overflowX="auto"> {/* Wrap table in TableContainer for scrolling on small screens */}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Fare</Th>
              <Th>Driver</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rideData.map((ride, index) => (
              <Tr key={index}>
                <Td>{ride.date}</Td>
                <Td>{ride.fare}</Td>
                <Td>{ride.driver}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RideHistory;
