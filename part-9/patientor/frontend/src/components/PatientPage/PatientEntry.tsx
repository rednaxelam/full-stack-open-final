import { Diagnosis, Entry } from "../../types";

interface PatientEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const PatientEntry = (props: PatientEntryProps): JSX.Element => {
  const { entry, diagnoses } = props;

  const getDiagnosis = (code: string): Diagnosis | undefined => {
    return diagnoses.find(diagnosis => diagnosis.code === code);
  };

  if (entry.diagnosisCodes) {
    return <div>
      {entry.date} <em>{entry.description}</em> <br />
      <ul>
        {entry.diagnosisCodes.map(code => 
          <li key={code}>
            {diagnoses.length > 0 && getDiagnosis(code) ? `${code} ${getDiagnosis(code)!.name}` : `${code}`}
          </li>)}
      </ul>
    </div>;
  } else {
    return <div>
      {entry.date} <em>{entry.description}</em> <br />
      </div>;
  }
};

export default PatientEntry;