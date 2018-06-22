export default function formValidation(state) {
  const isValid =
    state.fields.date !== '' &&
    state.fields.weight !== null &&
    state.fields.pc !== null &&
    state.fields.ppc !== null &&
    state.fields.height !== null &&
    state.fields.completeVaccines !== null &&
    state.fields.vaccinesObservations !== '' &&
    state.fields.maturationObservations !== '' &&
    state.fields.commonPhysicalExamination !== null &&
    state.fields.physicalExaminationObservations !== '' &&
    state.fields.feeding !== '' &&
    state.fields.generalObservations !== '' &&
    !state.fields.dateHasError &&
    !state.fields.weightHasError &&
    !state.fields.pcHasError &&
    !state.fields.ppcHasError &&
    !state.fields.heightHasError &&
    !state.fields.completeVaccinesHasError &&
    !state.fields.vaccinesObservationsHasError &&
    !state.fields.maturationObservationsHasError &&
    !state.fields.commonPhysicalExaminationHasError &&
    !state.fields.physicalExaminationObservationsHasError &&
    !state.fields.feedingHasError &&
    !state.fields.generalObservationsHasError &&
    (state.fields.date !== state.originalHealthControl.date ||
     state.fields.weight !== state.originalHealthControl.weight ||
     state.fields.pc !== state.originalHealthControl.pc ||
     state.fields.ppc !== state.originalHealthControl.ppc ||
     state.fields.height !== state.originalHealthControl.height ||
     state.fields.completeVaccines !== state.originalHealthControl.completeVaccines ||
     state.fields.vaccinesObservations !== state.originalHealthControl.vaccinesObservations ||
     state.fields.maturationObservations !== state.originalHealthControl.maturationObservations ||
     state.fields.commonPhysicalExamination !== state.originalHealthControl.commonPhysicalExamination ||
     state.fields.physicalExaminationObservations !== state.originalHealthControl.physicalExaminationObservations ||
     state.fields.feeding !== state.originalHealthControl.feeding ||
     state.fields.generalObservations !== state.originalHealthControl.generalObservations);

  return {
    ...state,
    isValid,
  };
}
