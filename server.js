const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.get('/shutdown', (req, res) => {
  const shutdownCommand = process.platform === 'win32' 
    ? 'shutdown /s /f /t 0' 
    : 'sudo shutdown -h now';

  exec(shutdownCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing shutdown: ${error.message}`);
      return res.status(500).send(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send(`Error: ${stderr}`);
    }
    console.log(`Shutdown initiated: ${stdout}`);
    res.send('Shutdown initiated');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
