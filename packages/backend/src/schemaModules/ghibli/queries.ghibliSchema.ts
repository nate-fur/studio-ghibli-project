import { stringArg, nonNull, extendType } from 'nexus';
import { HelloWorld, Film } from './objectTypes.ghibliSchema';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES, ErrorMessages } from '~/shared/constants';
import { getHelloWorld } from '~/shared/utils';
import { StudioGhibliService } from '~/services/StudioGhibli/StudioGhibli.service';

export const TourQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('helloWorld', {
      type: nonNull(HelloWorld),
      resolve: async () => {
        try {
          const helloWorld = getHelloWorld();
          return helloWorld;
        } catch (error) {
          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });

    t.field('film', {
      type: Film,
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }) => {
        try {
          const studioGhibliService = new StudioGhibliService();
          const film = await studioGhibliService.getFilmById(id);

          // Map the API response to our GraphQL schema
          return {
            id: film.id,
            title: film.title,
            image: film.image,
            movieBanner: film.movie_banner,
            description: film.description,
            director: film.director,
            releaseDate: film.release_date,
            runningTime: film.running_time,
            rtScore: film.rt_score,
          };
        } catch (error) {
          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Log unexpected errors for debugging
          console.error('Unexpected error in film query:', error);

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });
  },
});
