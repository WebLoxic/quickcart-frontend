export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Common API fetch
async function fetchAPI(endpoint) {

  const res = await fetch(`${API_URL}/${endpoint}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API Error: ${endpoint}`);
  }

  return res.json();
}

// Products API
export async function getProducts() {

  const data = await fetchAPI("products");

  return data.products || [];
}

// Sliders API
export async function getSliders() {

  const data = await fetchAPI("sliders");

  return data || [];
}