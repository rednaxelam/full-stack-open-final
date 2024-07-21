const calculateBmi = (height: number, weight: number): String => {
  const heightInM: number = height / 100
  const bmi: number =  weight / ( heightInM * heightInM )

  switch (true) {
    case bmi < 18.5:
      return `Underweight with BMI of ${bmi}`
    case bmi < 25:
      return `Normal (healthy weight) with BMI of ${bmi}`
    case bmi < 30:
      return `Overweight with BMI of ${bmi}`
    case bmi < 40:
      return `Obese with BMI of ${bmi}`
    default:
      return `Severely obese with BMI of ${bmi}`
  }
}

console.log(calculateBmi(180, 74))