const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.routefrom = !isEmpty(data.routefrom) ? data.routefrom : "";
  data.routeto = !isEmpty(data.routeto) ? data.routeto : "";
  data.altitude = !isEmpty(data.altitude) ? data.altitude : "";

  // Name checks
  if (Validator.isEmpty(data.altitude)) {
    errors.altitude = "Name field is required";
  }
  // Route
  if (Validator.isEmpty(data.routeto)) {
    errors.routeto = "Name field is required";
  }
  // Route
  if (Validator.isEmpty(data.routefrom)) {
    errors.routefrom = "Name field is required";
  }
  // Name checks
  if (Validator.isEmpty(data.altitude)) {
    errors.altitude = "Name field is required";
  }

  //Routes
  if (Validator.equals(data.routefrom, data.routeto)) {
    errors.routeto = "Routes should not match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
