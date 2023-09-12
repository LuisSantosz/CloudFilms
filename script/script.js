const API_KEY = '6ddb7299';
const searchInput = document.getElementById('searchInput');
let novaJanela = null; // Variável global para a nova aba

function searchMovies() {
    const searchTerm = searchInput.value.trim(); // Remova espaços em branco no início e no final

    if (!searchTerm) {
        alert('Por favor, digite um título de filme para buscar.');
        return;
    }

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`;

    fetch(url)
        .then(handleResponse)
        .then(data => {
            if (data.Response === 'True') {
                const movies = data.Search;
                openNewWindow(movies);
            } else {
                alert('Nenhum filme encontrado.');
            }
        })
        .catch(handleError);
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Erro ao buscar filmes.');
    }
    return response.json();
}

function handleError(error) {
    alert(`Erro: ${error.message}`);
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    // Aplicar estilos CSS aos elementos do cartão de filme
    movieCard.style.width = '20%'; // Largura em relação à largura da tela (20% significa 20% da largura da tela)
    movieCard.style.marginRight = '1%'; // Espaçamento entre os cartões (1% da largura da tela)
    movieCard.style.float = 'left'; // Alinhar os cartões à esquerda

    const poster = movie.Poster !== 'N.A.' ? movie.Poster : 'no-poster.png';
    const img = document.createElement('img');
    img.src = poster;
    img.alt = `${movie.Title} Poster`;
    img.style.width = '100%'; // Garantir que a imagem preencha o cartão
    movieCard.appendChild(img);

    const title = document.createElement('h2');
    title.textContent = movie.Title;
    movieCard.appendChild(title);

    const year = document.createElement('p');
    year.textContent = `Ano: ${movie.Year}`;
    movieCard.appendChild(year);

    const type = document.createElement('p');
    type.textContent = `Tipo: ${movie.Type}`;
    movieCard.appendChild(type);

    return movieCard;
}




// Adicione este código para abrir a nova janela/aba com os filmes
function openNewWindow(movies) {
    novaJanela = window.open('', '_blank');

    if (novaJanela) {
        novaJanela.document.write('<h1>Resultados da pesquisa:</h1>');

        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            novaJanela.document.body.appendChild(movieCard);
        });
    } else {
        alert('Não foi possível abrir uma nova aba.');
    }
}

