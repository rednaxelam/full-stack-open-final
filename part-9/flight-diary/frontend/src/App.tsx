import diaryService from "./services/diaryService";
import { NonSensitiveDiaryEntry } from "./types";
import { useState, useEffect } from "react";
import DiaryList from "./components/DiaryList";
import AddDiary from "./components/AddDiary";
import Notification from "./components/Notification";
import { NotificationObject } from "./components/Notification";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState<NotificationObject>({message: '', outcome: 'other'});

  const displayMessage = (message: string, outcome: 'success' | 'failure' | 'other'): void => {
    setNotification({ message, outcome });
    setTimeout(() => {
      setNotification({ message: '', outcome: 'other' });
    }, 5000);
  };

  useEffect(() => {
    diaryService.getAll().then(entries => setDiaryEntries(entries));
  }, []);

  return <>
    <Notification notificationObject={notification}/>
    <AddDiary displayMessage={displayMessage} />
    <DiaryList nonSensitiveDiaryEntries={diaryEntries} />
  </>;
}

export default App;
