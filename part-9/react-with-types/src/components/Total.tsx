interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps): JSX.Element => {
  const { totalExercises } = props;
  return <p>{ totalExercises }</p>;
};

export default Total;