import { useState, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button } from '@mui/material';

import { EntryWithoutId } from "../../types";
import { toNewEntry } from "./utils";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: EntryWithoutId, patientId: string) => void;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AddPatientForm = ({ onCancel, onSubmit, setError }: Props) => {
  const patientId = useParams().id!;

  const [type, setType] = useState('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
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
          diagnosisCodes: diagnosisCodes !== '' ? diagnosisCodes.split(',').map(c => c.trim()) : [],
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
          diagnosisCodes: diagnosisCodes !== '' ? diagnosisCodes.split(',').map(c => c.trim()) : [],
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
          label="type"
          fullWidth
          value={type}
          onChange={({ target }) => setType(target.value)}
        >
          <MenuItem value={'HealthCheck'}>Health Check</MenuItem>
          <MenuItem value={'OccupationalHealthcare'}>Occupational Healthcare</MenuItem>
          <MenuItem value={'Hospital'}>Hospital Visit</MenuItem>
        </Select>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        {type === 'HealthCheck' 
          ?  <TextField
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
          />
          : <></>
        }
        {type === 'OccupationalHealthcare' 
          ?  <>
            <TextField
              label="Sick Leave Start Date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
              <TextField
              label="Sick Leave End Date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
              <TextField
              label="Employer"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
          </>
          : <></>
        }    
        {type === 'Hospital' 
          ?  <>
          <TextField
            label="Discharge Date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            label="Discharge Criteria"
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
              style={{ float: "left" }}
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

export default AddPatientForm;