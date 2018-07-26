var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();
var PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.static("public"));


var friendsList = [
	{
	  name: "Missy",
	  photo: "http://www.zarias.com/wp-content/uploads/2016/02/17010216-funny-cat-pictures.jpg",
	  preferences: [1, 2, 4, 3, 4, 5, 2, 1, 5, 3]
	},

	{
	  name: "Smokey",
	  photo: "http://www.zarias.com/wp-content/uploads/2016/02/23010216-funny-cat-pictures.jpg",
	  preferences: [1, 2, 5, 3, 4, 5, 1, 3, 5, 2]
	},

	{
	  name: "Sooty",
	  photo: "http://www.zarias.com/wp-content/uploads/2016/02/25010216-funny-cat-pictures.jpg",
	  preferences: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
	},
];


app.get("api/friends", function(req, res){
		return res.json(friendsList);
	});


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

app.post("/api/friends", function(req, res) {
	var newFriend = req.body;
	var newScore = 0;
	var total = 0;
	var match = {
		name: "",
		photo: "",
		difference: 10000
	}

	for (var i = 0; i < friendsList.length; i++) {
		total = 0;

		for (var j = 0; j < friendsList[i].preferences.length; j++) {
			total += Math.abs(friendsList[i].preferences[j] - newFriend.preferences[j]);

			if (total <= match.difference) {
				match.name = friendsList[i].name,
				match.photo = friendsList[i].photo,
				match.difference = total
			}
    	}
    }
    friendsList.push(newFriend);
    res.json(match);
    console.log(match);
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});