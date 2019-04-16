export function defaultIfEmpty(val: string | undefined, def: string): string {
  return (val && val.length > 0) ? val : def;
}

export function undefinedIfEmpty(val: string | undefined): string | undefined {
  return (val && val.length > 0) ? val : undefined;
}

export function capitalizeFirstLetter(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}