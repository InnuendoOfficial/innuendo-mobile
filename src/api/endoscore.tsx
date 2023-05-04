import axiosAPI from "./config";

type APIEndoscore = {
  id: Number,
  score: Number,
  user_id: Number,
  created_at: string,
}

const getEndoscore = async () => axiosAPI.request<APIEndoscore>({
  method: "GET",
  url: "/endoscores/current",
})


const createEndoscore = async () => axiosAPI.request<APIEndoscore>({
  method: "POST",
  url: "/endoscores",
})

export { getEndoscore, createEndoscore }