// import axios from 'axios';
// import { Song } from '../types/song.type';

// const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

// export const searchYouTube = async (query: string): Promise<Song[]> => {
//   try {
//     const response = await axios.get(YOUTUBE_SEARCH_URL, {
//       params: {
//         part: 'snippet',
//         q: query,
//         type: 'video',
//         maxResults: 10,
//         key: YOUTUBE_API_KEY,
//       },
//     });

//     return response.data.items.map((item: any) => ({
//       videoId: item.id.videoId,
//       title: item.snippet.title,
//       description: item.snippet.description,
//       thumbnailUrl: item.snippet.thumbnails.default.url,
//       channelTitle: item.snippet.channelTitle,
//     }));
//   } catch (error) {
//     console.error('Error fetching YouTube data:', error);
//     throw new Error('Failed to search YouTube');
//   }
// };

// export const getYouTubeVideoComments = async (videoId: string) => {
//     const response = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
//         params: {
//             part: 'snippet',
//             videoId: videoId,
//             key: YOUTUBE_API_KEY,
//             maxResults: 10,
//         },
//     });

//     return response.data.items.map((item: any) => ({
//         author: item.snippet.topLevelComment.snippet.authorDisplayName,
//         text: item.snippet.topLevelComment.snippet.textOriginal,
//         likeCount: item.snippet.topLevelComment.snippet.likeCount,
//     }));
// };
