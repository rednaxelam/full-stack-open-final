import { NonSensitiveDiaryEntry } from "../types";

interface DiaryElementProps {
  nonSensitiveDiaryEntry: NonSensitiveDiaryEntry;
}

const DiaryElement = (props: DiaryElementProps): JSX.Element => {
  const { nonSensitiveDiaryEntry } = props;
  return <div>
    <strong>{nonSensitiveDiaryEntry.date}</strong> <br /> <br />
    <div>
      visibility: {nonSensitiveDiaryEntry.visibility} <br />
      weather: {nonSensitiveDiaryEntry.weather}
    </div>
    <br />
  </div>;
};

export default DiaryElement;