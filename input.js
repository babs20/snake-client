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

  //movement
  if (key === 'w') {
    conn.write('Move: up');
  }
  if (key === 'a') {
    conn.write('Move: left');
  }
  if (key === 's') {
    conn.write('Move: down');
  }
  if (key === 'd') {
    conn.write('Move: right');
  }

  // text messages
  switch (key) {
    case '1':
      conn.write('Say: Good game!');
      break;
    case '2':
      conn.write('Say: What a play!');
      break;
    case '3':
      conn.write('Say: $#@%!');
      break;
    case '4':
      conn.write('Say: No Way!');
      break;
    case '5':
      conn.write('Say: Rematch!');
      break;
  }
};


module.exports = { setupInput };