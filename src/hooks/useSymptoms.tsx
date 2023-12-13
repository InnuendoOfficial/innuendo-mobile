import { useQuery } from "react-query";
import api from "../api";

const useSymptoms = () =>
  useQuery("symptoms", async () => await api.symptoms.get());

export default useSymptoms;
