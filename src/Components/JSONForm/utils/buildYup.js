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
    const args = Array.isArray(value) ? [...value] : [value];

    /*
     * The "oneOf" key allows you to validate that a field's value is one of a set of values.
        Ex. fruits: yup.string().oneOf(["apple", "mango"], "Message")

     * If you want to validate a field against another field in the form, you can use yup.ref.
        Ex. yup.ref('fieldName')
    
     * In this schema, the "oneOf" key accepts an array with two elements: an array of values and a message. 
        The array of values can contain references to other fields in the schema by using the prefix "schema." 
        For example: 
          oneOf: [
            [schema.fieldName, "otherValue", "thirdValue"],
            "Message"
          ]

     * For fields that are referenced using the "schema." prefix, the prefix is split at the dot, 
        and a yup ref is created for the referenced field. 
        Other fields are remains same.
     */
    if (key === "oneOf") {
      let enums = args[0] || [];

      enums = enums.map((value) => {
        if (value && value?.includes("schema.")) {
          let field = value.split(".")[1];
          return yup.ref(field);
        }
        return value;
      });

      args[0] = enums;
    }

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
