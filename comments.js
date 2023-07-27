// Create web server
// http://localhost:3000/comments

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// GET /comments
app.get('/', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('comments.json', 'utf-8'));
  res.send(comments);
});

// POST /comments
app.post('/', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('comments.json', 'utf-8'));
  const newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.send(comments);
});

// PUT /comments
app.put('/:id', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('comments.json', 'utf-8'));
  const newComment = req.body;
  const id = req.params.id;
  comments[id - 1] = newComment;
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.send(comments);
});

// DELETE /comments
app.delete('/:id', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('comments.json', 'utf-8'));
  const id = req.params.id;
  comments.splice(id - 1, 1);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.send(comments);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});