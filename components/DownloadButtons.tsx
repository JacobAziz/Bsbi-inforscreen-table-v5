'use client';

import React, { useState } from 'react';
import { Button, HStack, useToast, Tooltip, Text, VStack } from '@chakra-ui/react';
import { toPng, toCanvas } from 'html-to-image';
import { PDFDocument, rgb } from 'pdf-lib';
import { utils, write } from 'xlsx';
import { TimetableData } from '@/types/timetable';

interface DownloadButtonsProps {
  timetableRef: React.RefObject<HTMLDivElement>;
  data: TimetableData;
}

export const DownloadButtons: React.FC<DownloadButtonsProps> = ({
  timetableRef,
  data,
}) => {
  const toast = useToast();
  const [isDownloading, setIsDownloading] = useState<'pdf' | 'excel' | 'jpg' | null>(null);

  const downloadAsJPG = async () => {
    if (!timetableRef.current) return;
    
    setIsDownloading('jpg');
    try {
      // Info screen dimensions (portrait mode) - Increased height for complete table
      const infoScreenWidth = 1080;
      const infoScreenHeight = 2400; // Increased to ensure complete table fits
      
      // Create a styled clone with DIRECT HEX COLORS (no theme references)
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = `${infoScreenWidth}px`;
      tempDiv.style.height = `${infoScreenHeight}px`;
      document.body.appendChild(tempDiv);
      
      // Clone the timetable content
      const clone = timetableRef.current.cloneNode(true) as HTMLElement;
      
      // Apply DIRECT styling with hex colors (bypass theme)
      clone.style.width = `${infoScreenWidth}px`;
      clone.style.height = `${infoScreenHeight}px`;
      clone.style.backgroundColor = getBackgroundColor(data.session);
      clone.style.fontFamily = 'system-ui, sans-serif';
      clone.style.color = data.session === 'Noon' ? '#000000' : '#ffffff';
      
      // REFINED ROW COLOR FIX - More stable approach
      console.log('Starting refined row color fix...');
      
      // First, remove all existing background colors to avoid conflicts
      const allElements = clone.querySelectorAll('*');
      allElements.forEach((element: any) => {
        if (element.style) {
          element.style.removeProperty('background-color');
          element.style.removeProperty('background');
        }
      });
      
      // Set the main container background
      clone.style.setProperty('background-color', getBackgroundColor(data.session), 'important');
      
      // Find data rows by looking for the timetable structure
      const timetableContainer = clone.querySelector('.timetable-container');
      if (timetableContainer) {
        // Get all Grid elements that are likely data rows
        const allGrids = Array.from(timetableContainer.children);
        const dataRows: HTMLElement[] = [];
        
        allGrids.forEach((element: any) => {
          // Skip header, logo, and divider elements
          if (element.className && element.className.includes('css-') && 
              !element.className.includes('timetable-header') &&
              !element.className.includes('logo-container')) {
            
            // Check if it has 5 children (the 5 columns)
            const directChildren = Array.from(element.children);
            if (directChildren.length === 5) {
              // Verify it contains program data by checking first child content
              const firstChild = directChildren[0] as HTMLElement;
              const text = firstChild.textContent?.trim();
              if (text && (text.includes('MSc') || text.includes('BSc') || text.includes('MBA') || text.includes('Global') || text.includes('MA ') || text.includes('DBA'))) {
                dataRows.push(element as HTMLElement);
              }
            }
          }
        });
        
        console.log(`Found ${dataRows.length} data rows`);
        
        // Apply consistent alternating colors
        dataRows.forEach((row, index) => {
          const isEven = index % 2 === 0;
          const bgColor = isEven ? '#FFFFFF' : '#DCDCDC'; // Pure white and light gray
          
          console.log(`Row ${index}: ${isEven ? 'White' : 'Light Gray'} - ${bgColor}`);
          
          // Apply to the row itself
          row.style.setProperty('background-color', bgColor, 'important');
          row.style.setProperty('background', bgColor, 'important');
          
          // Apply to all direct children (GridItems)
          Array.from(row.children).forEach((child: any) => {
            child.style.setProperty('background-color', bgColor, 'important');
            child.style.setProperty('background', bgColor, 'important');
            child.style.setProperty('color', '#000000', 'important');
            
            // Apply to text elements inside
            const textElements = child.querySelectorAll('*');
            textElements.forEach((textEl: any) => {
              textEl.style.setProperty('background-color', bgColor, 'important');
              textEl.style.setProperty('background', bgColor, 'important');
              textEl.style.setProperty('color', '#000000', 'important');
            });
          });
        });
      }
      
      tempDiv.appendChild(clone);
      
      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Capture with maximum quality
      const canvas = await toCanvas(clone, {
        quality: 1.0,
        pixelRatio: 2, // 2x for crisp text
        width: infoScreenWidth,
        height: infoScreenHeight,
        cacheBust: true,
        skipAutoScale: true,
        backgroundColor: getBackgroundColor(data.session),
        style: {
          width: `${infoScreenWidth}px`,
          height: `${infoScreenHeight}px`,
          fontFamily: 'system-ui, sans-serif',
        }
      });
      
      // Create final canvas with exact dimensions
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = infoScreenWidth;
      finalCanvas.height = infoScreenHeight;
      
      const ctx = finalCanvas.getContext('2d');
      if (ctx) {
        // Enable high-quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Fill background
        ctx.fillStyle = getBackgroundColor(data.session);
        ctx.fillRect(0, 0, infoScreenWidth, infoScreenHeight);
        
        // Draw the captured canvas
        ctx.drawImage(canvas, 0, 0, infoScreenWidth, infoScreenHeight);
        
        // Export as maximum quality JPEG
        const dataUrl = finalCanvas.toDataURL('image/jpeg', 1.0);
        const link = document.createElement('a');
        link.download = `timetable-${data.session.toLowerCase()}-${data.date}.jpg`;
        link.href = dataUrl;
        link.click();
        
        // Cleanup
        document.body.removeChild(tempDiv);
        
        toast({
          title: 'High-Quality JPG downloaded successfully',
          description: 'Crisp image sized to 1080x1920 for info screens',
          status: 'success',
          duration: 3000,
        });
        
        setIsDownloading(null);
      } else {
        throw new Error('Could not get canvas context');
      }
    } catch (error) {
      console.error('JPG Export Error:', error);
      toast({
        title: 'Error downloading JPG',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      });
      setIsDownloading(null);
    }
  };

  // Helper function to get the background color based on session
  const getBackgroundColor = (session: string): string => {
    switch (session) {
      case 'Morning':
        return '#4a7fcb'; // Morning blue
      case 'Noon':
        return '#F7B32B'; // Noon yellow
      case 'Afternoon':
        return '#1A365D'; // Afternoon dark blue
      default:
        return '#4a7fcb'; // Default to morning blue
    }
  };

  const downloadAsPDF = async () => {
    if (!timetableRef.current) return;

    setIsDownloading('pdf');
    try {
      // Info screen dimensions (portrait mode) - SAME AS JPG
      const infoScreenWidth = 1080;
      const infoScreenHeight = 2400; // Increased to ensure complete table fits
      
      // Create a styled clone with DIRECT HEX COLORS (same as JPG)
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = `${infoScreenWidth}px`;
      tempDiv.style.height = `${infoScreenHeight}px`;
      document.body.appendChild(tempDiv);
      
      // Clone the timetable content
      const clone = timetableRef.current.cloneNode(true) as HTMLElement;
      
      // Apply DIRECT styling with hex colors (bypass theme)
      clone.style.width = `${infoScreenWidth}px`;
      clone.style.height = `${infoScreenHeight}px`;
      clone.style.backgroundColor = getBackgroundColor(data.session);
      clone.style.fontFamily = 'system-ui, sans-serif';
      clone.style.color = data.session === 'Noon' ? '#000000' : '#ffffff';
      
      // REFINED ROW COLOR FIX - More stable approach (same as JPG)
      console.log('Starting refined row color fix for PDF...');
      
      // First, remove all existing background colors to avoid conflicts
      const allElements = clone.querySelectorAll('*');
      allElements.forEach((element: any) => {
        if (element.style) {
          element.style.removeProperty('background-color');
          element.style.removeProperty('background');
        }
      });
      
      // Set the main container background
      clone.style.setProperty('background-color', getBackgroundColor(data.session), 'important');
      
      // Find data rows by looking for the timetable structure
      const timetableContainer = clone.querySelector('.timetable-container');
      if (timetableContainer) {
        // Get all Grid elements that are likely data rows
        const allGrids = Array.from(timetableContainer.children);
        const dataRows: HTMLElement[] = [];
        
        allGrids.forEach((element: any) => {
          // Skip header, logo, and divider elements
          if (element.className && element.className.includes('css-') && 
              !element.className.includes('timetable-header') &&
              !element.className.includes('logo-container')) {
            
            // Check if it has 5 children (the 5 columns)
            const directChildren = Array.from(element.children);
            if (directChildren.length === 5) {
              // Verify it contains program data by checking first child content
              const firstChild = directChildren[0] as HTMLElement;
              const text = firstChild.textContent?.trim();
              if (text && (text.includes('MSc') || text.includes('BSc') || text.includes('MBA') || text.includes('Global') || text.includes('MA ') || text.includes('DBA'))) {
                dataRows.push(element as HTMLElement);
              }
            }
          }
        });
        
        console.log(`Found ${dataRows.length} data rows for PDF`);
        
        // Apply consistent alternating colors
        dataRows.forEach((row, index) => {
          const isEven = index % 2 === 0;
          const bgColor = isEven ? '#FFFFFF' : '#DCDCDC'; // Pure white and light gray
          
          console.log(`PDF Row ${index}: ${isEven ? 'White' : 'Light Gray'} - ${bgColor}`);
          
          // Apply to the row itself
          row.style.setProperty('background-color', bgColor, 'important');
          row.style.setProperty('background', bgColor, 'important');
          
          // Apply to all direct children (GridItems)
          Array.from(row.children).forEach((child: any) => {
            child.style.setProperty('background-color', bgColor, 'important');
            child.style.setProperty('background', bgColor, 'important');
            child.style.setProperty('color', '#000000', 'important');
            
            // Apply to text elements inside
            const textElements = child.querySelectorAll('*');
            textElements.forEach((textEl: any) => {
              textEl.style.setProperty('background-color', bgColor, 'important');
              textEl.style.setProperty('background', bgColor, 'important');
              textEl.style.setProperty('color', '#000000', 'important');
            });
          });
        });
      }
      
      tempDiv.appendChild(clone);
      
      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Capture with maximum quality (same as JPG)
      const canvas = await toCanvas(clone, {
        quality: 1.0,
        pixelRatio: 2, // 2x for crisp text
        width: infoScreenWidth,
        height: infoScreenHeight,
        cacheBust: true,
        skipAutoScale: true,
        backgroundColor: getBackgroundColor(data.session),
        style: {
          width: `${infoScreenWidth}px`,
          height: `${infoScreenHeight}px`,
          fontFamily: 'system-ui, sans-serif',
        }
      });
      
      // Create final canvas with exact dimensions
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = infoScreenWidth;
      finalCanvas.height = infoScreenHeight;
      
      const ctx = finalCanvas.getContext('2d');
      if (ctx) {
        // Enable high-quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Fill background
        ctx.fillStyle = getBackgroundColor(data.session);
        ctx.fillRect(0, 0, infoScreenWidth, infoScreenHeight);
        
        // Draw the captured canvas
        ctx.drawImage(canvas, 0, 0, infoScreenWidth, infoScreenHeight);
        
        // Convert to high-quality PNG for PDF embedding
        const finalDataUrl = finalCanvas.toDataURL('image/png');
        const imageBytes = await fetch(finalDataUrl).then(res => res.arrayBuffer());
        
        // Create PDF with exact 1080x1920 dimensions
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([infoScreenWidth, infoScreenHeight]);
        const image = await pdfDoc.embedPng(imageBytes);
        
        // Draw the image to fill the entire page with perfect quality
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: infoScreenWidth,
          height: infoScreenHeight,
        });
        
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = `timetable-${data.session.toLowerCase()}-${data.date}.pdf`;
        link.href = url;
        link.click();
        
        // Cleanup
        document.body.removeChild(tempDiv);
        URL.revokeObjectURL(url);

        toast({
          title: 'High-Quality PDF downloaded successfully',
          description: 'Crisp PDF sized to 1080x1920 for info screens',
          status: 'success',
          duration: 3000,
        });
        
        setIsDownloading(null);
      } else {
        throw new Error('Could not get canvas context');
      }
    } catch (error) {
      console.error('PDF Export Error:', error);
      toast({
        title: 'Error downloading PDF',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      });
      setIsDownloading(null);
    }
  };

  const downloadAsExcel = () => {
    setIsDownloading('excel');
    try {
      const worksheet = utils.json_to_sheet(data.rows);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Timetable');
      
      // Create and download the file
      const excelBuffer = write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      
      const blob = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = `timetable-${data.session.toLowerCase()}-${data.date}.xlsx`;
      link.href = url;
      link.click();

      toast({
        title: 'Excel file downloaded successfully',
        description: 'You can edit this file and re-upload it to the app',
        status: 'success',
        duration: 4000,
      });
    } catch (error) {
      toast({
        title: 'Error downloading Excel file',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <VStack spacing={4}>
      <HStack spacing={4}>

        <Button 
          colorScheme="purple" 
          onClick={downloadAsJPG}
          isLoading={isDownloading === 'jpg'}
          loadingText="Downloading"
        >
          Download JPG
        </Button>
        <Button 
          colorScheme="green" 
          onClick={downloadAsPDF}
          isLoading={isDownloading === 'pdf'}
          loadingText="Downloading"
        >
          Download PDF
        </Button>
        <Tooltip 
          label="You can edit this Excel file and re-upload it to create new PDFs/JPGs" 
          hasArrow 
          placement="top"
        >
          <Button 
            colorScheme="teal" 
            onClick={downloadAsExcel}
            isLoading={isDownloading === 'excel'}
            loadingText="Downloading"
          >
            Download Excel
          </Button>
        </Tooltip>
      </HStack>
      <Text fontSize="sm" color="gray.600">
        Pro tip: Download Excel, make changes, then re-upload to create a new PDF or JPG
      </Text>
    </VStack>
  );
}; 