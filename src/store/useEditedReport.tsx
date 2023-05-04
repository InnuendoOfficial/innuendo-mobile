import { create } from "zustand";
import { APIReport, APISymptom } from "../api/reports";

interface EditedReportState {
  report: APIReport,
  editReport: (report: APIReport) => void,
  editSymptom: (symptom: APISymptom) => void
}

const useEditedReportStore = create<EditedReportState>()((set) => ({
  report: {
    id: 0,
    date: "",
    user_id: 0,
    symptoms: []
  },
  editReport: (report) => set(() => ({
    report: {...report}
  })),
  editSymptom: (symptom) => set((state) => ({
    report: {
      ...state.report,
      symptoms: [
        ...state.report.symptoms.filter(existingSymptom => existingSymptom.symptom_type_name !== symptom.symptom_type_name),
        symptom
      ]
    }
  }))
}))

export default useEditedReportStore