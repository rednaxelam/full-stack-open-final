import { Diagnosis, HealthCheckRating, SickLeave, Discharge, EntryWithoutId } from "../../types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isValidDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseStringField = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing string property');
  } else {
    return text;
  }
};

const parseDescription = parseStringField;
const parseSpecialist = parseStringField;
const parseEmployerName = parseStringField;


const parseDate = (text: unknown): string => {
  if (!text || !isString(text) || !isValidDate(text)) {
    throw new Error('Incorrect or missing date');
  } else {
    return text;
  }
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || !Array.isArray(object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object as Array<Diagnosis['code']>;
};


const isValidHealthCheckRating = (rating: number) : rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if ((!rating && rating !== 0) || !(typeof rating === 'number') || !isValidHealthCheckRating(rating)) {
    throw new Error ('Incorrect or missing Health Check Rating');
  } else {
    return rating;
  }
};

const parseStartDate = parseDate;
const parseEndDate = parseDate;

const parseSickLeave = (obj: unknown): SickLeave => {
  if (!obj || !(typeof obj === "object")) {
    throw new Error('argument is either missing or not of type object');
  }

  if ('startDate' in obj && 'endDate' in obj) {
    const sickLeave: SickLeave = {
      startDate: parseStartDate(obj.startDate),
      endDate: parseEndDate(obj.endDate),
    };

    return sickLeave;
  }

  throw new Error('argument has missing properties');
};

const parseDischarge = (obj: unknown): Discharge => {
  if (!obj || !(typeof obj === "object")) {
    throw new Error('argument is either missing or not of type object');
  }

  if ('date' in obj && 'criteria' in obj) {
    const discharge: Discharge = {
      date: parseDate(obj.date),
      criteria: parseStringField(obj.criteria),
    };

    return discharge;
  }

  throw new Error('argument has missing properties');
};

// not my finest hour
export const toNewEntry = (obj: unknown): EntryWithoutId => {
  if (!obj || !(typeof obj === "object")) {
    throw new Error('argument is either missing or not of type object');
  }

  if ('type' in obj && isString(obj.type)) {
    if ('description' in obj && 'date' in obj && 'specialist' in obj) {
      switch (obj.type) {
        case 'HealthCheck':
          if ('healthCheckRating' in obj) {
            const entry: EntryWithoutId = {
              type: "HealthCheck",
              description: parseDescription(obj.description),
              date: parseDate(obj.date),
              specialist: parseSpecialist(obj.specialist),
              diagnosisCodes: 'diagnosisCodes' in obj ? parseDiagnosisCodes(obj.diagnosisCodes) : parseDiagnosisCodes(undefined),
              healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
            };

            return entry;
          } else {
            throw new Error('Object missing healthCheckRating property');
          }
        case 'OccupationalHealthcare':
          if ('employerName' in obj) {
            if ('sickLeave' in obj) {
              const entry: EntryWithoutId = {
                type: 'OccupationalHealthcare',
                description: parseDescription(obj.description),
                date: parseDate(obj.date),
                specialist: parseSpecialist(obj.specialist),
                diagnosisCodes: 'diagnosisCodes' in obj ? parseDiagnosisCodes(obj.diagnosisCodes) : parseDiagnosisCodes(undefined),
                employerName: parseEmployerName(obj.employerName),
                sickLeave: parseSickLeave(obj.sickLeave),
              };

              return entry;
            } else {
              const entry: EntryWithoutId = {
                type: 'OccupationalHealthcare',
                description: parseDescription(obj.description),
                date: parseDate(obj.date),
                specialist: parseSpecialist(obj.specialist),
                diagnosisCodes: 'diagnosisCodes' in obj ? parseDiagnosisCodes(obj.diagnosisCodes) : parseDiagnosisCodes(undefined),
                employerName: parseEmployerName(obj.employerName),
              };

              return entry;
            }
          } else {
            throw new Error('Object missing employerName property');
          }
        case 'Hospital':
          if ('discharge' in obj) {
            const entry: EntryWithoutId = {
              type: 'Hospital',
              description: parseDescription(obj.description),
              date: parseDate(obj.date),
              specialist: parseSpecialist(obj.specialist),
              diagnosisCodes: 'diagnosisCodes' in obj ? parseDiagnosisCodes(obj.diagnosisCodes) : parseDiagnosisCodes(undefined),
              discharge: parseDischarge(obj.discharge),
            };

            return entry;
          } else {
            throw new Error('Object missing discharge property');
          }
        default:
          throw new Error('Object must have a valid type property');

      }
    } else {
      throw new Error('Object is missing properties');
    }

  }

  throw new Error('Entry must have a valid type specified');

};