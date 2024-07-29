import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diagnosisService.getDiagnoses());
});

router.get('/:code', (req, res) => {
  const searchResult = diagnosisService.getDiagnosis(req.params.code);
  if (searchResult) res.json(searchResult);
  else res.status(404).json({error: `Could not find diagnosis with given code: ${req.params.code}`});
});

export default router;