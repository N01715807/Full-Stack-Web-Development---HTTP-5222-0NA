
import mongoose from 'mongoose';

const dbUrl = process.env.MONGODB_URI;

mongoose.set('strictQuery', true);

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!dbUrl) throw new Error('Missing MONGODB_URI in environment variables');
  await mongoose.connect(dbUrl /*, { maxPoolSize: 20 }*/);
}

const MovieSchema = new mongoose.Schema(
  {
    title:  { type: String, required: true, trim: true },
    year:   { type: Number, required: true, min: 1888 },
    rating: { type: String, required: true, trim: true } // e.g. G / PG / PG-13 / R
  },
  { timestamps: true, strict: true }
);

export const Movie = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);

export async function initializeMovies() {
  await connectDB();
  const count = await Movie.estimatedDocumentCount();
  if (count) return;

  await Movie.insertMany([
    { title: 'Inception', year: 2010, rating: 'PG-13' },
    { title: 'Se7en',     year: 1995, rating: 'R' }
  ]);

}

export async function getMovies() {
  await connectDB();
  return Movie.find({}).sort({ title: 1 }).lean();
}

export async function updateMovieRating(title, newRating) {
  await connectDB();
  return Movie.updateOne(
    { title },
    { $set: { rating: newRating } },
    { runValidators: true, context: 'query' }
  );
}

export async function deleteMoviesByRating(rating) {
  await connectDB();
  return Movie.deleteMany({ rating });
}

export default {
  connectDB,
  Movie,
  initializeMovies,
  getMovies,
  updateMovieRating,
  deleteMoviesByRating
};