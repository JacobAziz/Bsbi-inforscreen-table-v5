'use client';

import { Box, Image, Flex, Text } from '@chakra-ui/react';

interface BSBILogoProps {
  isLightBackground?: boolean;
}

export const BSBILogo = ({ isLightBackground = false }: BSBILogoProps) => {
  return (
    <Flex 
      direction="column"
      justifyContent="center" 
      alignItems="center"
      height={["130px", "180px", "240px"]}
    >
      <Box position="relative">
        <Image 
          src="/images/BSBI-Logo.png" 
          alt="BSBI Logo" 
          height={["80px", "120px", "160px"]} 
          width="auto"
          objectFit="contain"
          filter={isLightBackground ? "none" : "brightness(0) invert(1)"}
        />
        <Text
          fontSize={["5px", "7px", "9px"]}
          fontWeight="medium"
          color={isLightBackground ? "black" : "white"}
          textAlign="center"
          position="absolute"
          left="50%"
          top="70%"
          transform="translateX(-29.5%)"
          whiteSpace="nowrap"
        >
          Berlin School of Business & Innovation
        </Text>
      </Box>
    </Flex>
  );
}; 