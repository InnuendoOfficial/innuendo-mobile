import React, { useState } from 'react';
import ScreenView from "../../components/ScreenView";
import { DateData } from 'react-native-calendars/src/types';
import { Heading } from "native-base";
import EndoCalendar from "../../components/Calendar/EndoCalendar";
import DayReport from "../../components/Calendar/DayReport";
import mockReports from '../../mock/reports';
import Report from '../../types'

function CalendarScreen() {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<DateData>({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
    timestamp: today.getTime(),
    dateString: today.toISOString().substring(0, 10)
  })

  const [reports, setReports] = useState<Report[]>(mockReports)
  const reportExists = (dateString: string): boolean => reports.find(report =>
    report.date === dateString
  ) != undefined

  return (
    <ScreenView>
      <Heading>
        Calendar screen
      </Heading>

      <EndoCalendar
        reports={reports}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <DayReport
        date={selectedDate}
        reportExists={reportExists(selectedDate.dateString)}
      />

    </ScreenView>
  )
}

export default CalendarScreen