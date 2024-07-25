import { Patient, PublicPatient } from "../types";
import patientsData from '../../data/patients';
import { v1 as uuid} from 'uuid';
import { toNewPatient } from "../utils";

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => 
     ({ id, name, dateOfBirth, gender, occupation })
  );
};

const addNewPatient = (obj: unknown): Patient => {
  const patient: Patient = toNewPatient(obj) as Patient;
  patient.id = uuid();
  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  getPublicPatients,
  addNewPatient,
};