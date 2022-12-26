// form title based on add/edit form
export const formTitle = (cat) => (cat === "add" ? "Add New" : "Edit");

// This function handles the error occurred in run/execute testcase or testsuite
// by taking error (object or string) and returns the validated error
export const componentMissingErrors = (error) => {
  let errMsg;
  if (typeof error === "object") {
    if (Array.isArray(error)) {
      errMsg = "You may missed something!";
    } else {
      let [errKey, errValue] = Object.entries(error)[0];
      errValue = Array.isArray(errValue)
        ? errValue.join(",")
        : `You may missed something`;
      errMsg = `${errValue} in ${errKey}`;
    }
  } else {
    errMsg = error;
  }
  return errMsg;
};

// Capital first letter of sentence
export const captitalFiretLetter = (sentence) => {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
};
