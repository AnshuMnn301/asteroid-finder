export const NASA_API = 'bdDy3XuuwoVkqbN7TXLNH7FLHPAMg1HCzHX4nV9I';

export interface AsteroidType {
  id: string;
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}
export async function getAsteroidInfo(astId: string) {
  try {
    const resp = await fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/${astId}?api_key=${NASA_API}`,
    );
    return await resp.json();
  } catch (e: any) {
    console.error(e.message);
    return null;
  }
}

export async function getRandAsteroid() {
  try {
    const resp = await fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API}`,
    );
    const data = await resp.json();
    const asteroids: AsteroidType[] = data?.near_earth_objects;
    return asteroids[Math.floor(Math.random() * asteroids.length)];
  } catch (e: any) {
    console.error(e.message);
    return null;
  }
}
