import express from "express";

const app = express();

app.get('/hello', (_req, res) => {
  res.json('Hello Full Stack!')
})

const PORT: number = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})