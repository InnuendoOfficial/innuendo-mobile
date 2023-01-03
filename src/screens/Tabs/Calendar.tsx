import React, { useState } from 'react';
import ScreenView from "../../components/ScreenView";
import ScrollScreenView from '../../components/ScrollScreenView';
import { DateData } from 'react-native-calendars/src/types';
import { Heading, Spinner, VStack } from "native-base";
import EndoCalendar from "../../components/Calendar/EndoCalendar";
import DayReport from "../../components/Calendar/DayReport";
import useReports from '../../hooks/useReports';

function CalendarScreen() {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<DateData>({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
    timestamp: today.getTime(),
    dateString: today.toISOString().substring(0, 10)
  })
  const { data, isLoading } = useReports()
  const reports = data?.data
  const selectedReport = reports?.find(report =>
    report.date.substring(0, 10) === selectedDate.dateString
  )

  // console.log(reports)
  return (
    <ScrollScreenView>
      <Heading fontSize="4xl" alignSelf="flex-start">
        Calendrier
      </Heading>
      {
        isLoading ? (
          <Spinner accessibilityLabel="Chargement de vos rapports..." />
        ) : !reports ? (
          <Heading>
            Problème de chargement des rapports
          </Heading>
        ) : (
          <VStack space="2">
            <EndoCalendar
              reports={reports}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <DayReport
              date={selectedDate}
              report={selectedReport}
            />
          </VStack>
        )
      }
    </ScrollScreenView>
  )
}

export default CalendarScreen