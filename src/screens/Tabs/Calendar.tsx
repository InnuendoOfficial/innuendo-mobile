import React, { useState } from 'react';
import ScreenView from "../../components/ScreenView";
import ScrollScreenView from '../../components/ScrollScreenView';
import { DateData } from 'react-native-calendars/src/types';
import { Heading, Spinner, VStack } from "native-base";
import EndoCalendar from "../../components/Calendar/EndoCalendar";
import DayReport from "../../components/Calendar/DayReport";
import useReports from '../../hooks/useReports';
import NetworkView from '../../components/NetworkView';


function CalendarScreen() {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<DateData>({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
    timestamp: today.getTime(),
    dateString: today.toISOString().substring(0, 10)
  })
  const { data, isLoading, refetch } = useReports()
  const reports = data?.data || []
  const selectedReport = reports?.find(report =>
    report.date.substring(0, 10) === selectedDate.dateString
  )

  const Calendar = () => (
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

  // console.log(reports)
  return (
    <ScrollScreenView>
      <Heading fontSize="4xl" alignSelf="flex-start">
        Calendrier
      </Heading>
      <NetworkView
        isLoading={isLoading}
        skeleton={<Spinner accessibilityLabel="Chargement de vos rapports..." />}
        data={data}
        errorTitle="Erreur pendant le chargement du calendrier"
        refetch={refetch}
        render={<Calendar />}
      />
    </ScrollScreenView>
  )
}

export default CalendarScreen