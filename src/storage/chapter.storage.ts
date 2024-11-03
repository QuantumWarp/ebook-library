export const getChapterContent = (chapterId: string): string => {
  const content = localStorage.getItem(`chapter-${chapterId}`);
  return content || "";
}

export const saveChapterContent = (chapterId: string, content: string): void => {
  localStorage.setItem(`chapter-${chapterId}`, content);
}

export const deleteChapterContent = (chapterId: string): void => {
  localStorage.removeItem(`chapter-${chapterId}`);
}
