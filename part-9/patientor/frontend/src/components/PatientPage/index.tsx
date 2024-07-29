import { Typography } from "@mui/material";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

const PatientPage = (): JSX.Element => {
  const patientId = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    if (typeof patientId === 'undefined') return undefined;
    patientService.getPatient(patientId).then(patient => setPatient(patient));
  }, [patientId]);

  if (patientId === undefined || patient === undefined) return <></>;
  else return <div>
    <Typography variant="h6" style={{ marginTop: "0.5em" }}>
      {patient.name}
      {patient.gender === 'female' 
        ? <FemaleOutlinedIcon /> 
        : patient.gender === 'male' 
          ? <MaleOutlinedIcon />
          : <QuestionMarkOutlinedIcon/>
      }
    </Typography>
    <p>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation}
    </p>
  </div>;
};

export default PatientPage;