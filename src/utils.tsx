// types.tsx
/**
 * Store the untils functions for the app.
 */

import mockReports from "./mock/reports"
import Report from "./types"

/**
 * This function return all the mock reports.
 * @returns 
 */
function getReports(): Report[] {
  return mockReports
}
/**
 * Get the report specified by dateString.
 * @param dateString ex: 2022-01-08
 * @returns 
 */
function getReport(dateString: string): Report | undefined {
  return mockReports.find(report => report.date === dateString)
}
/**
 * Get the last report.
 * @returns 
 */

function getLastReport(): Report | undefined {
  return (mockReports.length !== 0 ?
    mockReports.reduce((prev, cur) =>
      new Date(prev.date).getTime() < new Date(cur.date).getTime() ? cur : prev
    ) : undefined
  )
}

/**
 * Add or edit a report from the mockReports list.
 * @param report 
 */
function addOrEditReport(report: Report): void {
  if (getReport(report.date) != undefined) {
    deleteReport(report.date)
  }
  mockReports.push(report)
}

/**
 * Delete the report specified by dateString.
 * @param dateString ex: 2022-01-08
 */
function deleteReport(dateString: string): void {
  mockReports.splice(mockReports.findIndex(
    report => report.date === dateString
  ), 1)
}

/**
 * Convert a date to a date string
 * @param date dateObject
 * @returns 
 */
function dateToDateString(date: Date): string {
  return date.toISOString().substring(0, 10)
}

export {
  getReports,
  getReport,
  getLastReport,
  addOrEditReport,
  deleteReport,
  dateToDateString
}