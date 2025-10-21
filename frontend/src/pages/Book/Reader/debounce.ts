export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  time: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    // clearing the previous timeout (invalidates the previous function call)
    clearTimeout(timeoutId);

    // registers the new timeout (registers the new function to call after the given time)
    timeoutId = setTimeout(() => {
      func(...args);
    }, time);
  };
};
