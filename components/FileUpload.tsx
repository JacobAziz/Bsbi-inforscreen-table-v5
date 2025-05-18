'use client';

import { useCallback } from 'react';
import { Box, Button, Text, useToast, VStack } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { parseExcelFile } from '@/lib/parseExcel';
import { ProcessedTimetableRow } from '@/types/timetable';

interface FileUploadProps {
  onFileProcessed: (rows: ProcessedTimetableRow[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileProcessed }) => {
  const toast = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const rows = await parseExcelFile(file);
      onFileProcessed(rows);
      toast({
        title: 'File uploaded successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error processing file',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      });
    }
  }, [onFileProcessed, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
  });

  return (
    <Box
      {...getRootProps()}
      p={6}
      border="2px dashed"
      borderColor={isDragActive ? 'blue.400' : 'gray.200'}
      borderRadius="lg"
      bg={isDragActive ? 'blue.50' : 'white'}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        borderColor: 'blue.400',
        bg: 'blue.50',
      }}
    >
      <input {...getInputProps()} />
      <VStack spacing={2}>
        <Text fontSize="lg" fontWeight="medium">
          {isDragActive ? 'Drop the file here' : 'Drag & drop your Excel file here'}
        </Text>
        <Text color="gray.500">or click to select a file</Text>
      </VStack>
    </Box>
  );
}; 