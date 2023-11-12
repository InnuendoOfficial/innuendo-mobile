import { useQuery } from "react-query";
import api from "../api";
import { APISymptomType } from "../api/symptoms";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const useSymptoms = () =>
  useQuery("symptoms", async () => await api.symptoms.get(), {
    select: (data) =>
      data.data === null
        ? data
        : {
          ...data,
          data: data.data.map((symptom: APISymptomType) => ({
            ...symptom,
            name: capitalize(symptom.name),
          })),
        }
  });

export default useSymptoms;
