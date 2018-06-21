/**
 * # field-validation.js
 *
 * Define the validation rules for various fields such as email, username,
 * and passwords.  If the rules are not passed, the appropriate
 * message is displayed to the user
 *
 */

/**
 * ## Imports
 *
 * validate and underscore
 *
 */
import validate from 'validate.js';
import _ from 'underscore';

/**
 * ## Email validation setup
 * Used for validation of emails
 */
const emailConstraints = {
  from: {
    presence: true,
    email: {
      message: '^El mail debe ser de la forma `nombre@dominio.com`',
    },
  },
};

/**
 * ## password validation rule
 * read the message... ;)
 */
const passwordPattern = /[a-zA-Z0-9_\-&$+*]+/;
const passwordConstraints = {
  password: {
    presence: true,
    format: {
      pattern: passwordPattern,
      flags: 'i',
      message: '^La contraseña es incorrecta',
    },
    length: {
      minimum: 5,
      maximum: 30,
      tooShort: '^La contraseña debe tener al menos %{count}',
      tooLong: '^La contraseña debe tener menos de %{count}',
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
    /**
       * ### email validation
       * set the form field error
       */
    case ('email'):
    {
      const validation = validate({
        from: value,
      }, emailConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            emailHasError: false,
            emailErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          emailHasError: true,
          emailErrorMsg: validation['from'][0],
        },
      };
    }

    /**
       * ### password validation
       * set the form field error
       */
    case ('password'):
    {
      const validation = validate({
        password: value,
      }, passwordConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            passwordHasError: false,
            passwordErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          passwordHasError: true,
          passwordErrorMsg: validation[field][0],
        },
      };
    }

    /**
       * ### showPassword
       * toggle the display of the password
       */
    case ('showPassword'):
      return {
        ...state,
        showPassword: value,
      };

    default:
      return state;
  }
}
