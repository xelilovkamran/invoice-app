import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function useValidateForm(data) {
  const [validationErrors, setValidationErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newValidationErrors = {};
    let newIsValid = true;

    if (!data.description) {
      newValidationErrors.description = "can't be empty";
      newIsValid = false;
    } else {
      delete validationErrors.description;
    }

    if (!data.clientName) {
      newValidationErrors.clientName = "can't be empty";
      newIsValid = false;
    } else {
      delete validationErrors.clientName;
    }

    if (!data.clientEmail || !emailRegex.test(data.clientEmail)) {
      if (emailRegex.test(data.clientEmail)) {
        newValidationErrors.clientEmail = "can't be empty";
      } else {
        newValidationErrors.clientEmail = "invalid email";
      }
      newIsValid = false;
    } else {
      delete validationErrors.clientEmail;
    }

    if (
      !data.senderAddress.street ||
      !data.senderAddress.city ||
      !data.senderAddress.postCode ||
      !data.senderAddress.country
    ) {
      newValidationErrors.senderAddress =
        "Client's address fields can't be empty";
      newIsValid = false;
    } else {
      delete validationErrors.senderAddress;
    }

    if (
      !data.clientAddress.street ||
      !data.clientAddress.city ||
      !data.clientAddress.postCode ||
      !data.clientAddress.country
    ) {
      newValidationErrors.clientAddress =
        "Client's address fields can't be empty";
      newIsValid = false;
    } else {
      delete validationErrors.clientAddress;
    }

    if (!data.items.length) {
      newValidationErrors.items = "At least, has to be one item";
      delete validationErrors.emptyItem;
      newIsValid = false;
    } else {
      delete validationErrors.items;
    }

    data.items.forEach((item) => {
      Object.values(item).forEach((value) => {
        if (!value) {
          newValidationErrors.emptyItem = `Each field of items has to be filled`;
          newIsValid = false;
        } else {
          delete validationErrors.emptyItem;
        }
      });
    });

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      ...newValidationErrors,
    }));
    // setIsValid(!isSubmitted ? false : newIsValid);
    setIsValid(newIsValid);

    // eslint-disable-next-line
  }, [data]);

  return { isValid, validationErrors };
}

useValidateForm.propTypes = {
  data: PropTypes.object.isRequired,
};

export default useValidateForm;
