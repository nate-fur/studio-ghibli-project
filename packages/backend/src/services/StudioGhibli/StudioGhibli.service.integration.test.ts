import { StudioGhibliService, StudioGhibliFilm } from './StudioGhibli.service';

describe('StudioGhibliService Integration Tests', () => {
  let studioGhibliService: StudioGhibliService;

  beforeAll(() => {
    studioGhibliService = new StudioGhibliService();
  });

  describe('getAllFilms', () => {
    it('should fetch all films from the real API', async () => {
      const films = await studioGhibliService.getAllFilms();

      expect(Array.isArray(films)).toBe(true);
      expect(films.length).toBeGreaterThan(0);

      // Verify the structure of the first film
      const firstFilm = films[0];
      expect(firstFilm).toHaveProperty('id');
      expect(firstFilm).toHaveProperty('title');
      expect(firstFilm).toHaveProperty('image');
      expect(firstFilm).toHaveProperty('movie_banner');
      expect(firstFilm).toHaveProperty('description');
      expect(firstFilm).toHaveProperty('director');
      expect(firstFilm).toHaveProperty('release_date');
      expect(firstFilm).toHaveProperty('running_time');
      expect(firstFilm).toHaveProperty('rt_score');

      // Verify data types
      expect(typeof firstFilm.id).toBe('string');
      expect(typeof firstFilm.title).toBe('string');
      expect(typeof firstFilm.director).toBe('string');
      expect(typeof firstFilm.release_date).toBe('string');
      expect(typeof firstFilm.running_time).toBe('string');
      expect(typeof firstFilm.rt_score).toBe('string');
    }, 10000); // 10 second timeout for API call

    it('should return films with valid data', async () => {
      const films = await studioGhibliService.getAllFilms();

      // Check that we have some well-known Studio Ghibli films
      const filmTitles = films.map((film) => film.title);
      expect(filmTitles).toContain('My Neighbor Totoro');
      expect(filmTitles).toContain('Spirited Away');
      expect(filmTitles).toContain('Princess Mononoke');

      // Verify that all films have non-empty titles
      films.forEach((film) => {
        expect(film.title).toBeTruthy();
        expect(film.title.length).toBeGreaterThan(0);
      });
    }, 10000);
  });

  describe('getFilmById', () => {
    it('should fetch a specific film by ID from the real API', async () => {
      // Use a known film ID from Studio Ghibli API
      const filmId = '58611129-2dbc-4a81-a72f-77ddfc1b1b49'; // My Neighbor Totoro

      const film = await studioGhibliService.getFilmById(filmId);

      expect(film).toBeDefined();
      expect(film.id).toBe(filmId);
      expect(film.title).toBe('My Neighbor Totoro');
      expect(film.director).toBe('Hayao Miyazaki');
      expect(film.release_date).toBe('1988');
    }, 10000);

    it('should throw error for non-existent film ID', async () => {
      const nonExistentId = 'non-existent-id-12345';

      await expect(
        studioGhibliService.getFilmById(nonExistentId),
      ).rejects.toThrow();
    }, 10000);
  });
});
