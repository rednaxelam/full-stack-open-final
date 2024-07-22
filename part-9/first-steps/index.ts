import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.json('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.query, 'height') 
    || !Object.prototype.hasOwnProperty.call(req.query, 'weight')) 
  {
    return res.status(400).json({ error: 'Arguments for height and weight must be provided' });
  }
  const { height, weight } = req.query;
  const heightNum: number = Number(height);
  const weightNum: number = Number(weight);
  if (isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({ error: 'Arguments must be valid javascript number literals' });
  }
  return res.json({ height, weight, bmi: calculateBmi(heightNum, weightNum)});
});

app.post('/exercises', (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'daily_exercises')
    || !Object.prototype.hasOwnProperty.call(req.body, 'target'))
  {
    return res.status(400).json({ error: 'parameters daily_exercises and target must be provided' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: 'daily_exercises is not an array' });
  }

  if (daily_exercises.length === 0) {
    return res.status(400).json({ error: 'daily_exercises must contain data points' });
  }

  let NaNFlag: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  daily_exercises.forEach((value: any) => {
    if (isNaN(Number(value))) NaNFlag = true;
  });

  if (NaNFlag) return res.status(400).json({ error: 'daily_exercises must only contain numbers' });

  if (isNaN(Number(target))) return res.status(400).json({ error: 'target must be a number' });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyExercises: number[] = daily_exercises.map((value: any): number => Number(value));
  const targetHours: number = Number(target);

  return res.json(calculateExercises(dailyExercises, targetHours));
});

const PORT: number = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});