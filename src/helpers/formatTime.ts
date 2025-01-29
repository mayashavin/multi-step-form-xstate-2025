const format = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export type Time = {
  day: string;
  month: string;
  year: string;
};

export const formatTime = (time: Date) => {
  const [{ value: month }, , { value: day }, , { value: year }] =
    format.formatToParts(time);

  return {
    day,
    month,
    year,
  };
};

export const formatByDay = (date: string) => {
  const time = formatTime(new Date(date));
  return `${time.month} ${time.day}, ${time.year}`;
};

export const sortByDate = (dateA: string, dateB: string) =>
  new Date(dateB) - new Date(dateA);

export default formatTime;
