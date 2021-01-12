const { USERINPUT } = require('./constants');
let connection;

/**
 * Setup User Interface
 * Specifically, so that we can handle user input via stdin
 */
const setupInput = function (conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  stdin.on('data', (key) => {
    handleUserInput(key, connection);
  });
  return stdin;
};

const handleUserInput = function (key, conn) {
  //stop game
  if (key === `\u0003`) {
    console.log(`Thanks for playing!`);
    process.exit();
  }
  const movementKeys = ['w', 'a', 's', 'd'];
  const messageKeys = ['1', '2', '3', '4', '5'];

  // movement
  if (movementKeys.includes(key)) {
    conn.write(USERINPUT.MOVEMENT[key]);
  } else if (messageKeys.includes(key)) { // text messages
    conn.write(USERINPUT.MESSAGES[key]);
  }
};


module.exports = { setupInput };