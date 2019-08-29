

  // Create app namespace to hold all methods

  const app = {};

  app.key = `b78c454afdc721700c66d60072c8ba45`;
  app.url = `https://api.themoviedb.org/3/discover/movie?`;

  // Collect user input

  app.collectInfo = function() {
      $('#genre').on('change', function() {

          $('section.suggestionsContainer').empty();

          const genreNumber = $('option:selected').val();

          app.getInfo(genreNumber);
      });

  }
  // Make AJAX request with user inputted data

  app.getInfo = function(genre) {
      $.ajax({
          url: app.url,
          method: `GET`,
          dataType: `json`,
          data: {
              api_key: app.key,
              with_genres: genre,             
          }        
      }).then( function(res) {
         const getItems = res.results;
          console.log("opps",res.results);
        //   console.log("hi",res.results);
        const randy = app.getRandomItemFromArray(res.results);
        const finalResults= [];
        // push randy onto final results array
          app.displayInfo(randy);

         
        console.log("random",getRandomItemFromArray);
      });
      
      
    
      
  }
  app.getRandomItemFromArray = function(getItems){
    const randomNum = Math.floor(Math.random()* 
    getItems.length);
    return getItems[randomNum];
}

  // Display data on the page

  app.displayInfo = function(suggestions) {
      console.log(suggestions);

    suggestions.forEach((movie) => {

        const movieHTML = 
                        `<div class="movieContainer">
                            <div class="posterContainer">
                                <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}">
                            </div>
                            <p>${movie.title}</p>
                            <p>Released: ${movie.release_date}</p>
                            <p>${movie.overview}</p>
                        </div>`;
        $('section.suggestionsContainer').append(movieHTML);
    });

    
  }

  // Start app

  app.init = function() {
      app.collectInfo();
  }

  $(function() {

    app.init();

  });

