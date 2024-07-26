interface ContentProps {
  courseParts: CoursePart[];
}

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = (props: ContentProps): JSX.Element => {
  const { courseParts } = props;
  return <>
    {courseParts.map(coursePart => <p key={coursePart.name}>
      {coursePart.name} {coursePart.exerciseCount}
    </p>)}
  </>;
};

export default Content;