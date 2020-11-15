/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUserContext
// ====================================================

export interface FetchUserContext_self {
  __typename: "User";
  id: number;
  name: string;
  room_id: number;
  userType: UserType;
}

export interface FetchUserContext {
  self: FetchUserContext_self | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchMovies
// ====================================================

export interface FetchMovies_movies {
  __typename: "Movie";
  movie_id: number;
  title: string;
}

export interface FetchMovies {
  movies: FetchMovies_movies[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchMovie
// ====================================================

export interface FetchMovie_movie {
  __typename: "Movie";
  movie_id: number;
  title: string;
}

export interface FetchMovie {
  movie: FetchMovie_movie | null;
}

export interface FetchMovieVariables {
  movie_id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchRoomMovieCollection
// ====================================================

export interface FetchRoomMovieCollection_roomMovieCollection {
  __typename: "RoomMovieCollection";
  movie_id: number;
  movie_index: number;
}

export interface FetchRoomMovieCollection {
  roomMovieCollection: (FetchRoomMovieCollection_roomMovieCollection | null)[] | null;
}

export interface FetchRoomMovieCollectionVariables {
  room_id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchRooms
// ====================================================

export interface FetchRooms_rooms {
  __typename: "Room";
  room_id: number;
  admin_user_id: number;
  genre1: string;
  genre2: string;
}

export interface FetchRooms {
  rooms: FetchRooms_rooms[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchRoom
// ====================================================

export interface FetchRoom_room {
  __typename: "Room";
  room_id: number;
  admin_user_id: number;
  genre1: string;
  genre2: string;
}

export interface FetchRoom {
  room: FetchRoom_room | null;
}

export interface FetchRoomVariables {
  room_id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSurveys
// ====================================================

export interface FetchSurveys_surveys_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface FetchSurveys_surveys_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: FetchSurveys_surveys_currentQuestion_answers[];
}

export interface FetchSurveys_surveys {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: FetchSurveys_surveys_currentQuestion | null;
}

export interface FetchSurveys {
  surveys: FetchSurveys_surveys[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SurveySubscription
// ====================================================

export interface SurveySubscription_surveyUpdates_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface SurveySubscription_surveyUpdates_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: SurveySubscription_surveyUpdates_currentQuestion_answers[];
}

export interface SurveySubscription_surveyUpdates {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: SurveySubscription_surveyUpdates_currentQuestion | null;
}

export interface SurveySubscription {
  surveyUpdates: SurveySubscription_surveyUpdates | null;
}

export interface SurveySubscriptionVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSurvey
// ====================================================

export interface FetchSurvey_survey_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface FetchSurvey_survey_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: FetchSurvey_survey_currentQuestion_answers[];
}

export interface FetchSurvey_survey {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: FetchSurvey_survey_currentQuestion | null;
}

export interface FetchSurvey {
  survey: FetchSurvey_survey | null;
}

export interface FetchSurveyVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchVotes
// ====================================================

export interface FetchVotes_votes {
  __typename: "Vote";
  movie_id: number;
}

export interface FetchVotes {
  votes: (FetchVotes_votes | null)[] | null;
}

export interface FetchVotesVariables {
  room_id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddMovieUser
// ====================================================

export interface AddMovieUser {
  addMovieUser: boolean;
}

export interface AddMovieUserVariables {
  input: MovieUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AnswerSurveyQuestion
// ====================================================

export interface AnswerSurveyQuestion {
  answerSurvey: boolean;
}

export interface AnswerSurveyQuestionVariables {
  input: SurveyInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NextSurveyQuestion
// ====================================================

export interface NextSurveyQuestion_nextSurveyQuestion_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface NextSurveyQuestion_nextSurveyQuestion_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: NextSurveyQuestion_nextSurveyQuestion_currentQuestion_answers[];
}

export interface NextSurveyQuestion_nextSurveyQuestion {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: NextSurveyQuestion_nextSurveyQuestion_currentQuestion | null;
}

export interface NextSurveyQuestion {
  nextSurveyQuestion: NextSurveyQuestion_nextSurveyQuestion | null;
}

export interface NextSurveyQuestionVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddRoomAndMovieUser
// ====================================================

export interface AddRoomAndMovieUser {
  addRoomAndMovieUser: boolean;
}

export interface AddRoomAndMovieUserVariables {
  input: RoomAndMovieUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Movie
// ====================================================

export interface Movie {
  __typename: "Movie";
  movie_id: number;
  title: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoomMovieCollection
// ====================================================

export interface RoomMovieCollection {
  __typename: "RoomMovieCollection";
  movie_id: number;
  movie_index: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Room
// ====================================================

export interface Room {
  __typename: "Room";
  room_id: number;
  admin_user_id: number;
  genre1: string;
  genre2: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Survey
// ====================================================

export interface Survey_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface Survey_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: Survey_currentQuestion_answers[];
}

export interface Survey {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: Survey_currentQuestion | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SurveyQuestion
// ====================================================

export interface SurveyQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface SurveyQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: SurveyQuestion_answers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Vote
// ====================================================

export interface Vote {
  __typename: "Vote";
  movie_id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface MovieUserInput {
  room_id: number;
  name: string;
}

export interface RoomAndMovieUserInput {
  room_id: number;
  genre1: string;
  genre2: string;
  name: string;
}

export interface SurveyInput {
  questionId: number;
  answer: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
