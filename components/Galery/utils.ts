export const getGridSize = (length: number) => (length > 3 ? 3 : length === 3 ? 4 : 6);

export const getImageUrl = (appApi: string, imagePath: string, length: number) => {
  return `${appApi}${imagePath}?format=webp&resize=${
    length > 3 ? "360" : length === 3 ? "410" : "600"
  }x285`;
};