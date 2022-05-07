import {
  signupPath,
  loginPath,
  mePath,
  eventPath,
  usersPath,
  eventByIdPath
} from './paths/'

export default {
  '/signup': signupPath,
  '/signin': loginPath,
  '/me': mePath,
  '/users/{userId}': usersPath,
  '/events': eventPath,
  '/events/{eventId}': eventByIdPath
}
