import { Diagnosis, HealthCheckEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiagnosesComponent from "./DiagnosesComponent";
import { Box } from "@mui/material";


interface HealthCheckPatientEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckPatientEntry = (props: HealthCheckPatientEntryProps) : JSX.Element => {
  const { entry, diagnoses } = props;

  let iconColor: string;

  switch (entry.healthCheckRating) {
    case 0:
      iconColor = 'green';
      break;
    case 1:
      iconColor = 'yellow';
      break;
    case 2:
      iconColor = 'red';
      break;
    case 3:
      iconColor = 'purple';
      break;
    default:
      iconColor = 'white';
  }
  
  return <Box sx={{ border: '2px solid grey', borderRadius: '5px', padding: '10px', marginTop: '5px' }}>
    {entry.date} <MedicalServicesIcon /> <br />
    <em>{entry.description}</em> <br />
    <FavoriteIcon htmlColor={iconColor} /> <br />
    <DiagnosesComponent entry={entry} diagnoses={diagnoses} /> <br />
    supervised by {entry.specialist} <br />
  </Box>;
};

export default HealthCheckPatientEntry;