// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL
const url = require('url');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 5 - here's our 404 page
const errorPage = `
<html>
	<head>
		<title>404 - File Not Found!</title>
	</haed>
	<body>
		<h1>404 - File Not Found!</h1>
		<p>Check your URL, or your typing!</p>
	</body>
</html>`;


// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
const randomJoke = {
	q: ["one", "two"],
	a: ["one", "two"]
};

const getRandomJokeJSON = () => {
	const joke = Math.floor(Math.random() * 1);
	const responseObj = {
		q: randomJoke.q[joke],
		a: randomJoke.a[joke]
	};
	return JSON.stringify(responseObj);
};


// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
	if(pathname == "/random-joke"){
		response.writeHead(200, { 'Content-Type': 'application/json'});
		response.write(getRandomJokeJSON());
		response.end();
	}else{
		response.writeHead(404, { 'Content-Type': 'text/html'});
		response.write(errorPage);
		response.end();
	}
   
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
