// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL
const url = require('url');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 4 - here's our 404 page
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

// 5 - this will return a random joke
// random joke object literal
const randomJoke = {
  q: [
    'What do you call a very small valentine?',
    'What did the dog say when he rubbed his tail on the sandpaper?',
    "Why don't sharks like to eat clowns?",
    'What did the fish say when be bumped his head?',
    'What did one elevator say to the other elevator?',
    'What does a nosey pepper do?',
    'What do you call a cow with a twitch?',
    'What do you call a computer that sings?',
    'Why did the robber take a bath?',
    'What did the 0 say to the 8?'],
  a: [
    'A valen-tiny!',
    'Ruff, Ruff!',
    'Because they taste funny!',
    'Dam!',
    "I think I'm coming down with something!",
    'Gets jalapeno business!',
    'Beef jerky!',
    'A-Dell!',
    'They wanted to make a clean getaway!',
    'Nice belt!'],
};

// function to get joke
const getRandomJokeJSON = () => {
  // get a random number for selecting which joke
  const joke = Math.floor(Math.random() * 10);
  const responseObj = {
    q: randomJoke.q[joke],
    a: randomJoke.a[joke],
  };
  return JSON.stringify(responseObj);
};

// 6 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  if (pathname === '/random-joke') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getRandomJokeJSON());
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write(errorPage);
    response.end();
  }
};

// 7 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
