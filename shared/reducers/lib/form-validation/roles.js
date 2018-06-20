import _ from 'lodash';

export default function formValidation(state) {
  const isValid = (
    state.fields.name !== '' &&
    !state.fields.nameHasError &&
    (state.fields.name !== state.originalRol.name ||
     !_.isEqual(state.fields.permissions, Array.from(state.originalRol.permissions || []).map(p => p.name)))
  );

  return {
    ...state,
    isValid,
  };
}
