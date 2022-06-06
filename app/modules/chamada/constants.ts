import { addDays } from "date-fns/fp";

export const datasDasAulas = [
  "2022-08-10",
  "2022-08-17",
  "2022-08-24",
  "2022-08-31",
  "2022-09-07",
  "2022-09-14",
  "2022-09-21",
  "2022-09-28",
  "2022-10-05",
  "2022-10-12",
  "2022-10-19",
  "2022-10-26",
  "2022-11-02",
  "2022-11-09",
  "2022-11-16",
  "2022-11-23",
  "2022-11-30",
  "2022-12-07",
  "2022-12-14",
  "2022-12-21",
];

export const datasDasAulasFormatadas = datasDasAulas
  .map((str) => new Date(str))
  .map(addDays(1))
  .map((date) => date.toLocaleDateString("pt-BR"));
