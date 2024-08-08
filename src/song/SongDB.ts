// db.ts
import { connect, IResult } from 'mssql';
import { Song } from '../types/song.type';

export default class Db {
  private static connectionString: string = process.env.CONNECTION_STRING!;

  static async getSongs(): Promise<Song[] | undefined> {
    try {
      const pool = await connect(Db.connectionString);
      const result = await pool.request().query('SELECT * FROM Songs');
      return result.recordset.map((element: any) => ({
        SongID: element.SongID,
        SongName: element.SongName,
        Artist: element.Artist,
        LinkSong: element.LinkSong,
        SongTypeID: element.SongTypeID,
      }));
    } catch (err) {
      console.error('Error fetching songs:', err);
      return undefined;
    }
  }

  static async getSongById(SongID: number): Promise<Song | undefined> {
    try {
      const pool = await connect(Db.connectionString);
      const result: IResult<any> = await pool.request()
        .input('SongID', SongID)
        .query('SELECT * FROM Songs WHERE SongID = @SongID');
      if (result.recordset.length > 0) {
        const element = result.recordset[0];
        return {
          SongID: element.SongID,
          SongName: element.SongName,
          Artist: element.Artist,
          LinkSong: element.LinkSong,
          SongTypeID: element.SongTypeID,
        };
      } else {
        return undefined;
      }
    } catch (err) {
      console.error('Error fetching song:', err);
      return undefined;
    }
  }

  static async createSong(song: Song): Promise<void> {
    try {
      const pool = await connect(Db.connectionString);
      await pool.request()
        .input('SongID', song.SongID)
        .input('SongName', song.SongName)
        .input('Artist', song.Artist)
        .input('LinkSong', song.LinkSong)
        .input('SongTypeID', song.SongTypeID)
        .query(`INSERT INTO Songs (SongName, Artist, LinkSong, SongTypeID)
                VALUES (@SongName, @Artist, @LinkSong, @SongTypeID)`);
    } catch (err) {
      console.error('Error creating song:', err);
    }
  }

  static async updateSong(song: Song): Promise<void> {
    try {
      const pool = await connect(Db.connectionString);
      await pool.request()
        .input('SongID', song.SongID)
        .input('SongName', song.SongName)
        .input('Artist', song.Artist)
        .input('LinkSong', song.LinkSong)
        .input('SongTypeID', song.SongTypeID)
        .query(`UPDATE Songs
                SET SongName = @SongName,
                    Artist = @Artist,
                    LinkSong = @LinkSong,
                    SongTypeID = @SongTypeID
                WHERE SongID = @SongID`);
    } catch (err) {
      console.error('Error updating song:', err);
    }
  }

  static async deleteSong(SongID: number): Promise<boolean> {
    try {
      const pool = await connect(Db.connectionString);
      const result: IResult<any> = await pool.request()
        .input('SongID', SongID)
        .query('SELECT * FROM Songs WHERE SongID = @SongID');
      if (result.recordset.length > 0) {
        await pool.request().input('SongID', SongID).query('DELETE FROM Songs WHERE SongID = @SongID');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Error deleting song:', err);
      return false;
    }
  }
}
