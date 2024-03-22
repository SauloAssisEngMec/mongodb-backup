const execNonPromise = require("child_process");

const exec = (input) => {
  return new Promise((resolve, reject) => {
    execNonPromise(input, (error, stdout, stderr) => {
      if (error) {
        console.log("s");
        return reject(error);
      }
      if (stderr) {
        return resolve(stderr);
      }
      return resolve(stdout);
    });
  });
};

module.exports = exec;
