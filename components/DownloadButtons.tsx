'use client';

import React, { useState } from 'react';
import { Button, HStack, useToast, Tooltip, Text, VStack } from '@chakra-ui/react';
import { toPng } from 'html-to-image';
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
  const [isDownloading, setIsDownloading] = useState<'png' | 'pdf' | 'excel' | null>(null);

  const downloadAsPNG = async () => {
    if (!timetableRef.current) return;
    
    setIsDownloading('png');
    try {
      const dataUrl = await toPng(timetableRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
        imagePlaceholder: '/images/BSBI-Logo.png',
        fetchRequestInit: { cache: 'no-cache' },
      });
      
      const link = document.createElement('a');
      link.download = `timetable-${data.session.toLowerCase()}-${data.date}.png`;
      link.href = dataUrl;
      link.click();

      toast({
        title: 'PNG downloaded successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error downloading PNG',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsDownloading(null);
    }
  };

  const downloadAsPDF = async () => {
    if (!timetableRef.current) return;

    setIsDownloading('pdf');
    try {
      const dataUrl = await toPng(timetableRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
        canvasWidth: timetableRef.current.scrollWidth,
        canvasHeight: timetableRef.current.scrollHeight,
        imagePlaceholder: '/images/BSBI-Logo.png',
        fetchRequestInit: { cache: 'no-cache' },
      });
      
      const imageBytes = await fetch(dataUrl).then(res => res.arrayBuffer());
      
      const pdfDoc = await PDFDocument.create();
      
      const timetableWidth = timetableRef.current.scrollWidth;
      const timetableHeight = timetableRef.current.scrollHeight;
      
      const pageWidth = 842;
      const pageHeight = Math.floor((pageWidth / timetableWidth) * timetableHeight);
      
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      const image = await pdfDoc.embedPng(imageBytes);
      
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      const maxHeight = pageHeight - (margin * 2);
      
      const scale = Math.min(
        maxWidth / image.width,
        maxHeight / image.height
      );
      
      const scaledWidth = image.width * scale;
      const scaledHeight = image.height * scale;
      
      const x = (pageWidth - scaledWidth) / 2;
      const y = (pageHeight - scaledHeight) / 2;
      
      page.drawImage(image, {
        x,
        y,
        width: scaledWidth,
        height: scaledHeight,
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = `timetable-${data.session.toLowerCase()}-${data.date}.pdf`;
      link.href = url;
      link.click();

      toast({
        title: 'PDF downloaded successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error downloading PDF',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      });
    } finally {
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
          colorScheme="blue" 
          onClick={downloadAsPNG}
          isLoading={isDownloading === 'png'}
          loadingText="Downloading"
        >
          Download PNG
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
          label="You can edit this Excel file and re-upload it to create new PDFs/PNGs" 
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
        Pro tip: Download Excel, make changes, then re-upload to create a new PDF or PNG
      </Text>
    </VStack>
  );
}; 