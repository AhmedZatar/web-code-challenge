export const formatHeaderCase = (input: string): string => {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const titleCase = (str: string): string => {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};
