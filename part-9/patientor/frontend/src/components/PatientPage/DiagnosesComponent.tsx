import { Diagnosis, Entry } from "../../types";

interface DiagnosisComponentProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const DiagnosesComponent = (props: DiagnosisComponentProps): JSX.Element => {
  const { entry, diagnoses } = props;

  const getDiagnosis = (code: string): Diagnosis | undefined => {
    return diagnoses.find(diagnosis => diagnosis.code === code);
  };
  
  if (entry.diagnosisCodes) {
    return <div>
      Diagnoses:<br />
      <ul>
        {entry.diagnosisCodes.map(code => 
          <li key={code}>
            {diagnoses.length > 0 && getDiagnosis(code) ? `${code} ${getDiagnosis(code)!.name}` : `${code}`}
          </li>)}
      </ul>
    </div>;
  } else {
    return <>
      </>;
  }
};

export default DiagnosesComponent;