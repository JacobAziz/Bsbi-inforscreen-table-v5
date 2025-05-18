'use client';

import React, { forwardRef } from 'react';
import {
  Box,
  Text,
  Flex,
  Center,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react';
import { TimetableData } from '@/types/timetable';
import { BSBILogo } from './BSBILogo';

interface TimetablePreviewProps {
  data: TimetableData;
}

const getSessionColors = (session: string) => {
  switch (session) {
    case 'Morning':
      return { 
        bg: 'sessions.morning.bg', 
        text: 'sessions.morning.text',
        evenRow: 'rgba(255, 255, 255, 0.9)',
        oddRow: 'rgba(220, 220, 220, 0.9)',
      };
    case 'Noon':
      return { 
        bg: 'sessions.noon.bg', 
        text: 'sessions.noon.text',
        evenRow: 'rgba(255, 255, 255, 0.9)',
        oddRow: 'rgba(220, 220, 220, 0.9)',
      };
    case 'Afternoon':
      return { 
        bg: 'sessions.afternoon.bg', 
        text: 'sessions.afternoon.text',
        evenRow: 'rgba(255, 255, 255, 0.9)',
        oddRow: 'rgba(220, 220, 220, 0.9)',
      };
    default:
      return { 
        bg: 'gray.500', 
        text: 'white',
        evenRow: 'rgba(255, 255, 255, 0.9)',
        oddRow: 'rgba(220, 220, 220, 0.9)',
      };
  }
};

// Grid template columns for the timetable - adjusted to give more space to Intake
const gridTemplateColumns = "24% 24% 12% 24% 16%";

export const TimetablePreview = forwardRef<HTMLDivElement, TimetablePreviewProps>(
  ({ data }, ref) => {
    const colors = getSessionColors(data.session);
    const isLightBackground = data.session === 'Noon';
    
    // Format date from YYYY-MM-DD to DD-MM-YYYY
    const formattedDate = data.date ? 
      data.date.split('-').reverse().join('-') : 
      '';

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
        {/* Header section with date, logo, session info */}
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
        
        {/* Horizontal divider between header and table */}
        <Box px={6}>
          <Divider 
            borderWidth="2px" 
            borderColor={isLightBackground ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)"} 
            opacity={0.8}
          />
        </Box>

        {/* Timetable section */}
        <Box px={6} pb={6} pt={4}>
          {/* Header Row */}
          <Grid 
            templateColumns={gridTemplateColumns}
            bg={colors.bg}
            color={colors.text}
            fontWeight="bold"
            borderTopRadius="md"
            textTransform="uppercase"
            letterSpacing="wider"
            p={0}
            mb={0}
          >
            <GridItem p={4} borderRight="2px solid" borderColor={colors.bg} textAlign="left" whiteSpace="nowrap">
              Program
            </GridItem>
            <GridItem p={4} borderRight="2px solid" borderColor={colors.bg} textAlign="left" whiteSpace="nowrap">
              Module
            </GridItem>
            <GridItem p={4} borderRight="2px solid" borderColor={colors.bg} textAlign="left" whiteSpace="nowrap">
              Intake
            </GridItem>
            <GridItem p={4} borderRight="2px solid" borderColor={colors.bg} textAlign="left" whiteSpace="nowrap">
              Professor
            </GridItem>
            <GridItem p={4} textAlign="center" whiteSpace="nowrap">
              Room
            </GridItem>
          </Grid>
          
          {/* Table Rows */}
          {data.rows.map((row, index) => (
            <Grid
              key={index}
              templateColumns={gridTemplateColumns}
              bg={index % 2 === 0 ? colors.evenRow : colors.oddRow}
              color="black"
              p={0}
              borderBottomRadius={index === data.rows.length - 1 ? "md" : 0}
              borderTop={index > 0 ? "none" : undefined}
            >
              <GridItem p={4} borderRight="2px solid" borderColor={colors.bg} textAlign="left">
                {row.program}
              </GridItem>
              <GridItem p={4} borderRight="2px solid" borderColor={colors.bg} textAlign="left">
                {row.module}
              </GridItem>
              <GridItem p={4} borderRight="2px solid" borderColor={colors.bg} textAlign="left">
                {row.intake}
              </GridItem>
              <GridItem p={4} borderRight="2px solid" borderColor={colors.bg} textAlign="left">
                {row.professor}
              </GridItem>
              <GridItem p={4} textAlign="center">
                {row.room}
              </GridItem>
            </Grid>
          ))}
        </Box>
      </Box>
    );
  }
);

TimetablePreview.displayName = 'TimetablePreview'; 