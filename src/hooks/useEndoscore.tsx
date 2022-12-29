import { useQuery } from "react-query"
import api from "../api"

const useEndoscore = () => useQuery(
  "endoscore",
  async () => await api.endoscore.get()
)

export default useEndoscore