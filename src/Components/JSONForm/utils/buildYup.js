import * as yup from "yup";

// helps to convert yup validation from schema
const getYupSchemaForField = (output, schema) => {
  if (!schema.type || schema.type === "section") {
    return output;
  }

  const { name, required = false, validations: fieldValidation = {} } = schema;
  const { family, ...validations } = fieldValidation;

  let validator;

  // If family type is not in yup then use default family as string
  if (!family && !yup[family]) {
    validator = yup.string();
  } else {
    validator = yup[family]();
  }

  // If the field is required then called required method of yup for the field
  if (required) {
    validator = validator.required();
  }

  Object.entries(validations || {}).forEach(([key, value]) => {
    // If key field is not in validator then console warning
    if (!validator[key]) {
      console.warn(
        `Warning: ${key} validation not exists in yup validator for validator field "${name}"`
      );
      return;
    }

    /* If the value is not an array then creates the new array so we can pass args into the function
    
     * E.g. If need to pass passed multiple arguments to validator, need to pass in array in schema
     * min: [2, "Error message here"]
    
     * If need to passed single value, so need to pass single value in schema
     * min: 2
    
     */
    const args = Array.isArray(value) ? value : [value];

    validator = validator[key](...args);
  });

  output[name] = validator;
  return output;
};

// helps to build yup validation for the schema
const buildYup = (schema = []) => {
  const output = schema.reduce(getYupSchemaForField, {});
  return yup.object().shape(output);
};

export default buildYup;
