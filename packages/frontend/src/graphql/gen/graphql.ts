/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Date custom scalar type */
  Date: { input: any; output: any };
};

/** A Studio Ghibli film */
export type Film = {
  __typename?: 'Film';
  /** Plot description of the film */
  description: Scalars['String']['output'];
  /** Director of the film */
  director: Scalars['String']['output'];
  /** Unique identifier for the film */
  id: Scalars['String']['output'];
  /** URL to the film poster image */
  image: Scalars['String']['output'];
  /** URL to the film banner image */
  movieBanner: Scalars['String']['output'];
  /** Release year of the film */
  releaseDate: Scalars['String']['output'];
  /** Rotten Tomatoes score */
  rtScore: Scalars['String']['output'];
  /** Runtime in minutes */
  runningTime: Scalars['String']['output'];
  /** English title of the film */
  title: Scalars['String']['output'];
};

export type HelloWorld = {
  __typename?: 'HelloWorld';
  message?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  placeholder?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  film?: Maybe<Film>;
  helloWorld: HelloWorld;
  placeholder?: Maybe<Scalars['String']['output']>;
};

export type QueryFilmArgs = {
  id: Scalars['String']['input'];
};

export type GetHelloWorldQueryVariables = Exact<{ [key: string]: never }>;

export type GetHelloWorldQuery = {
  __typename?: 'Query';
  helloWorld: { __typename?: 'HelloWorld'; message?: string | null };
};

export type GetFilmQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetFilmQuery = {
  __typename?: 'Query';
  film?: {
    __typename?: 'Film';
    id: string;
    title: string;
    image: string;
    movieBanner: string;
    description: string;
    director: string;
    releaseDate: string;
    runningTime: string;
    rtScore: string;
  } | null;
};

export const GetHelloWorldDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetHelloWorld' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'helloWorld' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetHelloWorldQuery, GetHelloWorldQueryVariables>;
export const GetFilmDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetFilm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'film' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'movieBanner' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'director' } },
                { kind: 'Field', name: { kind: 'Name', value: 'releaseDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'runningTime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rtScore' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFilmQuery, GetFilmQueryVariables>;
