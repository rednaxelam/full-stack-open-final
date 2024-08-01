import { Typography, Button } from "@mui/material";
import patientService from "../../services/patients";
import { useState } from "react";
import { Diagnosis, EntryWithoutId, Patient } from "../../types";
import { useParams } from "react-router-dom";
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import axios from "axios";

import PatientEntryList from "./PatientEntryList";
import AddPatientEntryModal from "../AddPatientEntryModal";

interface PatientPageProps {
  diagnoses: Diagnosis[];
  patients : Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientPage = (props: PatientPageProps): JSX.Element => {
  const { diagnoses, patients, setPatients } = props;
  const patientId = useParams().id;
  const patient : Patient | undefined = patients.find(patient => patient.id === patientId);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (entry: EntryWithoutId, patientId: string) => {
    try {
      const updatedPatient = await patientService.createEntry(entry, patientId);
      setPatients(patients.map(patient => patient.id === patientId ? updatedPatient : patient));
      setModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else if (e instanceof Error) {
        setError(e.message);
        console.error(e.message);
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (patientId === undefined || patient === undefined) return <></>;
  else return <div>
    <Typography variant="h5" style={{ marginTop: "0.5em" }}>
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
    <Typography variant="h6" style={{ marginTop: "0.5em" }}>
      entries
    </Typography>
    <AddPatientEntryModal 
      modalOpen={modalOpen}
      onSubmit={submitNewEntry}
      error={error}
      onClose={closeModal}
      setError={setError}
      diagnoses={diagnoses}
    />
    <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
    </Button>
    <PatientEntryList entries={patient.entries} diagnoses={diagnoses}/>
  </div>;
};

export default PatientPage;