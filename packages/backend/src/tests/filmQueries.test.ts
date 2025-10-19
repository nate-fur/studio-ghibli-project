import { createTestContext, TestContext } from './__helpers';
import { StudioGhibliService } from '~/services/StudioGhibli/StudioGhibli.service';

describe('Film GraphQL Queries', () => {
  let context: TestContext;

  beforeAll(async () => {
    context = await createTestContext();
  });

  afterAll(async () => {
    await context.stopServer();
  });

  describe('film query', () => {
    it('should fetch a valid film by ID', async () => {
      const query = `
        query GetFilm($id: String!) {
          film(id: $id) {
            id
            title
            image
            movieBanner
            description
            director
            releaseDate
            runningTime
            rtScore
          }
        }
      `;

      const variables = {
        id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49', // My Neighbor Totoro
      };

      const response = await context.request
        .post('/api/graphql')
        .send({ query, variables })
        .expect(200);

      expect(response.body.data.film).toBeDefined();
      expect(response.body.data.film.id).toBe(variables.id);
      expect(response.body.data.film.title).toBe('My Neighbor Totoro');
      expect(response.body.data.film.director).toBe('Hayao Miyazaki');
      expect(response.body.data.film.releaseDate).toBe('1988');
      expect(response.body.data.film.runningTime).toBe('86');
      expect(response.body.data.film.rtScore).toBe('93');
      expect(response.body.data.film.image).toContain('image.tmdb.org');
      expect(response.body.data.film.movieBanner).toContain('image.tmdb.org');
      expect(response.body.data.film.description).toContain('Two sisters');
    });

    it("should fetch Howl's Moving Castle by ID", async () => {
      const query = `
        query GetFilm($id: String!) {
          film(id: $id) {
            id
            title
            director
            releaseDate
            runningTime
            rtScore
          }
        }
      `;

      const variables = {
        id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa', // Howl's Moving Castle
      };

      const response = await context.request
        .post('/api/graphql')
        .send({ query, variables })
        .expect(200);

      expect(response.body.data.film).toBeDefined();
      expect(response.body.data.film.id).toBe(variables.id);
      expect(response.body.data.film.title).toBe("Howl's Moving Castle");
      expect(response.body.data.film.director).toBe('Hayao Miyazaki');
      expect(response.body.data.film.releaseDate).toBe('2004');
      expect(response.body.data.film.runningTime).toBe('119');
      expect(response.body.data.film.rtScore).toBe('87');
    });

    it('should return null for non-existent film', async () => {
      const query = `
        query GetFilm($id: String!) {
          film(id: $id) {
            id
            title
          }
        }
      `;

      const variables = {
        id: 'non-existent-id',
      };

      const response = await context.request
        .post('/api/graphql')
        .send({ query, variables })
        .expect(200);

      expect(response.body.data.film).toBeNull();
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe('Film not found');
      expect(response.body.errors[0].extensions.code).toBe('FILM_NOT_FOUND');
    });

    it('should return error for empty film ID', async () => {
      const query = `
        query GetFilm($id: String!) {
          film(id: $id) {
            id
            title
          }
        }
      `;

      const variables = {
        id: '',
      };

      const response = await context.request
        .post('/api/graphql')
        .send({ query, variables })
        .expect(200);

      expect(response.body.data.film).toBeNull();
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe('Invalid film ID provided');
      expect(response.body.errors[0].extensions.code).toBe('INVALID_FILM_ID');
    });

    it('should return error for null film ID', async () => {
      const query = `
        query GetFilm($id: String!) {
          film(id: $id) {
            id
            title
          }
        }
      `;

      const variables = {
        id: null,
      };

      const response = await context.request
        .post('/api/graphql')
        .send({ query, variables })
        .expect(200); // GraphQL returns 200 with errors for null values

      expect(response.body.errors).toBeDefined();
      // GraphQL may not include data field when there are errors
      if (response.body.data) {
        expect(response.body.data.film).toBeNull();
      }
    });

    it('should handle partial field selection', async () => {
      const query = `
        query GetFilm($id: String!) {
          film(id: $id) {
            id
            title
            director
          }
        }
      `;

      const variables = {
        id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
      };

      const response = await context.request
        .post('/api/graphql')
        .send({ query, variables })
        .expect(200);

      expect(response.body.data.film).toBeDefined();
      expect(response.body.data.film.id).toBeDefined();
      expect(response.body.data.film.title).toBeDefined();
      expect(response.body.data.film.director).toBeDefined();
      expect(response.body.data.film.image).toBeUndefined();
      expect(response.body.data.film.movieBanner).toBeUndefined();
    });
  });

  describe('helloWorld query', () => {
    it('should return hello world message', async () => {
      const query = `
        query {
          helloWorld {
            message
          }
        }
      `;

      const response = await context.request
        .post('/api/graphql')
        .send({ query })
        .expect(200);

      expect(response.body.data.helloWorld).toBeDefined();
      expect(response.body.data.helloWorld.message).toBe('Hello World');
    });
  });
});
