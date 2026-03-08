export const prepareOptionsForSave = (options: {value: string}[]) => {
  return options.map((option) => option.value);
}