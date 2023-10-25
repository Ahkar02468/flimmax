//create route
const global = {
     currentLocation: window.location.pathname
};

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