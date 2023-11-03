//create route
const global = {
     currentLocation: window.location.pathname,
     api:{
          apiKey: '2ebeef07bc5151a9b570bd9973fe800f',
          apiURL: 'https://api.themoviedb.org/3'
     },
     search:{
          type: '',
          term: '',
          page: 1,
          total_pages: 1,
     }
};

// display fetched data
async function displayPopularMovies(){
     const { results } = await fetchAPIData('movie/popular');
     results.forEach(movie => {
          // console.log(movie);
          const div = document.createElement('div');
          div.classList.add('card');
          div.innerHTML = `
               <a href="movie-details.html?id=${movie.id}">
               ${
                    movie.poster_path 
                    ?
                    `<img
                    src="https://www.themoviedb.org/t/p/w500/${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}
                    />`:
                    `<img
                    src="../images/no-images.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
               }
               </a>
               <div class="card-body">
               <h5 class="card-title">${movie.title}</h5>
               <p class="card-text">
               <small class="text-muted">Release: ${movie.release_date}</small>
               </p>
          </div>`;
          document.getElementById('popular-movies').appendChild(div);
     })
}

async function displaySwiper(){
     const { results } = await fetchAPIData('movie/now_playing');
     console.log(results);
     
     results.forEach((result) => {
          const div = document.createElement('div');
          div.classList.add('swiper-slide');
          div.innerHTML = `
               <a href="movie-details.html?id=${result.id}">
                    <img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="${movie.title}" />
               </a>
               <h4 class="swiper-rating">
                    <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(1)} / 10
               </h4>
          `;
          document.querySelector('.swiper-wrapper').appendChild(div);
          initSwiper();
     });
}

function initSwiper(){
     const swiper = new Swiper('.swiper', {
          slidesPerView: 1,
          spaceBetween: 30,
          freeMode: true,
          loop: true,
          autoplay:{
               delay: 4000,
               disableOnInteraction: false
          },
          // Responsive breakpoints
          breakpoints: {
          // when window width is >= 500px
               500: {
                    slidesPerView: 2
               },
               // when window width is >= 700px
               700: {
                    slidesPerView: 3
               },
               // when window width is >= 1200px
               1200: {
                    slidesPerView: 4
               },
          }
        });
}

async function displayPopularShows(){
     const { results } = await fetchAPIData('tv/popular');
     results.forEach(show => {
          // console.log(show);
          const div = document.createElement('div');
          div.classList.add('card');
          div.innerHTML = `
               <a href="tv-details.html?id=${show.id}">
               ${
                    show.poster_path ?
                    `<img
                    src="https://www.themoviedb.org/t/p/w500/${show.poster_path}"
                    class="card-img-top"
                    alt="Show Title"
                    />` :
                    `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="Show Title"
                    />`
               }
               </a>
               <div class="card-body">
                    <h5 class="card-title">${show.name}</h5>
                    <p class="card-text">
                    <small class="text-muted">
                    Aired: ${show.first_air_date}
                    </small>
                    </p>
               </div>`;
          document.querySelector('#popular-shows').appendChild(div);
     })
}

async function displayMovieDetails(){
     const movieId = window.location.search.split('=')[1];
     console.log(movieId);
     const movie = await fetchAPIData(`/movie/${movieId}`);
     addBackgroundImage('movie', movie.backdrop_path);
     console.log(movie);
     const div = document.createElement('div');
     // div.classList.add('details-top');
          div.innerHTML = `
          <div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
              : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommas(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommas(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
            ${movie.production_companies
              .map((company) => `<span>${company.name}</span>`)
              .join(', ')}
          </div>
        </div>
          `;
          document.querySelector('#movie-details').appendChild(div);
}

async function displayTVDetails(){
     const tvId = window.location.search.split('=')[1];
     console.log(tvId);
     const results = await fetchAPIData(`/tv/${tvId}`);
     addBackgroundImage('show', results.backdrop_path)
     console.log(results);
     const div = document.createElement('div');
     div.innerHTML = `
          <div class="details-top">
               <div>
               ${
                    results.poster_path ?
                    `<img
                    src="https://www.themoviedb.org/t/p/w500/${results.poster_path}"
                    class="card-img-top"
                    alt="${results.name}"
                    />` :
                    `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${results.name}"
                    />`
               }
               </div>
                    <div>
                    <h2>${results.name}</h2>
                    <p>
                    <i class="fas fa-star text-primary"></i>
                    ${results.vote_average.toFixed(1)} / 10
                    </p>
                    <p class="text-muted">Release Date: ${results.first_air_date}</p>
                    <p>
                    ${results.overview}
                    </p>
                    <h5>Genres</h5>
                    <ul class="list-group">
                    ${results.genres.map( genre => genre.name).join(', ')}
                    </ul>
                    <a href="${results.homepage}" target="_black" class="btn">Visit Show Homepage</a>
               </div>
          </div>
          <div class="details-bottom">
               <h2>Show Info</h2>
               <ul>
               <li><span class="text-secondary">Number Of Episodes:</span> ${results.number_of_episodes}</li>
               <li>
               <span class="text-secondary">Last Episode To Air:</span> ${results.last_episode_to_air.name}
               </li>
               <li><span class="text-secondary">Status:</span> ${results.status}</li>
               </ul>
               <h4>Production Companies</h4>
               <div class="list-group">${results.production_companies.map(company => company.name).join(', ')}</div>
          </div>
     `;
     document.querySelector('#show-details').appendChild(div);
}

function addBackgroundImage(type, path){
     console.log(path);
     const overleImage = document.createElement('div');
     overleImage.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${path})`;
     console.log(`https://image.tmdb.org/t/p/original${path}`)
     overleImage.style.backgroundSize = 'cover';
     overleImage.style.backgroundPosition = 'center';
     overleImage.style.backgroundRepeat = 'no-repeat';
     overleImage.style.width = '100vh';
     overleImage.style.height = '100vh';
     overleImage.style.position = 'absolute';
     overleImage.style.top = '0';
     overleImage.style.left = '0';
     overleImage.style.zIndex = '-1';
     overleImage.style.opacity = '0.1';


     if(type === 'movie'){
          document.querySelector('#movie-details').appendChild(overleImage);
     }else{
          document.querySelector('#show-details').appendChild(overleImage);
     }
     
}

function addCommas(number) {
     // Convert the number to a string.
     const numberString = number.toString();
   
     // Split the string at the decimal point.
     const [wholeNumber, decimal] = numberString.split(".");
   
     // Add commas to the whole number part.
     const wholeNumberWithCommas = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   
     // Return the formatted number.
     return `${wholeNumberWithCommas}${decimal ? `.${decimal}` : ""}`;
   } 

// fetch API from themoviedb.org
async function fetchAPIData(endpoint){
     showSpinner();
     const API_KEY = global.api.apiKey;
     const API_URL = global.api.apiURL;
     const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`);
     // console.log(response);
     const data = await response.json();
     hideSpinner();
     return data;
} 

async function searchApiData(){
     showSpinner();
     const API_KEY = global.api.apiKey;
     const API_URL = global.api.apiURL;
     const response = await fetch(`${API_URL}/search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`);
     // console.log(response);
     const data = await response.json();
     hideSpinner();
     return data;
}

function highlightActiveLink(){
     const links = document.querySelectorAll('.nav-link');
     links.forEach( link => {
          if(link.getAttribute('href') === global.currentLocation){
               link.classList.add('active');
          };
     })
}

function showSpinner(){
     document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
     document.querySelector('.spinner').classList.remove('show');
}

async function search(){
     const searchString = window.location.search;
     console.log(searchString);
     const searchWord = new URLSearchParams(searchString);
     global.search.type = searchWord.get('type');
     global.search.term = searchWord.get('search-term');
     if(global.search.term !== '' && global.search.term !== null){
          const {results,total_pages,total_results} = await searchApiData();
          console.log(results);
          if(results.length === 0){
               alertBox('No results found!!');
               return;
          }
          displaySearchResults(results);
          // document.querySelector('#search-term').value = '';
     }else{
          alertBox('Please enter the word you want to search!');
     }
     // const results = await searchApiData();
}

function displaySearchResults(results){
     results.forEach((result => {
          const div = document.createElement('div');
          div.innerHTML = `
               <div class="card">
                    <a href="${global.search.type}-details.html?id=${result.id}">
                    <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${global.search.type === 'movie' ? result.title : result.name}" />
                    </a>
                    <div class="card-body">
                         <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
                         <p class="card-text">
                         <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
                         </p>
                    </div>
               </div>
          `;

          document.querySelector('#search-results').appendChild(div);
     }));
}

function alertBox(message, alertTypeClass = 'error'){
     const alertEle = document.createElement('div');
     alertEle.classList.add('alert', alertTypeClass);
     alertEle.appendChild(document.createTextNode(message));
     document.querySelector('#alert').appendChild(alertEle);
     setTimeout(() => alertEle.remove(), 4000);
}


function init(){
     switch(global.currentLocation){
          case '/':
          case '/index.html':
               displaySwiper();
               displayPopularMovies();
               console.log('Home');
               break;
          case '/shows.html':
               displayPopularShows();
               console.log('Shows');
               break;
          case '/movie-details.html':
               displayMovieDetails();
               console.log('Movie Details');
               break;
          case '/tv-details.html':
               displayTVDetails();
               console.log('TV Details');
               break;
          case '/search.html':
               search();
               console.log('Search');
               break;
     }
     highlightActiveLink();
}


document.addEventListener('DOMContentLoaded', init);