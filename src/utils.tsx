import mockReports from "./mock/reports"
import Report from "./types"

function getReports(): Report[] {
  return mockReports
}

function getReport(dateString: string): Report | undefined {
  return mockReports.find(report => report.date === dateString)
}

function getLastReport(): Report | undefined {
  return (mockReports.length !== 0 ?
    mockReports.reduce((prev, cur) =>
      new Date(prev.date).getTime() < new Date(cur.date).getTime() ? cur : prev
    ) : undefined
  )
}

function addOrEditReport(report: Report): void {
  if (getReport(report.date) != undefined) {
    deleteReport(report.date)
  }
  mockReports.push(report)
}

function deleteReport(dateString: string): void {
  mockReports.splice(mockReports.findIndex(
    report => report.date === dateString
  ), 1)
}

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