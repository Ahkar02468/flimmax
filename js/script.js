//create route
const global = {
     currentLocation: window.location.pathname
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
     // console.log(movieId);
     const results = await fetchAPIData(`/movie/${movieId}`);
     // console.log(results);
     const div = document.createElement('div');
     // div.classList.add('details-top');
          div.innerHTML = `
          <div calss="details-top">
          <div>
            ${
               results.poster_path ?
               `<img
               src="https://www.themoviedb.org/t/p/w500/${results.poster_path}"
               class="card-img-top"
               alt="Movie Title"
             />` :
             `<img
             src="../images/no-image.jpg"
             class="card-img-top"
             alt="Movie Title"
           />`
            }
          </div>
          <div>
            <h2>${results.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${results.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${results.release_date}</p>
            <p>
              ${results.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
               ${results.genres.map( genre => `<li>${genre.name}</>`).join('')}
            </ul>
            <a href="${results.homepage}" target="_blank" class="btn">${results.homepage}</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommas(results.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommas(results.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${results.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${results.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${results.production_companies.map( company => `<li>${company.name}</li>`).join('')}</div>
          </div>
          `;
          document.querySelector('#movie-details').appendChild(div);
}

async function displayTVDetails(){
     const tvId = window.location.search.split('=')[1];
     console.log(tvId);
     const results = await fetchAPIData(`/tv/${tvId}`);
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
          <a href="${results.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
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
     const API_KEY = '2ebeef07bc5151a9b570bd9973fe800f';
     const API_URL = 'https://api.themoviedb.org/3';
     const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`);
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


function init(){
     switch(global.currentLocation){
          case '/':
          case '/index.html':
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
               console.log('Search');
               break;
     }
     highlightActiveLink();
}


document.addEventListener('DOMContentLoaded', init);