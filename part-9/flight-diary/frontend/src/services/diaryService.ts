import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";

const getAll = async (): Promise<NonSensitiveDiaryEntry[]> => {
  // you would want something more robust than this (proper validation that type of data from get request is as expected) in real code
  const response = await axios.get<NonSensitiveDiaryEntry[]>('http://localhost:3000/api/diaries');
  return response.data;
};

export default {getAll};