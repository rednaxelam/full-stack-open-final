import { Entry } from "../../types";

interface PatientEntryProps {
  entry: Entry;
}

const PatientEntry = (props: PatientEntryProps): JSX.Element => {
  const { entry } = props;

  if (entry.diagnosisCodes) {
    return <div>
      {entry.date} <em>{entry.description}</em> <br />
      <ul>
        {entry.diagnosisCodes.map(code => <li key={code}>{code}</li>)}
      </ul>
    </div>;
  } else {
    return <div>
      {entry.date} <em>{entry.description}</em> <br />
      </div>;
  }
};

export default PatientEntry;