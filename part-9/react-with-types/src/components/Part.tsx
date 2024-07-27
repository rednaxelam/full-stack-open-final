import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps): JSX.Element => {
  const { coursePart } = props;
  switch (coursePart.kind) {
    case "basic":
      return <p>
        <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br />
        <em>{coursePart.description}</em>
      </p>;
    case "group":
      return <p>
        <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br />
        project exercises {coursePart.groupProjectCount}
      </p>;
    case "background":
      return <p>
        <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br />
        <em>{coursePart.description}</em> <br />
        link to material: {coursePart.backgroundMaterial}
      </p>;
    case "special":
      return <p>
        <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br />
        <em>{coursePart.description}</em> <br />
        <>requirements: {coursePart.requirements.map((req, index) => 
          index !== coursePart.requirements.length - 1 
            ? <span key={req}>{req}, </span> 
            : <span key={req}>{req}</span>)}
        </>
      </p>;
    default:
      return assertNever(coursePart);
  }
};

export default Part;