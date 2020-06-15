const axios = require('axios');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Get list of files that have changed
    console.log('Fetching commit...');
    const url = `https://api.github.com/repos/jameshibbard/test-hello-world-javascript-action/commits/${process.env.GITHUB_SHA}`;
    console.log(url);
    const res = await axios.get(url);
    res.data.files.forEach((file) => {
      console.log(file.filename);
    });

    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);

    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
