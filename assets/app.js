const API_KEY = "d96b6507";
const form = document.querySelector(".search-form");
const input = document.querySelector("#movie-search");

async function getMovie(movieName) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${movieName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // Mavjud container ni topish yoki yangisini yaratish
    let container = document.querySelector(".movie-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "movie-container";
      document.body.appendChild(container);
    }

    const moviePoster = document.createElement("div");
    moviePoster.className = "movie-poster";
    moviePoster.innerHTML = `
      <img src="${data.Poster}" alt="${data.Title}">
      <h2>${data.Title}</h2>
      <p>${data.Year}</p>
    `;

    container.appendChild(moviePoster);
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieName = input.value.trim();
  if (movieName) {
    getMovie(movieName);
  }
  form.reset();
});
