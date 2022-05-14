export const updateObject = (oldObj, updatedValues) => {
  return {
    ...oldObj,
    ...updatedValues,
  };
};
