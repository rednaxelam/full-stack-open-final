import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const getAll = async (): Promise<NonSensitiveDiaryEntry[]> => {
  // you would want something more robust than this (proper validation that type of data from get request is as expected) in real code
  const response = await axios.get<NonSensitiveDiaryEntry[]>('http://localhost:3000/api/diaries');
  return response.data;
};

const postDiary = async (diaryEntry: NewDiaryEntry): Promise<NonSensitiveDiaryEntry> => {
  const response = await axios.post<NonSensitiveDiaryEntry>('http://localhost:3000/api/diaries', diaryEntry);
  return response.data;
};

export default { getAll, postDiary };