import { Entry, Patient, PublicPatient } from "../types";
import patientsData from '../../data/patients';
import { v1 as uuid} from 'uuid';
import { toNewEntry, toNewPatient } from "../utils";

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => 
     ({ id, name, dateOfBirth, gender, occupation })
  );
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => id === patient.id);
};

const addNewPatient = (obj: unknown): Patient => {
  const patient: Patient = toNewPatient(obj) as Patient;
  patient.id = uuid();
  patients.push(patient);
  return patient;
};

const addNewPatientEntry = (obj: unknown, patientId: string): Patient | undefined => {
  const entry: Entry = toNewEntry(obj) as Entry;
  entry.id = uuid();
  const patient: Patient | undefined = getPatient(patientId);
  if (typeof patient === 'undefined') return undefined;
  patient.entries = patient.entries.concat(entry);
  return patient;
};

export default {
  getPatients,
  getPublicPatients,
  addNewPatient,
  getPatient,
  addNewPatientEntry,
};