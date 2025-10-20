import { objectType } from 'nexus';

export const HelloWorld = objectType({
  name: 'HelloWorld',
  definition(t) {
    t.string('message');
  },
});

export const Film = objectType({
  name: 'Film',
  description: 'A Studio Ghibli film',
  definition(t) {
    t.nonNull.string('id', { description: 'Unique identifier for the film' });
    t.nonNull.string('title', { description: 'English title of the film' });
    t.nonNull.string('image', { description: 'URL to the film poster image' });
    t.nonNull.string('movieBanner', {
      description: 'URL to the film banner image',
    });
    t.nonNull.string('description', {
      description: 'Plot description of the film',
    });
    t.nonNull.string('director', { description: 'Director of the film' });
    t.nonNull.string('releaseDate', {
      description: 'Release year of the film',
    });
    t.nonNull.string('runningTime', { description: 'Runtime in minutes' });
    t.nonNull.string('rtScore', { description: 'Rotten Tomatoes score' });
  },
});
