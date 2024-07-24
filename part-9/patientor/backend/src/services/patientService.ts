import { Patient, PublicPatient } from "../types";
import patientsData from '../../data/patients';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => 
     ({ id, name, dateOfBirth, gender, occupation })
  );
};

export default {
  getPatients,
  getPublicPatients,
};