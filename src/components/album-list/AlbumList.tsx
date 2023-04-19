import React, { useEffect, useState } from 'react';
import Album from '../Album';
import AlbumInterface from '../../interfaces/album.interface';
import SearchBar from '../search-bar/SearchBar';
import Filter from '../filter/Filter';

interface AlbumListProps {
  albums: Array<AlbumInterface> | undefined;
}

function AlbumList({ albums }: AlbumListProps) {
  const [filteredAlbums, setFilteredAlbums] = useState<Array<AlbumInterface>>(
    albums || [],
  );
  const [genres, setGenres] = useState<Array<string>>([]);
  const [prices, setPrices] = useState<Array<number>>([]);

  const searchAlbum = (query: string) => {
    setFilteredAlbums(
      albums
        ? albums.filter(({ name, artist }) =>
            `${name.toLowerCase()} ${artist.name.toLowerCase()}`.includes(
              query.toLowerCase(),
            ),
          )
        : [],
    );
  };

  const getGenres = () => {
    let genres = albums?.map((album: AlbumInterface) => album.category);
    genres = Array.from(new Set(genres));
    return genres.sort();
  };

  function getMaxPrice() {
    const prices = albums
      ?.map((album: AlbumInterface) => Number(album.price.replace('$', '')))
      .sort((a: number, b: number) => a - b);
    return Math.ceil(prices?.pop() || 50);
  }

  const filter = (genres: Array<string>, priceRange: Array<number>) => {
    setGenres(genres);
    setPrices(priceRange);
  };

  const isWithinPriceRange = (album: AlbumInterface) => {
    const price = Number(album.price.replace('$', ''));
    return price >= prices[0] && price <= prices[1];
  };

  useEffect(() => {
    if (!genres.length && !prices.length && albums) {
      setFilteredAlbums(albums);
      return;
    }
    setFilteredAlbums(
      albums?.filter((album: AlbumInterface) => {
        if (genres.length && prices.length) {
          return genres.includes(album.category) && isWithinPriceRange(album);
        }
        return genres.includes(album.category) || isWithinPriceRange(album);
      }) || [],
    );
  }, [genres, prices]);

  return (
    <>
      <SearchBar search={searchAlbum}></SearchBar>
      <Filter
        genres={getGenres()}
        maxPrice={getMaxPrice()}
        filter={filter}
      ></Filter>
      <div className='mt-10'>
        {albums && (
          <div className='mt-6'>
            {filteredAlbums?.length ? (
              filteredAlbums?.map((album: any, index: number) => (
                <Album
                  key={index}
                  index={album.index}
                  name={album.name}
                  artist={album.artist}
                  coverImg={album.coverImg}
                  category={album.category}
                  releaseDate={album.releaseDate}
                  price={album.price}
                />
              ))
            ) : (
              <div className='py-10 text-center text-xl text-gray-200'>
                No albums found
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AlbumList;
