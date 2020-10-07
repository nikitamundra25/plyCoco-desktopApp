Array.prototype.findInfo = function(
  keyToSearch: string,
  searchBy: string[] | number[] = [],
  keyToGet: string = ""
) {
  const result: any = [];
  for (let i = 0; i < this.length; i++) {
    const element: never = this[i] as never;
    if (searchBy.indexOf(element[keyToSearch]) > -1) {
      result.push(element[keyToGet || keyToSearch]);
    }
  }
  return result;
};

export {};
