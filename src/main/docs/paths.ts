import {
  signupPath,
  loginPath,
  mePath,
  eventPath,
  usersPath,
  eventByIdPath,
  rolePath,
  roleByIdPath,
  usersRolePath
} from './paths/'

export default {
  '/signup': signupPath,
  '/signin': loginPath,
  '/me': mePath,
  '/users/{userId}': usersPath,
  '/events': eventPath,
  '/events/{eventId}': eventByIdPath,
  '/roles': rolePath,
  '/roles/{roleId}': roleByIdPath,
  '/users/{userId}/role': usersRolePath
}
