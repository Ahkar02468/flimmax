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

// fetch API from themoviedb.org
async function fetchAPIData(endpoint){
     const API_KEY = '2ebeef07bc5151a9b570bd9973fe800f';
     const API_URL = 'https://api.themoviedb.org/3';
     const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`);
     // console.log(response);
     const data = await response.json();
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

function init(){
     switch(global.currentLocation){
          case '/':
          case '/index.html':
               displayPopularMovies();
               console.log('Home');
               break;
          case '/shows.html':
               console.log('Shows');
               break;
          case '/movie-details.html':
               console.log('Movie Details');
               break;
          case '/tv-details.html':
               console.log('TV Details');
               break;
          case '/search.html':
               console.log('Search');
               break;
     }
     highlightActiveLink();
}


document.addEventListener('DOMContentLoaded', init);