'use client';

import React from 'react';
import { Button, HStack, useToast } from '@chakra-ui/react';
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

  const downloadAsPNG = async () => {
    if (!timetableRef.current) return;
    
    try {
      const dataUrl = await toPng(timetableRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
        imagePlaceholder: '/images/bsbi-logo.png',
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
    }
  };

  const downloadAsPDF = async () => {
    if (!timetableRef.current) return;

    try {
      const dataUrl = await toPng(timetableRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
        imagePlaceholder: '/images/bsbi-logo.png',
        fetchRequestInit: { cache: 'no-cache' },
      });
      
      const imageBytes = await fetch(dataUrl).then(res => res.arrayBuffer());
      
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([842, 595]); // A4 landscape
      const image = await pdfDoc.embedPng(imageBytes);
      
      const { width, height } = image.scale(0.8);
      page.drawImage(image, {
        x: (842 - width) / 2,
        y: (595 - height) / 2,
        width,
        height,
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
    }
  };

  const downloadAsExcel = () => {
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
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error downloading Excel file',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <HStack spacing={4}>
      <Button colorScheme="blue" onClick={downloadAsPNG}>
        Download PNG
      </Button>
      <Button colorScheme="green" onClick={downloadAsPDF}>
        Download PDF
      </Button>
      <Button colorScheme="teal" onClick={downloadAsExcel}>
        Download Excel
      </Button>
    </HStack>
  );
}; 