interface heightAndWeightData {
  height: number,
  weight: number,
}

const parseArguments = (args: String[]): heightAndWeightData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height: number = Number(args[2]);
  const weight: number = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) return { height, weight };
  else throw new Error('Arguments must be valid javascript number literals');

}

export const calculateBmi = (height: number, weight: number): String => {
  
  const heightInM: number = height / 100;
  const bmi: number =  weight / ( heightInM * heightInM );

  switch (true) {
    case bmi < 18.5:
      return `Underweight with BMI of ${bmi}`;
    case bmi < 25:
      return `Normal (healthy weight) with BMI of ${bmi}`;
    case bmi < 30:
      return `Overweight with BMI of ${bmi}`;
    case bmi < 40:
      return `Obese with BMI of ${bmi}`;
    default:
      return `Severely obese with BMI of ${bmi}`;
  }
}

try {
  const {height, weight} = parseArguments(process.argv)
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Oh no: ${error.message}`)
  } else {
    console.log('A fatal error occurred I guess ¯\_(ツ)_/¯')
  }
}