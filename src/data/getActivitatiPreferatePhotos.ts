import { activitatiPreferateCategories } from "../data/activitatiPreferatePhotos";

// Update the photoCounts array with the actual number of photos in each folder
const photoCounts = [
  16, // iesiri_romantice_oras
  20, // plimbari_relaxante
  4, // activitati_sportive
  13, // datul_leagan
  2, // cititul
  7, // sesiuni_gatit
  4, // jocurile
  8, // petrecut_timp_cu_cei_dragi
  3, // petrecut_timp_cu_tine
];

export function getActivitatiPreferatePhotos() {
  return activitatiPreferateCategories.map((cat, idx) => {
    const count = photoCounts[idx] || 0;
    const photos = Array.from(
      { length: count },
      (_, i) => `/photos/activitati_preferate/${cat.folder}/${i + 1}.jpg`
    );
    return { ...cat, photos };
  });
}
