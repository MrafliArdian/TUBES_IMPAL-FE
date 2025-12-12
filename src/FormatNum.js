export const formatNumber = (value) => {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const unformatNumber = (value) => {
  if (!value) return "";
  return value.replace(/\./g, "");
};
