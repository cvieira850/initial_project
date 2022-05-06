import {
  signupPath,
  loginPath,
  mePath,
  eventPath,
  usersPath
} from './paths/'

export default {
  '/signup': signupPath,
  '/signin': loginPath,
  '/me': mePath,
  '/events': eventPath,
  '/users/{userId}': usersPath
}
