import { NewDiaryEntry } from "../types";
import toNewDiaryEntry from "../utils/utils";
import diaryService from "../services/diaryService";
import { useState } from "react";


const AddDiary = (): JSX.Element => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const updateTextualFormElement = (stateUpdater: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => stateUpdater(event.currentTarget.value);
  };

  const handleError = (error: unknown): void => {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Something went wrong ig');
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const unvalidatedDiaryEntry: unknown = {date, visibility, weather, comment};
    try {
      const newDiaryEntry: NewDiaryEntry = toNewDiaryEntry(unvalidatedDiaryEntry);
      try {
        diaryService.postDiary(newDiaryEntry);
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
      } catch (error: unknown) {
        handleError(error);
      }
    } catch (error: unknown) {
      handleError(error);
    }
  };

  return <form onSubmit={handleSubmit}>
    <h2>Add New Entry</h2>
    <div>
      <label htmlFor="date">date: </label>
      <input type="text" id="date" name="date" value={date} onInput={updateTextualFormElement(setDate)}/>
    </div>
    <div>
      <label htmlFor="visibility">visibility: </label>
      <input type="text" id="visibility" name="visibility" value={visibility} onInput={updateTextualFormElement(setVisibility)}/>
    </div>
    <div>
      <label htmlFor="weather">weather: </label>
      <input type="text" id="weather" name="weather" value={weather} onInput={updateTextualFormElement(setWeather)}/>
    </div>
    <div>
      <label htmlFor="comment">comment: </label>
      <input type="text" id="comment" name="comment" value={comment} onInput={updateTextualFormElement(setComment)}/>
    </div>
    <button type="submit">add entry</button>
  </form>;
};

export default AddDiary;