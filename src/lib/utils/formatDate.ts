export const formatDate = (timedate) => {
  const date = new Date(timedate).getDate();
  const month = new Date(timedate).getMonth();
  const year = new Date(timedate).getFullYear();
  const hours = new Date(timedate).getHours();
  const minutes = new Date(timedate).getMinutes();

  return `${date}.${month + 1}.${year}, ${hours}:${minutes}`;
};
