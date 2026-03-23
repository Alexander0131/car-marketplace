export function getDate(format) {
  const d = new Date();

  const map = {
    DD: String(d.getDate()).padStart(2, "0"),
    MM: String(d.getMonth() + 1).padStart(2, "0"),
    YYYY: d.getFullYear(),
    YY: String(d.getFullYear()).slice(-2),
  };

  return format.replace(/DD|MM|YYYY|YY/g, (match) => map[match]);
}