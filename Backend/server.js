const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get all notes
app.get('/notes', (req, res) => {
  db.all('SELECT * FROM notes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a note
app.post('/notes', (req, res) => {
  const { content } = req.body;
  db.run('INSERT INTO notes (content) VALUES (?)', [content], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, content });
  });
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
  db.run('DELETE FROM notes WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Note deleted' });
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
