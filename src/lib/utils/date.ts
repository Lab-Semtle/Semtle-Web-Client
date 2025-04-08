/**
 * 날짜 문자열을 YYYY.MM.DD 형식으로 포맷팅
 * @param dateStr - 날짜 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (dateStr?: string) => {
  if (!dateStr) return '미정';

  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based month
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
