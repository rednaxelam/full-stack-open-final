import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';
import DiagnosesComponent from "./DiagnosesComponent";
import { Box } from "@mui/material";

interface OccupationalHealthcarePatientEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcarePatientEntry = (props: OccupationalHealthcarePatientEntryProps): JSX.Element => {
  const { entry, diagnoses } = props;

  return <Box sx={{ border: '2px solid grey', borderRadius: '5px', padding: '10px', marginTop: '5px' }}>
    {entry.date} <WorkIcon /> <em>{entry.employerName}</em> <br />
    <em>{entry.description}</em> <br />
    <br />
    <DiagnosesComponent entry={entry} diagnoses={diagnoses} />
    {entry.sickLeave ? `sick leave recommended for ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}` : undefined} <br />
    <br />
    supervised by {entry.specialist}
  </Box>;
};

export default OccupationalHealthcarePatientEntry;