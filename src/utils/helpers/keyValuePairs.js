// helps to convert array of objects to object

// @params: [{key: "key1", value: "value1"}]
// @response: {key1: "value1"}
export const convertArrayToObject = (data = []) => {
  if (typeof data === "object" && Array.isArray(data)) {
    return data?.reduce((obj, { key, value }) => ((obj[key] = value), obj), {});
  }
  return {};
};

// @params: accepts key value pair object
// @response: returns array of object {key, value}
export const convertToKeyValuePairsArray = (data = {}) => {
  if (typeof data !== "object" || Array.isArray(data) || data === null) {
    return [{ key: "", value: "" }];
  }
  return Object.entries(data)?.map(([key, value]) => ({
    key,
    value,
  }));
};
