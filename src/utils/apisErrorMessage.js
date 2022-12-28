import { COMMON_ERROR_MESSAGE } from "constants/userMessagesConstants";

// helper function to filter backend apis error message if api fails
export const apisErrorMessage = (err) => {
  const error = err.data?.error;

  if (error) {
    switch (typeof error) {
      case "string":
        return error;

      case "object":
        if (Array.isArray(error)) {
          if (typeof error[0] !== "object") {
            return error.join(",");
          }
        } else {
          let [errKey, errValue] = Object.entries(error)[0];
          errValue =
            typeof errValue === "string" ? errValue : COMMON_ERROR_MESSAGE;
          return `${errValue} in ${errKey}`;
        }
        return COMMON_ERROR_MESSAGE;

      default:
        return COMMON_ERROR_MESSAGE;
    }
  }
  return COMMON_ERROR_MESSAGE;
};
