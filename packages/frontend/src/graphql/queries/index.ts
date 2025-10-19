import { gql } from '~/graphql/gen';

export const GET_HELLO_WORLD = gql(`
  query GetHelloWorld {
    helloWorld {
      message
    }
  }
`);

export const GET_FILM = gql(`
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
`);
