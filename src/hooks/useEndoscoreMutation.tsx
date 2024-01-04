import { QueryClient, useMutation } from "react-query";
import api from "../api";

const useEndoscoreMutation = (queryClient: QueryClient) =>
  useMutation(async () => await api.endoscore.create(), {
    onSuccess: () => {
      queryClient.invalidateQueries("endoscore");
    },
  });

export default useEndoscoreMutation;
