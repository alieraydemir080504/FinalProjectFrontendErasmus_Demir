import type { Training, TrainingForm } from "./types";

const BASE = "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi";

export async function fetchTrainings(): Promise<Training[]> {
  const res = await fetch(`${BASE}/api/gettrainings`);
  const data = await res.json();
  return data;
}

export function addTraining(training: TrainingForm) {
  return fetch(`${BASE}/api/trainings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(training),
  });
}

export function deleteTraining(id: number) {
  return fetch(`${BASE}/api/trainings/${id}`, {
    method: "DELETE",
  });
}
