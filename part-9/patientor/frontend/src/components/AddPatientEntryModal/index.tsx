import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddPatientEntryForm from './AddPatientEntryForm';
import { Diagnosis, EntryWithoutId } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: EntryWithoutId, patientId: string) => void;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  diagnoses: Diagnosis[]
}

const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error, setError, diagnoses }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientEntryForm onSubmit={onSubmit} onCancel={onClose} setError={setError} diagnoses={diagnoses}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientEntryModal;