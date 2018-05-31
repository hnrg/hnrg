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
const namePattern = /^[a-zA-Z0-9]{6,15}$/;
const nameConstraints = {
  name: {
    format: {
      pattern: namePattern,
      flags: 'i',
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
      const validName = _.isUndefined(validate({
        name: value,
      }, nameConstraints));

      if (validName) {
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
          nameErrorMsg: 'El name tiene carácteres inválidos',
        },
      };
    }

    default:
      return state;
  }
}
