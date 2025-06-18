export const toggle = (
  setFn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return () => setFn((prev) => !prev);
};
