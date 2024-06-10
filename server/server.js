const express = require('express');
const path = require('path');
const app = express();

// Serve any static files from the Vue build directory in the root folder
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Handle Vue routing, return all requests to the Vue app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
