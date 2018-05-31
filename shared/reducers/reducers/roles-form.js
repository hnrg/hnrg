export default function formValidation(state) {
  const isValid = (
    state.fields.name !== '' &&
    !state.fields.nameHasError &&
    (state.fields.name !== state.originalRol.name)
  );

  return {
    ...state,
    isValid,
  };
}
