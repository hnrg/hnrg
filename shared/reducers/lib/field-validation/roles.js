/**
 * # field-validation.js
 *
 * Define the validation rules for various fields such as email, name,
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
 * ## name validation rule
 * read the message.. ;)
 */
const nameConstraints = {
  name: {
    format: {
      pattern: /^[a-zA-Z0-9]+$/,
      flags: 'i',
      message: 'El nombre solo puede contener letras y números',
    },
    length: {
      minimum: 1,
      maximum: 20,
      tooShort: '^El nombre debe tener al menos %{count} caracteres',
      tooLong: '^El nombre debe tener menos de %{count} caracteres',
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
     * ### name validation
     * set the form field error
     */
    case ('name'):
    {
      const validation = validate({
        name: value,
      }, nameConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            nameHasError: false,
            nameErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          nameHasError: true,
          nameErrorMsg: validation[field][0],
        },
      };
    }

    default:
      return state;
  }
}
