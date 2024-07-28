import { NewPatient, PublicPatient, Patient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isValidDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isValidGender = (gender: string) : gender is Gender => {
  return Object.values(Gender).map(gen => gen.toString()).includes(gender);
};

const parseStringField = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing property');
  } else {
    return text;
  }
};

const parseName = parseStringField;
const parseSsn = parseStringField;
const parseOccupation = parseStringField;

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isValidGender(gender)) {
    throw new Error('Incorrect or missing gender');
  } else {
    return gender;
  }
};

const parseDateOfBirth = (text: unknown): string => {
  if (!text || !isString(text) || !isValidDate(text)) {
    throw new Error('Incorrect or missing date of birth');
  } else {
    return text;
  }
};

export const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || !(typeof obj === "object")) {
    throw new Error('argument is either missing or not of type object');
  }

  if ('name' in obj && 'dateOfBirth' in obj && 'ssn' in obj && 'gender' in obj && 'occupation' in obj) {
    const newPatient: NewPatient = {
      name: parseName(obj.name),
      dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
      ssn: parseSsn(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation),
      entries: [],
    };

    return newPatient;  
  }

  throw new Error('argument has missing properties');
};

export const toPublicPatient = (patient: Patient): PublicPatient => {
  const { id, name, dateOfBirth, gender, occupation } = patient;
  const publicPatient: PublicPatient = { id, name, dateOfBirth, gender, occupation };
  return publicPatient;
};