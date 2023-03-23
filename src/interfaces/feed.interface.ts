import AlbumInterface from './album.interface';

export default interface FeedInterface {
  rights: string;
  updated: string;
  title: string;
  icon: string;
  albums: Array<AlbumInterface>;
}