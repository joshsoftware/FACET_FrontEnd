// It converts JSON data to the string
export const jsonToString = (json, tabSize = 0) =>
  JSON.stringify(json, null, tabSize);

// It converts string to Json if it is valid to parse 
// else it return null and print error in console
export const stringToJson = (stringData) => {
  try {
    const parsedJson = JSON.parse(stringData);
    return parsedJson;
  } catch (error) {
    console.error("Failed to parse string: ", error);
    return null;
  }
};
