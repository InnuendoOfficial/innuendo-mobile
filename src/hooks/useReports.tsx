import { useQuery } from "react-query";
import api from "../api";

const useReports = () =>
  useQuery("reports", async () => await api.reports.get());

export default useReports;
