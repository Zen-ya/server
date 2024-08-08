// routers/song.router.ts
import { Router } from 'express';
import {
  getAllSongs,
  getSongById,
  addSong,
  updateSong,
  deleteSong
} from '../song/SongController';

const songRouter = Router();

// Définir les routes CRUD
songRouter
  .get('/', getAllSongs)
  .get('/:id', getSongById)
  .post('/', addSong)
  .put('/', updateSong)
  .delete('/:id', deleteSong);

export default songRouter;
