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

const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
const nameConstraints = {
  name: {
    presence: true,
    format: {
      pattern: nameRegex,
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

const amountPerPageConstraints = {
  amountPerPage: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      lessThanOrEqualTo: 50,
      notInteger: '^La cantidad por página debe ser un número',
      notValid: '^La cantidad ingresada es invaldia',
      notGreaterThan: '^La cantidad por página debe ser al menos %{count}',
      notLessThanOrEqualTo: '^La cantidad por página debe ser menor a %{count}',
    },
  },
};

const descriptionConstraints = {
  description: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 256,
      tooShort: '^La description no puede tener menos de %{count} caracteres',
      tooLong: '^La descripción no puede tener más de  %{count} catacteres',
    },
  },
};

const fromConstraints = {
  from: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 5,
      lessThanOrEqualTo: 24,
      notInteger: '^El horario de comienzo de turnos debe ser un entero',
      notValid: '^El horario de comienzo no es valido',
      notGreaterThan: '^El horario de comienzo de turnos debe ser mayor a %{count}',
      notLessThanOrEqualTo: '^El horario de comienzo de turnos debe ser menor a %{count}',
    },
  },
};

const deltaConstraints = {
  delta: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      lessThanOrEqualTo: 60,
      notInteger: '^El intervalo entre turnos debe ser un entero',
      notValid: '^El intervalo entre turnos no es valido',
      notGreaterThan: '^El intervalo entre turnos debe ser mayor a %{count}',
      notLessThanOrEqualTo: '^El intervaloe entre turnos debe ser menor o igual a %{count}',
    },
  },
};

const amountConstraints = {
  amount: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      lessThanOrEqualTo: 96,
      notInteger: '^La cantidad de turnos por día debe ser un entero',
      notValid: '^La cantidad de turnos por día no es valida',
      notGreaterThan: '^La cantidad de turnos por día debe ser mayor a %{count}',
      notLessThanOrEqualTo: '^La cantidad de turnos por día debe ser menor o igual a %{count}',
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

    case ('amountPerPage'):
    {

      const validation = validate({
        amountPerPage: value,
      }, amountPerPageConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            amountPerPageHasError: false,
            amountPerPageErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          amountPerPageHasError: true,
          amountPerPageErrorMsg: validation[field][0],
        },
      };
    }

    case ('description'):
    {

      const validation = validate({
        description: value,
      }, descriptionConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            descriptionHasError: false,
            descriptionErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          descriptionHasError: true,
          descriptionErrorMsg: validation[field][0],
        },
      };
    }

    case ('from'):
    {

      const validation = validate({
        from: value,
      }, fromConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            fromHasError: false,
            fromErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          fromHasError: true,
          fromErrorMsg: validation[field][0],
        },
      };
    }

    case ('delta'):
    {

      const validation = validate({
        delta: value,
      }, deltaConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            deltaHasError: false,
            deltaErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          deltaHasError: true,
          deltaErrorMsg: validation[field][0],
        },
      };
    }

    case ('amount'):
    {

      const validation = validate({
        amount: value,
      }, amountConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            amountHasError: false,
            amountErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          amountHasError: true,
          amountErrorMsg: validation[field][0],
        },
      };
    }
    default:
      return state;
  }
}
