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

const namesRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;

const firstNameConstraints = {
  firstName: {
    presence: true,
    format: {
      pattern: namesRegex,
      flags: 'i',
      message: '^El nombre solo puede contener letras',
    },
    length: {
      minimum: 2,
      maximum: 50,
      tooShort: '^El nombre debe tener al menos %{count} o más',
      tooLong: '^El nombre debe tener menos de %{count}',
    },
  },
};

const lastNameConstraints = {
  lastName: {
    presence:  true,
    format: {
      pattern: namesRegex,
      flags: 'i',
      message: '^El apellido solo puede contener letras',
    },
    length: {
      minimum: 2,
      maximum: 50,
      tooShort: '^El apellido debe tener al menos %{count} o más',
      tooLong: '^El apellido debe tener menos de %{count}',
    },
  },
};

const addressConstraints = {
  address: {
    length: {
      minimum: 2,
      maximum: 75,
      tooShort: '^La dirección debe tener al menos %{count} o más',
      tooLong: '^La dirección debe tener menos de %{count}',
    },
  },
};

const phoneConstraints = {
  phone: {
    format: {
      pattern: /^\+?[0-9]{1,}[0-9\-]{6,15}$/,
      flags: 'g',
      message: '^Formato de teléfono invalido',
    },
  },
};

const birthdayConstraints = {
  birthday: {
    presence: true,
    datetime: {
      dateOnly: true,
    },
  },
};

const documentNumberConstraints = {
  documentNumber: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 1000000,
      lessThanOrEqualTo: 100000000,
      notInteger: '^El número de documento solo puede contener números',
      notValid: '^El número de documento es invalido',
      notGreaterThan: '^El número de documento ingresado es muy chico',
      notLessThanOrEqualTo: '^El número de documento ingresado es muy grande',
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

      const validation = validate({
        firstName: value,
      }, firstNameConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            firstNameHasError: false,
            firstNameErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          firstNameHasError: true,
          firstNameErrorMsg: validation[field][0],
        },
      };
    }

    case ('lastName'):
    {
      const validation = validate({
        lastName: value,
      }, lastNameConstraints);

      if (_.isUndefined(validation)) {
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
          lastNameErrorMsg: validation[field][0],
        },
      };
    }

    case ('address'):
    {
      const validation = validate({
        address: value,
      }, addressConstraints);

      if (_.isUndefined(validation)) {
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
          addressErrorMsg: validation[field][0],
        },
      };
    }

    case ('phone'):
    {
      const validation = validate({
        phone: value,
      }, phoneConstraints);

      if (_.isUndefined(validation)) {
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
          phoneErrorMsg: validation[field][0],
        },
      };
    }

    case ('birthday'):
    {
      const validation = validate({
        birthday: value,
      }, birthdayConstraints);

      if (_.isUndefined(validation)) {
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
          birthdayErrorMsg: validation[field][0],
        },
      };
    }

    case ('documentNumber'):
    {
      const validation= validate({
        documentNumber: value,
      }, documentNumberConstraints);

      if (_.isUndefined(validation)) {
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
          documentNumberErrorMsg: validation[field][0],
        },
      };
    }

    default:
      return state;
  }
}
