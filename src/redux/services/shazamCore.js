import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '1021b9d182msh187f02812af6d80p15c436jsn7be42e448014');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Added country_code as a parameter for all queries
    getTopCharts: builder.query({
      query: (countryCode = 'KZ') => `v1/charts/world?country_code=${countryCode}`, // Default to KZ if no countryCode is provided
    }),
    getSongsByGenre: builder.query({
      query: (genre, countryCode = 'KZ') => `v1/charts/genre-world?country_code=${countryCode}&genre_code=${genre}`, // Add country_code to genre query
    }),
    getSongsByCountry: builder.query({
      query: (countryCode = 'KZ') => `v1/charts/country?country_code=${countryCode}`, // Default to KZ if no countryCode is provided
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm, countryCode = 'KZ') => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}&country_code=${countryCode}`, // Add country_code to search query
    }),
    getArtistDetails: builder.query({
      query: (artistId, countryCode = 'KZ') => `v2/artists/details?artist_id=${artistId}&country_code=${countryCode}`, // Add country_code to artist details query
    }),
    getSongDetails: builder.query({
      query: ({ songid, countryCode = 'KZ' }) => `v1/tracks/details?track_id=${songid}&country_code=${countryCode}`, // Add country_code to song details query
    }),
    getSongRelated: builder.query({
      query: ({ songid, countryCode = 'KZ' }) => `v1/tracks/related?track_id=${songid}&country_code=${countryCode}`, // Add country_code to song related query
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;