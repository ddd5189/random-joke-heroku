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

const getRandomJokeResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(getRandomJokeJSON());
  response.end();
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;