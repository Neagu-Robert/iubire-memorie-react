export const preferatePersonalePhotos = Array.from({ length: 51 }, (_, i) => ({
  id: i + 1,
  src: `/photos/preferatele_mele/${i + 1}.jpg`,
  alt: `Fotografie preferată ${i + 1}`,
}));
