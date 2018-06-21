/**
 * # field-validation.js
 */

/**
 * ## Imports
 *
 * validate and underscore
 *
 */
import validate from 'validate.js';
import _ from 'underscore';

const firstNameConstraints = {
  firstName: {
    format: {
      pattern: /[a-zA-Z ]+/,
      flags: 'i',
      message: 'solo puede contener letras',
    },
    length: {
      minimum: 2,
      maximum: 50,
      tooShort: 'debe tener al menos %{count} o más',
      tooLong: 'debe tener menos de %{count}',
    },
  },
};

const lastNameConstraints = {
  lastName: {
    format: {
      pattern: /[a-zA-Z ]+/,
      flags: 'i',
      message: 'solo puede contener letras',
    },
    length: {
      minimum: 2,
      maximum: 50,
      tooShort: 'debe tener al menos %{count} o más',
      tooLong: 'debe tener menos de %{count}',
    },
  },
};

const addressConstraints = {
  address: {
    length: {
      minimum: 2,
      maximum: 75,
      tooShort: 'debe tener al menos %{count} o más',
      tooLong: 'debe tener menos de %{count}',
    },
  },
};

const phoneConstraints = {
  phone: {
    format: {
      pattern: /^\+?[0-9]{1,}[0-9\-]{6,15}$/,
      flags: 'g',
      message: 'formato válido use solo números o el caracter "+"',
    },
  },
};

const birthdayConstraints = {
  birthday: {
    datetime: {
      dateOnly: true,
    },
  },
};

const documentNumberConstraints = {
  documentNumber: {
    numericality: {
      onlyInteger: true,
      greaterThan: 10000000,
      lessThanOrEqualTo: 100000000,
    },
  },
};

/**
 * ## Field Validation
 * @param {Object} state Redux state
 * @param {Object} action type & payload
 */
export default function (state, action) {
  const { field, value } = action.payload;

  switch (field) {
    case ('firstName'):
    {
      const validFirstName = _.isUndefined(validate({
        firstName: value,
      }, firstNameConstraints));

      if (validFirstName) {
        return {
          ...state,
          fields: {
            ...state.fields,
            firstNameHasError: false,
            firstNameErrorMsg: '',
          },
        };
      }

      console.log(validFirstName);
      return {
        ...state,
        fields: {
          ...state.fields,
          firstNameHasError: true,
          firstNameErrorMsg: 'El nombre es incorrecto',
        },
      };
    }

    case ('lastName'):
    {
      const validLastName = _.isUndefined(validate({
        lastName: value,
      }, lastNameConstraints));

      if (validLastName) {
        return {
          ...state,
          fields: {
            ...state.fields,
            lastNameHasError: false,
            lastNameErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          lastNameHasError: true,
          lastNameErrorMsg: 'El apellido es incorrecto',
        },
      };
    }

    case ('address'):
    {
      const validAddress = _.isUndefined(validate({
        address: value,
      }, addressConstraints));

      if (validAddress) {
        return {
          ...state,
          fields: {
            ...state.fields,
            addressHasError: false,
            addressErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          addressHasError: true,
          addressErrorMsg: 'La dirección es incorrecta',
        },
      };
    }

    case ('phone'):
    {
      const validPhone = _.isUndefined(validate({
        phone: value,
      }, phoneConstraints));

      if (validPhone) {
        return {
          ...state,
          fields: {
            ...state.fields,
            phoneHasError: false,
            phoneErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          phoneHasError: true,
          phoneErrorMsg: 'El teléfono es incorrecto',
        },
      };
    }

    case ('birthday'):
    {
      const validBirthday = _.isUndefined(validate({
        birthday: value,
      }, birthdayConstraints));

      if (validBirthday) {
        return {
          ...state,
          fields: {
            ...state.fields,
            birthdayHasError: false,
            birthdayErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          birthdayHasError: true,
          birthdayErrorMsg: 'La fecha es incorrecta',
        },
      };
    }

    case ('documentNumber'):
    {
      const validDocumentNumber = _.isUndefined(validate({
        documentNumber: value,
      }, documentNumberConstraints));

      if (validDocumentNumber) {
        return {
          ...state,
          fields: {
            ...state.fields,
            documentNumberHasError: false,
            documentNumberErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          documentNumberHasError: true,
          documentNumberErrorMsg: 'Número de documento invalido',
        },
      };
    }
  }

  return state;
}
