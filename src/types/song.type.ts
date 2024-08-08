export type Playlist =
{
    id: number;
    user_id: number;
    name: string;
    created_at: Date;
  };
  
  export type PlaylistVideo =
  {
    id: number;
    playlist_id: number;
    video_id: string;
    title: string;
    description: string;
    thumbnail_url: string;
    video_url: string;
    added_at: Date;
  };
  
  export interface Song {
    SongID: string;        // The unique identifier for the video on YouTube
    SongName: string;          // The title of the video or song
    Artist: string;    // A brief description of the video
    LinkSong: string;   // The URL of the video's thumbnail image
    SongTypeID: number;   // The name of the channel that uploaded the video
  }