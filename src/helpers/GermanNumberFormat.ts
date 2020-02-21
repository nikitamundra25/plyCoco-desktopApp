export const germanNumberFormat = (value: number) => {
  let n = new Number(value);
  let options: any = {
    maximumFractionDigits: '2',
    minimumFractionDigits: '2',
    useGrouping: false,
  };
  return n.toLocaleString('de-DE', options);
};
