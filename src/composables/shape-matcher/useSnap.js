export function useSnap(threshold = 50) {
  const calculateDistance = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const isSnapValid = (dragPos, targetPos) => {
    const distance = calculateDistance(
      dragPos.x,
      dragPos.y,
      targetPos.x,
      targetPos.y
    );
    return distance <= threshold;
  };

  return { isSnapValid, calculateDistance };
}