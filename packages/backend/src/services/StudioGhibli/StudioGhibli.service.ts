import { HttpService } from '../Http/Http.service';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES, ErrorMessages } from '~/shared/constants';

export interface StudioGhibliFilm {
  id: string;
  title: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  release_date: string;
  running_time: string;
  rt_score: string;
}

export class StudioGhibliService {
  private httpService: HttpService;
  private baseUrl = 'https://ghibliapi.vercel.app';

  constructor() {
    this.httpService = new HttpService();
  }

  async getFilmById(id: string): Promise<StudioGhibliFilm> {
    // Validate input
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new GraphQLError(ErrorMessages.InvalidFilmId, {
        extensions: { code: GQL_ERROR_CODES.INVALID_FILM_ID },
      });
    }

    try {
      const response = await this.httpService.get({
        endpoint: `${this.baseUrl}/films/${id}`,
      });

      // Check if film exists
      if (!response.data || !response.data.id) {
        throw new GraphQLError(ErrorMessages.FilmNotFound, {
          extensions: { code: GQL_ERROR_CODES.FILM_NOT_FOUND },
        });
      }

      return response.data;
    } catch (error: unknown) {
      // Handle different types of errors
      if (error instanceof GraphQLError) {
        throw error;
      }

      // Type guard for axios errors
      const axiosError = error as any;

      // Network errors (no response, timeout, etc.)
      if (
        axiosError.code === 'ENOTFOUND' ||
        axiosError.code === 'ECONNREFUSED' ||
        axiosError.code === 'ETIMEDOUT'
      ) {
        throw new GraphQLError(ErrorMessages.NetworkError, {
          extensions: { code: GQL_ERROR_CODES.NETWORK_ERROR },
        });
      }

      // HTTP errors
      if (axiosError.response) {
        const status = axiosError.response.status;
        if (status === 404) {
          throw new GraphQLError(ErrorMessages.FilmNotFound, {
            extensions: { code: GQL_ERROR_CODES.FILM_NOT_FOUND },
          });
        }
        if (status >= 500) {
          throw new GraphQLError(ErrorMessages.ExternalApiError, {
            extensions: { code: GQL_ERROR_CODES.EXTERNAL_API_ERROR },
          });
        }
      }

      // Generic error fallback
      throw new GraphQLError(ErrorMessages.ExternalApiError, {
        extensions: { code: GQL_ERROR_CODES.EXTERNAL_API_ERROR },
      });
    }
  }

  async getAllFilms(): Promise<StudioGhibliFilm[]> {
    try {
      const response = await this.httpService.get({
        endpoint: `${this.baseUrl}/films`,
      });

      if (!Array.isArray(response.data)) {
        throw new GraphQLError(ErrorMessages.ExternalApiError, {
          extensions: { code: GQL_ERROR_CODES.EXTERNAL_API_ERROR },
        });
      }

      return response.data;
    } catch (error: unknown) {
      // Handle different types of errors
      if (error instanceof GraphQLError) {
        throw error;
      }

      // Type guard for axios errors
      const axiosError = error as any;

      // Network errors
      if (
        axiosError.code === 'ENOTFOUND' ||
        axiosError.code === 'ECONNREFUSED' ||
        axiosError.code === 'ETIMEDOUT'
      ) {
        throw new GraphQLError(ErrorMessages.NetworkError, {
          extensions: { code: GQL_ERROR_CODES.NETWORK_ERROR },
        });
      }

      // HTTP errors
      if (axiosError.response && axiosError.response.status >= 500) {
        throw new GraphQLError(ErrorMessages.ExternalApiError, {
          extensions: { code: GQL_ERROR_CODES.EXTERNAL_API_ERROR },
        });
      }

      // Generic error fallback
      throw new GraphQLError(ErrorMessages.ExternalApiError, {
        extensions: { code: GQL_ERROR_CODES.EXTERNAL_API_ERROR },
      });
    }
  }
}
