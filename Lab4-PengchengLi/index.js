import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  connectDB,
  initializeMovies,
  getMovies,
  updateMovieRating,
  deleteMoviesByRating
} from './modules/movies/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));

connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.get('/', async (req, res) => {
  try {
    let movies = await getMovies();
    if (!movies.length) {
      await initializeMovies();
      movies = await getMovies();
    }
    res.render('index', { movies });
  } catch (err) {
    console.error('GET / error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/update-demo', async (req, res) => {
  try {
    const title = 'Inception'; 
    const newRating = 'G'; 
    const result = await updateMovieRating(title, newRating);
    console.log('updateMovieRating result:', result);
    res.redirect('/');
  } catch (err) {
    console.error('GET /update-demo error:', err);
    res.status(500).send('Update failed');
  }
});

app.get('/delete-demo', async (req, res) => {
  try {
    const rating = 'R'; 
    const result = await deleteMoviesByRating(rating);
    console.log('deleteMoviesByRating result:', result); // deletedCount
    res.redirect('/');
  } catch (err) {
    console.error('GET /delete-demo error:', err);
    res.status(500).send('Delete failed');
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});