import {
  signupPath,
  loginPath,
  mePath,
  eventPath,
  usersPath,
  eventByIdPath,
  rolePath,
  roleByIdPath,
  usersRolePath,
  forgotPasswordPath,
  resetPasswordPath
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
  '/users/{userId}/role': usersRolePath,
  '/users/forgot-password': forgotPasswordPath,
  '/users/reset-password/{token}': resetPasswordPath
}
