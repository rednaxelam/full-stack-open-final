import { NonSensitiveDiaryEntry } from "../types";
import DiaryElement from "./DiaryElement";

interface DiaryListProps {
  nonSensitiveDiaryEntries: NonSensitiveDiaryEntry[];
}

const DiaryList = (props: DiaryListProps): JSX.Element => {
  const { nonSensitiveDiaryEntries } = props;
  return <div>
    <h2>Diary Entries</h2>
    {nonSensitiveDiaryEntries.map(entry => <DiaryElement key={entry.id} nonSensitiveDiaryEntry={entry}/>)}
    {[]}
  </div>;
};

export default DiaryList;