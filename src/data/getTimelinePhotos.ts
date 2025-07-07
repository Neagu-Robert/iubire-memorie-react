import { timelineMilestones } from "../data/timelinePhotos";

// Utility to generate photo URLs for each milestone
// You should update the photoCounts array with the actual number of photos in each folder
const photoCounts = [
  13, // prima_excursie
  5, // prima_vizita
  6, // primul_festival_craciun
  6, // prima_oara_piscina
  7, // prima_excursie_munte
  3, // prima_ses_gatit
  5, // prima_iesire_rau
  5, // primul_filarmonica
  6, // primul_festival_medieval
  2, // prima_catan
  14, // prima_cort
  8, // prima_nunta
  7, // primul_craciun
  9, // prima_cabana_munte
  16, // prima_bunici
];

export function getTimelinePhotos() {
  return timelineMilestones.map((milestone, idx) => {
    const count = photoCounts[idx] || 0;
    const photos = Array.from(
      { length: count },
      (_, i) => `/photos/primul(a)/${milestone.folder}/${i + 1}.jpg`
    );
    return { ...milestone, photos };
  });
}
