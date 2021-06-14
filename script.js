// TMDB

const API_KEY = "api_key=f457a222902c8e9e2549a719819d75dd&language=pt-BR";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BG_URL = "https://image.tmdb.org/t/p/original";

const most_popular =
	BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const top_rated =
	BASE_URL +
	"/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc" +
	API_KEY;
const searchURL = BASE_URL + "/search/movie/?" + API_KEY;

const destaque = document.getElementById("destaque");
const principal = document.getElementById("filme-principal");
const pontos = document.getElementById("pontos");
const resultado = document.getElementById("resultado");
const search = document.getElementById("search");
const form = document.getElementById("form");
const imagem = document.getElementsByClassName("imagem");

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

getMovies(most_popular + `&page=${getRandomInt(1, 10)}`);

function getMovies(url) {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			showMovies(data.results);
			showPrincipal(data.results);
			console.log(data);
		});
}

function showPrincipal(data) {
	// get random index value
	const randomIndex = Math.floor(Math.random() * data.length);

	// get random item
	const items = data[randomIndex];

	let firstDate = new Date(items.release_date);

	principal.style = `background-image: url("${
		BG_URL + items.backdrop_path
	}"); background-size: cover;`;

	principal.innerHTML = ` 
  <div class="vertical">
    <div class="horizontal">
      <div class="conteudo-principal">
          <h1> ${items.title} </h1>
          <div class="principal-info">
            <div id="pontos" style="color: ${getColor(items.vote_average)}" >${
		items.vote_average
	} pontos</div>
            <div>${firstDate.getFullYear()}</div>
          </div>
          <p>${items.overview}</p>
      </div>
    </div>
  </div>
  `;
}

function showMovies(data) {
	destaque.innerHTML = "";

	data.forEach((movie) => {
		const { title, poster_path, vote_average, overview, id } = movie;
		const movieEl = document.createElement("div");
		movieEl.classList.add("movie");
		movieEl.addEventListener("click", goTo);
		movieEl.innerHTML = ` 
    <img src="${IMG_URL + poster_path}" alt="${title}">
    
    <div class="overview">
      <div class="movie-info">
        <h3>${title}</h3>
      </div>
      <p>
      ${overview}
      </p>
			<div id="pontos-btn">
				<div id="pontos" style="color: ${getColor(
					vote_average
				)}; margin-top: 10px;" >${vote_average} pontos</div>
				<a class="link-movie" target="_blank" href="https://www.themoviedb.org/movie/${id}">Saiba mais</a>
			</div>
    </div>
`;
		destaque.appendChild(movieEl);
	});
}

function getColor(vote) {
	if (vote >= 8) {
		return "green";
	} else if (vote >= 5) {
		return "orange";
	} else {
		return "red";
	}
}

function goTo() {
	console.log("teste");
}
