export default function(state) {
  if (state.fields.email !== '' &&
      state.fields.password !== '' &&
      !state.fields.emailHasError &&
      !state.fields.passwordHasError) {
    return { ...state, isValid: true };
  }

  return { ...state, isValid: false };
}
