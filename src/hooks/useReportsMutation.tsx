import { QueryClient, useMutation } from "react-query"
import api from "../api"
import { APIReport } from "../api/reports";

const useReportMutation = (
  mutation: "create" | "edit" | "delete",
  queryClient: QueryClient
) => useMutation(
  async (report: APIReport) => (
    mutation === "create" ? await api.reports.create(report)
    : mutation === "edit" ? await api.reports.edit(report)
    : await api.reports.delete(report)
  ), {
    onSuccess: () => {
      queryClient.invalidateQueries("reports")
    }
  }
);

export default useReportMutation