const { validateInputs } = require("../utils/helper");

const validator = (validationRules) => {
  return (req, res, next) => {
    // check the inputs
    const errors = validateInputs(validationRules, req.body);
    // isValid, errors: {first_name: [], last_name: []} // isValid = true
    // isValid, errors: {first_name: ["first_name is required"], last_name: []} // isValid = false
    req.errors = errors;
    next();
  };
};

module.exports = validator;
