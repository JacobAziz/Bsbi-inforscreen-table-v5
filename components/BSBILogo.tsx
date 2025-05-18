'use client';

import { Box, Image } from '@chakra-ui/react';

interface BSBILogoProps {
  isLightBackground?: boolean;
}

export const BSBILogo = ({ isLightBackground = false }: BSBILogoProps) => {
  // Use the Image component to render the BSBI logo
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      height={["60px", "80px", "100px"]}
    >
      <Image 
        src="/images/bsbi-logo.png" 
        alt="BSBI Logo" 
        height="100%" 
        width="auto"
        objectFit="contain"
        filter={isLightBackground ? "none" : "brightness(0) invert(1)"}
      />
    </Box>
  );
}; 