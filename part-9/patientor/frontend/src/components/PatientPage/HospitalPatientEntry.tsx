import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DiagnosesComponent from "./DiagnosesComponent";
import { Box } from "@mui/material";

interface HospitalPatientEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalPatientEntry = (props: HospitalPatientEntryProps): JSX.Element => {
  const { entry, diagnoses } = props;

  return <Box sx={{ border: '2px solid grey', borderRadius: '5px', padding: '10px', marginTop: '5px' }}>
    Hospital entry on {entry.date} <LocalHospitalIcon /> <br />
    <em>{entry.description}</em> <br />
    <br />
    discharged on: {entry.discharge.date} <br />
    discharge criteria: {entry.discharge.criteria} <br /> <br />
    <DiagnosesComponent entry={entry} diagnoses={diagnoses} /> <br />
    supervised by {entry.specialist}
  </Box>;
};

export default HospitalPatientEntry;