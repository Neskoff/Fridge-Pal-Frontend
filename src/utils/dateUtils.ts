const splitIsoDateTime = (date: Date) => {
  const offsetDate = new Date(date.toString());

  const dateString = offsetDate.toLocaleDateString();
  const timeString = offsetDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { dateString, timeString };
};

export default splitIsoDateTime;
