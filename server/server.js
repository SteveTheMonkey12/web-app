const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the React client app
app.use('/photos', express.static(path.join(__dirname, '../public/photos')));

// Endpoint to get the list of photo filenames
app.get('/api/photos', (req, res) => {
  const photoDir = path.join(__dirname, '../public/photos');
  fs.readdir(photoDir, (err, files) => {
    if (err) {
      console.error('Error reading photo directory:', err);
      res.status(500).send('Error reading photo directory');
    } else {
      res.json(files);
    }
  });
});

// Serve any other requests with the React client app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

