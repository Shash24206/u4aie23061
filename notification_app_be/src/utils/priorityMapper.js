export const PRIORITY_WEIGHTS = {
  placement: 3,
  result: 2,
  event: 1,
};

/**
 * Compares two notification types based on priority weights.
 * @param {string} typeA 
 * @param {string} typeB 
 * @returns {number}
 */
export const compareTypes = (typeA, typeB) => {
  const weightA = PRIORITY_WEIGHTS[typeA.toLowerCase()] || 0;
  const weightB = PRIORITY_WEIGHTS[typeB.toLowerCase()] || 0;
  return weightB - weightA; // Higher weight first
};

/**
 * Compares two timestamps.
 * @param {string} tsA 
 * @param {string} tsB 
 * @returns {number}
 */
export const compareTimestamps = (tsA, tsB) => {
  return new Date(tsB) - new Date(tsA); // Newer first
};
