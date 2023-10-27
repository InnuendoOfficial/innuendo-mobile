import axiosAPI from "./config";

type APIEndoscore = {
  id: number;
  score: number;
  user_id: number;
  created_at: string;
};

const getEndoscore = async () =>
  axiosAPI<APIEndoscore>({
    method: "GET",
    url: "/endoscores/current",
  });

const createEndoscore = async () =>
  axiosAPI<APIEndoscore>({
    method: "POST",
    url: "/endoscores",
  });

export type { APIEndoscore }
export { getEndoscore, createEndoscore };
