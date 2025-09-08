export const isValidUrl = (value) => {
  try {
    const u = new URL(value);
    return !!u.protocol && !!u.host;
  } catch(e) {
    return false;
  }
};

export const isPositiveInteger = (value) => {
  if (value === '' || value === null || value === undefined) return true; // optional
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
};

export const isValidShortcode = (value) => {
  if (!value) return true; // optional
  return /^[A-Za-z0-9_-]{3,20}$/.test(value);
};
