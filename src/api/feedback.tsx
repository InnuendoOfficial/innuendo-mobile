import axiosAPI from "./config";

const sendFeedback = async (feedback: string) =>
  axiosAPI({
    method: "POST",
    url: "/mail/send/team",
    data: {
      type: "contact",
      text: feedback,
    },
  });

export { sendFeedback };
