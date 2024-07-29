import { Diagnosis, Entry } from "../../types";
import PatientEntry from "./PatientEntry";

interface PatientEntryListProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const PatientEntryList = (props: PatientEntryListProps): JSX.Element => {
  const { entries, diagnoses } = props;

  return <div>
    {entries.map(entry => <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses} />)}
  </div>;
};

export default PatientEntryList;