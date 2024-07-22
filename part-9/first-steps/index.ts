import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
  res.json('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  if (!req.query.hasOwnProperty('height') || !req.query.hasOwnProperty('weight') ) {
    return res.status(400).json({ error: 'Arguments for height and weight must be provided' })
  }
  const { height, weight } = req.query;
  const heightNum: number = Number(height);
  const weightNum: number = Number(weight);
  if (isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({ error: 'Arguments must be valid javascript number literals' })
  }
  return res.json({ height, weight, bmi: calculateBmi(heightNum, weightNum)});
})

const PORT: number = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})