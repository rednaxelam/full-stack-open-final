interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps): JSX.Element => {
  const { totalExercises } = props;
  return <p>Total number of exercises: { totalExercises }</p>;
};

export default Total;