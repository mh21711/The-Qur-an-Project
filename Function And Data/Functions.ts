// Number of Ayahs in each Surah
const ayahCountsPerSurah = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111,
  110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45,
  83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55,
  78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20,
  56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21,
  11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6,
];

// Function to get the global Ayah number based on Surah and Ayah numbers
export function getGlobalAyahNumber(surah: number, ayah: number) {
  // Validate inputs
  if (
    surah < 1 ||
    surah > 114 ||
    ayah < 1 ||
    ayah > ayahCountsPerSurah[surah - 1]
  ) {
    return null;
  }

  // Calculate global Ayah number by summing up Ayahs from previous Surahs
  let globalAyahNumber = 0;
  for (let i = 0; i < surah - 1; i++) {
    globalAyahNumber += ayahCountsPerSurah[i];
  }
  return globalAyahNumber + ayah;
}

// Function to get Surah and Ayah numbers based on the global Ayah number
export function getSurahAndAyah(globalAyahNumber: number) {
  if (globalAyahNumber < 1 || globalAyahNumber > 6236) {
    return null;
  }

  let cumulativeAyahCount = 0;
  for (
    let surahIndex = 0;
    surahIndex < ayahCountsPerSurah.length;
    surahIndex++
  ) {
    const ayahCount = ayahCountsPerSurah[surahIndex];

    if (globalAyahNumber <= cumulativeAyahCount + ayahCount) {
      return {
        surah: surahIndex + 1,
        ayah: globalAyahNumber - cumulativeAyahCount,
      };
    }
    cumulativeAyahCount += ayahCount;
  }
  return null;
}

// Function to get a random color from a predefined list
export const getRandomColor = () => {
  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
