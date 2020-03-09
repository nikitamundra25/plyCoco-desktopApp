export const timeDiffernce = (start: any, end: any) => {
  start = start.split(':');
  end = end.split(':');
  let startDate = new Date(0, 0, 0, start[0], start[1], 0);
  let endDate = new Date(0, 0, 0, end[0], end[1], 0);
  let diff = endDate.getTime() - startDate.getTime();
  let hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  let minutes = Math.floor(diff / 1000 / 60);

  return (
    (hours < 9 ? '0' : '') + hours + ':' + (minutes < 9 ? '0' : '') + minutes
  );
};
