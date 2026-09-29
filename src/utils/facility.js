export const normalizeFacility = (facility = {}) => {
  const legacySlots =
    typeof facility.slots === "string"
      ? facility.slots
          .split(",")
          .map((slot) => slot.trim())
          .filter(Boolean)
      : [];

  return {
    ...facility,
    pricePerHour: Number(
      facility.pricePerHour ?? facility.price ?? 0,
    ),
    availableSlots: Array.isArray(facility.availableSlots)
      ? facility.availableSlots.filter(Boolean)
      : legacySlots,
  };
};

export const normalizeFacilities = (facilities = []) =>
  facilities.map(normalizeFacility);
