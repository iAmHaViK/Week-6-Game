$(document).ready(function(){
	//Array of pre-existing buttons
	var animals = ['cat', 'dog', 'eagle', 'parrot', 'cow', 'puppy', 'kitten'];
	//My Functions go here
	var createBtn = function () {
		//*********making the button area empty*************
		$('#giphAnimals').empty();
		//create buttons based on array
		for (var i = 0; i < animals.length; i++){
			//creates new buttons
			var newBtn = $('<button>');
			//gives button an attribute
			newBtn.attr('data-type', animals[i]);

			newBtn.attr('class','btnss');
			//give button the name
			newBtn.text(animals[i]);
			//displays buttons
			$('#giphAnimals').append(newBtn);
		}
	}

	var submit = function(){

		$('#giphButton').on('click', function(){

			var userInput = $('#giphText').val();

			animals.push(userInput);

			createBtn();

			console.log(userInput);

			return false;
		});
	};

	var displayGif = function(){

		var btnVal = $(this).data('type');

		console.log(btnVal);

		var apiKey = 'dc6zaTOxFJmzC';

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        btnVal + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");
              // Storing the result item's rating
              var rating = results[i].rating;
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);
              // Creating an image tag
              var personImage = $("<img>");
              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);
              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);
              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#giphHere").prepend(gifDiv);
            }
          }
        });
	};

	//***********Main Body**********************************
	//run the generate button function
	createBtn();
	submit();
	$(document).on('click', '.btnss', displayGif);
})