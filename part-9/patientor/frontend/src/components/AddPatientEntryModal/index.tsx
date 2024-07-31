import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddPatientEntryForm from './AddPatientEntryForm';
import { EntryWithoutId } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: EntryWithoutId, patientId: string) => void;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error, setError }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientEntryForm onSubmit={onSubmit} onCancel={onClose} setError={setError}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientEntryModal;