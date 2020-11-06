import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Movie } from '../entities/Movies'
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

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    rooms: () => Room.find(),
    room: async (_, { room_id }) => (await Room.findOne({ where: { room_id: room_id } })) || null,
    movies: () => Movie.find(),
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
    addRoom: async (_, { admin_user_id }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      //const admin_user_id = admin_user_id
      //const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const room = new Room()
      room.admin_user_id = admin_user_id
      room.genre1 = 'test1'
      room.genre2 = 'test2'
      await room.save()

      //question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('NEW_ROOM_' + 1, room)

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
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
