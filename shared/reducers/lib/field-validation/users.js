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
    presence: true,
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
 * ## username validation rule
 * read the message.. ;)
 */
const usernamePattern = /^[a-zA-Z0-9]+$/;
const usernameConstraints = {
  username: {
    format: {
      pattern: usernamePattern,
      flags: 'i',
      message: '^El nombre de usuario solo puede contener letras o números',
    },
    length: {
      minimum: 2,
      maximum: 20,
      tooShort: '^El nombre de usuario debe tener al menos %{count}',
      tooLong: '^El nombre de usuario debe tener menos de %{count}',
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
    /**
     * ### username validation
     * set the form field error
     */
    case ('username'):
    {
      const validation = validate({
        username: value,
      }, usernameConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            usernameHasError: false,
            usernameErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          usernameHasError: true,
          usernameErrorMsg: validation[field][0],
        },
      };
    }

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
          emailErrorMsg: validation.from[0],
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

    default:
      return state;
  }
}
