

  // App holds all methods

  const app = {};

  app.key = `b78c454afdc721700c66d60072c8ba45`;
  app.url = `https://api.themoviedb.org/3/discover/movie?`;
  //Queries return min 6 pages so this will pick a random page from the results
  app.randomPage = Math.floor(Math.random()*6);
 
  // User input collected

  app.collectInfo = function() {
    $('#genre').on('change', function(e) {
      e.preventDefault();
      $('section.suggestionsContainer').empty();
      $('#genre').attr('disabled', 'true');


      app.genreNumber = $('option:selected').val();
      
      app.getInfo(app.genreNumber + ',');
    });

    $('#genreTwo').on('change', function(e) {
      e.preventDefault();
      $('section.suggestionsContainer').empty();

      app.genreNumberTwo = $('option.two:selected').val();
      app.getInfo(app.genreNumberTwo+","+app.genreNumber);
    });
  }
  // AJAX request with user inputted data

  app.getInfo = function(genre) {
    console.log(genre);
    $.ajax({
      url: app.url,
      method: `GET`,
      dataType: `json`,
      data: {
          api_key: app.key,
          original_language: "en",    
          with_genres: genre,
          page: app.randomPage,         
      }     
    }).then( function(res) {
      console.log(res);
      const originalGenreArray = res.results;
      const finalResults = new Set;
      
      // Created a loop that runs the getRandomItemFromArray until there are six unique items in set out of the 20 suggested originally
      for (let i =  0; finalResults.size <= 5; i++) {
        app.randy = app.getRandomItemFromArray(res.results);
        finalResults.add(app.randy);
      }
  
      // console.log("final array", finalResults);
      
      app.displayInfo(finalResults);
      
    });
  }

  //getRandomItemFromArray chooses 1 random movie from the 20 in originalGenreArray 
  app.getRandomItemFromArray = function(originalGenreArray){
    const randomNum = Math.floor(Math.random()*originalGenreArray.length);
    return originalGenreArray[randomNum];
  }
  // Display data on the page

  app.displayInfo = function(suggestions) {
    console.log("Suggestions with randy", suggestions);
    
    suggestions.forEach((movie) => {
      const movieHTML = 
        `<div class="movieContainer">
          <div class="posterContainer">
            <div class="info">
              <p>${movie.title}</p>
              <p>Released: ${movie.release_date}</p>
            <div>
            <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="The poster for ${movie.title}">
          </div>
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

