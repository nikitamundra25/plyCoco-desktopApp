/*  */
String.prototype.isNullOrWhitespace = function(): boolean {
  const input = String(this);
  // tslint:disable-next-line: typeof-compare
  if (typeof input === undefined || input == null) {
    return true;
  }

  return input.replace(/\s/g, "").length < 1;
};
String.prototype.isValidEmail = function(): boolean {
  const email = String(this);
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
String.prototype.truncate = function(n: number, decorator?: string): string {
  return (this.length > n
    ? this.substring(0, n - 1) + decorator || "..."
    : this
  ).toString();
};
String.prototype.trimAllSpace = function() {
  const input = String(this);
  return input.replace(/\s/g, "");
};

export {};
