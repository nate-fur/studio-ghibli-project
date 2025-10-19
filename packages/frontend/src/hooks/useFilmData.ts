import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_FILM } from '~/graphql/queries';

interface Film {
  id: string;
  title: string;
  image: string;
  movieBanner: string;
  description: string;
  director: string;
  releaseDate: string;
  runningTime: number;
  rtScore: number;
}

interface FilmCardData {
  id: string;
  title: string;
  backgroundColor: string;
  data?: Film;
  loading: boolean;
  error?: string;
  loaded: boolean;
}

interface FilmData {
  film: Film;
}

interface FilmVariables {
  id: string;
}

const DEFAULT_FILMS: Omit<
  FilmCardData,
  'data' | 'loading' | 'error' | 'loaded'
>[] = [
  {
    title: 'Porco Rosso',
    backgroundColor: '#d79a68',
    id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
  },
  {
    title: "Kiki's Delivery Service",
    backgroundColor: '#c24646',
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
  },
  {
    title: "Howl's Moving Castle",
    backgroundColor: '#279094',
    id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa',
  },
  {
    title: 'My Neighbor Totoro',
    backgroundColor: '#3e6cac',
    id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
  },
];

export const useFilmData = () => {
  const [films, setFilms] = useState<FilmCardData[]>(() =>
    DEFAULT_FILMS.map((film) => ({
      ...film,
      loading: false,
      loaded: false,
    })),
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [getFilm, { data, loading, error }] = useLazyQuery<
    FilmData,
    FilmVariables
  >(GET_FILM);

  useEffect(() => {
    if (data?.film) {
      setFilms((prevFilms) =>
        prevFilms.map((film) =>
          film.id === data.film.id
            ? {
                ...film,
                data: data.film,
                loading: false,
                loaded: true,
                error: undefined,
              }
            : film,
        ),
      );
    }
  }, [data?.film]);

  useEffect(() => {
    if (error) {
      // Find which film is currently loading and mark it as errored
      setFilms((prevFilms) =>
        prevFilms.map((film) =>
          film.loading
            ? {
                ...film,
                loading: false,
                error: error.message,
              }
            : film,
        ),
      );
    }
  }, [error]);

  const fetchFilm = (filmId: string) => {
    setFilms((prevFilms) =>
      prevFilms.map((film) =>
        film.id === filmId
          ? {
              ...film,
              loading: true,
              error: undefined,
            }
          : film,
      ),
    );

    getFilm({ variables: { id: filmId } });
  };

  return {
    films,
    fetchFilm,
  };
};
