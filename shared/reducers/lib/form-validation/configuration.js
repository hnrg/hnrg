export default function formValidation(state) {
  const isValid = (
    state.fields.name !== '' &&
    state.fields.email !== '' &&
    state.fields.description !== '' &&
    !state.fields.nameHasError &&
    !state.fields.emailHasError &&
    !state.fields.amountPerPageHasError &&
    !state.fields.descriptionHasError &&
    !state.fields.fromHasError &&
    !state.fields.deltaHasError &&
    !state.fields.amountHasError &&
    !state.fields.maintenanceHasError &&
    (state.fields.name !== state.current.name ||
     state.fields.email !== state.current.email ||
     state.fields.amountPerPage !== state.current.amountPerPage ||
     state.fields.description !== state.current.description ||
     state.fields.from !== state.current.from ||
     state.fields.delta !== state.current.delta ||
     state.fields.amount !== state.current.amount ||
     state.fields.maintenance !== state.current.maintenance)
  );

  return {
    ...state,
    isValid,
  };
}
