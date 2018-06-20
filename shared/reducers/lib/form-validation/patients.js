export default function formValidation(state) {
  const isValid = (
    state.fields.firstName !== '' &&
    state.fields.lastName !== '' &&
    state.fields.birthday !== null &&
    state.fields.documentType !== null &&
    state.fields.documentNumber !== null &&
    !state.fields.firstNameHasError &&
    !state.fields.lastNameHasError &&
    !state.fields.addressHasError &&
    !state.fields.phoneHasError &&
    !state.fields.birthdayHasError &&
    !state.fields.sexHasError &&
    !state.fields.demographicDataHasError &&
    !state.fields.medicalInsuranceHasError &&
    !state.fields.documentTypeHasError &&
    !state.fields.documentNumberHasError &&
    (state.fields.firstName !== state.originalPatient.firstName ||
     state.fields.lastName !== state.originalPatient.lastName ||
     state.fields.address !== state.originalPatient.address ||
     state.fields.phone !== state.originalPatient.phone ||
     state.fields.birthday !== state.originalPatient.birthday ||
     state.fields.sex !== state.originalPatient.sex ||
     state.fields.demographicData !== state.originalPatient.demographicData ||
     state.fields.medicalInsurance !== state.originalPatient.medicalInsurance ||
     state.fields.documentType !== state.originalPatient.documentType ||
     state.fields.documentNumber !== state.originalPatient.documentNumber ||
     state.fields.refrigerator !== state.originalPatient.refrigerator ||
     state.fields.electricity !== state.originalPatient.electricity ||
     state.fields.pet !== state.originalPatient.pet ||
     state.fields.apartmentType !== state.originalPatient.apartmentType ||
     state.fields.heatingType !== state.originalPatient.heatingType ||
     state.fields.waterType !== state.originalPatient.waterType)
  );

  return {
    ...state,
    isValid,
  };
}
