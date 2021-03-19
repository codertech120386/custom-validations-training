module.exports = {
  required: (fieldName, value, args) => {
    // first_name: "adsdf"
    if (value?.trim().length > 0) {
      return [true, null]; // [isValid, errors]
    }
    return [false, `${fieldName} is required`]; // "first_name is required"
  },
  email: (fieldName, value, args) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return [true, null]; // [isValid, errors]
    }
    return [false, `Please enter a valid ${fieldName}`];
  },
  // minLength:3:characters
  minLength: (fieldName, value, args) => {
    console.log("fieldName, value, args", fieldName, value, args);
    const [_, length, unit] = args;
    if (value?.trim().length >= length) {
      return checkUnitValidation(fieldName, value, unit);
    }
    return [false, `${fieldName} should be at least ${length} ${unit} long`];
  },
};

function checkUnitValidation(fieldName, value, unit) {
  if (unit === "digits") {
    return checkDigitsValidation(fieldName, value, unit);
  }
  return [true, null];
}

function checkDigitsValidation(fieldName, value, unit) {
  if (/^[0-9]*$/.test(value)) {
    return [true, null]; // [isValid, errors]
  }
  console.log([false, `${fieldName} should consist of only ${unit}`]);
  return [false, `${fieldName} should consist of only ${unit}`];
}
