export default function formValidation(state) {
  const isValid = (
    state.fields.username !== '' &&
    state.fields.email !== '' &&
    !state.fields.usernameHasError &&
    !state.fields.emailHasError &&
    !state.fields.passwordHasError &&
    !state.fields.firstNameHasError &&
    !state.fields.lastNameHasError &&
    (state.fields.username !== state.originalUser.username ||
     state.fields.email !== state.originalUser.email ||
     state.fields.password !== state.originalUser.password ||
     state.fields.firstName !== state.originalUser.firstName ||
     state.fields.lastName !== state.originalUser.lastName)
  );

  return {
    ...state,
    isValid,
  };
}
