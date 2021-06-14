const API_KEY = "api_key=f457a222902c8e9e2549a719819d75dd&language=pt-BR";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie/?" + API_KEY;

const pontos = document.getElementById("pontos");
const resultado = document.getElementById("resultado");
const search = document.getElementById("search");
const form = document.getElementById("form");
const imagem = document.getElementsByClassName("imagem");
const item = document.getElementById("item");
const button = document.getElementById("btn-info");

function getAllMovies(url) {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			showAllMovies(data.results);
		});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const searchTerm = search.value;

	if (searchTerm) {
		getAllMovies(searchURL + "&page=1&query=" + searchTerm);
		getAllMovies(searchURL + "&page=2&query=" + searchTerm);
		getAllMovies(searchURL + "&page=3&query=" + searchTerm);
		getAllMovies(searchURL + "&page=4&query=" + searchTerm);
		getAllMovies(searchURL + "&page=5&query=" + searchTerm);
		getAllMovies(searchURL + "&page=6&query=" + searchTerm);
		getAllMovies(searchURL + "&page=7&query=" + searchTerm);
	}

	resultado.innerHTML = "";
});

function showAllMovies(data) {
	data.forEach((movie) => {
		const { title, poster_path, vote_average, overview, id } = movie;

		const movieEl = document.createElement("div");
		if (poster_path != null && overview != "") {
			movieEl.classList.add("movie");
			movieEl.addEventListener("click", function () {
				goTo(movie);
			});
			movieEl.innerHTML = ` 
      <img src="${IMG_URL + poster_path}" alt="${title}">    
  `;
			resultado.appendChild(movieEl);
		}
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

function goTo(movie) {
	const {
		title,
		poster_path,
		vote_average,
		overview,
		release_date,
		original_language,
		id,
	} = movie;
	let firstDate = new Date(release_date);

	item.innerHTML = "";
	item.style =
		"position: fixed;  display: flex; justify-content: center; align-items: center; top: 0; bottom: 0; left:0; right: 0; max-height: 3000px; margin: 0 auto; background-color: rgba(0, 0, 0, 0.7)";

	const cardfilme = document.createElement("div");
	cardfilme.classList.add("card-filme");
	cardfilme.innerHTML = ` 
      <div class="imagem-info">
        <img src="${IMG_URL + poster_path}" alt="${title}">
      </div>
      
      <div class="conteudo-descricao">
        <i id="icone" class="far fa-times-circle"></i>
        
        <div class="descricao-completa">

          <div class="descricao-info">
            <h2>${title}</h2>
            
          </div>
          
          <p>${overview}</p>
          
          <p id="pontos" style="color: ${getColor(
						vote_average
					)}; margin-top: 10px;" >${vote_average} pontos</p>

          <p>Idioma original: <strong>${original_language}</strong></p>

          <p>Data de lançamento: <strong>${firstDate.getFullYear()}</strong></p>

          <a class="link-movie" target="_blank" href="https://www.themoviedb.org/movie/${id}">Saiba mais</a>
        </div>
  `;
	item.appendChild(cardfilme);

	const icone = document.getElementById("icone");
	icone.addEventListener("click", function () {
		close(cardfilme);
	});
}

function close(cardfilme) {
	cardfilme.remove();
	item.style = "";
}
