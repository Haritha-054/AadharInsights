const BASE_URL = "https://aadharinsights-backend.onrender.com";

export async function fetchSummary() {
  const res = await fetch(`${BASE_URL}/summary`);
  return await res.json();
}

export async function fetchDistricts() {
  const res = await fetch(`${BASE_URL}/districts`);
  const data = await res.json();
  console.log("District data received:", data);
  return data;
}

export const fetchFrictionAge = async () => {
  const res = await fetch(`${BASE_URL}/friction-age-analysis`);
  return res.json();
};
