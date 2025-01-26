const biotypeColors: Record<string, string> = {};
const chromosomeColors: Record<string, string> = {};

export const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join("")}`;
};

export const getBiotypeColor = (biotype: string): string => {
  if (!biotypeColors[biotype]) biotypeColors[biotype] = getRandomColor();
  return biotypeColors[biotype];
};

export const getChromosomeColor = (chromosome: string): string => {
  if (!chromosomeColors[chromosome]) chromosomeColors[chromosome] = getRandomColor();
  return chromosomeColors[chromosome];
};
