import { Diagnosis, Entry } from "../../types";
import HospitalPatientEntry from "./HospitalPatientEntry";
import OccupationalHealthcarePatientEntry from "./OccupationalHealthcarePatientEntry";
import HealthCheckPatientEntry from "./HealthCheckPatientEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PatientEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const PatientEntry = (props: PatientEntryProps): JSX.Element => {
  const { entry, diagnoses } = props;

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckPatientEntry entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HospitalPatientEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcarePatientEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default PatientEntry;