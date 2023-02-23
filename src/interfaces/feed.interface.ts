import AlbumInterface from './artist.interface';

export default interface FeedInterface {
  rights: string;
  updated: string;
  title: string;
  albums: Array<AlbumInterface>;
}