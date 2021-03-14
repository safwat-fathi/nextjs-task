// const baseUrl = process.env.BASE_URL
// const baseUrl = "http://80.240.21.204:1337/news?skip=12&limit=10";

export default async function fetchQuery(limit) {
  const response = await fetch(
    `http://80.240.21.204:1337/news?skip=12&limit=${limit}`
  );
  const data = await response.json();
  return data;
}
