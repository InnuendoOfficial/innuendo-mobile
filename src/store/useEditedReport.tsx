import create from "zustand";
import { APIReport, APISymptom } from "../api/reports";

interface EditedReportState {
  report: APIReport,
  editSymptom: (symptom: APISymptom) => void
}

const useEditedReportStore = create<EditedReportState>()((set) => ({
  report: {
    id: 0,
    date: new Date().toISOString(),
    user_id: 0,
    symptoms: []
  },
  editSymptom: (symptom) => set((state) => ({
    report: {
      ...state.report,
      symptoms: [
        ...state.report.symptoms.filter(existingSymptom => existingSymptom.id !== symptom.id),
        symptom
      ]
    }
  }))
}))

export default useEditedReportStore