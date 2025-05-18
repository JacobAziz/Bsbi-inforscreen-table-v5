'use client';

import { useState, useRef } from 'react';
import { Container, VStack, Box, Heading, Divider } from '@chakra-ui/react';
import { FileUpload } from '@/components/FileUpload';
import { SessionSelector } from '@/components/SessionSelector';
import { TimetablePreview } from '@/components/TimetablePreview';
import { DownloadButtons } from '@/components/DownloadButtons';
import { ProcessedTimetableRow, TimetableData } from '@/types/timetable';

export default function Home() {
  const [timetableData, setTimetableData] = useState<TimetableData>({
    session: 'Morning',
    time: '08:00',
    date: '',
    rows: [],
  });

  const timetableRef = useRef<HTMLDivElement>(null);

  const handleFileProcessed = (rows: ProcessedTimetableRow[]) => {
    setTimetableData(prev => ({
      ...prev,
      rows,
    }));
  };

  const isTimetableConfigured = timetableData.rows.length > 0 && timetableData.date !== '';

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box w="100%" maxW="600px" mx="auto">
          <FileUpload onFileProcessed={handleFileProcessed} />
        </Box>

        {timetableData.rows.length > 0 && (
          <>
            <Divider my={4} />
            <Heading as="h2" size="md" textAlign="center">Timetable Configuration</Heading>
            
            <Box w="100%" maxW="400px" mx="auto">
              <SessionSelector
                session={timetableData.session}
                time={timetableData.time}
                date={timetableData.date}
                onSessionChange={(session) =>
                  setTimetableData(prev => ({ ...prev, session }))
                }
                onTimeChange={(time) =>
                  setTimetableData(prev => ({ ...prev, time }))
                }
                onDateChange={(date) =>
                  setTimetableData(prev => ({ ...prev, date }))
                }
              />
            </Box>

            {isTimetableConfigured && (
              <>
                <Divider my={4} />
                <Heading as="h2" size="md" textAlign="center">Timetable Preview</Heading>
                
                <TimetablePreview
                  ref={timetableRef}
                  data={timetableData}
                />

                <Box textAlign="center" mt={4}>
                  <DownloadButtons
                    timetableRef={timetableRef}
                    data={timetableData}
                  />
                </Box>
              </>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
} 