log = axios.post('http://localhost:8000/api/auth/login', {email: 'pediatra@hnrg.com', password: 'pediatra'});

doc = new documentType({name: "DNI"});

pat = new patient({ sex: 'Otro',
  deleted: false,
  firstName: 'Lucas',
  lastName: 'Di Cunzolo',
  documentNumber: 40062018,
  birthday: "1996-11-12",
  documentType: doc.id });

pat2 = new patient({ sex: 'Otro',
  deleted: false,
  firstName: 'Ulises',
  lastName: 'Cornejo',
  documentNumber: 400000,
  birthday: "1996-11-24",
  documentType: doc.id });

user.findOne({}).exec((err, data) => {
  hc = new healthControl({ completeVaccines: false,
    accordingMaturationContext: false,
    commonPhysicalExamination: false,
    active: true,
    patient: pat.id,
    date: Date.now(),
    vaccinesObservations: 'Observacion',
    maturationObservations: 'Obser',
    physicalExaminationObservations: 'Observacionm',
    generalObservations: 'asdasd',
    pc: "50.7",
    ppc: "50.3",
    height: "30.5",
    weight: "50.2",
    user: data._id
  });
  doc.save();
  pat.save();
  pat2.save();
  hc.save();
});
