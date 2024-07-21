interface ExerciseHistorySummary {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: 1 | 2 | 3,
  ratingDescription: String,
  target: number,
  average: number,
}

const calculateExercises = (exerciseHours: number[], targetDailyHours: number): ExerciseHistorySummary => {
  const periodLength: number = exerciseHours.length;
  const trainingDays: number =  exerciseHours.reduce((total, current) => current === 0 ? total : total + 1, 0);
  const target: number = targetDailyHours;
  const average: number = exerciseHours.reduce((totalHours, currentHours) => totalHours + currentHours, 0) / exerciseHours.length;
  const rating: 1 | 2 | 3 = average > target ? 3 : average >  target / 2 ? 2 : 1;
  const ratingDescription: String = rating === 3 ? 'Nice one' : rating === 2 ? 'Could be better' : 'Could be A LOT better';
  const success: boolean = rating === 3;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))