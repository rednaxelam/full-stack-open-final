import { Entry } from "../../types";
import PatientEntry from "./PatientEntry";

interface PatientEntryListProps {
  entries: Entry[];
}

const PatientEntryList = (props: PatientEntryListProps): JSX.Element => {
  const { entries } = props;

  return <div>
    {entries.map(entry => <PatientEntry key={entry.id} entry={entry}/>)}
  </div>;
};

export default PatientEntryList;