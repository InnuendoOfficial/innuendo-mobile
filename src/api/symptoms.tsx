import axiosAPI from "./config";

type APISymptomType = {
  id: number;
  name: string;
  unit_measure: "int" | "string";
  created_at: string;
  updated_at: string;
};

const getSymptoms = async () =>
  axiosAPI<APISymptomType[]>({
    method: "GET",
    url: "/symptom_types",
  });

type SharedSymptom = {
  symptom_id: number;
  showable: boolean;
};

const shareSymptoms = async (sharedSymptoms: SharedSymptom[]) =>
  axiosAPI({
    method: "POST",
    url: "/code",
    data: {
      preferences: [...sharedSymptoms],
    },
  });

export type { APISymptomType };
export { getSymptoms, shareSymptoms };
