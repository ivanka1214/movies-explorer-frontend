import React, { useCallback } from "react";

export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleValue = (event, user) => {
    if (event.target.value === user) {
      setIsValid(false);
      setErrors({
        ...errors,
        [event.target.name]: "Данные не должны совпадать",
      });
    }
  };
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    const namePattern = /[A-Za-zА-Яа-яЁё\-\s]+$/;
    if (!namePattern.test(values.name)) {
      setErrors({
        ...errors,
        name: "поле Имя содержит только латиницу, кириллицу, пробел или дефис",
      });
      setIsValid(target.closest("form").checkValidity());
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    }
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, handleValue, errors, isValid, resetForm };
}
