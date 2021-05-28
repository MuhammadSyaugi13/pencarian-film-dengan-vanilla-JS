const searchBtn = document.querySelector('.search-button');
searchBtn.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('.input-key');
    const movies = await getMovies(inputKeyword.value);
    console.log(movies);
    updateUI(movies);
});

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=366f9702&s=' + keyword)
        .then(response => response.json())
        .then(response => response.Search);
};

function updateUI(movie) {
    let cards = '';

    movie.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}

// tombol detail
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('detail-btn')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getDetailMovie(imdbid);
        updateUIDetail(movieDetail);
    };
});

function getDetailMovie(idMovie) {
    return fetch('http://www.omdbapi.com/?apikey=366f9702&i=' + idMovie)
        .then(response => response.json())
        .then(m => m);
};

function updateUIDetail(dataMovies) {
    // masukan data argumen kedalam func tampilan detail movie
    const detailMovie = showMovieDetail(dataMovies);
    // masukan tampilan detail ke modal
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = detailMovie;
}





function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3"><img src="${m.Poster}" class="img-fluid" alt=""></div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director :</strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong> ${m.Actors} </li>
                        </ul>
                    </div>
                </div>
            </div>`;
}

function showCards(m) {
    return `<div class="col-md-4 my-5">
    <div class="card" style="width: 18rem;">
        <img src="${m.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>

            <a href="#" class="btn btn-primary detail-btn" data-bs-toggle="modal" data-bs-target="#dataTargetModal" data-imdbid="${m.imdbID}">Show Detail</a>
        </div>
    </div>
</div>`;
}