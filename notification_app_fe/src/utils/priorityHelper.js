const PRIORITY_WEIGHTS = {
  placement: 3,
  result: 2,
  event: 1,
};

export const sortNotifications = (notifications) => {
  if (!notifications) return [];
  
  return [...notifications].sort((a, b) => {
    const weightA = PRIORITY_WEIGHTS[a.type.toLowerCase()] || 0;
    const weightB = PRIORITY_WEIGHTS[b.type.toLowerCase()] || 0;
    
    if (weightB !== weightA) {
      return weightB - weightA;
    }
    
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
};
