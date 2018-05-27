export default function formValidation(state) {
  const isValid = (
    state.fields.username !== '' &&
    state.fields.email !== '' &&
    !state.fields.usernameHasError &&
    !state.fields.emailHasError &&
    !state.fields.firstNameHasError &&
    !state.fields.lastNameHasError &&
    (state.fields.username !== state.originalProfile.username ||
     state.fields.email !== state.originalProfile.email ||
     state.fields.firstName !== state.originalProfile.firstName ||
     state.fields.lastName !== state.originalProfile.lastName)
  );

  return {
    ...state,
    isValid,
  };
}
