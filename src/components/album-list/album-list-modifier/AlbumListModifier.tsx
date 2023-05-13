import React, { useEffect, useState } from 'react';
import AlbumInterface from '../../../interfaces/album.interface';
import SearchBar from './search-bar/SearchBar';
import Filter from './filter/Filter';
import FilterQuery from '../../../interfaces/filter-query.interface';

interface AlbumListModifierProps {
  albums: Array<AlbumInterface> | undefined;
  // nie polecam przekazywać bezpośrednio setterów dla useState z komponentu powyżej.
  // tutaj nazwałbym tego props np. `onAlbumsFilter` czy cokolwiek on tam sobie robi. "Emituj" eventy, a reakcję na nie umieszczaj logicznie w rodzicu
  setFilteredAlbums: (albums: Array<AlbumInterface>) => void;
}

function AlbumListModifier({
                             albums,
                             setFilteredAlbums,
                           }: AlbumListModifierProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<FilterQuery>({
    genres: [],
    priceRange: [],
  });

  const getGenres = (): Array<string> => {
    let genres = albums?.map((album: AlbumInterface) => album.category);
    genres = Array.from(new Set(genres));
    return genres.sort();
  };

  const getMaxPrice = (): number => {
    const prices = albums
      ?.map((album: AlbumInterface) => +album.price.replace('$', ''))
      .sort((a: number, b: number) => a - b);
    return Math.ceil(Number(prices?.pop()));
  }; // wszystkie funkcje w komponencie są deklarowane na nowo przy każdym rerenderze. Deklaruj funkcje w komponentach TYLKO jeśli musisz coś wykorzystać z hooków tutaj.
  // Najlepiej robić po prostu gdzieś obok utila, który przyjmuje Given i zwraca Expected i jest czysty, niezależny od stanu

  const ifWithinPriceRange = (price: string) => {
    if (!filterQuery.priceRange.length) {
      return true;
    }
    const [start, end] = filterQuery.priceRange;
    const normalizedPrice = Number(price.replace('$', ''));
    return normalizedPrice >= start && normalizedPrice <= end;
  };

  const ifHasGenre = (genre: string) => {
    if (!filterQuery.genres.length) {
      return true;
    }
    return filterQuery.genres.includes(genre);
  };

  const ifMatchesSearchQuery = (album: AlbumInterface): boolean =>
    `${album.name.toLowerCase()} ${album.artist.name.toLowerCase()}`.includes(
      searchQuery.toLowerCase(),
    );

  const ifMatchesFilterQuery = (album: AlbumInterface): boolean =>
    ifWithinPriceRange(album.price) && ifHasGenre(album.category);

  useEffect(() => {
    const filteredAlbums = albums?.filter(
      (album: AlbumInterface) =>
        ifMatchesSearchQuery(album) && ifMatchesFilterQuery(album),
    );
    setFilteredAlbums(filteredAlbums || []);
  }, [searchQuery, filterQuery]);

  return (
    <>
      <SearchBar search={setSearchQuery}></SearchBar>
      <Filter
        entryData={{ genres: getGenres(), maxPrice: getMaxPrice() }}
        filter={setFilterQuery}
      ></Filter>
    </>
  );
} // komponenty bez childa np. `SearchBar` domykamy tj. `<SearchBar onSearchChange={(newValue) => setSearchQuery(newValue)}/>`

export default AlbumListModifier;
