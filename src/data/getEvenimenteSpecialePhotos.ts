import { evenimenteSpecialeEvents } from "../data/evenimenteSpecialePhotos";

// Update the photoCounts array with the actual number of photos in each folder
const photoCounts = [
  7, // serbare_craciun
  4, // old_mill
  6, // nastere_familie
  17, // majorate
  10, // absolviri
  5, // iesiri_dragi
  8, // ziua_indragostitilor
];

export function getEvenimenteSpecialePhotos() {
  return evenimenteSpecialeEvents.map((event, idx) => {
    const count = photoCounts[idx] || 0;
    const photos = Array.from(
      { length: count },
      (_, i) => `/photos/evenimente_speciale/${event.folder}/${i + 1}.jpg`
    );
    return { ...event, photos };
  });
}
