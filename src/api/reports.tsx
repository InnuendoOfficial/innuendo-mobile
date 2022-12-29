import axiosAPI from "./config";

type APISymptom = {
  id: number,
  value: number | string | undefined,
  symptom_type_name: string,
  symptom_type_unit_measure: "int" | "string"
}

type APIReport = {
  id: number,
  date: string,
  user_id: number,
  symptoms: APISymptom[]
}

const createReport = async (report: APIReport) => axiosAPI({
  method: "POST",
  url: "/reports",
  data: {
    indicators: [
      ...report.symptoms.map(symptom => ({
        value: symptom.value,
        symptom_type_id: symptom.id
      }))
    ]
  }
})

const getReports = async () => axiosAPI<APIReport[]>({
  method: "GET",
  url: "/reports",
})

const editReport = async (report: APIReport) => axiosAPI({
  method: "PUT",
  url: "/reports",
  params: {
    id: report.id
  },
  data: report
})

const deleteReport = async (report: APIReport) => axiosAPI({
  method: "DELETE",
  url: "/reports",
  params: {
    id: report.id
  }
})

export type { APISymptom, APIReport }
export { createReport, getReports, editReport, deleteReport }