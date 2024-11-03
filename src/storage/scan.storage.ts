export const getLastScan = () => {
  return localStorage.getItem("last-scan");
}

export const saveLastScan = (content: string) => {
  localStorage.setItem("last-scan", content);
}
