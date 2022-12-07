import { toast } from "react-toastify";

// toast messages helper which returns messages with message type
// default type is success
export const toastMessage = (message, type = "success") => {
  return toast(message, { type: type });
};
