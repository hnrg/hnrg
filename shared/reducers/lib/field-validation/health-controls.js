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

const weightConstraints = {
  weight: {
    presence: true,
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 100000,
      notValid: '^El peso solo admite números',
      notGreaterThan: '^El peso no puede ser menor a %{count}',
      notLessThanOrEqualTo: '^El peso ingresado es demasiado grande',
    },
  },
};


const pcConstraints = {
  pc: {
    presence: true,
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 500,
      notValid: '^El pc solo admite números',
      notGreaterThan: '^El pc no puede ser menor a %{count}',
      notLessThanOrEqualTo: '^El ppc ingresado es demasiado grande',
    },
  },
};

const ppcConstraints = {
  ppc: {
    presence: true,
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 500,
      notValid: '^El ppc solo admite números',
      notGreaterThan: '^El ppc no puede ser menor a %{count}',
      notLessThanOrEqualTo: '^El ppc ingresado es demasiado grande',
    },
  },
};

const heightConstraints = {
  height: {
    presence: true,
    numericality: {
      greaterThan: 10,
      lessThanOrEqualTo: 200,
      notValid: '^La talla solo admite números',
      notGreaterThan: '^La talla no puede ser menor a %{count}',
      notLessThanOrEqualTo: '^La talla ingresado es demasiado grande',
    },
  },
};

const vaccinesObservationsConstraints = {
  vaccinesObservations: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 256,
      tooShort: '^La observacion debe tener al menos %{count} caracteres',
      tooLong: '^La obesrvacion debe tener menos de %{count} caracteres',
    },
  },
};

const maturationObservationsConstraints = {
  maturationObservations: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 256,
      tooShort: '^La observacion debe tener al menos %{count} caracteres',
      tooLong: '^La obesrvacion debe tener menos de %{count} caracteres',
    },
  },
};

const physicalExaminationObservationsConstraints = {
  physicalExaminationObservations: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 256,
      tooShort: '^La observacion debe tener al menos %{count} caracteres',
      tooLong: '^La obesrvacion debe tener menos de %{count} caracteres',
    },
  },
};


const feedingConstraints = {
  feeding: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 256,
      tooShort: '^La observacion debe tener al menos %{count} caracteres',
      tooLong: '^La obesrvacion debe tener menos de %{count} caracteres',
    },
  },
};

const generalObservationsConstraints = {
  generalObservations: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 256,
      tooShort: '^La observacion debe tener al menos %{count} caracteres',
      tooLong: '^La obesrvacion debe tener menos de %{count} caracteres',
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
    case ('weight'):
    {
      const validation = validate({
        weight: value,
      }, weightConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            weightHasError: false,
            weightErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          weightHasError: true,
          weightErrorMsg: validation[field][0],
        },
      };
    }

    case ('pc'):
    {
      const validation = validate({
        pc: value,
      }, pcConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            pcHasError: false,
            pcErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          pcHasError: true,
          pcErrorMsg: validation[field][0],
        },
      };
    }

    case ('ppc'):
    {
      const validation = validate({
        ppc: value,
      }, ppcConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            ppcHasError: false,
            ppcErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          ppcHasError: true,
          ppcErrorMsg: validation[field][0],
        },
      };
    }

    case ('height'):
    {
      const validation = validate({
        height: value,
      }, heightConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            heightHasError: false,
            heightErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          heightHasError: true,
          heightErrorMsg: validation[field][0],
        },
      };
    }

    case ('vaccinesObservations'):
    {
      const validation = validate({
        vaccinesObservations: value,
      }, vaccinesObservationsConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            vaccinesObservationsHasError: false,
            vaccinesObservationsErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          vaccinesObservationsHasError: true,
          vaccinesObservationsErrorMsg: validation[field][0],
        },
      };
    }

    case ('maturationObservations'):
    {
      const validation = validate({
        maturationObservations: value,
      }, maturationObservationsConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            maturationObservationsHasError: false,
            maturationObservationsErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          maturationObservationsHasError: true,
          maturationObservationsErrorMsg: validation[field][0],
        },
      };
    }

    case ('physicalExaminationObservations'):
    {
      const validation = validate({
        physicalExaminationObservations: value,
      }, physicalExaminationObservationsConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            physicalExaminationObservationsHasError: false,
            physicalExaminationObservationsErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          physicalExaminationObservationsHasError: true,
          physicalExaminationObservationsErrorMsg: validation[field][0],
        },
      };
    }

    case ('feeding'):
    {
      const validation = validate({
        feeding: value,
      }, feedingConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            feedingHasError: false,
            feedingErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          feedingHasError: true,
          feedingErrorMsg: validation[field][0],
        },
      };
    }

    case ('generalObservations'):
    {
      const validation = validate({
        generalObservations: value,
      }, generalObservationsConstraints);

      if (_.isUndefined(validation)) {
        return {
          ...state,
          fields: {
            ...state.fields,
            generalObservationsHasError: false,
            generalObservationsErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          generalObservationsHasError: true,
          generalObservationsErrorMsg: validation[field][0],
        },
      };
    }

    default:
      return state;
  }
}
