export const updatedObject = (oldObject, updatedProperties) => {
  return { ...oldObject, ...updatedProperties };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  const trimedValue = value.trim();

  if (rules.required) {
    isValid = trimedValue !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = trimedValue.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = trimedValue.length <= rules.maxLength && isValid;
  }
  if (rules.email) {
    const regexp = new RegExp(
      '[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+'
    );
    isValid = regexp.test(trimedValue) && isValid;
  }
  return isValid;
};
