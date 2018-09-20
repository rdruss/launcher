export function checkNotNull<T>(param?: T, name : string = 'param'): T {
  if (!param) {
    throw new Error(`${name} must be defined.`);
  }
  return param;
}