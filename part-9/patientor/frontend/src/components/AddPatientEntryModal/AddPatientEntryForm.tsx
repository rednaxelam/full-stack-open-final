import { useState, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, Input } from '@mui/material';

import { Diagnosis, EntryWithoutId } from "../../types";
import { toNewEntry } from "./utils";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: EntryWithoutId, patientId: string) => void;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  diagnoses: Diagnosis[]
}

const AddPatientEntryForm = ({ onCancel, onSubmit, setError, diagnoses }: Props) => {
  const patientId = useParams().id!;

  const [type, setType] = useState('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      if (sickLeaveEndDate === '' && sickLeaveEndDate === '') {
        onSubmit(toNewEntry({
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating: Number(healthCheckRating),
          employerName,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        }), patientId);
      } else {
        onSubmit(toNewEntry({
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating: Number(healthCheckRating),
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
          employerName,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        }), patientId);
      }

    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
    }

  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          fullWidth
          value={type}
          onChange={({ target }) => setType(target.value)}
        >
          <MenuItem value={'HealthCheck'}>Health Check</MenuItem>
          <MenuItem value={'OccupationalHealthcare'}>Occupational Healthcare</MenuItem>
          <MenuItem value={'Hospital'}>Hospital Visit</MenuItem>
        </Select>
        <InputLabel style={{ marginTop: 20 }}>Description:</InputLabel>
        <TextField
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date:</InputLabel>
        <Input 
          type="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}         
        />
        <InputLabel style={{ marginTop: 20 }}>Specialist:</InputLabel>
        <TextField
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes:</InputLabel>
        <Select
          placeholder="Diagnosis Codes"
          fullWidth
          multiple
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(typeof target.value === 'string' ? target.value.split(',') : target.value)}
        >
        {diagnoses.map((diagnosis) => {
          return <MenuItem 
            key={diagnosis.code}
            value={diagnosis.code}
          >
            {diagnosis.code}
          </MenuItem>;
        })}
        </Select>
        {type === 'HealthCheck' 
          ?  <>
            <InputLabel style={{ marginTop: 20 }}>Health Check Rating:</InputLabel>
            <Select
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low Risk</MenuItem>
              <MenuItem value={2}>High Risk</MenuItem>
              <MenuItem value={3}>Critical Risk</MenuItem>
            </Select>
          </>
          : <></>
        }
        {type === 'OccupationalHealthcare' 
          ?  <>
            <InputLabel style={{ marginTop: 20 }}>Sick Leave Start Date:</InputLabel>
            <Input 
              type="date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}         
            />
            <InputLabel style={{ marginTop: 20 }}>Sick Leave End Date:</InputLabel>
            <Input 
              type="date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}         
            />
            <InputLabel style={{ marginTop: 20 }}>Employer:</InputLabel>
            <TextField
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
          </>
          : <></>
        }    
        {type === 'Hospital' 
          ?  <>
          <InputLabel style={{ marginTop: 20 }}>Discharge Date:</InputLabel>
          <Input 
            type="date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}         
          />
          <InputLabel style={{ marginTop: 20 }}>Discharge Criteria:</InputLabel>
          <TextField
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </>
        : <></>
        }   

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left", marginTop: 20 }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
                marginTop: 20,
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientEntryForm;