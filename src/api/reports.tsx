import axiosAPI from "./config";
import Report from '../types'

const createReport = async (report: Report) => axiosAPI({
  method: "POST",
  url: "/report",
  data: report,
})

const getReports = async () => axiosAPI({
  method: "GET",
  url: "/reports",
})

const editReport = async (report: Report) => axiosAPI({
  method: "PATCH",
  url: "/report",
  params: {
    id: report.id
  },
  data: report
})

const deleteReport = async (report: Report) => axiosAPI({
  method: "DELETE",
  url: "/report",
  params: {
    id: report.id
  }
})

export { createReport, getReports, editReport, deleteReport }