import { useLazyQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import { GET_FILM } from '~/graphql/queries';
import { useToast } from '~/shared/contexts/ToastContext';

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
  const { showToast } = useToast();
  const [films, setFilms] = useState<FilmCardData[]>(() =>
    DEFAULT_FILMS.map((film) => ({
      ...film,
      loading: false,
      loaded: false,
    })),
  );

  const [getFilm] = useLazyQuery<FilmData, FilmVariables>(GET_FILM);

  const fetchFilm = useCallback(
    async (filmId: string) => {
      // Check if film is already loaded or currently loading
      const film = films.find((f) => f.id === filmId);
      if (film?.loaded || film?.loading) {
        return; // Don't fetch if already loaded or loading
      }

      setFilms((prevFilms) =>
        prevFilms.map((film) =>
          film.id === filmId
            ? {
                ...film,
                loading: true,
              }
            : film,
        ),
      );

      try {
        const { data, error } = await getFilm({ variables: { id: filmId } });

        if (data?.film) {
          setFilms((prevFilms) =>
            prevFilms.map((film) =>
              film.id === data.film.id
                ? {
                    ...film,
                    data: data.film,
                    loading: false,
                    loaded: true,
                  }
                : film,
            ),
          );
        }

        if (error) {
          // Mark this specific film as not loading
          setFilms((prevFilms) =>
            prevFilms.map((film) =>
              film.id === filmId
                ? {
                    ...film,
                    loading: false,
                  }
                : film,
            ),
          );

          // Show toast notification
          const errorMessage = error.networkError
            ? 'Network error. Please check your connection.'
            : error.message || 'Failed to load film data.';
          showToast(errorMessage, 'error');
        }
      } catch (error) {
        // Handle any unexpected errors
        setFilms((prevFilms) =>
          prevFilms.map((film) =>
            film.id === filmId
              ? {
                  ...film,
                  loading: false,
                }
              : film,
          ),
        );

        showToast('An unexpected error occurred.', 'error');
      }
    },
    [films, getFilm, showToast],
  );

  return {
    films,
    fetchFilm,
  };
};
