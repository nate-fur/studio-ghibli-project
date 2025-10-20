import { StudioGhibliService, StudioGhibliFilm } from './StudioGhibli.service';
import { HttpService } from '../Http/Http.service';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES, ErrorMessages } from '~/shared/constants';

// Mock the HttpService
jest.mock('../Http/Http.service');

describe('StudioGhibliService', () => {
  let studioGhibliService: StudioGhibliService;
  let mockHttpService: jest.Mocked<HttpService>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockHttpService = new HttpService() as jest.Mocked<HttpService>;
    (HttpService as jest.Mock).mockImplementation(() => mockHttpService);
    studioGhibliService = new StudioGhibliService();
  });

  describe('getFilmById', () => {
    const mockFilm: StudioGhibliFilm = {
      id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
      title: 'My Neighbor Totoro',
      image:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg',
      movie_banner:
        'https://image.tmdb.org/t/p/original/etqr6fOOCXQOgwrQXaKwenTSuzx.jpg',
      description: 'Two sisters move to the country...',
      director: 'Hayao Miyazaki',
      release_date: '1988',
      running_time: '86',
      rt_score: '93',
    };

    it('should fetch film successfully', async () => {
      mockHttpService.get.mockResolvedValue({
        data: mockFilm,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      const result = await studioGhibliService.getFilmById(
        '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
      );

      expect(result).toEqual(mockFilm);
      expect(mockHttpService.get).toHaveBeenCalledWith({
        endpoint:
          'https://ghibliapi.vercel.app/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49',
      });
    });

    it('should throw error for invalid film ID', async () => {
      await expect(studioGhibliService.getFilmById('')).rejects.toThrow(
        GraphQLError,
      );
      await expect(studioGhibliService.getFilmById('   ')).rejects.toThrow(
        GraphQLError,
      );
    });

    it('should throw error for null film ID', async () => {
      await expect(
        studioGhibliService.getFilmById(null as any),
      ).rejects.toThrow(GraphQLError);
    });

    it('should throw error for undefined film ID', async () => {
      await expect(
        studioGhibliService.getFilmById(undefined as any),
      ).rejects.toThrow(GraphQLError);
    });

    it('should throw FILM_NOT_FOUND error for 404 response', async () => {
      const error = {
        response: { status: 404 },
        code: 'ERR_BAD_REQUEST',
      };
      mockHttpService.get.mockRejectedValue(error);

      await expect(
        studioGhibliService.getFilmById('invalid-id'),
      ).rejects.toThrow(GraphQLError);

      try {
        await studioGhibliService.getFilmById('invalid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError);
        expect((error as GraphQLError).message).toBe(
          ErrorMessages.FilmNotFound,
        );
        expect((error as GraphQLError).extensions?.code).toBe(
          GQL_ERROR_CODES.FILM_NOT_FOUND,
        );
      }
    });

    it('should throw EXTERNAL_API_ERROR for 500 response', async () => {
      const error = {
        response: { status: 500 },
        code: 'ERR_BAD_REQUEST',
      };
      mockHttpService.get.mockRejectedValue(error);

      await expect(studioGhibliService.getFilmById('valid-id')).rejects.toThrow(
        GraphQLError,
      );

      try {
        await studioGhibliService.getFilmById('valid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError);
        expect((error as GraphQLError).message).toBe(
          ErrorMessages.ExternalApiError,
        );
        expect((error as GraphQLError).extensions?.code).toBe(
          GQL_ERROR_CODES.EXTERNAL_API_ERROR,
        );
      }
    });

    it('should throw NETWORK_ERROR for connection issues', async () => {
      const error = {
        code: 'ENOTFOUND',
      };
      mockHttpService.get.mockRejectedValue(error);

      await expect(studioGhibliService.getFilmById('valid-id')).rejects.toThrow(
        GraphQLError,
      );

      try {
        await studioGhibliService.getFilmById('valid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError);
        expect((error as GraphQLError).message).toBe(
          ErrorMessages.NetworkError,
        );
        expect((error as GraphQLError).extensions?.code).toBe(
          GQL_ERROR_CODES.NETWORK_ERROR,
        );
      }
    });

    it('should throw FILM_NOT_FOUND for empty response data', async () => {
      mockHttpService.get.mockResolvedValue({
        data: null,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      await expect(studioGhibliService.getFilmById('valid-id')).rejects.toThrow(
        GraphQLError,
      );

      try {
        await studioGhibliService.getFilmById('valid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError);
        expect((error as GraphQLError).message).toBe(
          ErrorMessages.FilmNotFound,
        );
        expect((error as GraphQLError).extensions?.code).toBe(
          GQL_ERROR_CODES.FILM_NOT_FOUND,
        );
      }
    });

    it('should throw FILM_NOT_FOUND for response without id', async () => {
      mockHttpService.get.mockResolvedValue({
        data: { title: 'Some Title' }, // Missing id field
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      await expect(studioGhibliService.getFilmById('valid-id')).rejects.toThrow(
        GraphQLError,
      );

      try {
        await studioGhibliService.getFilmById('valid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError);
        expect((error as GraphQLError).message).toBe(
          ErrorMessages.FilmNotFound,
        );
        expect((error as GraphQLError).extensions?.code).toBe(
          GQL_ERROR_CODES.FILM_NOT_FOUND,
        );
      }
    });
  });

  describe('getAllFilms', () => {
    const mockFilms: StudioGhibliFilm[] = [
      {
        id: '1',
        title: 'Film 1',
        image: 'image1.jpg',
        movie_banner: 'banner1.jpg',
        description: 'Description 1',
        director: 'Director 1',
        release_date: '2000',
        running_time: '90',
        rt_score: '80',
      },
      {
        id: '2',
        title: 'Film 2',
        image: 'image2.jpg',
        movie_banner: 'banner2.jpg',
        description: 'Description 2',
        director: 'Director 2',
        release_date: '2001',
        running_time: '100',
        rt_score: '85',
      },
    ];

    it('should fetch all films successfully', async () => {
      mockHttpService.get.mockResolvedValue({
        data: mockFilms,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      const result = await studioGhibliService.getAllFilms();

      expect(result).toEqual(mockFilms);
      expect(mockHttpService.get).toHaveBeenCalledWith({
        endpoint: 'https://ghibliapi.vercel.app/films',
      });
    });

    it('should throw error for non-array response', async () => {
      mockHttpService.get.mockResolvedValue({
        data: { notAnArray: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      await expect(studioGhibliService.getAllFilms()).rejects.toThrow(
        GraphQLError,
      );

      try {
        await studioGhibliService.getAllFilms();
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError);
        expect((error as GraphQLError).message).toBe(
          ErrorMessages.ExternalApiError,
        );
        expect((error as GraphQLError).extensions?.code).toBe(
          GQL_ERROR_CODES.EXTERNAL_API_ERROR,
        );
      }
    });

    it('should throw NETWORK_ERROR for connection issues', async () => {
      const error = {
        code: 'ECONNREFUSED',
      };
      mockHttpService.get.mockRejectedValue(error);

      await expect(studioGhibliService.getAllFilms()).rejects.toThrow(
        GraphQLError,
      );

      try {
        await studioGhibliService.getAllFilms();
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError);
        expect((error as GraphQLError).message).toBe(
          ErrorMessages.NetworkError,
        );
        expect((error as GraphQLError).extensions?.code).toBe(
          GQL_ERROR_CODES.NETWORK_ERROR,
        );
      }
    });

    it('should throw EXTERNAL_API_ERROR for 500 response', async () => {
      const error = {
        response: { status: 500 },
        code: 'ERR_BAD_REQUEST',
      };
      mockHttpService.get.mockRejectedValue(error);

      await expect(studioGhibliService.getAllFilms()).rejects.toThrow(
        GraphQLError,
      );

      try {
        await studioGhibliService.getAllFilms();
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError);
        expect((error as GraphQLError).message).toBe(
          ErrorMessages.ExternalApiError,
        );
        expect((error as GraphQLError).extensions?.code).toBe(
          GQL_ERROR_CODES.EXTERNAL_API_ERROR,
        );
      }
    });
  });
});
