const API_KEY = "d96b6507";
const form = document.querySelector(".search-form");
const input = document.querySelector("#movie-search");

const recommendedMovies = [
  "Avatar",
  "Titanic",
  "The Avengers",
  "Inception",
  "The Dark Knight",
  "Interstellar",
  "The Matrix",
  "Forrest Gump",
];

async function loadRecommendedMovies() {
  const container = document.createElement("div");
  container.className = "recommendations-container";
  document.body.appendChild(container);

  for (const movie of recommendedMovies) {
    try {
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        const card = document.createElement("div");
        card.className = "recommendation-card";
        card.innerHTML = `
          <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/200x280?text=No+Image"}" 
               alt="${data.Title}">
          <div class="card-content">
            <h3>${data.Title}</h3>
            <p class="movie-year">${data.Year}</p>
            <p class="movie-rating">⭐ ${data.imdbRating || "N/A"}</p>
            <p class="movie-description">${data.Plot || "No description available"}</p>
          </div>
        `;

        card.addEventListener("click", () => {
          input.value = data.Title;
          getMovie(data.Title);
        });

        container.appendChild(card);
      }
    } catch (error) {
      console.error(`Error loading ${movie}:`, error);
    }
  }
}

async function getMovie(movieName) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${movieName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    let container = document.querySelector(".recommendations-container");

    const firstCard = container.querySelector(".recommendation-card");
    if (firstCard) {
      firstCard.innerHTML = `
        <img src="${data.Poster}" alt="${data.Title}">
        <div class="card-content">
          <h3>${data.Title}</h3>
          <p class="movie-year">${data.Year}</p>
          <p class="movie-rating">⭐ ${data.imdbRating || "N/A"}</p>
          <p class="movie-description">${data.Plot || "No description available"}</p>
        </div>
      `;

      firstCard.onclick = () => {
        window.open(`https://www.imdb.com/title/${data.imdbID}/`, "_blank");
      };
    }
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

loadRecommendedMovies();
