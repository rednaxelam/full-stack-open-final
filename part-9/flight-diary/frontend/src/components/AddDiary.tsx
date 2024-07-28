import { NewDiaryEntry } from "../types";
import toNewDiaryEntry from "../utils/utils";
import diaryService from "../services/diaryService";
import { useState } from "react";
import axios from "axios";

interface AddDiaryProps {
  displayMessage: (message: string, outcome: 'success' | 'failure' | 'other') => void;
}

const AddDiary = (props: AddDiaryProps): JSX.Element => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const { displayMessage } = props;

  const updateTextualFormElement = (stateUpdater: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => stateUpdater(event.currentTarget.value);
  };

  const handleError = (error: unknown): void => {
    if (error instanceof Error) {
      displayMessage(error.message, 'failure');
    } else if (axios.isAxiosError(error)) {
      displayMessage(error.message, 'failure');
    } else {
      displayMessage('Something went wrong ig', 'failure');
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const unvalidatedDiaryEntry: unknown = {date, visibility, weather, comment};
    try {
      const newDiaryEntry: NewDiaryEntry = toNewDiaryEntry(unvalidatedDiaryEntry);
      try {
        await diaryService.postDiary(newDiaryEntry);
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
      <input type="date" id="date" name="date" value={date} onInput={updateTextualFormElement(setDate)}/>
    </div>
    <div>
      visibility:&nbsp;&nbsp;
      <label>great</label>
      <input type="radio" name="visibility" value={'great'} onChange={() => setVisibility('great')} />
      <label>good</label>
      <input type="radio" name="visibility" value={'good'} onChange={() => setVisibility('good')} />
      <label>ok</label>
      <input type="radio" name="visibility" value={'ok'} onChange={() => setVisibility('ok')} />
      <label>poor</label>
      <input type="radio" name="visibility" value={'poor'} onChange={() => setVisibility('poor')} />
    </div>
    <div>
      weather:&nbsp;&nbsp;
      <label>sunny</label>
      <input type="radio" name="weather" value={'sunny'} onChange={() => setWeather('sunny')} />
      <label>rainy</label>
      <input type="radio" name="weather" value={'rainy'} onChange={() => setWeather('rainy')} />
      <label>cloudy</label>
      <input type="radio" name="weather" value={'cloudy'} onChange={() => setWeather('cloudy')} />
      <label>stormy</label>
      <input type="radio" name="weather" value={'stormy'} onChange={() => setWeather('stormy')} />
      <label>windy</label>
      <input type="radio" name="weather" value={'windy'} onChange={() => setWeather('windy')} />
    </div>
    <div>
      <label htmlFor="comment">comment: </label>
      <input type="text" id="comment" name="comment" value={comment} onInput={updateTextualFormElement(setComment)}/>
    </div>
    <button type="submit">add entry</button>
  </form>;
};

export default AddDiary;