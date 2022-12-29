import axiosAPI from "./config";

type Symptom = {
  id: Number,
  name: string,
  unit_measure: "int" | "string",
  created_at: string,
  updated_at: string
}

const getSymptoms = async () => axiosAPI<Symptom[]>({
  method: "GET",
  url: "/symptom_types",
})

type SharedSymptom = {
  symptom_id: Number,
  showable: boolean
}

const shareSymptoms = async (sharedSymptoms: SharedSymptom[]) => axiosAPI({
  method: "POST",
  url: "/code",
  data: {
    preferences: [
      ...sharedSymptoms
    ]
  }
})

export { getSymptoms, shareSymptoms }