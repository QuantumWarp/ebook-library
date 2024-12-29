const lastScanKey = "ebook-library-scan";

export const getLastScan = () => {
  return localStorage.getItem(lastScanKey);
}

export const saveLastScan = (content: string) => {
  localStorage.setItem(lastScanKey, content);
}
