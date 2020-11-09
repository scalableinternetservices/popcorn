import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { getRepository } from 'typeorm'
import { check } from '../../../common/src/util'
import { Genres } from '../entities/Genres'
import { Movie } from '../entities/Movies'
import { MovieUser } from '../entities/MovieUser'
import { RoomMovieCollection } from '../entities/RoomMovieCollection'
import { Room } from '../entities/Rooms'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { Vote } from '../entities/Votes'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
}

/*
function genre_format(genres: string[]) {
  var object: any = {}
  for (let g in genres) {
    object[g] = 1
  }
  return object
}
*/

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    rooms: () => Room.find(),
    room: async (_, { room_id }) => (await Room.findOne({ where: { room_id: room_id } })) || null,
    movies: () => Movie.find(),
    votes: async (_, { roomId }) => Vote.find({ where: { room_id: roomId } }) || null,
    movie: async (_, { movieId }) => (await Movie.findOne({ where: { movie_id: movieId } })) || null,
    //movieByGenre: async (_, { genres }) => (await Genres.findOne({ where: { genre_format( genres: string[]) } })) || null,
  },
  Mutation: {
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    addRoom: async (_, { input }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const { genre1, genre2 } = input
      //const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const room = new Room()
      //room.admin_user_id = admin_user_id
      room.genre1 = genre1
      room.genre2 = genre2
      await room.save()

      //question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('NEW_ROOM_' + 1, room)

      // query movies of those genres
      const wherestring = '(' + genre1 + ' = true or ' + genre2 + ' = true)'

      //.where(':genre1 = 1 OR :genre2 = 1', { genre1, genre2 })
      const movies_by_genre = await getRepository(Genres).createQueryBuilder('genres').where(wherestring).getMany()
      if (!movies_by_genre) {
        return false
      }

      const get_rooms = await getRepository(Room).createQueryBuilder('rooms').getMany()
      if (!get_rooms) {
        return false
      }

      const use_movies = movies_by_genre.slice(0, 20)

      let index = 1
      use_movies.forEach(m => {
        const room_m = new RoomMovieCollection()
        room_m.room_id = get_rooms.length
        room_m.movie_id = m.movie_id //new_movies.movie_id
        room_m.index = index
        room_m.save()
        index = index + 1
      })

      /*
      const room_m = new RoomMovieCollection()
      room_m.room_id = 10
      room_m.movie_id = 10//new_movies.movie_id
      room_m.index = 10
      await room_m.save()
      */
      return true
    },
    addVote: async (_, { input }, ctx) => {
      const vote = new Vote()
      const { room_id, movie_id, user_id } = input
      vote.room_id = room_id
      vote.movie_id = movie_id
      vote.user_id = user_id
      await vote.save()
      //ctx.pubsub.publish('NEW_VOTE_' + 1, vote)
      return true
    },
    addMovieUser: async (_, { input }, ctx) => {
      const new_movieuser = new MovieUser()
      const { room_id, name } = input
      new_movieuser.room_id = room_id
      new_movieuser.name = name
      await new_movieuser.save()
      //ctx.pubsub.publish('NEW_VOTE_' + 1, vote)
      return true
    },
    addMovieToRoom: async (_, { input }, ctx) => {
      const room_m = new RoomMovieCollection()
      const { room_id, movie_id, index } = input
      room_m.room_id = room_id
      room_m.movie_id = movie_id
      room_m.index = index
      await room_m.save()
      //ctx.room_m.publish('NEW_VOTE_' + 1, vote)
      return true
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
