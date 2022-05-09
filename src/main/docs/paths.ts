import {
  signupPath,
  loginPath,
  mePath,
  eventPath,
  usersPath,
  eventByIdPath,
  rolePath
} from './paths/'

export default {
  '/signup': signupPath,
  '/signin': loginPath,
  '/me': mePath,
  '/users/{userId}': usersPath,
  '/events': eventPath,
  '/events/{eventId}': eventByIdPath,
  '/roles': rolePath
}
