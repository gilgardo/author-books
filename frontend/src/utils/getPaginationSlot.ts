type Slot =
  | { isEllipsis: false; page: number }
  | { isEllipsis: true; page: null };

export function getPaginationSlots(page: number, maxPage: number): Slot[] {
  if (maxPage <= 7) {
    return Array.from({ length: maxPage }, (_, i) => ({
      page: i + 1,
      isEllipsis: false,
    }));
  }

  const slots: Slot[] = [];

  if (page <= 4) {
    for (let p = 1; p <= 5; p++) slots.push({ page: p, isEllipsis: false });
    slots.push({ page: null, isEllipsis: true });
    slots.push({ page: maxPage, isEllipsis: false });
    return slots;
  }
  if (page >= maxPage - 3) {
    slots.push({ page: 1, isEllipsis: false });
    slots.push({ page: null, isEllipsis: true });
    for (let p = maxPage - 4; p <= maxPage; p++)
      slots.push({ page: p, isEllipsis: false });
    return slots;
  }

  slots.push({ page: 1, isEllipsis: false });
  slots.push({ page: null, isEllipsis: true });
  slots.push({ page: page - 1, isEllipsis: false });
  slots.push({ page, isEllipsis: false });
  slots.push({ page: page + 1, isEllipsis: false });
  slots.push({ page: null, isEllipsis: true });
  slots.push({ page: maxPage, isEllipsis: false });
  return slots;
}
