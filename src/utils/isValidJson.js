// helps to check whether is json is valid or not
const isValidJson = (json) => {
  try {
    JSON.parse(json);
  } catch (error) {
    return false;
  }
  return true;
};

export default isValidJson;
