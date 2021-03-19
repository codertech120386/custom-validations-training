const validations = require("./validations");

// {first_name: ["required"],
// last_name: ["required"],
// email: ["required", "email"],
// gender: ["required", "minLength:3:characters"],
// age: ["required"]}

const validateInputs = (validationRules, requestBody) => {
  let errors = {};

  Object.keys(validationRules).map((fieldName) => {
    // first_name: ["required"]
    errors[fieldName] = [];
    validationRules[fieldName].map((arg) => {
      const argsArray = arg.split(":");
      const functionName = argsArray[0];

      const [result, message] = validations[functionName](
        fieldName,
        requestBody[fieldName],
        argsArray // [minLength, 3, characters] // [required]
      ); //requestBody[rule] => req.body.first_name
      console.log("result, message", result, message);
      if (!result) {
        errors[fieldName].push(message);
      }
      // errors: {first_name: ["first_name is required"]}
    }); //["required"]
  });
  return errors;
};

module.exports = { validateInputs };
