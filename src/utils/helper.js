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

// helps to build dyanamic url by replacing :key with value
export const buildRoute = (message, interpolationObject) => {
  try {
    Object.entries(interpolationObject).forEach(([key, value]) => {
      message = message.replace(":" + key, value.toString());
    });
  } catch (error) {
    console.error(
      "error while setting values to string: ",
      message,
      " with object: ",
      interpolationObject,
      "error: ",
      error
    );
  }
  return message;
};

// help to validate email
export const validateEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

// helps to truncate text
export const truncate = (text, length = 100) =>
  text?.length > length ? text.slice(0, length) + "..." : text;
