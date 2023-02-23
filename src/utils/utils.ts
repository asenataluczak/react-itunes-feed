import FeedInterface from '../interfaces/feed.interface';
import AlbumInterface from '../interfaces/album.interface';

export default function transformITunesFeed(feed: any): FeedInterface {
  const albums: Array<AlbumInterface> = feed.entry.map((album: any) => ({
    category: album.category.attributes.label,
    link: album.link.attributes.href,
    coverImg: album['im:image'][2].label,
    name: album['im:name'].label,
    releaseDate: album['im:releaseDate'].label,
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
