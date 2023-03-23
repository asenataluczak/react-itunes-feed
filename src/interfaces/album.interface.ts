import ArtistInterface from './album.interface';

export default interface AlbumInterface {
  category: string;
  coverImg: string;
  name: string;
  artist: ArtistInterface;
  releaseDate: string;
  link: string;
  price: string;
  index: number;
}
