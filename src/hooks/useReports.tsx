import { useQuery } from "react-query"
import api, { APIResponse } from "../api"

const useReports = () => useQuery(
  "reports",
  async () => await api.reports.get()
);


export default useReports