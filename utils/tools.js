import { toast } from "react-hot-toast";

export const notify = (message, type) => {
  toast(message, {
    style: {
      background: type === "error" ? "#F87171" : "#34D399",
      color: "#fff",
    },
  });
};
