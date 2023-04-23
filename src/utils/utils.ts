import FeedInterface from '../interfaces/feed.interface';
import AlbumInterface from '../interfaces/album.interface';

export function transformITunesFeed(feed: any): FeedInterface {
  const albums: Array<AlbumInterface> = feed.entry.map((album: any) => ({
    category: album.category.attributes.label,
    link: album.link.attributes.href,
    coverImg: album['im:image'][2].label,
    name: album['im:name'].label,
    releaseDate: album['im:releaseDate'].label,
    price: album['im:price'].label,
    artist: { name: album['im:artist'].label, link: album['im:artist'].attributes?.href },
  }));
  return {
    rights: feed.rights.label,
    updated: feed.updated.label,
    title: feed.title.label,
    icon: feed.icon.label,
    albums,
  };
}

export function getPositionShift(album: AlbumInterface, oldAlbumsList: Array<AlbumInterface>): string {
  const oldAlbum = oldAlbumsList.find(
    (oldAlbum: AlbumInterface) =>
      oldAlbum.name + oldAlbum.artist.name === album.name + album.artist.name,
  );
  if (!oldAlbum) return 'new';
  let shift: string | number = album.index - oldAlbum.index;
  if (shift > 0) shift = '+' + shift;
  return shift.toString();
}
