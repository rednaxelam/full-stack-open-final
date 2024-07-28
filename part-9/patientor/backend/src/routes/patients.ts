import express from 'express';
import patientService from '../services/patientService';
import { toPublicPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const searchResult = patientService.getPatient(req.params.id);
  if (searchResult) res.json(searchResult);
  else res.status(404).json({error: `Could not find note with given id: ${req.params.id}`});
});

router.post('/', (req, res) => {
  try {
    res.json(toPublicPatient(patientService.addNewPatient(req.body)));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({error: `Oh no: ${error.message}`});
    } else {
      res.status(400).json('An error occurred I guess ¯\\_(ツ)_/¯');
    }
  }
});

export default router;