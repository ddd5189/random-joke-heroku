// adding underscore for shuffle
const _ = require('underscore');

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

// validate the limit param
const testParam = (limitParam) => {
  let limit = Number(limitParam);
  limit = !limit ? 1 : limit;
  limit = limit < 1 ? 1 : limit;
  limit = limit > 10 ? 10 : limit;
  return limit;
};

// return accepted type
const findType = (acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') return 'text/xml';
  return 'application/json';
};

// ALWAYS GIVE CREDIT - in your code comments and documentation
// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

// respond function
const respond = (request, response, content, type, statusCode) => {
  response.writeHead(statusCode, { 'Content-type': type });
  response.write(content);
  response.end();
};

// get meta data when the server receives a head request
const getMetaData = (request, response, content, acceptedTypes) => {
  const type = findType(acceptedTypes);
  const headers = {
    'Content-type': type,
    'Content-length': `${getBinarySize(content)}`,
  };
  response.writeHead(200, headers);
  response.end();
};

// function to get one joke in either json or xml
const getRandomJoke = (acceptedTypes) => {
  // get a random number for selecting which joke
  const joke = Math.floor(Math.random() * 10);
  // client asked for xml
  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = `<joke><q>${randomJoke.q[joke]}</q><a>${randomJoke.a[joke]}</a></joke>`;
    return xmlResponse;
  }
  // defualt
  const jsonResponse = {
    q: randomJoke.q[joke],
    a: randomJoke.a[joke],
  };
  return JSON.stringify(jsonResponse);
};

// function to get multiple jokes
const getRandomJokes = (limitParam = 1, acceptedTypes) => {
  // test the limit
  const limit = testParam(limitParam);
  // shuffle the q and a
  randomJoke.q = _.shuffle(randomJoke.q);
  randomJoke.a = _.shuffle(randomJoke.a);

  // client asked for xml
  if (acceptedTypes[0] === 'text/xml') {
    let xmlResponse = '<jokes>';

    for (let i = 0; i < limit; i += 1) {
      xmlResponse = `${xmlResponse}<joke><q>${randomJoke.q[i]}</q><a>${randomJoke.a[i]}</a></joke>`;
    }
    xmlResponse = `${xmlResponse} </jokes>`;
    return xmlResponse;
  }

  // defualt
  let jsonResponse;
  const jsonResponseReturn = [];

  for (let i = 0; i < limit; i += 1) {
    jsonResponse = {
      q: randomJoke.q[i],
      a: randomJoke.a[i],
    };

    jsonResponseReturn.push(jsonResponse);
  }
  return JSON.stringify(jsonResponseReturn);
};

const getRandomJokeResponse = (request, response, acceptedTypes, httpMethod) => {
  if (httpMethod === 'GET') {
    respond(request, response, getRandomJoke(acceptedTypes), findType(acceptedTypes), 200);
  } else if (httpMethod === 'HEAD') {
    getMetaData(request, response, getRandomJoke(acceptedTypes), acceptedTypes);
  }
};

const getRandomJokesResponse = (request, response, acceptedTypes, httpMethod, params) => {
  if (httpMethod === 'GET') {
    // eslint said this line was too long
    respond(
      request,
      response,
      getRandomJokes(params.limit, acceptedTypes),
      findType(acceptedTypes),
      200,
    );
  } else if (httpMethod === 'HEAD') {
    getMetaData(request, response, getRandomJokes(params.limit, acceptedTypes), acceptedTypes);
  }
};

module.exports = {
  getRandomJokeResponse,
  getRandomJokesResponse,

};
