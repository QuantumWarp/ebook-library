const chapterPrefix = "ebook-library-chapter-";

export const getChapterContent = (chapterId: string): string => {
  const content = localStorage.getItem(`${chapterPrefix}${chapterId}`);
  return content || "";
}

export const saveChapterContent = (chapterId: string, content: string): void => {
  localStorage.setItem(`${chapterPrefix}${chapterId}`, content);
}

export const deleteChapterContent = (chapterId: string): void => {
  localStorage.removeItem(`${chapterPrefix}${chapterId}`);
}
