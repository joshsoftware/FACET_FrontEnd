// helper function to filter backend apis error message if api fails
export const apisErrorMessage = (err) => {
  const {
    data: { error },
  } = err;
  const commonErr = "Something Went Wrong!";

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
          errValue = typeof errValue === "string" ? errValue : commonErr;
          return `${errValue} in ${errKey}`;
        }
        return commonErr;

      default:
        return commonErr;
    }
  }
  return commonErr;
};
