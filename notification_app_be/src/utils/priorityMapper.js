export const PRIORITY_WEIGHTS = {
  placement: 3,
  result: 2,
  event: 1,
};

export const compareTypes = (typeA, typeB) => {
  const weightA = PRIORITY_WEIGHTS[typeA.toLowerCase()] || 0;
  const weightB = PRIORITY_WEIGHTS[typeB.toLowerCase()] || 0;
  return weightB - weightA;
};

export const compareTimestamps = (tsA, tsB) => {
  return new Date(tsB) - new Date(tsA);
};
