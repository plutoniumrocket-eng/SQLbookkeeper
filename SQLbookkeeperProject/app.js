const express = require('express');
const db = require('./database');

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, function() {
  console.log(`App is listening on port ${port}`);
});

app.get('/books', (req, res) => {
  const rows = db.prepare('SELECT * FROM books').all();
  res.status(200).json({
    books: rows
  });
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(id);

  const notes = db.prepare('SELECT content FROM notes WHERE book_id = ?').all(id);

  res.status(200).json({
    book: book,
    notes: notes
  });
});

app.post('/books/:id/notes', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  
if (!content || content.trim() === '') {
    return res.status(400).json({
      error: 'Content is required'
    });
  }
  const insert = db.prepare(
    'INSERT INTO notes (book_id, content) VALUES (?, ?)'
  );

  const result = insert.run(id, content);

  res.status(201).json({
    noteId: result.lastInsertRowid
  });
});
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM books WHERE id = ?');
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      error: 'Book not found'
    });
  }

  res.status(200).json({
    deletedBookId: Number(id)
  });
});