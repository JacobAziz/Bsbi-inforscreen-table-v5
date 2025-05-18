'use client';

import React, { forwardRef } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Center,
} from '@chakra-ui/react';
import { TimetableData } from '@/types/timetable';
import { BSBILogo } from './BSBILogo';

interface TimetablePreviewProps {
  data: TimetableData;
}

const getSessionColors = (session: string) => {
  switch (session) {
    case 'Morning':
      return { bg: 'sessions.morning.bg', text: 'sessions.morning.text' };
    case 'Noon':
      return { bg: 'sessions.noon.bg', text: 'sessions.noon.text' };
    case 'Afternoon':
      return { bg: 'sessions.afternoon.bg', text: 'sessions.afternoon.text' };
    default:
      return { bg: 'gray.500', text: 'white' };
  }
};

export const TimetablePreview = forwardRef<HTMLDivElement, TimetablePreviewProps>(
  ({ data }, ref) => {
    const colors = getSessionColors(data.session);
    const isLightBackground = data.session === 'Noon';
    const formattedDate = data.date ? data.date.replace(/\./g, '.') : '';

    return (
      <Box
        ref={ref}
        bg={colors.bg}
        color={colors.text}
        p={0}
        borderRadius="lg"
        width="100%"
        maxW="1200px"
        overflow="hidden"
      >
        <Box py={4} px={8}>
          <Flex justify="space-between" align="center">
            {/* Left - Date */}
            <Box textAlign="left" width="25%">
              <Text fontSize="3xl" fontWeight="bold">
                {formattedDate}
              </Text>
            </Box>
            
            {/* Center - Logo */}
            <Center width="50%">
              <BSBILogo isLightBackground={isLightBackground} />
            </Center>
            
            {/* Right - Session info */}
            <Flex direction="column" textAlign="right" width="25%">
              <Text fontSize="3xl" fontWeight="bold">
                {data.session}
              </Text>
              <Text fontSize="2xl">
                {data.time}
              </Text>
            </Flex>
          </Flex>
        </Box>

        <Table variant="simple" bg="white" color="black" mb={0}>
          <Thead bg="gray.50">
            <Tr>
              <Th width="25%">Program</Th>
              <Th width="25%">Module</Th>
              <Th width="10%">Intake</Th>
              <Th width="25%">Professor</Th>
              <Th width="15%">Room</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.rows.map((row, index) => (
              <Tr key={index}>
                <Td>{row.program}</Td>
                <Td>{row.module}</Td>
                <Td>{row.intake}</Td>
                <Td>{row.professor}</Td>
                <Td>{row.room}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }
);

TimetablePreview.displayName = 'TimetablePreview'; 