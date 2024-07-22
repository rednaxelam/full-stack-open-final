interface ExerciseHistorySummary {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: 1 | 2 | 3,
  ratingDescription: string,
  target: number,
  average: number,
}

interface ExerciseHistory {
  exerciseHours: number[],
  targetDailyHours: number,
}

const parseArguments = (args: string[]): ExerciseHistory => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numberArgs = args.slice(2).map((arg) => {
    const numberArg: number = Number(arg);
    if (isNaN(numberArg)) throw new Error('Arguments must be valid javascript number literals');
    return numberArg;
  });

  return {
    exerciseHours: numberArgs.slice(1),
    targetDailyHours: numberArgs[0],
  };
};

export const calculateExercises = (exerciseHours: number[], targetDailyHours: number): ExerciseHistorySummary => {
  const periodLength: number = exerciseHours.length;
  const trainingDays: number =  exerciseHours.reduce((total, current) => current === 0 ? total : total + 1, 0);
  const target: number = targetDailyHours;
  const average: number = exerciseHours.reduce((totalHours, currentHours) => totalHours + currentHours, 0) / exerciseHours.length;
  const rating: 1 | 2 | 3 = average > target ? 3 : average >  target / 2 ? 2 : 1;
  const ratingDescription: string = rating === 3 ? 'Nice one' : rating === 2 ? 'Could be better' : 'Could be A LOT better';
  const success: boolean = rating === 3;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const {exerciseHours, targetDailyHours} = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, targetDailyHours));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Oh no: ${error.message}`);
  } else {
    console.log('A fatal error occurred I guess ¯\\_(ツ)_/¯');
  }
}