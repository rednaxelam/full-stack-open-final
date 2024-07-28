import diaryService from "./services/diaryService";
import { NonSensitiveDiaryEntry } from "./types";
import { useState, useEffect } from "react";
import DiaryList from "./components/DiaryList";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(entries => setDiaryEntries(entries));
  }, []);

  return <>
    <DiaryList nonSensitiveDiaryEntries={diaryEntries} />
  </>;
}

export default App;
