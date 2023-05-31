import axiosAPI from "./config";

const sendFeedback = async (feedback: string) => axiosAPI({
  method: "GET",
  url: "/feedback",
  data: feedback
})

export { sendFeedback }