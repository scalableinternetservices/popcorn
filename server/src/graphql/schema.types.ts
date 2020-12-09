import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface Query {
  __typename?: 'Query'
  self?: Maybe<User>
  surveys: Array<Survey>
  survey?: Maybe<Survey>
  movies: Array<Movie>
  votes?: Maybe<Array<Maybe<Vote>>>
  rooms: Array<Room>
  room?: Maybe<Room>
  movie?: Maybe<Movie>
  movieByGenre: Array<Movie>
  movieUser?: Maybe<MovieUser>
  movieInRoom?: Maybe<Movie>
  movieUsers: Array<MovieUser>
  roomMovieCollection: Array<RoomMovieCollection>
  usersInRoom?: Maybe<Array<Maybe<User>>>
  nextMovie?: Maybe<RoomMovieCollection>
}

export interface QuerySurveyArgs {
  surveyId: Scalars['Int']
}

export interface QueryVotesArgs {
  roomId: Scalars['Int']
  movieTitle: Scalars['String']
}

export interface QueryRoomArgs {
  room_id: Scalars['Int']
}

export interface QueryMovieArgs {
  movieId: Scalars['Int']
}

export interface QueryMovieByGenreArgs {
  genres: MovieByGenreInput
}

export interface QueryMovieUserArgs {
  uid: Scalars['Int']
}

export interface QueryMovieInRoomArgs {
  room_id: Scalars['Int']
  index: Scalars['Int']
}

export interface QueryRoomMovieCollectionArgs {
  room_id: Scalars['Int']
}

export interface QueryUsersInRoomArgs {
  room_id: Scalars['Int']
}

export interface QueryNextMovieArgs {
  roomId: Scalars['Int']
  curIndex: Scalars['Int']
}

export interface Mutation {
  __typename?: 'Mutation'
  answerSurvey: Scalars['Boolean']
  nextSurveyQuestion?: Maybe<Survey>
  addRoomAndMovieUser: Scalars['Boolean']
  addVote: Scalars['Boolean']
  addMovieToRoom: Scalars['Boolean']
  addMovieUser: Scalars['Boolean']
}

export interface MutationAnswerSurveyArgs {
  input: SurveyInput
}

export interface MutationNextSurveyQuestionArgs {
  surveyId: Scalars['Int']
}

export interface MutationAddRoomAndMovieUserArgs {
  input: RoomAndMovieUserInput
}

export interface MutationAddVoteArgs {
  input: VoteInput
}

export interface MutationAddMovieToRoomArgs {
  input: MovieToRoomInput
}

export interface MutationAddMovieUserArgs {
  input: MovieUserInput
}

export interface Subscription {
  __typename?: 'Subscription'
  surveyUpdates?: Maybe<Survey>
  userUpdates?: Maybe<User>
}

export interface SubscriptionUserUpdatesArgs {
  roomId: Scalars['Int']
}

export interface SubscriptionSurveyUpdatesArgs {
  surveyId: Scalars['Int']
}

export interface User {
  __typename?: 'User'
  id: Scalars['Int']
  userType: UserType
  room_id: Scalars['Int']
  name: Scalars['String']
}

export interface MovieUserInput {
  room_id: Scalars['Int']
  name: Scalars['String']
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface Survey {
  __typename?: 'Survey'
  id: Scalars['Int']
  name: Scalars['String']
  isStarted: Scalars['Boolean']
  isCompleted: Scalars['Boolean']
  currentQuestion?: Maybe<SurveyQuestion>
  questions: Array<Maybe<SurveyQuestion>>
}

export interface SurveyQuestion {
  __typename?: 'SurveyQuestion'
  id: Scalars['Int']
  prompt: Scalars['String']
  choices?: Maybe<Array<Scalars['String']>>
  answers: Array<SurveyAnswer>
  survey: Survey
}

export interface SurveyAnswer {
  __typename?: 'SurveyAnswer'
  id: Scalars['Int']
  answer: Scalars['String']
  question: SurveyQuestion
}

export interface SurveyInput {
  questionId: Scalars['Int']
  answer: Scalars['String']
}

export interface RoomAndMovieUserInput {
  room_id: Scalars['Int']
  genre1: Scalars['String']
  genre2: Scalars['String']
  max_swipes: Scalars['Int']
  name: Scalars['String']
}

export interface MovieToRoomInput {
  room_id: Scalars['Int']
  movie_id: Scalars['Int']
  index: Scalars['Int']
}

export interface NextMovieInput {
  room_id: Scalars['Int']
  index: Scalars['Int']
}

export interface MovieByGenreInput {
  genre1: Scalars['String']
  genre2: Scalars['String']
}

export interface VoteInput {
  room_id: Scalars['Int']
  movie_title: Scalars['String']
  user_id: Scalars['Int']
}

export interface Movie {
  __typename?: 'Movie'
  movie_id: Scalars['Int']
  title: Scalars['String']
  time: Scalars['Int']
  year: Scalars['Int']
  genre: Scalars['String']
  director: Scalars['String']
  actors: Scalars['String']
  country: Scalars['String']
  rating: Scalars['Float']
  netflix: Scalars['String']
  enter_in: Scalars['String']
  image: Scalars['String']
  description: Scalars['String']
}

export interface MovieUser {
  __typename?: 'MovieUser'
  room_id: Scalars['Int']
  u_id: Scalars['Int']
  name: Scalars['String']
}

export interface Room {
  __typename?: 'Room'
  id: Scalars['Int']
  room_id: Scalars['Int']
  admin_user_id: Scalars['Int']
  genre1: Scalars['String']
  genre2: Scalars['String']
  max_swipes: Scalars['Int']
}

export interface RoomMovieCollection {
  __typename?: 'RoomMovieCollection'
  id: Scalars['Int']
  m_room_id: Scalars['Int']
  m_movie_id: Scalars['Int']
  movie_index: Scalars['Int']
}

export interface Vote {
  __typename?: 'Vote'
  id: Scalars['Int']
  room_id: Scalars['Int']
  movie_title: Scalars['String']
  user_id: Scalars['Int']
}

export interface Genres {
  __typename?: 'Genres'
  movie_id: Scalars['Int']
  action_and_adventure: Scalars['Boolean']
  anime_features: Scalars['Boolean']
  children_family_movies: Scalars['Boolean']
  classic_movies: Scalars['Boolean']
  comedies: Scalars['Boolean']
  cult_movies: Scalars['Boolean']
  documentaries: Scalars['Boolean']
  dramas: Scalars['Boolean']
  faith_and_Spirituality: Scalars['Boolean']
  horror_movies: Scalars['Boolean']
  independent_movies: Scalars['Boolean']
  international_movies: Scalars['Boolean']
  lgbtq_movies: Scalars['Boolean']
  movies: Scalars['Boolean']
  music_and_musicals: Scalars['Boolean']
  romantic_movies: Scalars['Boolean']
  scifi_and_fantasy: Scalars['Boolean']
  sports_movies: Scalars['Boolean']
  standup_comedy: Scalars['Boolean']
  thrillers: Scalars['Boolean']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  String: ResolverTypeWrapper<Scalars['String']>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Subscription: ResolverTypeWrapper<{}>
  User: ResolverTypeWrapper<User>
  MovieUserInput: MovieUserInput
  UserType: UserType
  Survey: ResolverTypeWrapper<Survey>
  SurveyQuestion: ResolverTypeWrapper<SurveyQuestion>
  SurveyAnswer: ResolverTypeWrapper<SurveyAnswer>
  SurveyInput: SurveyInput
  RoomAndMovieUserInput: RoomAndMovieUserInput
  MovieToRoomInput: MovieToRoomInput
  NextMovieInput: NextMovieInput
  MovieByGenreInput: MovieByGenreInput
  VoteInput: VoteInput
  Movie: ResolverTypeWrapper<Movie>
  Float: ResolverTypeWrapper<Scalars['Float']>
  MovieUser: ResolverTypeWrapper<MovieUser>
  Room: ResolverTypeWrapper<Room>
  RoomMovieCollection: ResolverTypeWrapper<RoomMovieCollection>
  Vote: ResolverTypeWrapper<Vote>
  Genres: ResolverTypeWrapper<Genres>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Int: Scalars['Int']
  String: Scalars['String']
  Mutation: {}
  Boolean: Scalars['Boolean']
  Subscription: {}
  User: User
  MovieUserInput: MovieUserInput
  Survey: Survey
  SurveyQuestion: SurveyQuestion
  SurveyAnswer: SurveyAnswer
  SurveyInput: SurveyInput
  RoomAndMovieUserInput: RoomAndMovieUserInput
  MovieToRoomInput: MovieToRoomInput
  NextMovieInput: NextMovieInput
  MovieByGenreInput: MovieByGenreInput
  VoteInput: VoteInput
  Movie: Movie
  Float: Scalars['Float']
  MovieUser: MovieUser
  Room: Room
  RoomMovieCollection: RoomMovieCollection
  Vote: Vote
  Genres: Genres
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  self?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  surveys?: Resolver<Array<ResolversTypes['Survey']>, ParentType, ContextType>
  survey?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<QuerySurveyArgs, 'surveyId'>
  >
  movies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>
  votes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Vote']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryVotesArgs, 'roomId' | 'movieTitle'>
  >
  rooms?: Resolver<Array<ResolversTypes['Room']>, ParentType, ContextType>
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QueryRoomArgs, 'room_id'>>
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryMovieArgs, 'movieId'>>
  movieByGenre?: Resolver<
    Array<ResolversTypes['Movie']>,
    ParentType,
    ContextType,
    RequireFields<QueryMovieByGenreArgs, 'genres'>
  >
  movieUser?: Resolver<
    Maybe<ResolversTypes['MovieUser']>,
    ParentType,
    ContextType,
    RequireFields<QueryMovieUserArgs, 'uid'>
  >
  movieInRoom?: Resolver<
    Maybe<ResolversTypes['Movie']>,
    ParentType,
    ContextType,
    RequireFields<QueryMovieInRoomArgs, 'room_id' | 'index'>
  >
  movieUsers?: Resolver<Array<ResolversTypes['MovieUser']>, ParentType, ContextType>
  roomMovieCollection?: Resolver<
    Array<ResolversTypes['RoomMovieCollection']>,
    ParentType,
    ContextType,
    RequireFields<QueryRoomMovieCollectionArgs, 'room_id'>
  >
  usersInRoom?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersInRoomArgs, 'room_id'>
  >
  nextMovie?: Resolver<
    Maybe<ResolversTypes['RoomMovieCollection']>,
    ParentType,
    ContextType,
    RequireFields<QueryNextMovieArgs, 'roomId' | 'curIndex'>
  >
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  answerSurvey?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAnswerSurveyArgs, 'input'>
  >
  nextSurveyQuestion?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<MutationNextSurveyQuestionArgs, 'surveyId'>
  >
  addRoomAndMovieUser?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAddRoomAndMovieUserArgs, 'input'>
  >
  addVote?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddVoteArgs, 'input'>>
  addMovieToRoom?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAddMovieToRoomArgs, 'input'>
  >
  addMovieUser?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAddMovieUserArgs, 'input'>
  >
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  surveyUpdates?: SubscriptionResolver<
    Maybe<ResolversTypes['Survey']>,
    'surveyUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSurveyUpdatesArgs, 'surveyId'>
  >
  userUpdates?: SubscriptionResolver<
    Maybe<ResolversTypes['User']>,
    'userUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionUserUpdatesArgs, 'roomId'>
  >
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>
  room_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Survey'] = ResolversParentTypes['Survey']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  currentQuestion?: Resolver<Maybe<ResolversTypes['SurveyQuestion']>, ParentType, ContextType>
  questions?: Resolver<Array<Maybe<ResolversTypes['SurveyQuestion']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyQuestion'] = ResolversParentTypes['SurveyQuestion']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  prompt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  choices?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  answers?: Resolver<Array<ResolversTypes['SurveyAnswer']>, ParentType, ContextType>
  survey?: Resolver<ResolversTypes['Survey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyAnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyAnswer'] = ResolversParentTypes['SurveyAnswer']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  question?: Resolver<ResolversTypes['SurveyQuestion'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type MovieResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']
> = {
  movie_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  genre?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  director?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  actors?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  netflix?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  enter_in?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type MovieUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MovieUser'] = ResolversParentTypes['MovieUser']
> = {
  room_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  u_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type RoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  room_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  admin_user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  genre1?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  genre2?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  max_swipes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type RoomMovieCollectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoomMovieCollection'] = ResolversParentTypes['RoomMovieCollection']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  m_room_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  m_movie_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  movie_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type VoteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  room_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  movie_title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type GenresResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Genres'] = ResolversParentTypes['Genres']
> = {
  movie_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  action_and_adventure?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  anime_features?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  children_family_movies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  classic_movies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  comedies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  cult_movies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  documentaries?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  dramas?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  faith_and_Spirituality?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  horror_movies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  independent_movies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  international_movies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  lgbtq_movies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  movies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  music_and_musicals?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  romantic_movies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  scifi_and_fantasy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  sports_movies?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  standup_comedy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  thrillers?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Survey?: SurveyResolvers<ContextType>
  SurveyQuestion?: SurveyQuestionResolvers<ContextType>
  SurveyAnswer?: SurveyAnswerResolvers<ContextType>
  Movie?: MovieResolvers<ContextType>
  MovieUser?: MovieUserResolvers<ContextType>
  Room?: RoomResolvers<ContextType>
  RoomMovieCollection?: RoomMovieCollectionResolvers<ContextType>
  Vote?: VoteResolvers<ContextType>
  Genres?: GenresResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
