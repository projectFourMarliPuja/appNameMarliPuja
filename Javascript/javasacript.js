

  // Create app namespace to hold all methods

  const app = {};

  app.key = `b78c454afdc721700c66d60072c8ba45`;
  app.url = `https://api.themoviedb.org/3/search/movie?`;

  // Collect user input

  app.collectInfo = function() {

  }

  // Make AJAX request with user inputted data

  app.getInfo = function() {
      $.ajax({
          url: app.url,
          method: `GET`,
          dataType: `json`,
          data: {
              api_key: app.key,
              query: "hello",             
          }
        
      }).then(function(result){
          console.log("hi",result);
      })
      
  }
  app.getInfo();

  // Display data on the page

  app.displayInfo = function() {

  }

  // Start app

  app.init = function() {

  }

  $(function() {

    app.init();

  });

